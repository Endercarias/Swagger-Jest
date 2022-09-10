const{ check} = require ("express-validator");
const validateResults = require("../utils/handleValidator")


const validatorCreateItem = [
    check('name').not().notEmpty(),
    check('album').not().notEmpty(),
    check('cover').not().notEmpty(),
    check('artist').isObject(),
    check('artist.name').not().notEmpty(),
    check('artist.nickname').not().notEmpty(),
    check('artist.nationality').not().notEmpty(),
    check('duration').isObject(),
    check('duration.start').not().notEmpty(),
    check('duration.end').not().notEmpty(),
    check('mediaId').not().notEmpty(),
    (req, res, next) =>{
      return validateResults(req, res, next)
    }
]

const validatorGetItem = [

  check('id').not().notEmpty(),
  (req, res, next) =>{
    return validateResults(req, res, next)
  }
]

module.exports = {
    validatorCreateItem, validatorGetItem
}