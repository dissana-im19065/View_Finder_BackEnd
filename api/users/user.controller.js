const { create, 
        getUsers, 
        getUserByUserId, 
        updateUser, 
        deleteUser,
        getUserByUserEmail } = require("./user.service");

const {genSaltSync, hashSync, compareSync} = require("bcrypt"); // bcrypt is a library for hashing passwords
const { sign } = require("jsonwebtoken"); // jsonwebtoken is a library for generating tokens


module.exports = {
    createUser: (req, res) => {
        console.log("inside createUser");
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt); // hashSync is a function from bcrypt
        create(body, (err, results) => {
            console.log("inside create");
            if(err){
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
            if(err){
                console.log(err);
                return;
            }
            if(!results){
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
            if(err){
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
            if(err){
                console.log(err);
                return;
            }
            if(!results){
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
            if(err){
                console.log(err);
                return;
            }
            if(!results){
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
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined; // remove password from the response
                const jsontoken = sign({result: results}, process.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }
        })

 
    },

    
};
