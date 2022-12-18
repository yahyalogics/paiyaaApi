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
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000/', // use your actual domain name (or localhost), using * is not recommended
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))
