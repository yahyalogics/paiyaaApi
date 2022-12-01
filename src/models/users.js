const express = require("express");
const mongoose  = require("mongoose");

const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,

    } ,
    user:{
            type:String,
            required:true,

        } ,
        fname:{
            type:String ,
            required:true,
            trim:true
        } ,
        lname:{
            type:String ,
            required:true,
            trim:true
        } ,
        phone:{
            type:Number ,
            required:true
        } ,
        email:{
            type:String ,
            required:true ,
            index : {unique : true},
        } ,
        password:{
            type:String ,
            required:true,
            trim:true
        } ,
        address:{
            type:Array ,
        } ,
        img:
        {
            type:String ,
        },

})
//we are creating a new collection
const userList = new mongoose.model("userList" , userSchema);
module.exports = userList;