const db = require('../config/db-config');
async function getALL(){
    let sql =`SELECT id,name,email FROM users`;
    console.log(sql);
    let [rows] = await db.query(sql);
    return rows;
}
async function getOne(){
    let sql =`SELECT id,name,email FROM users WHERE id = ?`;
    console.log(sql);
    let [result] = await db.query(sql);
    return result[0];
}

async function remove(id) {
    let sql = `DELETE FROM  users WHERE id = ?`
    let [result] = await db.query(sql,[id]);
    return result.affectedRows;
}

async function update(id, user) {
   let keys =Object.keys(user);
   let values = Object.values(user);
   console.log(keys);
   let set = keys.map(k=>`${k}=?`).join(',');
   let sql = `UPDATE users SET ${set} WHERE id = ?`;
   let [result] = await db.query(sql,[...values,id]);    
    return result.affectedRows;
}

module.exports ={
    getALL,
    getOne,
    remove,
    update
}