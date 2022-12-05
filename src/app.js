const express = require("express");
const multer = require('multer');
require("./db/conn");
//const userList = require('../src/models/users');
const router = require("./router/user");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(router);
app.listen(port , ()=> {
    console.log('API is Live on port' , port);
})
// Step 5 - set up multer for storing uploaded files
