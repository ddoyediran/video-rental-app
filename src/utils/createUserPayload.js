const createUserPayload = (customer) => {
  return {
    name: customer.name,
    customerId: customer._id,
    // role: user.role,
  };
};

module.exports = createUserPayload;
