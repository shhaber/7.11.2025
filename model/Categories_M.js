const db = require('../config/db-config');

async function getAll(){
    let sql = `SELECT Name FROM categories`;
    let [rows] = await db.query(sql);    
    return rows;
}

async function add({Name,User_id}){
    let sql = `INSERT INTO categories (Name,User_id) VALUES (?,?)`;
    let [result] = await db.query(sql,[Name,User_id]); 
    return result.insertId;
}


module.exports ={
    getAll,
    add
}