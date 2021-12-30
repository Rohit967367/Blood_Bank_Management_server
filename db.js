const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/api', (err)=>{
    if(!err){
        console.log(" DB connection successfull");
    } else{
        console.log("not connect to db becoz " + err)
    }
})

module.exports = mongoose;