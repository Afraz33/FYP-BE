// controllers/focalPersonController.js
const FocalPerson = require('../models/focalPerson');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY; // Change this to a secure secret key

exports.register = async (req, res) => {
    try {
      const { firstname, lastname, universityEmail, universityName, password } = req.body;
  
      // Check if the universityName already exists
      const existingUser = await FocalPerson.findOne({ universityName });
      if (existingUser) {
        return res.status(400).json({ error: 'Focal Person of the university already exists' });
      }
  
      const user = new FocalPerson({
        firstname,
        lastname,
        universityEmail,
        universityName,
        password,
      });
  
      await user.save();
  
      // Generate JWT token
      const token = jwt.sign({ universityName: user.universityName }, secretKey, { expiresIn: '24h' });
  
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error. Every university should have a unique email and password' });
    }
  };

exports.login = async (req, res) => {
  try {
    const { universityEmail, password } = req.body;

    const user = await FocalPerson.findOne({ universityEmail, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ universityName: user.universityName }, secretKey, { expiresIn: '24h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
