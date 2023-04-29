const jwt = require("jsonwebtoken");

const verif_Token = (req, res, next) => {
  const token = req.cookies.token || "";
  
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
    
    
    req.userId = decoded.id;
    req.userRole = decoded.role
  
    next();
  });
};

module.exports = {
  verif_Token,
};
