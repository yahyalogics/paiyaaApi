const express = require("express");
require("../db/conn");
const router = new express.Router();
const User = require("../models/users");
router.use(express.json());

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "public/images/");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now() + file.originalname.split(" ").join("-")}`);
  },
});
let upload = multer({ storage });
//we will handle post

router.post("/users" ,async(req , res)=>{
    try{
        const addinguser = new User(req.body)
        console.log(req.body);
        const insertuser = await addinguser.save();
        res.status(201).send(insertuser);

    }catch(e){
        res.status(400).send(e);

    }
})


router.post("/uploadUser", upload.single("image"), async function (req, res, next) {
    let user = new User(req.body);
    console.log(req.body);
    if (req.file) user.image = req.file.filename;
    await user.save();
    console.log(user);
    res.send(user);
  });

//handling get request
router.get("/users" , async(req , res)=>{
    try{

      const getusers = await User.find({});

       res.send(getusers);
    }catch(e){
        res.status(400).send(e);

    }
})
//handling get request for individual
router.get("/users/:id" , async(req , res)=>{
    try{
        const _id = req.params.id;
      const getuser = await User.findById({_id : _id});
       res.send(getuser);
    }catch(e){
        res.status(400).send(e);

    }
})
//handling update request for individual
router.patch("/users/:id" , async(req , res)=>{
    try{
        const _id = req.params.id;
      const getuser = await User.findByIdAndUpdate(_id , req.body , {
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

      const getuser = await User.findByIdAndDelete(req.params.id);
       res.send(getuser);
    }catch(e){
        res.status(500).send(e);

    }
})


module.exports = router;