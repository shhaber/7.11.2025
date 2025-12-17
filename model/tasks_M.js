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
async function add({User_Id }) {
    let sql = `INSERT INTO tasks (UserID) VALUES (?, ?)`;
    let [result] = await db.query(sql, [Name, User_Id]);
    return result.insertId;
}

module.exports = {
    getAll,
    getOne,
    add,
};