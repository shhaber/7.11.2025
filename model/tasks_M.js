const db = require('../config/db-config');

async function getAll(UserID) {
    let sql = `SELECT * FROM tasks WHERE UserID = ?`;
    let [rows] = await db.query(sql, [UserID]);
    return rows;
}

async function getOne(taskId, UserID) {
    let sql = `SELECT * FROM tasks WHERE id = ? AND UserID = ?`;
    let [result] = await db.query(sql, [taskId, UserID]);
    return result[0];
}

async function add({ text, UserID, CategoryID }) {  // ✅ الاسم موحد
    let sql = `INSERT INTO tasks (text, UserID, CategoryID) VALUES (?,?,?)`;
    let [result] = await db.query(sql, [text, UserID, CategoryID]);
    return result.insertId;
}

async function remove(taskId, UserID) {
    let sql = `DELETE FROM tasks WHERE id = ? AND UserID = ?`;
    let [result] = await db.query(sql, [taskId, UserID]);
    return result;
}

async function update(taskId, UserID, dataToUpdate) {
    let fields = [];
    let values = [];

    for (let key in dataToUpdate) {
        fields.push(`${key} = ?`);
        values.push(dataToUpdate[key]);
    }

    if (fields.length === 0) return 0;

    let sql = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ? AND UserID = ?`;
    values.push(taskId, UserID);

    let [result] = await db.query(sql, values);
    return result.affectedRows;
}

module.exports = {
    getAll,
    getOne,
    add,
    remove,
    update
};
