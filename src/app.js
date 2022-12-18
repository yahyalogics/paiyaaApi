const express = require("express");
const multer = require('multer');
require("./db/conn");
//const userList = require('../src/models/users');
const router = require("./router/user");
const cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(router);
app.listen(port , ()=> {
    console.log('API is Live on port' , port);
})




