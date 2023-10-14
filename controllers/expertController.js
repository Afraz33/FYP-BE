const Expert = require("../models/expertModel");

let expertSignup = (req, res) => {
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

  let expert = new Expert({
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

module.exports = {
  expertSignup,
};
