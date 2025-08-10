const jwt=require("jsonwebtoken");
const User=require("../models/user.js");
// app.use(express.json());

// app.use(cookieParser());


//const userAuth= async (err,req,res,next) but not the best way because we are using try and catch block

const userAuth= async (req,res,next)=>{
    //read the tokrn from the req cookies
    try{
    const cookies=req.cookies;
    const {token}=cookies;
   if(!token){
        return res.status(401).send("Please logged in");
    }

    const decodeobj= await jwt.verify(token,"DEV@TINDER");

    const {_id}=decodeobj;

    const user=await User.findById(_id);
    if(!user)
    {
        throw new Error("user not found");

    }
    req.user=user;
    next();
}
    catch(err)
    {
        res.status(400).send("ERROR:"+err.message);
    }
};

module.exports ={userAuth,};