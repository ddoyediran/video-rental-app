const Rental = require("../models/rental");
const Movie = require("../models/movie");
const Customer = require("../models/customer");

// logic to rent a movie - Post Method
// get customer id that wants to rent the movie, if customer exist
// get the movie the customer want to rent, if movie exist and numberInStock > 1
// rent one movie to the customer and decrement numberInStock
// save the customer info, movie rent, and other rental info to Rental collection

module.exports = {};
