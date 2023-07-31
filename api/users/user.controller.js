const { create,
    getUsers,
    getUserByUserId,
    updateUser,
    deleteUser,
    getUserByUserEmail,
    createPost,
    getPosts,
    addLike,
    removeLike,
    addEvent,
    getEventByUserId,
    addAdds,
    getAdds,
    rentingProfile,
    getRentByUserId,
    getAllRentPosts,
    getSearchAdds,
    getUserTypebyUserId,
    getSuggests } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt"); // bcrypt is a library for hashing passwords
const { sign } = require("jsonwebtoken"); // jsonwebtoken is a library for generating tokens


module.exports = {

    createUser: (req, res) => {
        console.log("inside createUser");
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt); // hashSync is a function from bcrypt
        create(body, (err, results) => {
            console.log("inside create");
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserByUserId: (req, res) => {
        console.log("inside getUserByUserId");
        const user_id = req.params.user_id;
        getUserByUserId(user_id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        console.log("inside getUsers");
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        console.log("inside updateUser");
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt); // hashSync is a function from bcrypt
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                });
            }
            return res.json({
                success: 1,
                message: "updated successfully"
            });
        });
    },

    deleteUser: (req, res) => {
        console.log("inside deleteUser");
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "user deleted successfully"
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined; // remove password from the response
                const jsontoken = sign({ result: results }, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                    result: results
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        })


    },

    createUserPost: (req, res) => {

        const body = req.body;

        createPost(body, (err, results) => {
            console.log("inside create");
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getPostsNewsfeed: (req, res) => {
        console.log("inside getPosts");
        getPosts((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    addLike: (req, res) => {
        console.log("inside addLike");
        const body = req.body;


        addLike(body, (err, count) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: count
            });
        });

    },

    removeLike: (req, res) => {
        console.log("inside removeLike");
        const body = req.body;

        removeLike(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: results
            });
        });

    },

    addEvent: (req, res) => {

        const body = req.body;

        addEvent(body, (err, event) => {
            console.log("inside addevent");
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            console.log("ddddd");
            return res.status(200).json({
                success: 1,
                data: event
            });
        });
    },


    getEventByUserId: (req, res) => {
        console.log("inside addLike");
        const body = req.body;


        getEventByUserId(body, (err, events) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: events
            });
        });

    },

    addAdds: (req, res) => {

        const body = req.body;

        addAdds(body, (err, adds) => {
            console.log("inside addAdds");
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            console.log("dddddfffffff");
            return res.status(200).json({
                success: 1,
                data: adds
            });
        });
    },

    getAdds: (req, res) => {
        console.log("inside getAdds");
        getAdds((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    rentingProfile: (req, res) => {

        const body = req.body;

        rentingProfile(body, (err, adds) => {
            console.log("inside creating renting profile");
            if (err) {
                console.log('xexxxxxxxxxxxxx' + err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            console.log("dddddfffffff");
            return res.status(200).json({
                success: 1,
                data: adds
            });
        });
    },


    getRentByUserId: (req, res) => {
        console.log("inside getRent");
        const body = req.body;


        getRentByUserId(body, (err, events) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: events
            });
        });

    },

    getAllRent: (req, res) => {
        console.log("inside getRentposts");
        getAllRentPosts((err, rentadds) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: rentadds
            });
        });
    },




    getSearchAdds: (req, res) => {
        console.log("inside SearchAdds");
        const body = req.body;


        getSearchAdds(body, (err, events) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: events
            });
        });

    },

    getUserTypebyUserId: (req, res) => {
        console.log("inside getType");
        const body = req.body;


        getUserTypebyUserId(body, (err, events) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: events
            });
        });

    },


    getSuggests: (req, res) => {
        console.log("inside Suggests");
        const body = req.body;


        getSuggests(body, (err, events) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            } return res.status(200).json({
                success: 1,
                data: events
            });
        });

    },




};

