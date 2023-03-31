const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  ],
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
    },
  ],
  dateOut: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  dateReturned: {
    type: Date,
    required: true,
  },
  rentalFee: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Rental", rentalSchema);
