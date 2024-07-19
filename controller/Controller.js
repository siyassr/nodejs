const Post = require("../models/postModels")

exports.home = (req,res)=>{
    res.render("blogging")
}
exports.login = (req,res)=>{
    res.render("login")
}
exports.blogpage = async (req,res)=>{
    try {
        const posts = await Post.find()
        console.log(posts)
        res.render("post",{posts})
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.register = (req,res)=>{
    res.render("register")
}
exports.admin = async(req,res)=>{
    try {
        const posts = await Post.find()
        console.log(posts)
        res.render("adminPage",{posts})
    } catch (error) {
        res.status(500).send(error.message);
    }
}
exports.adminLogin = (req,res)=>{
    res.render("adminlogin")
}   