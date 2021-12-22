const jwt = require("jsonwebtoken")
require("dotenv")
const auth = (req,res,next) =>{
    console.log(req.cookies);
    const token = req.cookies.token ||
                  req.body.token    || // !! THE ORDER IS IMPORTANT
                  req.header('Authorization').replace('Bearer ','') 
    if(!token){
        return res.status(400).send("token is missing")
    }
    try{
    const decode =  jwt.verify(token,process.env.SECRET_KEY)
     req.user = decode
     //!! alternate bring in some info from DB using user_id or token
    }catch(error){
        return res.status(401).send("error")
    }
    return next();
}

module.exports = auth