const{ check} = require ("express-validator");
const validateResults = require("../utils/handleValidator")


const validatorRegister = [

  check('name').not().notEmpty().isLength({min:3, max:99}),
  check('age').not().notEmpty().isNumeric(),
  check('password').not().notEmpty().isLength({min:3, max:15}),
  check('email').not().notEmpty().isEmail(),
  (req, res, next) =>{
    return validateResults(req, res, next)
  }
]

const validatorLogin = [


  check('password').not().notEmpty().isLength({min:3, max:15}),
  check('email').not().notEmpty().isEmail(),
  (req, res, next) =>{
    return validateResults(req, res, next)
  }
]
module.exports = {validatorRegister, validatorLogin}