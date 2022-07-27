/* const { ObjectId } = require('mongodb'); */
const connection = require('./connections');
/* const er = require('../utils'); */

const findUserOne = async (email) => {
    const connect = await connection();
    const response = await connect.collection('users').findOne({ email });
    return response;
};

const insertUserOne = async (name, email, password, role) => {
    const connect = await connection();
    const { insertedId } = connect.collection('users').insertOne({ name, email, password, role });
    return insertedId;
};

module.exports = {
    findUserOne,
    insertUserOne,
};