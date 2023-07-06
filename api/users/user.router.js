const { createUser, 
        getUserByUserId, 
        getUsers, 
        updateUser, 
        deleteUser,
        login } = require("./user.controller"); 

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/", checkToken, createUser); // post is used to create a new resource
router.get("/", checkToken, getUsers); // get is used to retrieve data
router.get("/:user_id", checkToken, getUserByUserId); // :user_id is a parameter
router.patch("/", checkToken, updateUser); // patch is used to update a part of the resource
router.delete("/", checkToken, deleteUser); // delete is used to delete a resource
router.post("/login", login); // post is used to create a new resource

module.exports = router; // export router to be used in app.js
