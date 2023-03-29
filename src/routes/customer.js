const route = require("express").Router();
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customers");

route.get("/", getAllCustomers); // Get all customers

route.get("/:id", getCustomer); // Get one customer

route.post("/", createCustomer); // Create a single customer

route.put("/:id", updateCustomer); // Update a customer

route.delete("/:id", deleteCustomer); // Delete a customer

module.exports = route;
