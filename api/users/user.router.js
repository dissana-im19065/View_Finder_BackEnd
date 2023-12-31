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
    addEvent,
    getEventByUserId,
    addAdds,
    getAdds,
    rentingProfile,
    getRentByUserId,
    getAllRent,
    getSearchAdds,
    getUserTypebyUserId,
    getSuggests,
    addUserRequests,
    getUserRequests,
    addreview,
    getReviewByProfileId } = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");



router.post("/events", getEventByUserId);// post is used to get events 
router.get("/post", getPostsNewsfeed); // get is used to retrieve data
router.get("/req", getUserRequests);// get is used to get all Advertiesments
router.get("/adds", getAdds);// get is used to get all User Requests
router.get("/rent", getRentByUserId);// post is used to add a new Advers 
router.get("/rents", getAllRent);// get is used to get all rent posts
router.post("/revv", getReviewByProfileId);// post is used to add a new Advers 


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
router.post("/adds", addAdds);// post is used to add a new Advers 
router.post("/rent", rentingProfile);// post is used to add a new Advers 
router.post("/searchadds", getSearchAdds);// get is used to get all Advertiesments
router.post("/suggests", getSuggests);// get is used to get all Suggests
router.post("/type", getUserTypebyUserId); // :user_id is a parameter
router.post("/req", addUserRequests);// post is used to add a new User Request 
router.post("/rev", addreview);// post is used to add a new review


module.exports = router; // export router to be used in app.js
