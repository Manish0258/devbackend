const mongoose=require("mongoose");

const connectDB= async() =>{
    await mongoose.connect(
   "mongodb+srv://manishjs:test123@cluster0.wwotlbz.mongodb.net/devTinder"
);
}

module.exports=connectDB;


// connectDB()
// .then(()=>{
//     console.log("database connected estlabishhed");
// })
// .catch((err)=>{
//     console.log("Database Connection not Established");
// });

