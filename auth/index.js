const app = require("./app")
const {PORT} = process.env // same as process.env.PORT


app.get("/",(req,res)=>{
    res.send("<h1>Helloe from auth system</h1>")
})


app.listen(PORT,()=>console.log(`server is running2`))

