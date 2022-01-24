const express = require("express");
const app = express()
const razorpay = require("razorpay")


app.get('/',(req,res)=>{
    res.send("hi");
})

app.use(express.json())

app.post("/order",async (req,res)=>{
    const amount = req.body.amount;

    var instance = new razorpay({
        key_id : 'rzp_test_NdW4GF7Ai4IN0Y',
        key_secret: 'qfx28sVDMYr0l4An0q7un35B'
        // this needs to go in .env file
    })

    var options = {
        amount : amount*100,  //amount in paise
        curreny: "INR",
        receipt: "order_rcptid_11"
    }

    const myOrder = await instance.orders.create(options)

    res.status(201).json({
        sucess:"true",
        amount,
        order:myOrder
    })
})

app.listen(4000,()=>{
    console.log("port is lisening");
})