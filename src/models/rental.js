const mongoose = require("mongoose");

const rentalSchema = new mongoose.Rental({
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
  },
  dateReturned: {
    type: Date,
  },
  rentalFee: {
    Type: Number,
  },
});

module.exports = mongoose.model("Rental", rentalSchema);
