const Customer = require("../models/customer");
const Joi = require("joi");
const { createUserPayload, attachCookiesToResponse } = require("../utils");

// Adding Joi schema for validating request input
const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.number().min(9).required(),
  isGold: Joi.boolean().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ng", "fr"] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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
      email: req.body.email,
      password: req.body.password,
    });

    if (validated.error) {
      return res.status(400).send(validated.error.details[0].message);
    }

    // check if customer already exist in the database
    const customerExist = await Customer.exists({
      email: req.body.email,
      //phone: req.body.phone,
    });

    if (customerExist) {
      return res.status(400).json({ message: "Customer already exists!" });
    }

    const customer = new Customer({ ...validated.value });

    const savedCustomer = await customer.save();

    res.status(201).json({
      customer: {
        name: savedCustomer.name,
        phone: savedCustomer.phone,
        email: savedCustomer.email,
        isGold: savedCustomer.isGold,
      },
    });
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

const loginCustomer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Please provide an email and password" });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await customer.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    const customerPayload = createUserPayload(customer);
    attachCookiesToResponse({ res, customer: customerPayload });

    res.status(201).json({ customer: customerPayload });
  } catch (err) {
    next(err);
  }
};

const logoutCustomer = async (req, res, next) => {
  try {
    res.cookie("token", "logout", {
      httpOnly: true,
      expires: new Date(Date.now() + 1000),
    });
    res.status(200).json({ message: "Customer logged out" });
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
  loginCustomer,
  logoutCustomer,
};
