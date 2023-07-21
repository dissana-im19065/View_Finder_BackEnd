const { createUser,
    getUserByUserId,
    getUsers,
    updateUser,
    deleteUser,
    login,
    createUserPost,
    getPostsNewsfeed,
    addLike,
    removeLike,
    addEvent } = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/post", getPostsNewsfeed); // get is used to retrieve data

router.post("/", createUser); // post is used to create a new resource
router.get("/", getUsers); // get is used to retrieve data
router.get("/:user_id", getUserByUserId); // :user_id is a parameter
router.patch("/", checkToken, updateUser); // patch is used to update a part of the resource
router.delete("/", checkToken, deleteUser); // delete is used to delete a resource
router.post("/login", login);
router.post("/post", createUserPost);// post is used to create a new resource
router.post("/like", addLike); // post is used to addLikes and store who liked
router.post("/unlike", removeLike); // post is used to removeLikes
router.post("/event", addEvent);// post is used to add a new event 


module.exports = router; // export router to be used in app.js
