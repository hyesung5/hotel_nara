const express = require('express');
const os = require('os');
const router = express.Router();
const db = require("../dbconnection");

// GET home page

router.get('/main', (req, res, next) => {
    
   res.send(os.userInfo().username);

});

router.get('/getData', (req, res) => {
    db.query("select * from `USERS`", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
            res.send(err);
        }
    })
})

router.post('/add', (req, res) => {

    let sql = 'INSERT INTO `USERS` VALUES (null, ?, ?, ?, ?, null, null, null, ?, ?, 0, now())';
    let user_id = req.body.user_id;
    let user_name = req.body.user_name;
    let password = req.body.password;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let phone_number = req.body.phone_number;

    
    let params = [user_id, password,user_name, phone_number, birthday, gender];
    db.query(sql, params,
        (err, rows, fields) => {
            res.send("success");
        })

});

module.exports= router;