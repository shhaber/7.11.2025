const { insertUser } = require('../model/users_M.js');

async function addUser(req, res) {
    try {
        let user = {
            name: req.body.Name,
            email: req.body.Email,
            userName: req.body.User_Name,
            password: req.pass
        };

        let affectedRows = await insertUser(user);

        res.status(201).json({ message: "User added successfully!", affectedRows });
    } catch (err) {
        res.status(500).json({ message: "err", error: err.message });
    }
}


module.exports={
    addUser

}