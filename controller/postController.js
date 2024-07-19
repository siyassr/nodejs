// controllers/postController.js
const Post = require('../models/postModels');
const jwt = require("jsonwebtoken")


const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        // console.log(posts)
        res.render("post",{posts,user:null})
    } catch (error) {
        res.status(500).send(error.message);
    }
    
};

const createPost = async (req, res) => {
    
 
    try {
        const { title, content } = req.body;
        console.log(req.cookies);
        const user = jwt.verify(req.cookies.user_token,process.env.ACCESS_TOKEN_SECRET);
        const post = new Post({ title,content,author:user.data});
        // console.log(_id)
        await post.save();
        res.redirect('/post');
    } catch (error) {
        console.log("error", error);
        res.status(500).send(error.message);
    }
};

const editPost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const post = await Post.findById(id);
        if (!post || post.author.toString() !== req.user._id.toString()) {
            return res.status(400).send('Not authorized');
        }
        post.title = title;
        post.content = content;
        await post.save();
        res.send('Post updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (!post || post.author.toString() !== req.user._id.toString()) {
            return res.status(400).send('Not authorized');
        }
        await post.remove();
        res.send('Post deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
};



const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('author', 'username');
        if (!post) {
            return res.status(404).send('Post not found');
        }
        res.json(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {createPost,editPost,deletePost,getAllPosts,getPostById}