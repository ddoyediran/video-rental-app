const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  isGold: {
    type: Boolean,
    required: true,
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  // movieRented: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Movies",
  //   },
  // ],
});

CustomerSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Customer", CustomerSchema);
