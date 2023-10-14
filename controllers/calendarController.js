const Calendar = require("../models/calendarModel"); // Import your Review model

const createCalendar = (req, res, next) => {
  // Retrieve the expert's email from the previous middleware (expertSignup)
  const expertEmail = req.body.email; // Assuming the email is in the request body

  // Create a review for the expert with no reviews initially
  const calendar = new Calendar({
    expertEmail,
    timeSlots: [],
  });

  calendar
    .save()
    .then((savedSlots) => {
      // You can do something with the savedReview if needed
      // For example, you can send it as a response to the client
      //res.status(200).json({ Message: "Review Created", review: savedReview });
    })
    .catch((err) => {
      // Handle any errors that occur during the review creation
      res.status(500).json({ Message: "Calendar Not Created", err: err });
    });

  // Call the next middleware
};

//Add Slots
const updateCalendar = async (req, res) => {
  const expertEmail = req.body.email; // Assuming you have the expert's email in the request body
  const newTimeSlots = req.body.timeSlots; // Assuming you have an array of new time slots to add in the request body

  try {
    // Find the expert's calendar by their email
    const calendar = await Calendar.findOne({ expertEmail });

    if (!calendar) {
      return res
        .status(404)
        .json({ Message: "Calendar not found for this expert" });
    }

    // Add the new time slots to the existing array
    calendar.timeSlots = calendar.timeSlots.concat(newTimeSlots);

    // Save the updated calendar
    const updatedCalendar = await calendar.save();

    return res
      .status(200)
      .json({ Message: "New time slots added to calendar", updatedCalendar });
  } catch (err) {
    return res.status(500).json({ Message: "Error updating calendar", err });
  }
};

module.exports = { createCalendar, updateCalendar };
