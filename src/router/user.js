const express = require("express");
require("../db/conn");
const router = new express.Router();
const userList = require("../models/users");
router.use(express.json());
//we will handle post
const fs = require('file-system');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })
router.post("/users" , upload.single('myFile'),async(req , res)=>{
    try{
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        // Define a JSONobject for the image attributes for saving to database

        var finalImg = {
            contentType: req.file.mimetype,
            image: Buffer.from(encode_image, 'base64')
        };
        db.collection('userlists').insertOne(finalImg, (err, result) => {
            console.log(result)
            if (err) return console.log(err)
            console.log('saved to database')
            res.redirect('/')
        })
        const addinguser = new userList(req.body)
        console.log(req.body);
        const insertuser = await addinguser.save();
        res.status(201).send(insertuser);

    }catch(e){
        res.status(400).send(e);

    }
})
//handling get request
router.get("/users" , async(req , res)=>{
    try{

      const getusers = await userList.find({});

       res.send(getusers);
    }catch(e){
        res.status(400).send(e);

    }
})
//handling get request for individual
router.get("/users/:id" , async(req , res)=>{
    try{
        const _id = req.params.id;
      const getuser = await userList.findById({_id : _id});
       res.send(getuser);
    }catch(e){
        res.status(400).send(e);

    }
})
//handling update request for individual
router.patch("/users/:id" , async(req , res)=>{
    try{
        const _id = req.params.id;
      const getuser = await userList.findByIdAndUpdate(_id , req.body , {
        new : true
      });
       res.send(getuser);
    }catch(e){
        res.status(500).send(e);

    }
})

//handling delete request for individual
router.delete("/users/:id" , async(req , res)=>{
    try{

      const getuser = await userList.findByIdAndDelete(req.params.id);
       res.send(getuser);
    }catch(e){
        res.status(500).send(e);

    }
})


module.exports = router;