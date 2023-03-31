const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  // movieRented: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Movies",
  //   },
  // ],
});

module.exports = mongoose.model("Customer", customerSchema);
