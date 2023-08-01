const pool = require('../../config/database');


module.exports = {

    create: (data, callBack) => {

        pool.query(
            `insert into user(first_name, last_name, email, phone, password, userType, DP)
                    values(?,?,?,?,?,?,?)`,

            [
                data.first_name,
                data.last_name,
                data.email,
                data.phone,
                data.password,
                data.userType,
                data.DP

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
            `insert into posts(user_id, image_url, description, category)
                    values(?,?,?,?)`,

            [
                data.userId,
                data.image_url,
                data.description,
                data.category

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
            `select user.user_id, user.first_name, user.last_name, posts.post_id, posts.image_url, posts.description, posts.like_count from user
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


    addLike: (data, callback) => {

        pool.query(

            'update posts set like_count = like_count+1  where post_id = ?',


            [
                data.post_id,
            ],

            (err) => {
                console.log("inside7777" + err);
                if (err) {
                    callback(err);
                } else {

                    pool.query(
                        // 'insert into postlikes(post_id, likeduser_id) values (?, ?)',
                        'select like_count from posts where post_id=?',


                        [
                            data.post_id,
                            // data.user_id
                        ],

                        (err, count) => {
                            console.log("999999999999" + err);
                            if (err) {

                                callback(err);
                            } return callback(null, count);
                        });

                }
            });
    },

    removeLike: (data, callback) => {


        pool.query(

            'update posts set like_count = like_Count-1  where post_id = ?',

            [
                data.post_id,

            ],

            (err, results, fields) => {
                console.log("999999999999" + err);
                if (err) {
                    callback(err);
                } return callback(null, results);
            });


    },

    addEvent: (data, callBack) => {

        pool.query(
            `insert into events_calendar(user_id, date, notice)
                    values(?,?,?)`,

            [
                data.user_id,
                data.date,
                data.notice,

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

    getEventByUserId: (data, callBack) => {
        pool.query(
            'select user_id, date, notice from events_calendar where user_id=?',

            [
                data.user_id
            ],

            (err, events) => {
                console.log("999999999999" + err);
                if (err) {

                    callBack(err);
                } return callBack(null, events);
            });

    },
    addAdds: (data, callBack) => {

        pool.query(
            `insert into advertiesments(user_id,title,subtitle,price,category,description,image1_url,Location,contactNo,whatsappNo,cart,availability)
                    values(?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                data.user_id,
                data.title,
                data.subtitle,
                data.price,
                data.category,
                data.description,
                data.image1_url,
                data.Location,
                data.contactNo,
                data.whatsappNo,
                data.cart,
                data.availability,


            ],
            (error, results, fields) => {  // callback has three parameters
                console.log("done add table");
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getAdds: callBack => {
        pool.query(
            `select advertiesments.title,advertiesments.user_id,advertiesments.subtitle,advertiesments.price,advertiesments.category,advertiesments.description,advertiesments.image1_url,advertiesments.Location,advertiesments.contactNo,advertiesments.whatsappNo,advertiesments.cart,advertiesments.availability,user.first_name,user.last_name from user
             inner join advertiesments on user.user_id = advertiesments.user_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    rentingProfile: (data, callBack) => {

        pool.query(
            `insert into rentingService(user_id,business_name,title,description,image_url1,image_url2,image_url3,whatsapp,mobile,email,facebook,insta,location, availability, time1, time2, notAvailable_days)
             values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,

            [
                data.user_id,
                data.business_name,
                data.title,
                data.description,
                data.image_url1,
                data.image_url2,
                data.image_url3,
                data.whatsapp,
                data.mobile,
                data.email,
                data.facebook,
                data.insta,
                data.location,
                data.availability,
                data.time1,
                data.time2,
                data.notAvailable_days,


            ],
            (error, results, fields) => {  // callback has three parameters
                console.log("done add table");
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getRentByUserId: (data, callBack) => {
        pool.query(
            'select business_name,title,description,image_url1,image_url2,image_url3,whatsapp,mobile,email,facebook,insta,location, availability, time1, time2, notAvailable_days from rentingservice where user_id=?',

            [
                data.user_id
            ],

            (err, events) => {
                console.log("999999999999" + err);
                if (err) {

                    callBack(err);
                } return callBack(null, events);
            });

    },

    getAllRentPosts: callBack => {
        pool.query(
            `select rentingservice.user_id,rentingservice.title,rentingservice.business_name,rentingservice.description,rentingservice.image_url1,rentingservice.image_url2,rentingservice.image_url3,rentingservice.location,rentingservice.whatsapp,rentingservice.mobile,rentingservice.email,rentingservice.facebook,rentingservice.insta,rentingservice.location,rentingservice.availability,rentingservice.time1,rentingservice.time2,rentingservice.notAvailable_days,user.first_name,user.last_name from user
             inner join rentingservice on user.user_id = rentingservice.user_id`,
            [],
            (error, rentadds, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, rentadds);
            }
        );
    },



    getSearchAdds: (data, callBack) => {
        pool.query(
            // `select advertiesments.title,advertiesments.user_id,advertiesments.subtitle,advertiesments.price,advertiesments.category,advertiesments.description,advertiesments.image1_url,advertiesments.Location,advertiesments.contactNo,advertiesments.whatsappNo,advertiesments.cart,advertiesments.availability,user.first_name,user.last_name from user
            //  inner join advertiesments on user.user_id = advertiesments.user_id WHERE CONCAT(user.first_name, user.last_name, advertiesments.title, advertiesments.subtitle,advertiesments.category,advertiesments.description,advertiesments.Location) LIKE '%${data.search}%'`,

            `select advertiesments.title,advertiesments.user_id,advertiesments.subtitle,advertiesments.price,advertiesments.category,advertiesments.description,advertiesments.image1_url,advertiesments.Location,advertiesments.contactNo,advertiesments.whatsappNo,advertiesments.cart,advertiesments.availability,user.first_name,user.last_name from user
            inner join advertiesments on user.user_id = advertiesments.user_id 
            WHERE (CONCAT(user.first_name, user.last_name, advertiesments.title, advertiesments.subtitle,advertiesments.category,advertiesments.description,advertiesments.Location) LIKE '%${data.search}%') OR
                  (CONCAT(advertiesments.description,advertiesments.Location) LIKE '%${data.location}%') OR 
                  (CONCAT(advertiesments.subtitle,advertiesments.category,advertiesments.description) LIKE '%${data.category}%');`,


            [
                data.search,
                data.location,
                data.category
            ],

            // console.log(data.search),
            // console.log(data.location),
            // console.log(data.category),

            (err, events) => {
                console.log("999999999999" + err);
                if (err) {

                    callBack(err);
                } return callBack(null, events);
            });

    },

    getUserTypebyUserId: (data, callBack) => {
        pool.query(
            'select userType from user where user_id=?',

            [
                data.user_id
            ],

            (err, events) => {
                console.log("999999999999" + err);
                if (err) {

                    callBack(err);
                } return callBack(null, events);
            });

    },

    getSuggests: (data, callBack) => {
        pool.query(
            // `select advertiesments.title,advertiesments.user_id,advertiesments.subtitle,advertiesments.price,advertiesments.category,advertiesments.description,advertiesments.image1_url,advertiesments.Location,advertiesments.contactNo,advertiesments.whatsappNo,advertiesments.cart,advertiesments.availability,user.first_name,user.last_name from user
            //  inner join advertiesments on user.user_id = advertiesments.user_id WHERE CONCAT(user.first_name, user.last_name, advertiesments.title, advertiesments.subtitle,advertiesments.category,advertiesments.description,advertiesments.Location) LIKE '%${data.search}%'`,

            `select user.user_id, user.first_name, user.last_name, posts.post_id, posts.image_url, posts.description, posts.like_count from user
            inner join posts on user.user_id = posts.user_id 
            WHERE (CONCAT(posts.description, posts.category) LIKE '%${data.suggests}%');`,


            [
                data.suggests,

            ],



            (err, events) => {
                console.log("999999999999" + err);
                if (err) {

                    callBack(err);
                } return callBack(null, events);
            });

    },

    addUserRequests: (data, callBack) => {

        pool.query(
            `insert into customerrequests(user_id,title,description,location,category,contact1,contact2,want_date)
                    values(?,?,?,?,?,?,?,?)`,

            [
                data.user_id,
                data.title,
                data.category,
                data.description,
                data.location,
                data.contact1,
                data.contact2,
                data.want_date


            ],
            (error, results, fields) => {  // callback has three parameters
                console.log("done addUserRequests table");
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getUserRequests: callBack => {
        pool.query(
            `select customerrequests.title,customerrequests.user_id,customerrequests.category,customerrequests.description,customerrequests.location,customerrequests.contact1,customerrequests.contact2,customerrequests.want_date,user.first_name,user.last_name from user
             inner join customerrequests on user.user_id = customerrequests.user_id`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    addreview: (data, callBack) => {

        pool.query(
            `insert into reviews(reviewer_id,profile_id,review,count)
                    values(?,?,?,?)`,

            [
                data.reviewer_id,
                data.profile_id,
                data.review,
                data.count



            ],
            (error, results, fields) => {  // callback has three parameters
                console.log("done addUserRequests table");
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getReviewByProfileId: (data, callBack) => {
        pool.query(
            'select reviewer_id,review,count from reviews where profile_id=?',

            [
                data.profile_id
            ],

            (err, events) => {
                console.log("fffffffffff9" + err);
                if (err) {

                    callBack(err);
                } return callBack(null, events);
            });

    },













};