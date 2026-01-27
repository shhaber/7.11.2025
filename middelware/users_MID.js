function isValidID(req, res, next){
    let id = parseInt(req.params.id, 10);
    if(isNaN(id) || id <= 0){
        return res.status(400).json({ message: "ID is not valid" });
    }
    req.id = id;
    next();
}

function valuesToEdit(req, res, next){
    let obj = {};

    if(req.body.Name) obj.Name = req.body.Name;
    if(req.body.Email) obj.Email = req.body.Email;
    if(req.body.username) obj.username = req.body.username;

    if(Object.keys(obj).length === 0){
        return res.status(400).json({ message: "No fields to edit" });
    }

    req.user = obj;
    next();
}

module.exports = { isValidID, valuesToEdit };
