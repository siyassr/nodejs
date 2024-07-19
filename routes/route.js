const express  = require("express")
const Controller = require("../controller/Controller");
const userController = require("../controller/userController")
const postController = require("../controller/postController")
const adminController = require("../controller/adminController")

const router = express.Router();



// pages routes
router.get("/", Controller.home)
router.get("/login",Controller.login)
router.get("/register",Controller.register)
router.get("/post",Controller.blogpage)
router.get("/profile",Controller.admin)
router.get("/admin",Controller.adminLogin)

//user Routes

router.post("/register",userController.registerUser)
router.post("/login",userController.loginUser)
router.post("/logout",userController.logOut)

//post Routes

router.post("/post",postController.createPost)
router.put("/post:id",postController.editPost)
router.delete("/post:id",postController.deletePost)
router.get("/post",postController.getAllPosts)
router.get("/post:id",postController.getPostById)

//admin LOgin  route
//router.post("/admin/login",adminController.adminLog)
router.post("/profile" , adminController.adminLog)

//admin manage user route

router.get("/admin/users",adminController.adminGetUser)
router.put("/admin/users/:id",adminController.adminPutUser)
router.delete("/admin/users/:id",adminController.adminDeleteUser)

//admin manage posts route


router.get("/admin/posts",adminController.adminPost)
router.put("/admin/posts/:id",adminController.adminPut)
router.delete("/admin/posts/:id",adminController.adminDelete)

module.exports = router                                                                      