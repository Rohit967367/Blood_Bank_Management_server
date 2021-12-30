const jwt = require("jsonwebtoken");

function varify (req, res, next){
const tokenInHeader = req.header.token;
if(tokenInHeader){
    const token = tokenInHeader.split(" ") [1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user)=> {
        // jwt.verify(token, process.env.SECRET_KEY, (err, users)=> {
        if(err) res.status(403).json("Token is not vaild")
        res.user = user
        
        // res.user = users
        // res.user = users
        next();
    })
} else{
    return res.status(401).json("You are not authenticated");
}
}
module.exports = varify;