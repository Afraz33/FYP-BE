// controllers/focalPersonController.js
const FocalPerson = require('../models/focalPerson');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

const secretKey = process.env.SECRET_KEY; // Change this to a secure secret key

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, universityEmail, universityName, password } = req.body;

    // Check if the universityName already exists
    const existingUser = await FocalPerson.findOne({ universityName });
    if (existingUser) {
      return res.status(400).json({ error: 'Focal person for this university already exists' });
    }

    // Create a new user instance
    const newUser = new FocalPerson({
      firstname,
      lastname,
      universityEmail,
      universityName,
      password, // Save the encrypted password
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ universityName: newUser.universityName }, secretKey, { expiresIn: '24h' });

    // Send the token in the response
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error in registering user:', error);

    // Handle specific database errors
    if (error.code === 11000) {
      // Duplicate key error (e.g., unique field constraint violation)
      return res.status(400).json({ error: 'Duplicate university found' });
    }

    // Send a generic error response
    res.status(500).json({ error: 'Internal Server Error. Please try again later.' });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { universityEmail, password } = req.body;

//     const user = await FocalPerson.findOne({ universityEmail, password });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const tokenPayload = { userId: user._id }; // Include userId in the payload
//     const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '24h' });
    
//     console.log('Token Payload:', tokenPayload); // Log the token payload

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
      exports.login = async (req, res) => {
        try {
          const { universityEmail, password } = req.body;

          const user = await FocalPerson.findOne({ universityEmail, password });
          if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
          }

          // Update the token payload to include universityName
          const tokenPayload = {
            userId: user._id, // Keep the user ID
            universityName: user.universityName // Add the university name
          };
          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '24h' });
          
          console.log('Token Payload:', tokenPayload); // Log the new token payload

          res.status(200).json({ token });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };

exports.getFocalPersonProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extract user ID from the decoded JWT token
    const user = await FocalPerson.findById(userId).select('-password'); // Exclude password field from the query

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user); // Send the user profile information in the response
  } catch (error) {
    console.error('Error in fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.editFocalPerson = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from JWT token
    const { firstname, lastname, password } = req.body;

    const user = await FocalPerson.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's information
    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    if (password) user.password = password; // Consider hashing the password

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { universityEmail } = req.body;

  try {
    // Find user by universityEmail
    const user = await FocalPerson.findOne({ universityEmail });

    // If user not found, return 404 status
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate JWT token for password reset
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    // Configure nodemailer to send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'umamaqasim420@gmail.com',
        pass: 'zjxr pvoi ejos xurn'
      }
    });

    // Prepare email content
    const mailOptions = {
      from: 'umamaqasim420@gmail.com',
      to: universityEmail,
      subject: 'Reset Password',
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the following link, or paste this into your browser to complete the process:</p>
            <p><a href="http://localhost:3000/reset-password-focal/${token}">Reset Password Link</a></p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success message
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    // Log the error for debugging
    console.error('Error during forgot password:', error);
    // Send a response with the error message
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Log the received token and newPassword
    console.log('Received Token:', token);
    console.log('New Password:', newPassword);

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Log the decoded token
    console.log('Decoded Token:', decoded);

    // Find the user by ID using FocalPerson model
    const user = await FocalPerson.findById(decoded.userId);

    // Log the found user
    console.log('Found User:', user);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is provided
    if (!newPassword) {
      return res.status(400).json({ message: 'New password is required' });
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Respond with success message
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    // Log more details about the error
    console.error('Error in resetPassword:', error);

    // Respond with an error message
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};