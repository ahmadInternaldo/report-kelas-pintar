const bcryptjs = require("bcryptjs");

const hashPassword = (password) => {
  return bcryptjs.hashSync(password, 10);
};

const comparePassword = (bodyPassword, dataBasePawword) => {
  return bcryptjs.compareSync(bodyPassword, dataBasePawword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
