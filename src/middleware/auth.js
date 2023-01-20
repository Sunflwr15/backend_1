function auth(req, res, next) {
  console.log("Middleware");
  console.log("Authorization", req?.headers.authorization);
  if (req?.headers?.authorization === "123") {
    next();
  } else if (req?.headers?.authorization === undefined) {
    return res.status(201).json({
      status: "fail",
      message: "unknown token",
      token: req.headers.authorization,
    });
  } else {
    res.status(404).json({
      status: "fail",
      token: req.headers.authorization,
    });
  }
}

module.exports = auth;
