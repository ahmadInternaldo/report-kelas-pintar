const  {User}  = require('../models');
const { signin } = require('../helpers/jwt');
const { comparePassword } = require('../helpers/bcrypt');

class Controller {
  static async login(req, res, next) {
    try {
      const { role ,name, password } = req.body;
      // let checkLogin = await User.findAll();
      let checkLogin = await User.findOne({
        where: {
					role,
          name
        }
      });
      if (!checkLogin) {
        next({ detailedCode: 'Email/Password Wrong!' });
      } else {
        if (comparePassword(password, checkLogin.hash)) {
					checkLogin.jwt = signin({id: checkLogin.id})

          res.status(200).json({
            message: 'success',
            access_token: checkLogin.jwt
          });
        } else {
          next({ detailedCode: 'Email/Password Wrong!' });
        }
      }
    } catch (error) {
      next({ detailedCode: error.message });
    }
  }
}

module.exports = Controller;
