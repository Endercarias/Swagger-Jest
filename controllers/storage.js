const fs = require("fs");
const { matchedData } = require("express-validator");
const  {StorageMoldel} = require("../models");
const tracks = require("../models/nosql/tracks");
const {handleHttpError} = require("../utils/handleError");
const path = require('path')
const PUBLIC_URL = process.env.PUBLIC_URL;

/**
 * Obtener lista de la base de datos!
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try{
        const data = await StorageMoldel.find({});
        res.send({data});
    }catch{
        handleHttpError(res,"ERROR_LIST_ITEMS")
    }
};


/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try{
        const {id} = matchedData(req)
        const data = await StorageMoldel.findById(id);
        res.send({data});
    }catch{
        handleHttpError(res,"ERROR_DETAIL_ITEMS")
    }
};


/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {

try{
    const {file} = req
    const fileData = new StorageMoldel({
        url: `${process.env.PUBLIC_URL}/${file.filename}`,
        filename: file.filename,
    })
    const data = await fileData.save()
    res.send({data})
}catch (e){
    handleHttpError(res,e.message)
}

   
};

/**
 * Eliminar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try{
        const {id} = matchedData(req, {locations:['params']})

        const dataFile = await StorageMoldel.findById(id);
        if(dataFile) {
            await StorageMoldel.findByIdAndDelete(id)
            const {filename} = dataFile;
            const filePath = path.join(__dirname, '../storage',filename)
    
            fs.unlinkSync(filePath)

        }else {
            res.send({message:'Archivo Eliminado'})
        }
        const data = {
            filePath, 
            deleted:1
        }

        res.send({data});
    }catch(e){
        handleHttpError(res,e.message);
    }
};

module.exports = {getItems, getItem, createItem, deleteItem};