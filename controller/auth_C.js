const { insertUser } = require('../model/users_M.js');

async function addUser(req, res) {
    try {
        let user = {
            Name: req.body.Name,
            Email: req.body.Email,
            UserName: req.body.User_Name,
            Password: req.pass
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