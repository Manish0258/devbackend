
const express=require("express");

const authRouter=express.Router();

const {validateSignUpData}=require("../utils/validation");

const User=require("../models/user");

const bcrypt=require("bcrypt");

const cookieParser=require("cookie-parser");

authRouter.use(express.json());//for converting json to js object

authRouter.use(cookieParser());//for reading cookies we need this function




authRouter.post("/signup",async (req,res)=>{
   
    try{
       
       
    //Validation of the data
    validateSignUpData(req);
   
    //Encrypt the password
    const {firstName,lastName,email,password}=req.body;
    const passwordhash= await bcrypt.hash(password,10);

    const user=new User(
        {
            firstName,
            lastName,
            email,
            password:passwordhash
        }
    );
    await user.save();
    res.send("user added successfully");
    }catch(err)
    {
        res.status(400).send("Error saving the user "+err.message);
    }

});



authRouter.post("/login", async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email:email});
        if(!user)
        {
            throw new Error("Emailid is not present in DB   Invlaid Creditinals");
        }

        const isPasswordValid= await bcrypt.compare(password,user.password);

       

        if(isPasswordValid)
        {
            //create a JWT Token

            // const token= await jwt.sign({ _id: user._id},"DEV@TINDER",
            //     {expiresIn:"1d"}
            // );//hiding the user id//seceret key
            // //console.log(token);

            const token=await user.getJWT();


            //Add the token to cookie and send the response back to the user
            res.cookie("token",token,
                {expires: new Date(Date.now() + 8 * 360000)});
           
        
        
            res.send(user);

        }
        else{
            throw new Error("Password is not correct");
        }

    } catch(err){
        res.status(400).send("something went wrong not user not found"+err.message);
    }

});

authRouter.post("/logout",async(req,res) =>{
    res.cookie("token",null,{expires:new Date(Date.now()),

    });
    res.send("ok logged out...");
})




module.exports=authRouter;