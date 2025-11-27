const bcrypt = require('bcrypt');

function valuesToAdd(req,res,next){
    let {Name,Email,User_Name,Password} = req.body;
    if(!Name || !Email || !User_Name || !Password){
        return res.status(400).json({massege:"THere is no INFO"})
    }
    next();
}

async function encrypPass(req,res,next){
    let Password = req.body.Password;
    console.log(hashPass);
    let hashPass = await bcrypt.hash(Password,10);
    console.log(hashPass);
    req.pass = hashPass;
}

module.exports = {
    valuesToAdd,
    encrypPass
}