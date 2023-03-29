const route = require("express").Router();
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
} = require("../controllers/customers");

route.get("/", getAllCustomers);

route.get("/:id", getCustomer);

route.post("/", createCustomer);

module.exports = route;
