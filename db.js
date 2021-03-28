const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://user:1234@cluster0.amnzj.mongodb.net/DSProject?retryWrites=true&w=majority',
 {useNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>console.log("Mongo is up"))
    .catch(err=>console.log("Mongo is down !! "+err))
