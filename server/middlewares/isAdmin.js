const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        next();
    } else {
        res.status(403).json({ msg: "Access denied, admin only" });
    }
};

export default isAdmin;
