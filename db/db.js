const mongoose  = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Register_User", {
    // useNewUrlParser:true,
    // useUnifideTopology:true,
    // useCreateIndex:true

}).then(()=>{
    console.log('Connection Successful');
}).catch((e)=>{
    console.log('No Connection');
    
})

