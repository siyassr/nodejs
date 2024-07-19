// const express = require("express")
// const router = express.Router()
const User = require("../models/userModels")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

//Register 

const registerUser = async(req,res)=>{
    const {username,password}  = req.body;
    try{
        const hashedPass = await bcrypt.hash(password,10);
        console.log("hashed password:" ,hashedPass);
        const user = new User({username,password: hashedPass})
        await user.save();
        res.redirect("/login")
    }catch(err){
        res.send(500).send(err.message)
    }
    }

  

// const loginUser = async(req,res)=>{
//     const{username,password} = req.body;
//     const user = await User.findOne({username});
//     console.log(user);

//     if(user && await bcrypt.compare(password,user.password) ){  
//        const token = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1m"});
//        res.status(200).json({token})
//        return res.redirect("/blogPage");
//     }else{
//         res.send("invalid")
//     }
// }

const loginUser = async (req, res) => {
    // console.log('Hellllo');
    const { username, password } = req.body;
    // console.log(username , password);
    const user = await User.findOne({ username:username });
    // console.log(user);

    //console.log('USER............', user);

     if (user && await bcrypt.compare(password, user.password)) {  
       const token = jwt.sign({ data: user.username }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"5d"});

        // console.log('TOKEN............', token);

        res.cookie('user_token', token, { httpOnly: true });
        res.redirect("/post");
    } else {
        res.status(401).send("invalid");
    }
    
}


const logOut = async(req,res)=>{
    req.session.destroy();
    res.clearCookie('token').redirect('/login');
}

module.exports = {registerUser,loginUser,logOut}