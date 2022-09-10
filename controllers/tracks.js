const {matchedData} = require ("express-validator");
const  {TracksMoldel} = require("../models");
const handleHttpError = require("../utils/handleError");

/**
 * Obtener lista de la base de datos!
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const user=req.user;
        const data = await TracksMoldel.findAllData({});
        res.send({data, user});
    }catch(e){
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
};
/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await TracksMoldel.findOneData(id);
        res.send({data});
    }catch(e){
        handleHttpError(res,"ERROR_GET_ITEM")
    }
};


/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try{
        const bodyClear = matchedData(req,{locations: ['body']});


        const data = await TracksMoldel.create(bodyClear);
        res.send({data,bodyClear});
    }catch(e){
        handleHttpError(res, 'ERROR_CREATE_ITEMS');
    }


};


/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
    try{
        const {id, ...bodyClear} = matchedData(req,{locations: ['body']});
        const data = await TracksMoldel.findByIdAndUpdate(
            id, bodyClear
        );
        res.send({data,bodyClear});
    }catch(e){
        handleHttpError(res, 'ERROR_UPDATE_ITEMS');
    }
};


/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        req = matchedData(req);
        const {id} = req;
        const data = await TracksMoldel.delete({_id:id});
        res.send({data});
    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR_DELETE_ITEM")
    }
};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem};