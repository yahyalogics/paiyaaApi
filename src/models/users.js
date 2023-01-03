const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    _id:{
        type:String,

    },
    user: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: Array,
    },
    image: {
        type: String,
    },
    cnicf: {
        type: String,
    },
    cnicb: {
        type: String,
    },
    utility: {
        type: String,
    },
    messages: {
        type: Array,
    },
});
//we are creating a new collection
const User = new mongoose.model("User", userSchema);
module.exports = User;
