const bcrypt = require('bcrypt');

function valuesToAdd(req, res, next) {
    let { Name, Email, User_Name, Password } = req.body;

    if (!Name || !Email || !User_Name || !Password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    next();
}


async function encrypPass(req, res, next) {
    try {
        let Password = req.body.Password;
        let hashPass = await bcrypt.hash(Password, 10);
        req.pass = hashPass;
        next();
    } catch (err) {
        res.status(500).json({ message: "Error encrypting password", error: err.message });
    }
}

module.exports = {
    valuesToAdd,
    encrypPass
}