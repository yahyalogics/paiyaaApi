const express = require("express");
require("../db/conn");
const router = new express.Router();
const userList = require("../models/users");
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
router.post("/users", upload.single("image"), async function (req, res, next) {
    const addinguser = new userList(req.body)
    console.log(req.body);
    if (req.file) addinguser.image = req.file.filename;
    const insertuser = await addinguser.save();
        res.status(201).send(insertuser);

  });

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