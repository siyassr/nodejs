//IMPORT PACKAGE

const express = require("express")
const mongoose = require("mongoose")
const path =require("path")
const router = require("./routes/route")
// const postrouter = require("./routes/route")
const dotenv = require('dotenv').config();
const cookie = require('cookie-parser')


const app =  express();

//VIEW ENGINE
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookie())

mongoose.connect(process.env.CONECTION_STRING).then(() => console.log('db connected'));

app.use(router);
// app.use(postrouter);

//CREATE SERVER
const PORT = 5001;
app.listen(PORT,()=>{console.log(`server has started ${PORT}....`)})














