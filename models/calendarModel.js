const mongoose = require("mongoose");

// Define the schema
const calendarSchema = new mongoose.Schema({
  expertEmail: {
    type: String,
    required: true,
  },

  timeSlots: [
    {
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      // You can add more fields related to the review here
    },
  ],
});

// Create a model
const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;
