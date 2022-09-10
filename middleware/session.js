const {handleHttpError} = require("../utils/handleError")
const {verifyToken} = require ("../utils/handleJwt")
const{UsersMoldel} = require("../models")
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()

const authMiddleware = async (req, res, next) =>{
    console.log(req.headers)
    try {

        if(!req.headers.authorization){
            handleHttpError(res, "NEED_SESSION", 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
        console.log(dataToken)
        if(!dataToken){
            handleHttpError(res, "NOT_PAYLOAD_DATA", 401);
            return
        }

        const query={
            [propertiesKey.id]:dataToken[propertiesKey.id]
        }

        const user = await UsersMoldel.findOne(query)
        req.user = user

        next()
        
    } catch (e) {
        handleHttpError(res, "NOT_SESSION", 401)
    }
}

module.exports = {authMiddleware}