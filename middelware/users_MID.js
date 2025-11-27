function isValidID(req,res,next){
    let id= parseInt [req.params.id];
    if(isNaN(id) || id <=0){
        res.status(400).json({massege:"ID is not valid"})
    }
    req.id = id;
    next();
}

function valuesToEdit(req,res,next){
    let obj = {};
    if(req.body.Name){
        obj.name = req.body.Name;
    }
     if(req.body.Email){
        obj.email = req.body.Email;
    }
     if(req.body.User_Name){
        obj.userName = req.body.User_Name;
    }
    let keys = Object.keys(obj);
    if(keys.length === 0){
        return res.status(400).json({massege:"No req"});
    }
    req.user = obj;
    next()
}

module.exports = {
    isValidID,
    valuesToEdit
}