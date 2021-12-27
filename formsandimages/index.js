const express = require("express")
const app = express()
const fileupload = require("express-fileupload")
const cloudinary = require("cloudinary")
const { debugLog } = require("express-fileupload/lib/utilities")

cloudinary.config({
    // cloud_name:process.env.CLOUD_NAME 
    cloud_name:"dm3zmpb5b",
    api_key:"348828475615133",
    api_secret:"YIUSWSeyUxd7v3HHYkt-23OmvHE"
})

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
app.get("/mygetform",(req,res)=>{
    res.render('./getform.ejs')
})


app.get("/mypostform",(req,res)=>{
    console.log("came in");
    res.render('./postform.ejs')
})

app.get("/myget",(req,res)=>{
    console.log(req.body);
    res.send(req.body)
})

app.post("/mypost",async (req,res)=>{
    // console.log(req.files);
    
    let result;
    let imgArray = []
    // !! MULTIPLE IMAGE USE CASE
    if(req.files){
        for (let index = 0; index <req.files.samplefile.length; index++) {
           let result = await cloudinary.v2.uploader.upload(req.files.samplefile[index].tempFilePath,{
                folder:"USERS"
            })

            imgArray.push({
                public_id : result.public_id,
                secure_url : result.secure_url
            })
        }
    }



    // !! SINGLE IMAGE USE CASE
    // let file = req.files.samplefile
    // result = await cloudinary.v2.uploader.upload(file.tempFilePath,{
    //     folder:'USERS'
    // })
  
   const details={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        result,
        imgArray
    }
    console.log(result);
    console.log(details);
    res.send(details)
})

app.listen(5000,()=>{
    console.log("port connected");
})