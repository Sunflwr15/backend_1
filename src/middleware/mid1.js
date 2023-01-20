function md1(req, res, next){
    console.log("Middleware 1");
    next()
}

module.exports = md1