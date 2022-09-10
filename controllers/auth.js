const {matchedData} =  require("express-validator")
const {encrypt, compare} = require("../utils/handlePassword")
const {tokenSign} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError")
const {UsersMoldel} = require("../models")

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerCtrl = async (req, res)=>{
    try {
        req = matchedData(req);
    const dataFint = await UsersMoldel.findOne({email:req.email})
    console.log(dataFint)
    if(dataFint) {
        return res.status(401).json({message: 'Correo existente'})
    }else {
        const password = await encrypt(req.password);
        const body = {...req, password};
        const dataUser = await UsersMoldel.create(body);
        dataUser.set('password', undefined, {strict: false});
       
        const data ={
            token:await tokenSign(dataUser),
            user:dataUser
        }
       res.status(201)
        res.send({data});
    }
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER_USER")
    }
}

const loginCtrl = async (req, res)=>{
    try {
        req=matchedData(req);
        const user = await UsersMoldel.findOne({email:req.email})

        if(!user){
            handleHttpError(res, "USER_NOT_EXISTS", 404)
            return
        }
        
        console.log(user)

        const hashPassword = user.password;

        const check = await compare(req.password, hashPassword)

        if(!check){
            handleHttpError(res, "PASSWORD_INVALID", 401)
            return
        }

        user.set('password', undefined, {strict:false})
        const data ={
            token: await tokenSign(user),
            user
        }

        res.send({data})

    } catch (e) {
        console.log(e)
        handleHttpError(res, e.message,"ERROR_LOGIN_USER")
    }
}
module.exports ={registerCtrl, loginCtrl}