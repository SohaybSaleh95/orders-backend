const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.header('token');
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
      if (err) {
        return res.status(401).json({ errorMessage: "invalid token" });
      }
    });

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;
