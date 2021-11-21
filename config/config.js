require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'postgres',
    port: 5432
  },
  "production": {
    "use_env_variable": 'postgres://fzevkucvxakcby:002e0381d436de1136008c53a44c1db701b6d5c59aec7c4484ba13890b44666a@ec2-3-216-214-4.compute-1.amazonaws.com:5432/d1bnqsmm6983ik',
    "ssl": true,
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false
      }
    }
  }
}


