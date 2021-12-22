require("dotenv").config() //if .dotenv was not in home directory we have to mention the path
require("./config/database").connect()
const express = require("express")
const bcrypt = require("bcrypt")
const User = require("./model/user")
const app = express()
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const auth = require("./middleware/auth")

app.use(express.json())
app.use(cookieParser())


app.get("/",(req,res)=>{
    res.send("<h1>Helloe from auth system</h1>")
})



app.post("/register",async (req,res)=>{
    try{
        const {
            firstname,
            lastname,  
            email,
            password,
          }  = req.body;
      if(!(email && password && firstname && lastname)){
          return res.status(400)
      }
      const existingUser =  await User.findOne({email}) //unique check
      if(existingUser){
          return res.status(401)
      }
      const encrypted_password = await bcrypt.hash(password, 10)
      const user = await User.create({
          firstname,
          lastname,
          email : email.toLowerCase(),
          password : encrypted_password,
      })
      //token
      const token = jwt.sign({ user_id : user._id ,email } , process.env.SECRET_KEY , {
          expiresIn:"5h"
      })
      user.token = token;
      user.password = undefined // dont send password
      return res.status(201).json(user)  
    }
    catch(error){
        console.log("an error has occured");
    }
})


app.post("/login",async (req,res)=>{
    try{
        const {email,password} = req.body
        console.log(`${email} ${password}`);
        if(!(email && password)){
            res.status(400).send("feild is missing");
        }
       const user = await User.findOne({email});

       if(user && await bcrypt.compare(password , user.password)){
           const token = jwt.sign(
               {user_id : user._id , email},
               process.env.SECRET_KEY,
               {
                   expiresIn:"2h"
               }
           )
           user.token = token
           user.password = undefined
        //    res.status(201).json(user)

        // if we  want to use cookies
        const options ={
            expires : new Date(Date.now() + 3*24*60*60*1000),
            httpOnly : true // if set to true can be read only by backend server not any frontend part
        }
        //we are naming cookie as token , because in middleware we are expecting a token
        res.status(200).cookie('token',token,options).json({
            success:true,
            token,
            user
        })

       }
       else{
           res.status(400).send("You are not registered or wrong email/password")
       }
    }
    catch(error){
      
        console.log(error);
    }
})

app.get("/dashboard", auth , (req,res)=>{
    res.send("dashboard")
})

module.exports = app