const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');

function valuesToAdd(req,res,next){
    let {Name,Email,User_Name,Password} = req.body;
    if(!Name || !Email || !User_Name || !Password){
        return res.status(400).json({message:"חסרים נתונים"});
    }
    next();
}

function valuesToLogin(req,res,next){
    let {User_Name,Password} = req.body;
    if(!User_Name || !Password){
        return res.status(400).json({message:"חסרים נתונים"});
    }
    next();
}

async function encrypPass(req,res,next){
    try{
        const { Password } = req.body;   
        let hashPass = await bcrypt.hash(Password,10);
        req.body.Password = hashPass;
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

function isLoggedIn(req, res, next) {
    let token = req.cookies.jwt;

    // إذا مافي كوكي، حاول نجيب من الهيدر
    if (!token && req.headers.authorization) {
        const parts = req.headers.authorization.split(" ");
        if (parts.length === 2 && parts[0] === "Bearer") {
            token = parts[1];
        }
    }

    if (!token) {
        return res.status(401).json({ message: "you have to connect to the server" });
    }

    try {
        let payload = jwt.verify(token, process.env.SECRET_KEY);
        req.user = payload;  // الآن req.user موجود
        console.log("Token payload:", payload);
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}



module.exports = {
    valuesToAdd,
    encrypPass,
    valuesToLogin,
    isLoggedIn
}