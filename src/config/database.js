const mongoose=require("mongoose");

const connectDB= async() =>{
    await mongoose.connect(
   process.env.DB_CONNECTION
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

