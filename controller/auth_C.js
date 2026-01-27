const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {addUser,getByUserName,getByEmail} = require('../model/users_M');

async function register(req,res) {
    try{
        let Name = req.body.Name;
        let Email = req.body.Email;
        let User_Name = req.body.User_Name;
        let Password = req.body.Password;

        let user = await getByUserName(User_Name);
        if(user){
            return res.status(409).json({message:"שם משתמש קיים במערכת"});
        }
        user = await getByEmail(Email);
        if(user){
            return res.status(409).json({message:"אימייל קיים במערכת"});
        }

        let userId = await addUser({Name,Email,User_Name,Password});
        if(!userId){
            return res.status(500).json({message:"Server error"});
        }
        res.status(201).json({message:"נוסף בהצלחה"});
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}

async function login(req,res,next) {
    try{
        let user = await getByUserName(req.body.User_Name);
        if(!user){
            return res.status(400).json({message:"שם משתמש או סיסמה שגויים"});
        }
        let isMatch = await bcrypt.compare(req.body.Password,user.Password);
        if(!isMatch){
            return res.status(400).json({message:"שם משתמש או סיסמה שגויים"});
        }
        req.user = user;
        next();
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server error"});
    }
}
function createJwt(req,res) {
    try{
        let user = req.user;
        let token =jwt.sign(
            {id:user.id,Name:user.Name},
            process.env.SECRET_KEY,
            {expiresIn:'3h'}
        );
        console.log(token)
        res.cookie('jwt',token,{httpOnly:true,maxAge:1000*60*60*3}).status(200).json({massege:"connected succisfully",Name:user.Name})

    }catch(err){
        console.error(err);
        res.status(500).json({massege:"Server Error"});
    }

}

module.exports ={
    register,
    login,
    createJwt
}