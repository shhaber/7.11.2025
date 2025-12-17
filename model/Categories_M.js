const db = require('../config/db-config');

async function getAll(User_Id) {
    let sql = `SELECT * FROM categories WHERE User_Id= ?`;
    let [rows] = await db.query(sql,[User_Id]);
    return rows;
}

async function add({ Name, User_Id }) {
    let sql = `INSERT INTO categories (Name, User_Id) VALUES (?, ?)`;
    let [result] = await db.query(sql, [Name, User_Id]);
    return result.insertId;
}

async function remove(catId,User_Id) {
    let sql = `DELETE FROM categories WHERE id = ? AND User_Id = ?`;
    let [result] = await db.query(sql, [catId,User_Id]);
    return result;
}

async function getOne(catId,User_Id) {
    let sql =  `SELECT * FROM categories WHERE id = ? AND User_Id= ?`
    let[result] = await db.query(sql,[catId,User_Id]);
    return result[0];
}
async function update(catId,User_Id,newName){
    let sql = `UPDATE categories SET Name= ? WHERE id = ? AND User_Id = ?`;
    let [result] = await db.query(sql,[newName,catId,User_Id]);    
    return result.affectedRows;
}

module.exports = {
    getAll,
    add,
    remove,
    getOne,
    update
};
