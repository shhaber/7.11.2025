const db = require('../config/db-config');


async function getAll(User_Id) {
    let sql = `SELECT * FROM tasks WHERE UserID= ?`;
    let [rows] = await db.query(sql,[User_Id]);
    return rows;
}
async function getOne(taskId,User_Id) {
    let sql =  `SELECT * FROM tasks WHERE id = ? AND UserID= ?`
    let[result] = await db.query(sql,[taskId,User_Id]);
    return result[0];
}
async function add({ text, UserID, CategoryID }) {
    let sql = `INSERT INTO tasks (text,UserID,CategoryID) VALUES (?,?,?)`;
    let [result] = await db.query(sql, [text, UserID, CategoryID]);
    return result.insertId;
}
async function remove(taskId,User_Id) {
    let sql = `DELETE FROM tasks WHERE id = ? AND UserID = ?`;
    let [result] = await db.query(sql, [taskId,User_Id]);
    return result;
}

async function update(taskId,User_Id,newText){
    let sql = `UPDATE tasks SET text= ? WHERE id = ? AND UserID = ?`;
    let [result] = await db.query(sql,[newText,taskId,User_Id]);    
    return result.affectedRows;
}
module.exports = {
    getAll,
    getOne,
    add,
    remove,
    update
};