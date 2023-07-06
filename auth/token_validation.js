const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization"); // get token from header
        if(token){
            token = token.slice(7); // remove the Bearer from the token
            verify(token, process.env.JWT_KEY, (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    next(); // call next middleware
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    },
};