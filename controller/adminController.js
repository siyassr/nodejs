const User = require("../models/userModels")
const Post = require("../models/postModels")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")

//admin Login

const adminLog = async(req,res)=>{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    
    if (user && user.role === 'admin'&& await bcrypt.compare(password, user.password)){
      const token = jwt.sign({ id: user._id },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1m"});
      res.cookie('token',token,{httpOnly :true})
      res.redirect('/profile');
    } else {
      res.send('Invalid credentials');
    }
}

//manage user

const adminGetUser = async(req,res)=>{
    const users = await User.find()

    res.render("",{users})
}

const adminPutUser = async(req,res)=>{
    const {username,role} = req.body;

   await User.findByIdAndUpdate(req.params.id ,{username,role})
   res.redirect("/admin")
}

const adminDeleteUser = async(req,res)=>{
    await User.findByIdAndDelete(req.params.id)
}

//manage posts

const adminPost = async(req,res)=>{
    const posts = await Post.find().populate('author')
    res.render("",{posts})
}

const adminPut = async(req,res)=>{
    const {title,content}= req.body;
    await Post.findByIdAndUpdate(req.params.id,{title,content})
    res.redirect("/profile")

}

const adminDelete = async(req,res)=>{
    await Post.findByIdAndDelete(req.params.id)
    res.redirect("/profile")
}

module.exports = {adminLog,adminGetUser,adminPutUser,adminDeleteUser,adminPost,adminPut,adminDelete}