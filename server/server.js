// const express = require('express');
// const path = require('path');
// const router = require("./routes/router");
// const morgan = require('morgan');


// const app = express();
// const PORT = process.env.PORT || 4000;

// // yarn dev 처리
// app.use(morgan('combined'));

// app.use(express.static(path.join(__dirname, '...', 'public/')));

// app.use("/", router);

// app.listen(PORT, () => {
//     console.log(`Check out app at http://localhost:${PORT}`)
// });

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app= express();
const port = process.env.PORT || 4000;
const os = require('os');
const multiparty= require('connect-multiparty');
const MultipartyMiddleware = multiparty({uploadDir:'./EditorUpload'});

const MultipartyMiddleware2 = multiparty({uploadDir:'./img'});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./server/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({

    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

//  db연결
connection.connect();

const multer = require('multer');
const moment =  require('moment');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './img');  // 파일이 저장되는 경로입니다.
    },
    filename: function(req, file, cb) {
      cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname);  // 저장되는 파일명
    }
  });

  

  const storage_editor = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../src/EditorUpload');  // 파일이 저장되는 경로입니다.
    },
    filename: function(req, file, cb) {
      cb(null, moment().format('YYYYMMDDHHmmss') + "_" + file.originalname);  // 저장되는 파일명
    }
  });
  

// const upload = multer({dest: './upload'});
const upload = multer({storage: storage});
// const edtirorUpload = multer({storage: storage_editor});



//메인 페이지 사진 출력
app.get('/main', (req, res, next) => {
    
    // connection.query("SELECT THUMBNAIL as src, FLOOR(1 + (RAND() * 2)) as width , FLOOR(1 + (RAND() * 2)) as height  FROM HOTELS", (err, rows) => {
    //     if(!err) {
    //         res.send(rows);
    //     } else {
    //         console.log(`query err: ${err}`);
    //     }
    // })

        
    connection.query("SELECT * FROM HOTELS as A join (SELECT  HOTEL_ID, GROUP_CONCAT(IMAGE_FILES SEPARATOR ',') AS result FROM management.ROOMS GROUP BY HOTEL_ID) B where  A.id =B.HOTEL_ID AND A.DELETE='N'", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
 
 });
 

//  app.get('/getData', (req, res) => {
//      connection.query("select * from `USERS`", (err, rows) => {
//          if(!err) {
//              res.send(rows);
//          } else {
//              console.log(`query err: ${err}`);
//          }
//      })
//  })
 
 //회원가입처리
 app.post('/add', (req, res) => {
 
     let sql = 'INSERT INTO `USERS` VALUES (null , ?, ?, ?, ?, ?, ?, ?, ?, ?, now(),?,?,?)';
     let user_id = req.body.user_id;
     let user_name = req.body.user_name;
     let password = req.body.password;
     let year = req.body.year;
     let month = req.body.month;
     let day = req.body.day;
     let gender = req.body.gender;
     let phone_number = req.body.phone_number;
     let user_kinds= req.body.user_kinds;
     let zipcode = req.body.zipcode;
     let address1 = req.body.address1;
     let address2 = req.body.address2;
 
     
     let params = [user_id, password, user_name, year, month, day, phone_number, gender, user_kinds, zipcode, address1, address2];
     connection.query(sql, params,
         (err, rows, fields) => {
             if(err){
                console.log("err :", err);
             }
             
             res.send("1");
         })
 
 });

//회원가입시 아이디 중복 검사
app.post('/check_id', (req, res) => {
 
     let sql = 'SELECT count(USER_ID) as count FROM `USERS` WHERE USER_ID = ?';
     let user_id = req.body.user_id;
     let ret= [];
     connection.query(sql, user_id,
         (err, results, fields) => {
        if (err){
       console.log(err);
        }else {
        ret = JSON.stringify(results[0].count);
        res.send(ret);
    }
})

 });

//로그인시 아이디 검사
 app.post('/login_id_chk', (req, res) => {
 
    let sql = 'SELECT count(id) as count FROM `USERS` WHERE USER_ID = ?';
    let user_id = req.body.user_id;
    let ret= [];

    connection.query(sql, user_id,
        (err, results, fields) => {
       if (err){
      console.log(err);
       }else {
       ret = results[0];
       res.send(ret);
   }
});
});

//로그인 처리
 app.post('/login', (req, res) => {
 
    let sql = 'SELECT count(id) as count, COUNT(PASSWORD) as p_count, USER_ID, USER_KINDS FROM `USERS` WHERE USER_ID = ? AND PASSWORD=? GROUP BY id';
    let user_id = req.body.user_id;
    let password = req.body.password;
    let ret= [];
    let params = [user_id, password];


    connection.query(sql, params,
        (err, results, fields) => {
       if (err){
      console.log(err);
       }else {
    //    ret = JSON.stringify(results[0]);
      ret = JSON.stringify(results[0]);
       res.send(ret);
   }
});



});
//회원 정보출력
app.post('/proflie', (req, res) => {
 


    let sql = 'SELECT USER_ID, NAME, YEAR, MONTH, DAY, PHONE, GENDER, USER_KINDS, ZIPCODE, ADDRESS1, ADDRESS2 FROM `USERS` WHERE USER_ID = ? order by id desc';
    let user_id = req.body.user_id;
    let ret= [];

    connection.query(sql, user_id,
        (err, results, fields) => {
       if (err){
      console.log(err);
       }else {
       ret = results[0];
       res.send(ret);
   }
})
});

//관리자 회원 정보 수정
app.post('/customermodify', (req, res) => {
 
    let sql = 'UPDATE `USERS` SET `NAME`=?, `GENDER`=?, `YEAR` = ? , `MONTH` = ?, `DAY` = ?, `PHONE`= ?,`ZIPCODE`=?, `ADDRESS1`=?, `ADDRESS2`=?, `USER_KINDS`=?  WHERE (`USER_ID` = ? );';
  
    let name= req.body.name;
    let user_id= req.body.user_id;
    let gender = req.body.gender;
    let year = req.body.year;
    let month = req.body.month;
    let day = req.body.day;
    let phone = req.body.phone;
    let zipcode = req.body.zipcode;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let user_kinds= req.body.user_kinds;

    let params = [name, gender, year, month, day, phone, zipcode, address1, address2, user_kinds, user_id];


    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        }
   
)

});


//관리자 회원 정보 수정
app.post('/passwordmodify', (req, res) => {
 
    let sql = 'UPDATE `USERS` SET `PASSWORD`=?  WHERE (`USER_ID` = ? );';
  
    let new_password= req.body.new_password;
    let user_id= req.body.user_id;

    let params = [new_password, user_id];


    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        }
   
)

});


//회원 정보 수정
app.post('/modified', (req, res) => {
 
    let sql = 'UPDATE `USERS` SET `GENDER`=?, `YEAR` = ? , `MONTH` = ?, `DAY` = ?, `PHONE`= ?,`ZIPCODE`=?, `ADDRESS1`=?, `ADDRESS2`=?  WHERE (`USER_ID` = ? );';
  
    let user_id= req.body.user_id;
    let gender = req.body.gender;
    let year = req.body.year;
    let month = req.body.month;
    let day = req.body.day;
    let phone = req.body.phone;
    let zipcode = req.body.zipcode;
    let address1 = req.body.address1;
    let address2 = req.body.address2;

    let params = [gender, year, month, day, phone, zipcode, address1, address2, user_id];


    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        }
   
)

});

//관리자 호텔 목록 출력

app.post('/getHotellist/admin', (req, res) => {
    let sql ="select HOTEL_NAME, HOTEL_INFO, id as ID from `HOTELS` as a WHERE a.DELETE='N' AND a.ACCOMMODATION_TYPE=? order by id desc"
    let type= req.body.type;
    let params = [ type]
    connection.query(sql, params, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

app.post('/getHotellist', (req, res) => {
    let sql ="select HOTEL_NAME, HOTEL_INFO, id as ID from `HOTELS` as a WHERE a.DELETE='N' AND a.REGISTER=? AND a.ACCOMMODATION_TYPE=? order by id desc"
    let register= req.body.register;
    let type= req.body.type;
    let params = [register, type]

    connection.query(sql, params, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

//관리자 호텔 등록
app.post('/hotel_reg', upload.array('images'), (req, res) => {
    let sql = "INSERT INTO `HOTELS` VALUES (null , ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, now(),?,?,?,?,'N')";
    
   let hotelName = req.body.hotelName;
   let hotelInfo = req.body.hotelInfo;
   let zonecode = req.body.zonecode;
   let addRess = req.body.addRess;
   let addRess2 = req.body.addRess2;
   let spa = req.body.spa;
   let restaurant = req.body.restaurant;
   let banquethall = req.body.banquethall;
   let parkinglot = req.body.parkinglot;
   let buffet = req.body.buffet;
   let desk = req.body.desk;
   let bar = req.body.bar;
   let Luggage = req.body.Luggage;
   let fitness = req.body.fitness;
   let sauna = req.body.sauna;
   let wifi = req.body.wifi;
   let CoffeeShop = req.body.CoffeeShop;
   let Paidlaundry = req.body.Paidlaundry;
   let Smokingarea = req.body.Smokingarea;
   let Amenities = req.body.Amenities;
   let business = req.body.business;
   let Breakfast = req.body.Breakfast;
   let accommodation_type= req.body.accommodation_type;
   let location = req.body.location;
    let register= req.body.register;
    let thumbnail = "http://localhost:4000/image/"+req.files[0].filename

    let params = [hotelName, hotelInfo, zonecode, addRess, addRess2, spa, restaurant, banquethall, parkinglot, buffet, desk, bar, Luggage, fitness, sauna, wifi, CoffeeShop, Paidlaundry, Smokingarea, Amenities, business, Breakfast, location, accommodation_type, register, thumbnail];
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        })

});

//관리자 호텔 정보 출력
app.post('/viewHotel', (req, res) => {
    let sql ='SELECT * FROM `HOTELS` WHERE HOTEL_NAME=?';
    let hotelName=req.body.hotelName;
    let ret= [];

    console.log("sql :", sql);
    console.log("hotelName :", hotelName);
    connection.query(sql, hotelName,
        (err, results, fields) =>{ 
           
            if (err){
                console.log(err);
                 }else {
                 ret = results[0];
                 res.send(ret);
             }
           

        })

});

//관리자 호텔정보 수정
app.post('/HotelMod', upload.single('images'), (req, res) => {
 
    let sql = 'UPDATE `HOTELS` SET `HOTEL_NAME`=?, `HOTEL_INFO` = ? , `ZIPCODE` = ?, `ADDRESS1` = ?, `ADDRESS2`= ?,`SPA`=?, `RESTARUANT`=? ,`BANQUETHALL`=?,`PARKING_LOT`=?,`BUFFET`=?,`DESK`=?,`BAR`=?,`LUGGAGE`=?,`FITNESS`=?,`SAUNA`=?,`WIFI`=?,`COFFEESHOP`=?,`PAIDLAUNDRY`=?,`SMOKINGAREA`=?,`AMENITIES`=?,`BUSINESS`=?,`BREAKFAST`=?, `THUMBNAIL`=? WHERE (`id` = ? );';
  
    let hotelname = req.body.hotelname;
    let hotelinfo = req.body.hotelinfo;
    let zipcode = req.body.zipcode;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let spa = req.body.spa;
    let restaurant = req.body.restaurant;
    let banquethall = req.body.banquethall;
    let parkinglot = req.body.parkinglot;
    let buffet = req.body.buffet;
    let desk = req.body.desk;
    let bar = req.body.bar;
    let luggage = req.body.luggage;
    let fitness = req.body.fitness;
    let sauna = req.body.sauna;
    let wifi = req.body.wifi;
    let coffeeshop = req.body.coffeeshop;
    let paidlaundry = req.body.paidlaundry;
    let smokingarea = req.body.smokingarea;
    let amenities = req.body.amenities;
    let business = req.body.business;
    let breakfast = req.body.breakfast;
    let hotel_id= req.body.hotel_id;
    let filechk = req.body.filechk;
    let origonal_thumbnail = req.body.origonal_thumbnail;
    let thumbnail = "";
    
  
     if(filechk === "false"){
         thumbnail = origonal_thumbnail;

     }else if(filechk === "true"){ 
         thumbnail="http://localhost:4000/image/"+req.file.filename
     }

    
    let params = [hotelname, hotelinfo, zipcode, address1, address2, spa, restaurant,banquethall, parkinglot,buffet,desk,bar,luggage,fitness,sauna,wifi,coffeeshop,paidlaundry,smokingarea,amenities,business,breakfast,thumbnail, hotel_id];

    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        }
   
    )

});

//관리자 호텔 삭제
app.post('/HotelDelete',  (req, res) => {
 
    let sql = "UPDATE `HOTELS` SET `DELETE`='Y' WHERE (`id` = ? )";
  
    let hotel_id= req.body.hotel_id;

    let params = [hotel_id];

    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        }
   
    )

});

app.post('/uploads', MultipartyMiddleware, (req, res) => {
    console.log(req.files.upload);
    
});

app.use('/image',express.static('./img'));

//관리자 방등록
app.post('/roomregist', upload.array('images'), (req, res) => {
    
    let sql = "INSERT INTO `ROOMS` VALUES (null,?,?,?,?,?,?,?,?,?,now(),?,?,?,?,'N')";
    let room_name=req.body.room_name;
    let hotel_name=req.body.hotel_name;
    let room_info=req.body.room_info;
    let reservation_notice=req.body.reservation_notice;
    let cancellation_notice=req.body.cancellation_notice;
    let check_in=req.body.check_in;
    let check_out=req.body.check_out;
    let price =req.body.price;
    let hotel_id= req.body.hotel_id;
    let hotel_location= req.body.hotel_location;
    let register= req.body.register;
    let hotel_accommodation_type= req.body.hotel_accommodation_type;
    let fileNa =[];
    for(let i=0; i< req.files.length; i++){
        
       fileNa.push("http://localhost:4000/image/"+req.files[i].filename);
    }
    let files = fileNa.toString();

    let params = [room_name, hotel_name, room_info, reservation_notice, cancellation_notice, check_in, check_out, price, files,hotel_id, hotel_location, hotel_accommodation_type, register];
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        })

});


//관리자 호텍목록(방목록)
app.post('/hotelNameList/admin', (req, res)=> {
    let sql="select HOTEL_NAME, id, LOCATION, ACCOMMODATION_TYPE  from `HOTELS` as a WHERE a.DELETE='N' AND a.ACCOMMODATION_TYPE=? order by id desc";
    let type = req.body.type;
    let params= [type];
    connection.query(sql,params, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});
//관리자 방목록
app.post('/hotelRoomlist/admin', (req, res)=> {

    let sql="select ID, ROOM_NAME, HOTEL_NAME, HOTEL_ID from `ROOMS` as a WHERE a.DELETE='N' AND a.ACCOMMODATION_TYPE=? order by id desc";
    let type = req.body.type;
    let params= [type];
    connection.query(sql,params, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

//사업자 호텍목록(방목록)
app.post('/hotelNameList', (req, res)=> {
    let sql="select HOTEL_NAME, id, LOCATION, ACCOMMODATION_TYPE  from `HOTELS` as a WHERE a.DELETE='N' AND a.REGISTER =? AND a.ACCOMMODATION_TYPE=? order by id desc";
    let register= req.body.register;
    let type = req.body.type;
    let params= [register, type];
    connection.query(sql, params, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

//사업자 방목록
app.post('/hotelRoomlist', (req, res)=> {

    let sql="select ID, ROOM_NAME, HOTEL_NAME, HOTEL_ID from `ROOMS` as a WHERE a.DELETE='N' AND a.REGISTER =? AND a.ACCOMMODATION_TYPE=? order by id desc";
    let register= req.body.register;
    let type = req.body.type;
    let params= [register, type];
    connection.query(sql,params, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

//관리자 방정보
app.post('/hotelRoomInfo', (req, res) => {
    let sql = "SELECT * FROM `ROOMS` WHERE ID=?";
    let id=req.body.id;
    let ret= [];
    
    connection.query(sql, id,
        (err, results, fields) => {

       if (err){
      console.log(err);
       }else {
     
  
       ret = results[0];
       res.send(ret);
    
   }
})
});

//관리자 방정보 수정
app.post('/roomInfomody',upload.array('images'), (req, res) => {
 
    let sql = 'UPDATE `ROOMS` SET ROOM_NAME=?, ROOM_INFO=?, RESERVATION_NOTICE= ?, CANCELLATION_POLICY= ?,CHECK_IN=?, CHECK_OUT=? ,PRICE=?,IMAGE_FILES=? WHERE ID= ?';
    let room_name=req.body.room_name;
    let room_info=req.body.room_info;
    let reservation_notice=req.body.reservation_notice;
    let cancellation_notice=req.body.cancellation_notice;
    let check_in=req.body.check_in;
    let check_out=req.body.check_out;
    let price =req.body.price;
    let room_id= req.body.room_id;
    let info_img=[req.body.info_img];

  
    let fileNa =[];
    for(let i=0; i< info_img.length; i++){
        
        fileNa.push(info_img[i]);
    }
    for(let i=0; i< req.files.length; i++){
        
        fileNa.push("http://localhost:4000/image/"+req.files[i].filename);
    }
    console.log("fileNa2 :", fileNa);
    let files = fileNa.toString();
    console.log("files :", files);
    let params = [room_name, room_info, reservation_notice, cancellation_notice,check_in, check_out, price, files, room_id];

     connection.query(sql, params,
         (err, rows, fields) => {
             if(err){
                console.log("err :", err);
             }
            
             res.send("1");
         }
   
     )

});

//관리자 호텔방삭제
app.post('/RoomDelete', (req, res) => {
 
    let sql = "UPDATE `ROOMS` as a SET a.DELETE='Y' WHERE a.ID= ?";
    let room_id=req.body.room_id;

    console.log("room_id :", room_id);
    let params = [room_id];

     connection.query(sql, params,
         (err, rows, fields) => {
             if(err){
                console.log("err :", err);
             }
            
             res.send("1");
         }
   
     )

});

//사용자 페이지 호텔목록
app.post('/userHotelslist', (req, res)=> {

    let kind = req.body.kind;
    //let sql =`SELECT A.id, A.HOTEL_NAME, B.IMAGE_FILES  FROM HOTELS as A JOIN ROOMS as B ON A.HOTEL_NAME = B.HOTEL_NAME WHERE A.LOCATION=?`;
    let sql= "SELECT * FROM HOTELS as A join (SELECT  HOTEL_ID, GROUP_CONCAT(IMAGE_FILES SEPARATOR ',') AS result FROM management.ROOMS GROUP BY HOTEL_ID) B where  A.id =B.HOTEL_ID AND A.DELETE='N' AND A.ACCOMMODATION_TYPE=? order by id desc";
 
console.log("kind", kind);
     connection.query(sql, kind, (err, rows) => {
         if(!err) {
             res.send(rows);
         } else {
             console.log(`query err: ${err}`);
         }
     })

    
});

//사용자페이지 호텔 방목록
app.post('/getUserRooms', (req, res) => {
    //let sql = "SELECT ID, ROOM_NAME, ROOM_INFO, CHECK_IN, CHECK_OUT, PRICE, HOTEL_ID FROM `ROOMS` WHERE HOTEL_ID=?";
    
    let sql="SELECT B.ID, B.ROOM_NAME, B.ROOM_INFO, B.CHECK_IN, B.CHECK_OUT, B.PRICE, B.HOTEL_ID, B.IMAGE_FILES, A.ADDRESS1 as ADDRESS  FROM HOTELS as A JOIN ROOMS as B ON A.ID = B.HOTEL_ID AND A.LOCATION = B.LOCATION WHERE A.DELETE='N' AND A.id= ? order by id desc";
    let room_id=req.body.room_id;
    let ret= [];
    let ret2= [];
    
    connection.query(sql, room_id,
        (err, rows, fields) => {

       if (err){
      console.log(err);
       }else {

       res.send(rows);
    
   }});
});

//사용자페이지 호텔방 정보
app.post('/getUserRoomInfo', (req, res) => {
   //let sql ="Select * From management.ROOMS as A  JOIN management.HOTELS as B ON A.HOTEL_ID = B.id where A.ID  = ?";
   let sql ="Select A.ID AS ROOM_ID, A.ROOM_NAME, A.HOTEL_NAME, A.ROOM_INFO, A.RESERVATION_NOTICE, A.CANCELLATION_POLICY, A.CHECK_IN, A.CHECK_OUT, A.PRICE, A.IMAGE_FILES, A.REG_DATE, A.LOCATION, A.ACCOMMODATION_TYPE, A.REGISTER, B.id as HOTEL_ID, B.HOTEL_NAME, B.HOTEL_INFO, B.ZIPCODE, B.ADDRESS1, B.ADDRESS2, B.SPA, B.RESTARUANT, B.BANQUETHALL, B.PARKING_LOT, B.BUFFET, B.DESK, B.BAR, B.LUGGAGE, B.FITNESS, B.SAUNA, B.WIFI, B.COFFEESHOP, B.PAIDLAUNDRY, B.SMOKINGAREA, B.AMENITIES, B.BUSINESS, B.BREAKFAST, B.REG_DATE, B.LOCATION, B.ACCOMMODATION_TYPE, B.REGISTER From management.ROOMS as A  JOIN management.HOTELS as B ON A.HOTEL_ID = B.id AND A.LOCATION = B.LOCATION where A.ID  = ?" 
   let room_id=req.body.room_id;
    let ret= [];
    connection.query(sql, room_id,
        (err, results, fields) => {

       if (err){
      console.log(err);
       }else {
       ret = results[0];
       res.send(ret);
    
   }
})
});

//예약 목록
app.post('/getReservInfo', (req, res) => {
    
    let sql ="Select GROUP_CONCAT(AA.RE_DATES SEPARATOR ',') AS RE_DATES FROM RESERVATIONS AA WHERE AA.RE_DELETE='N' AND AA.RE_ROOM_ID=? order by id desc";
    let room_id=req.body.room_id;
    let ret= [];

    connection.query(sql, room_id,
        (err, results, fields) => {

       if (err){
      console.log(err);
       }else {
       ret = results[0];
       res.send(ret);
    
   }
})
});

//사용자 예약 처리
app.post('/reservation',  (req, res) => {
    
    let sql = "INSERT INTO `RESERVATIONS` VALUES (null,?,?,?,?,?,?,?,?,?,?,?,now(),?,?,'N')";
    let re_name=req.body.re_name;
    let re_number=req.body.re_number;
    let re_hotel=req.body.re_hotel;
    let re_room=req.body.re_room;
    let re_checkin=req.body.re_checkin;
    let re_checkout=req.body.re_checkout;
    let re_payment=req.body.re_payment;
    let re_account =req.body.re_account;
    let re_price=req.body.re_price;
    let re_hotel_id=req.body.re_hotel_id;
    let re_room_id=req.body.re_room_id;
    let re_user_id=req.body.re_user_id;
    let re_dates= req.body.re_dates;

    console.log("re_name :", re_name);

    let params = [re_name, re_number, re_hotel, re_room, re_checkin, re_checkout, re_payment, re_account, re_price, re_hotel_id, re_room_id, re_user_id, re_dates];
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        })

});

//관리자용 예약내역
 app.post('/useresdata',  (req, res) => {
    
    let sql= "SELECT * FROM RESERVATIONS WHERE RE_DELETE='N' AND USER_ID= ?";
    let user_id= req.body.user_id;
   
    connection.query(sql, user_id,
        (err, rows, fields) => {

       if (err){
      console.log(err);
       }else {
     
  
       res.send(rows);
    
   }});

});

//예약삭제
app.post('/reservdelete',(req, res) => {
 
    let sql = "UPDATE `RESERVATIONS` SET RE_DELETE='Y' WHERE ID= ?";
    let id=req.body.id;
    
     connection.query(sql, id,
         (err, rows, fields) => {
             if(err){
                console.log("err :", err);
             }
             res.send("1");
         }
   
     )

});

//회원 정보 수정시 비밀번호 확인
app.post('/chkpassword', (req, res) => { 
    let sql ='SELECT id FROM `USERS` as A WHERE A.USER_ID=? AND A.PASSWORD=?';
    let chk_id=req.body.chk_id;
    let chk_password=req.body.chk_password;
    let ret= [];
    let params = [chk_id, chk_password];

    console.log("sql :", sql);
    console.log("chk_id :", chk_id);
    console.log("chk_password :", chk_password);
    connection.query(sql, params,
        (err, results, fields) =>{ 
           
            if (err){
                console.log(err);
                 }else {
                 ret = results[0];
                 res.send(ret);
             }
           

        })

});

//리뷰등록
app.post('/savereview',  (req, res) => {
    
    let sql = "INSERT INTO `REVIEW` VALUES (null,?,?,?,now(),?)";
    let register=req.body.register;
    let review_text=req.body.review_text;
    let star=req.body.star;
    let hotel_id=req.body.hotel_id;

console.log("sql :", sql);
console.log("register :", register);
console.log("review_text :", review_text);
console.log("star :", star);
console.log("hotel_id", hotel_id);
    let params = [register, review_text, star, hotel_id];
    connection.query(sql, params,
        (err, rows, fields) => {
            if(err){
               console.log("err :", err);
            }
            
            res.send("1");
        })

});

//사용자 페이지 리뷰 갯수
app.post('/countreservdata', (req, res) => { 
    let sql ='SELECT COUNT(*) as count FROM RESERVATIONS WHERE USER_ID=? AND RE_HOTEL_ID=?';
    let user_id=req.body.user_id;
    let hotel_id=req.body.hotel_id;
    let ret= [];
    let params = [user_id, hotel_id];

    connection.query(sql, params,
        (err, results, fields) =>{ 
           
            if (err){
                console.log(err);
                 }else {
                 ret = results[0];
                 res.send(ret);
             }
           

        })

});

//사용자 페이지 호텔 리뷰 출력
app.post('/getReview', (req, res) => { 
    // let sql ='SELECT * FROM REVIEW WHERE HOTEL_ID=?';
    let sql="SELECT @ROWNUM := @ROWNUM +1 AS ROWNUM, T.* FROM management.REVIEW T,(SELECT @ROWNUM := 0) TMP WHERE HOTEL_ID=? ORDER BY REG_DATE DESC;";
    let hotel_id=req.body.hotel_id;
    let params = [hotel_id];

    connection.query(sql, params,
        (err, rows) =>{ 
           
            if (err){
                console.log(err);
                 }else {
                 res.send(rows);
             }
           

        })

});

//사용자 아이디 찾기
app.post('/findID', (req, res) => {
    let sql ="select USER_ID  from `USERS` WHERE NAME=? AND PHONE=?"
    let NAME= req.body.NAME;
    let PHONE= req.body.PHONE;
    let params = [NAME, PHONE]
    let ret =[];
  


    connection.query(sql, params, (err, result) => {
        if(!err) {
            ret=result[0];
                res.send(ret);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

//사용자 비밀번호 찾기
app.post('/findPASSWORD', (req, res) => {
    let sql ="select PASSWORD  from `USERS` WHERE USER_ID=? AND NAME=? AND PHONE=?"
    let USER_ID= req.body.ID;
    let NAME= req.body.NAME;
    let PHONE= req.body.PHONE;
    let params = [USER_ID, NAME, PHONE]
    let ret =[];
  


    connection.query(sql, params, (err, result) => {
        if(!err) {
            ret=result[0];
                res.send(ret);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});


//사용자 예약 내역 목록
app.post('/getReservation_list', (req, res) => {
    
    let sql ="SELECT * FROM management.RESERVATIONS where RE_HOTEL_ID=? AND RE_ROOM_ID=?";
    let re_room_id=req.body.room_id;
    let re_hotel_id=req.body.hotel_id;

    let params = [re_hotel_id, re_room_id]

    connection.query(sql, params,
        (err, rows, fields) => {

       if (err){
      console.log(err);
       }else {
       res.send(rows);
    
   }
})
});


app.get('/getCustomers', (req, res) => {
    let sql= "SELECT * FROM USERS";

    connection.query(sql, (err, rows)=> {
        if(err){
            console.log(err);
        }else{
            res.send(rows);
        }
    })
});
app.listen(port, () => console.log(`Listening on port ${port}`));