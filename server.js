const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();
const server = express();
const port = 8080 ;

server.use(cors());
server.use(bodyParser.json());
connectDb().catch(err => console.log(err));

async function connectDb() {
    await mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://0000:27017/logintushar", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(res=>{
        console.log("db connected");
    }).catch(err=>{
        console.log("error")
    })
}


const signUpSchema = new mongoose.Schema({
    userName: String,
    password : String 
})
const userSignUpDetail = mongoose.model('userSignUpDetail', signUpSchema);

server.get("/",(req,res)=>{
    res.json("Hi this is tuhsar's server")
})

server.post("/postdata",async(req,res)=>{
    let data = new userSignUpDetail();
    console.log(req.body)
    data.userName = req.body.username ;
    data.password = req.body.password ;
    await data.save().then(result=>{
        res.json("success");
    }).catch(err=>{
        res.json("error");
    })
})

server.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
})