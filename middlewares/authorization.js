const { Task } = require("../models");

async function authorization(req, res, next) {
  try {
    let checkAuthen = await Task.findByPk(+req.params.id);
    if (req.authentication.id === checkAuthen.UserId) next();
    else res.status(401).json("Invalid Authorization");
  } catch (error) {
    next({
      detailedCode: error.message,
    });
  }
}

module.exports = authorization;
