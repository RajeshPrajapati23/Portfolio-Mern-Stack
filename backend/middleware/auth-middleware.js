const { verify, sign } = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ succ: false, msg: "Unauthorized" });
  verify(token, process.env.JWTKEY, (err, user) => {
    if (err) return res.status(403).json({ succ: false, msg: "Invalid Token" });
    res.user = user;
    next();
  });
};
