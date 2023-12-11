const experts = require("../models/expertModel");

const expertSignup = async (req, res, next) => {
  const {
    password,
    email,
    gender,
    firstName,
    lastName,
    userName,
    phone,
    description,
    expertise,
    highestQualification,
    skills,
    experience,
    currentRole,
    certifications,
    city,
    languages,
    hourlyRate,
    calendlyLink,
  } = req.body;
  let sentimentScore = 0;
  console.log(email);
  try {
    // Check if the email already exists in the database
    const existingExpert = await experts.findOne({ email: email });

    if (existingExpert) {
      console.log(existingExpert);
      return res.status(230).json({ Message: "Email already in use" });
    }

    // Email is not in use, create a new expert
    const expert = new experts({
      password, // Please hash this in production!
      email,
      gender,
      firstName,
      lastName,
      userName,
      phone,
      description,
      expertise,
      highestQualification,
      skills,
      experience,
      currentRole,
      certifications,
      city,
      languages,
      hourlyRate,
      sentimentScore,
      calendlyLink,
    });

    const savedExpert = await expert.save();
    res.status(200).json({ Message: "Expert Created", expert: savedExpert });
    next();
  } catch (err) {
    res.status(500).json({ Message: "Expert Not Created", error: err });
  }
};

let expertLogin = (req, res) => {
  let { email, password } = req.body;
  console.log(email);
  console.log(password);
  experts
    .findOne({ email: email })

    .then((user) => {
      if (user.password == password) {
        // let token = jwt.sign(
        //   {
        //     id: user._id,
        //     email: user.email,
        //   },
        //   process.env.SECRET_KEY,
        //   {
        //     expiresIn: "24h",
        //   }
        // );
        res
          .status(200)

          .json({ Message: "Expert Login Successfull", user: user });
      } else {
        res.status(500).json({ Message: "Expert Login Failed" });
      }
    })
    .catch((err) => {
      res.status(500).json({ Message: "Login Failed", err: err });
      console.log(err);
    });
};

let getAllUsers = (req, res) => {
  experts
    .find({})
    .then((users) => {
      res.status(200).json({ Message: "Users retrieved successfully", users });
    })
    .catch((err) => {
      res.status(500).json({ Message: "Error fetching users", error: err });
    });
};
module.exports = {
  expertSignup,
  getAllUsers,
  expertLogin,
};
