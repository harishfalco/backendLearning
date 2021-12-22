const express = require("express");
const format = require("date-format")
const app = express()

const PORT = process.env.PORT || 4000 

//swagger docs related
const swaggerUi = require('swagger-ui-express');
const YAML = require("yamljs")
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/",(req,res)=>{
    res.send("<h1>Helloe from auth system</h1>")
})

app.get("/api/v1/instagram",(req,res)=>{
    const instaSocial = {
        username:"harish",
        followers:100,
        follows:55,
        date:format.asString("dd:MM:yy - hh:mm:ss",new Date())
    }

    res.json({instaSocial});
})

app.get("/api/v1/facebook",(req,res)=>{
    const facebookSocial = {
        username:"harish07",
        followers:1000,
        follows:551,
        date:format.asString("dd:MM:yy - hh:mm:ss",new Date())        
    }

    res.json({facebookSocial});
})

app.get("/api/v1/linkedin",(req,res)=>{
    const linkedSocial = {
        username:"harish",
        followers:500,
        follows:135,
        date:format.asString("dd:MM:yy - hh:mm:ss",new Date())

    }
    res.json({linkedSocial});
})

app.get("/api/v1/:token",(req,res)=>{
    console.log(req.params.token);
    res.status(200).json({params:req.params.token})
})

app.listen(PORT,()=>{
    console.log("listening");
})