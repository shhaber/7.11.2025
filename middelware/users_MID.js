function isValidID(req,res,next){
    let id= parseInt [req.params.id];
    if(isNaN(id) || id <=0){
        res.status(400).json({massege:"ID is not valid"})
    }
    req.id = id;
    next();
}

module.exports = {
    isValidID
}