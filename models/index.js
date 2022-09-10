const ENGINE_DB = process.env.ENGINE_DB;

const pathModels = ENGINE_DB === 'nosql' ? './nosql': './mysql';

const models ={
    UsersMoldel: require(`${pathModels}/users`),
    TracksMoldel: require(`${pathModels}/tracks`),
    StorageMoldel: require(`${pathModels}/storage`)
};
module.exports = models;