console.log("lets get started");   
const express = require('express');

const connectDB= require("./config/database");



//const User=require("./models/user");

const {validateSignUpData}=require("./utils/validation")

// const bcrypt=require("bcrypt");

const cookieParser=require("cookie-parser");

const jwt=require("jsonwebtoken");

const {userAuth}=require("./middlewares/userAuth");


const cors=require("cors");


const authRouter=require("./routes/auth");

const profileRouter=require("./routes/profile");

const requestRouter=require("./routes/request");

const userRouter=require("./routes/user");


const app= express() ;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));//for handling cors error

app.use(express.json());//for converting json to js object

app.use(cookieParser());//for reading cookies we need this function

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


// app.post("/signup",async (req,res)=>{
   
//     try{
       
       
//     //Validation of the data
//     validateSignUpData(req);
   
//     //Encrypt the password
//     const {firstName,lastName,email,password}=req.body;
//     const passwordhash= await bcrypt.hash(password,10);

//     const user=new User(
//         {
//             firstName,
//             lastName,
//             email,
//             password:passwordhash
//         }
//     );
//     await user.save();
//     res.send("user added successfully");
//     }catch(err)
//     {
//         res.status(400).send("Error saving the user "+err.message);
//     }

// });

//get login details
// app.post("/login", async(req,res)=>{
//     try{
//         const {email,password}=req.body;

//         const user=await User.findOne({email:email});
//         if(!user)
//         {
//             throw new Error("Emailid is not present in DB   Invlaid Creditinals");
//         }

//         const isPasswordValid= await bcrypt.compare(password,user.password);

//         if(isPasswordValid)
//         {
//             //create a JWT Token

//             // const token= await jwt.sign({ _id: user._id},"DEV@TINDER",
//             //     {expiresIn:"1d"}
//             // );//hiding the user id//seceret key
//             // //console.log(token);

//             const token=await user.getJWT();


//             //Add the token to cookie and send the response back to the user
//             res.cookie("token",token,
//                 {expires: new Date(Date.now() + 8 * 360000)});
           
        
        
//             res.send("login successfully");

//         }
//         else{
//             throw new Error("Password is not correct");
//         }

//     } catch(err){
//         res.status(400).send("something went wrong not user not found"+err.message);
//     }

// })

//get profile details
// app.get("/profile",userAuth, async (req,res)=>{
// try{
// const user=req.user;
// res.send(user);
// }catch(err){
//     res.status(400).send("ERROR:"+err.message);
// }
// })


// app.post("/sendingConnectionRequest",userAuth, async(req,res)=>
// {
//     const user=req.user;
//     res.send(user.firstName+" send connection request to");
// })

//get user by email
// app.get("/user",async(req,res) => {
//     const useremail=req.body.email;
//     try{
//         const users= await User.find({email:useremail});
//         if(users.length===0)
//             res.status(404).send("not exist");
//         else{
                
//                 res.send(users);
//         }
//     }
//     catch(err){
//         res.status(400).send("something went wrong not user not found");
//     }
// })

//feed api get feed all the usser data
// app.get("/feed",async (req,res) => {
// try{
//     const user=await User.find({});
//     res.send(users);
// }
// catch(err){
//         res.status(400).send("something went wrong not user not found");
//     }
// })


//update data of user
// app.patch("/user/:userId", async(req,res) =>{
//     const userid=req.params?.userId;
//     const data=req.body;

  
//     try{
//     const allow_updates=["userid",
//         "photoUrl",
//         "about",
//         "gender",
//         "age",
//         "skills"];

//     const isUpdateAllowed=Object.keys(data).every((k)=>
//         allow_updates.includes(k));

//     if(!isUpdateAllowed){
//         throw new Error("Update not allowed");
//     }

//     if(data.skills.length>10)
//     {
//         throw new Error("skills not be mor than 10");
//     }
    
    
//     const user= await User.findByIdAndUpdate({_id:userid},data,{
//             //returnDocument:"after",
//             runValidators:true,//by default it is off
//         });

//         res.send("user updated successfully");

//     }
//     catch(err){
//         res.status(404).send("update failed :"+err.message);
//     }
// })

connectDB()
.then(()=>{
    console.log("database connected estlabished...");
    app.listen(3000,()=>{
    console.log("server is listeing to 3000!");
});
})
.catch((err)=>{
    console.log("Database Connection not Established");
});











