const {User,checkUser}=require('../moduls/user');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const nodemailer = require('nodemailer');
const express= require('express');
const router = express.Router();

router.post('/',upload.single('file'),async(req,res,next)=>{
    user = new User(req.body);
    await user.save();
    

    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:'587',
        secure:false,
        auth:{
            user:'elipress7test@gmail.com',
            pass:'0509797878'
        }
    });
    
    const mailoptions={
        from :'elipress7test@gmail.com',
        to:req.body.email,
        subject:'info added successfully',
        html:`<h1>
        Welcome ${req.body.fname}-${req.body.lname}
        </h1>`
    };

    transporter.sendMail(mailoptions,(error,info)=>{
        if(error){
            res.send(error);
        }else{
            res.send(info);
        }
    });

    const file = req.file
    if(file){
        res.send(file);
    }

    const storage= multer.diskStorage({
        destination:(req,file,cb)=>{
        cb(null,'./uploads/'); //to wich folder put it
        },
        filename:(req,file,cb)=>{
            cb(null,new Date().toISOString() + file.originalname);
        }
        });

        const MINE_TYPE_MAP={
            'image/png':'png',
            'image/jpeg':'jpeg',
            'image/jpg':'jpg'
            
            };


            const upload = multer({
                storage:storage,
                limits:{fileSize:180000000},
                fileFilter:(req,file,cb)=>{
                    console.log(file.mimetype);
                    const mimeValid= MINE_TYPE_MAP[file.mimetype];
                    if(!mimeValid) return cb('only jpg,png,jepg allowed');
                    if(file.originalname.endsWith('jpg')) return cb('file is not jpg');
                    // cb(undefined,true);   //this mean that all fine(no error)
                    // cb(undefined,false);  //this mean that there is an error but im not resonding any
                    // cb(new Error('there is an eror'));  //there is an error with msg
            cb(null,true);
                }
            });

           
        
                      


    
    res.send(user);
});

module.exports = router;

