  function isAdmin(req, res, next) {
    // Check if the user is an admin (replace this with your own authentication logic)
    const userId = req.userId;
    const userRole = req.userRole;
      
    if (!userId && !userRole || userRole === false) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    next();
  }
  module.exports = isAdmin;
