const Customer = require("../models/customer");
const Joi = require("joi");

// Adding Joi schema for validating request input
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.number().min(9).required(),
  isGold: Joi.boolean().required(),
});

/**
 * Helper method to validate client input
 * @param {params} inputObj
 * @returns {object}
 */
function validate(inputObj) {
  const value = schema.validate(inputObj);
  return value;
}

// Get all customers
const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({}).sort("name");
    res.status(200).json({ customers });
  } catch (err) {
    next(err);
  }
};

// Get single customer
const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(200).json({ customer });
  } catch (err) {
    next(err);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const validated = validate({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });

    if (validated.error) {
      return res.status(400).send(validated.error.details[0].message);
    }

    // check if customer already exist in the database
    const customerExist = await Customer.exists({
      name: req.body.name,
      phone: req.body.phone,
    });

    if (customerExist) {
      return res.status(400).json({ message: "Customer already exists!" });
    }

    const customer = new Customer({ ...validated.value });

    const savedCustomer = await customer.save();

    res.status(201).json({ customer: savedCustomer });
  } catch (err) {
    next(err);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const validated = validate({
      name: req.body.name,
      phone: req.body.phone,
      isGold: req.body.isGold,
    });

    if (validated.error) {
      return res.status(400).send(validated.error.details[0].message);
    }

    const update = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      { ...update },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(201).json({ customer: updatedCustomer });
  } catch (err) {
    next(err);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const deletedCustomer = await Customer.findByIdAndRemove(req.params.id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
