const db = require("../data/dbConfig.js");

module.exports = {
    get,
    getById,
    create,
    update,
    remove,
}
  
async function get() {
    console.log(await db('accounts').toString());
    return db('accounts');
}

function getById(id) {
    const post = db.first('*').from('accounts').where({ id });
    return post;
}
  
async function create(newPost) {
    const post = await db('accounts').insert(newPost);
    return post;
}

function update(id, newdata) {
    return db('accounts').update(newdata).where({ id });
}

function remove(id) {
    return db('accounts').del().where({ id });
}
    
db.on('query', (toSQLObject) => {
    console.log(toSQLObject);
});