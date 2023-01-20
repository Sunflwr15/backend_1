const log = (req, res, next) => {
  console.log(`${Date.now()} ${req.ip} ${req.originalUrl}`);
  //   console.log("log");
  next();
};

module.exports = log;
