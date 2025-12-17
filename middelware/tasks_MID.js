function validValues(req, res, next) {
    console.log('BODY:', req.body); // 👈 مهم

    const { CategoryID } = req.body;
    if (!CategoryID) {
        return res.status(400).json({ message: "חסרים נתונים" });
    }
    next();
}


module.exports = {
    validValues,
}