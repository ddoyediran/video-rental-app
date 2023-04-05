const jwt = require("jsonwebtoken");

// Sign the payload and create a token
const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

// Verify if token is valid or verify the token
const isTokenValid = ({ token }) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

// Attach cookies to response
const attachCookiesToResponse = ({ res, customer }) => {
  const token = createJWT({ payload: customer });
  const oneDay = 1000 * 24 * 60 * 60;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    signed: true,
  });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
