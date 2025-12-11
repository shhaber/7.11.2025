const db = require('../config/db-config');

async function getAll() {
    let sql = `SELECT * FROM categories`;
    let [rows] = await db.query(sql);
    return rows;
}

async function add({ Name, User_Id }) {
    let sql = `INSERT INTO categories (Name, User_Id) VALUES (?, ?)`;
    let [result] = await db.query(sql, [Name, User_Id]);
    return result.insertId;
}

async function remove(id) {
    let sql = `DELETE FROM categories WHERE id = ?`;
    let [result] = await db.query(sql, [id]);
    return result;
}

module.exports = {
    getAll,
    add,
    remove
};
