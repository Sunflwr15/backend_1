function md2(req, res, next){
    console.log("Middleware 2");
    next()
}

module.exports = md2