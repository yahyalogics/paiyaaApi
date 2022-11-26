const mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/Paiyaa';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI , {
    //useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is sucessfull");
}).catch((e)=>{
    console.log("No Connection" , e);
})