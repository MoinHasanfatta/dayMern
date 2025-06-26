const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3002
const MONGOURL = process.env.MONGO
const cors = require('cors')
app.use(express.json())
app.use(cors())


mongoose.connect(MONGOURL)
    .then(()=> console.log("Connected successfully"))
    .catch((err)=> console.error("The problem is", err))

// Product Schema
const Product = mongoose.model("Product",{
    name : String,
    price :
    { type :Number, required :true},
    description : String,
    image : String
})

app.post("/products", async (req,res)=>{
    const product = new Product(req.body)
    await product.save()
    res.json(product)
})

app.get("/",(req,res)=>{
    res.send("My Shopping Cart")
})

app.get("/products",async (req,res)=>{
    const product = await Product.find()
    res.json(product)
})

app.put("/products/:id", async (req,res)=>{
    const {id} = req.params
    const updatedProduct =await Product.findByIdAndUpdate(id,req.body,{new : true})
    res.json(updatedProduct)
})

app.delete("/products/:id", async (req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.json({message : "Product deleted"})
})

app.listen(PORT,()=>{
    console.log("Hello World")
})