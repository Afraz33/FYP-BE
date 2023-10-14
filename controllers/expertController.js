const experts = require("../models/expertModel");

let expertSignup = (req, res) => {
  console.log("Afraz");
  let {
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
  } = req.body;
  // Usually, you would validate the user input here
  let expert = new experts({
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
  });
  expert
    .save()
    .then((savedExpert) => {
      res.status(200).json({ Message: "Expert Created", expert: savedExpert });
    })
    .catch((err) => {
      res.status(500).json({ Message: "Expert Not Created", err: err });
    });
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
