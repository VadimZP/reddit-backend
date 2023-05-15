function restrict(req, res, next) {
  // if (req.session.user) {
    next();
  // } else {
  //   res.status(401).json({ message: "Invalid user credentials" });
  // }
}

module.exports = { restrict };
