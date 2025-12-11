const db = require('../config/db-config');

async function getAll(){
    let sql = `SELECT name FROM categories`;
    let [rows] = await db.query(sql);    
    return rows;
}
async function add({Name,userId}){
    let sql = `INSERT INTO users (Name,id) VALUES (?,?,?,?)`;
    let [result] = await db.query(sql,[Name,userId]); 
    return result.insertId;
}

module.exports ={
    getAll,
    add
}