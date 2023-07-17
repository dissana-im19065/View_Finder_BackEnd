const pool = require('../../config/database');

module.exports = {

    create: (data, callBack) => {

        pool.query(
            `insert into user(first_name, last_name, email, phone, password)
                    values(?,?,?,?,?)`,

            [
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.password

            ],
            (error, results, fields) => {  // callback has three parameters

                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUsers: callBack => {
        pool.query(
            `select user_id, first_name, last_name, email, phone from user`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserByUserId: (user_id, callBack) => {
        pool.query(
            `select user_id, first_name, last_name, email, phone from user where user_id = ?`,
            [user_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    updateUser: (data, callBack) => {
        pool.query(
            `update user set first_name=?, last_name=?, email=?, phone=?, password=? where user_id=?`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.password,
                data.user_id
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteUser: (data, callBack) => {
        pool.query(
            `delete from user where user_id=?`,
            [data.user_id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                console.log(results.affectedRows); // Log the number of affected rows
                if (results.affectedRows === 0) { // Check if any rows were affected
                    return callBack(null, null); // Return null when no rows were deleted
                }
                console.log(results);
                return callBack(null, results);
            }
        );
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(
            `select * from user where email = ?`,
            [email],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    createPost: (data, callBack) => {

        pool.query(
            `insert into posts(user_id, image_url, description)
                    values(?,?,?)`,

            [
                data.userId,
                data.image_url,
                data.description,

            ],
            (error, results, fields) => {  // callback has three parameters
                console.log("fff");
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getPosts: callBack => {
        pool.query(
            `select user.user_id, user.first_name, user.last_name, posts.post_id, posts.image_url, posts.description from user
             inner join posts on user.user_id = posts.user_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },



};