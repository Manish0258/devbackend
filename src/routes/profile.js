const express=require("express");

const profileRouter=express.Router();

const {userAuth}=require("../middlewares/userAuth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view",userAuth, async (req,res)=>{
try{
const user=req.user;
res.send(user);
}catch(err){
    res.status(400).send("ERROR:"+err.message);
}
});


profileRouter.patch("/profile/edit",userAuth,async (req,res)=>
{
    try{
        validateEditProfileData(req);
        if(!validateEditProfileData)
        {
            res.status(400).send("Invalid Edit Request");
        }
        const loggeduser=req.user;
        console.log(loggeduser);

        Object.keys(req.body).forEach((key)=>
        (loggeduser[key]=req.body[key]));

        await loggeduser.save();
        
        res.json({message:`${loggeduser.firstName}  yours profile edited/updated successfully`,
            data:loggeduser,
        } );

    }catch(err)
    {
        //throw new Error("caan't upadate user..."+err.message);
         res.status(400).send("ERROR:"+err.message);
    }


})
module.exports=profileRouter;