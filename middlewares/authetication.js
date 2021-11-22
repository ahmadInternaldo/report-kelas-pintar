const { verifying } = require('../helpers/jwt');
const { User } = require('../models');

async function authentication(req, res, next) {
  try {
    let checkToken = verifying(req.headers.authorization);
    let cekDataBase = await User.findOne({
      where: {
        id: checkToken.id
      }
    });
    if (!cekDataBase) {
      next({ detailedCode: 'Invalid Authentication' });
    } else if (cekDataBase.id === checkToken.id) {
      checkToken = cekDataBase;
      req.authentication = checkToken;
      next();
    }
  } catch (error) {
    next({ detailedCode: error.message });
  }
}

module.exports = authentication;
