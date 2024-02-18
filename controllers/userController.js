const userModel = require("../models/userModel");
const ExpertModel = require('../models/expertModel'); 
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

//user signup
let signup = (req, res) => {
  let { password, email, gender, firstName, lastName, userName, phoneNo } =
    req.body;
  
  let user = new userModel({
    firstName,
    lastName,
    userName,
    email,
    password,
    gender,
    phoneNo,
  });

  user
    .save()
    .then((user) => {
      res.status(200).json({ Message: "User Created", user: user });
    })
    .catch((err) => {
      res.status(500).json({ Message: "User Not Created", err: err });
    });
};

//user login
let login = (req, res) => {
  let { email, password } = req.body;

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user.password == password) {
        let token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "24h",
          }
        );
        res
          .status(200)
          .json({ Message: "Login Successfull", user: user, token });
      } else {
        res.status(500).json({ Message: "Login Failed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Login Failed", err: err });
    });
};

let forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'umamaqasim420@gmail.com',
        pass: 'zjxr pvoi ejos xurn'
      }
    });
    const mailOptions = {
      from: 'umamaqasim420@gmail.com',
      to: email,
      subject: 'Reset Password',
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
            <p>Please click on the following link, or paste this into your browser to complete the process:</p>
            <p><a href="http://localhost:3000/reset-password/${token}">Reset Password Link</a></p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

let resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Log the received token and newPassword
    console.log('Received Token:', token);
    console.log('New Password:', newPassword);

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Log the decoded token
    console.log('Decoded Token:', decoded);

    // Find the user by ID
    const user = await userModel.findById(decoded.userId);

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

// Check if email already exists
const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Received data in backend:", email);

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({ exists: true });
     
    }

    res.json({ exists: false }); 
    console.log("user already exists");
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 
// Check if username already exists
const checkUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await userModel.findOne({ userName: username });

    if (user) {
      return res.json({ exists: true });
    }

    res.json({ exists: false });
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

let  getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// let DecodeUser = async (req, res) => {
//   try {
//     // Check if Authorization header is present
//     if (!req.headers.authorization) {
//       return res.status(403).json({ message: "Authorization header is missing" });
//     }

//     let token = req.headers.authorization.split(" ")[1];

//     // Check if token is present
//     if (!token) {
//       return res.status(403).json({ message: "Token is missing" });
//     }

//     const decoded = await jwt.verify(token, process.env.SECRET_KEY);

//     // Check if the decoded user exists in the database
//     // (You may need to modify this part based on your data model)
//     const user = await userModel.findById(decoded.id);

//     if (!user) {
//       return res.status(403).json({ message: "Not Authorized" });
//     }

//     req.decoded = decoded;
//   } catch (error) {
//     console.error('Error decoding user:', error.message);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
let DecodeUser = async (req, res, callback) => {
  try {
    // Check if Authorization header is present
    if (!req.headers.authorization) {
      return res.status(403).json({ message: "Authorization header is missing" });
    }

    let token = req.headers.authorization.split(" ")[1];

    // Check if token is present
    if (!token) {
      return res.status(403).json({ message: "Token is missing" });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    // Check if the decoded user exists in the database
    // (You may need to modify this part based on your data model)
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(403).json({ message: "Not Authorized" });
    }

    req.decoded = decoded;

    // Pass the decoded user to the callback
    callback(req.decoded);
  } catch (error) {
    console.error('Error decoding user:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
let getUserProfile = async (req, res) => {
  // Ensure user is authenticated
  DecodeUser(req, res, async (decoded) => {
    try {
      // Retrieve user based on authentication criteria
      const user = await userModel.findById(decoded.id);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      // Handle different errors appropriately
      if (!res.headersSent) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
};

// let getUserProfile = async (req, res) => {
//   try {
//     // Ensure user is authenticated
//     await DecodeUser(req, res);

//     // Retrieve user based on authentication criteria
//     const user = await userModel.findById(req.decoded.id);

//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error('Error fetching user profile:', error.message);
//     // Handle different errors appropriately
//     if (!res.headersSent) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
// };
// Route to update user profile
// Route to update user profile
let updateUserProfile = async (req, res) => {
  try {
    // Ensure user is authenticated
    DecodeUser(req, res, async (decoded) => {
      console.log('Decoded:', decoded);

      // Update user profile fields
      const { userName, phoneNo, password, email } = req.body;
      const user = await userModel.findByIdAndUpdate(
        decoded.id,
        {
          $set: {
            userName: userName || decoded.userName,
            phoneNo: phoneNo || decoded.phoneNo,
            password: password || decoded.password,
            email: email || decoded.email,
          },
        },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user);
    });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



module.exports = {
  forgotPassword,
  resetPassword,
  signup,
  login,
  checkEmail, 
  checkUsername,
  updateUserProfile,
  getAllUsers,
  getUserProfile,
  DecodeUser
};
