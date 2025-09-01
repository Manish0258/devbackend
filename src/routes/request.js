const express=require("express");

const requestRouter=express.Router();
const {userAuth}=require("../middlewares/userAuth");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");
const connectionRequest = require("../models/connectionRequest");


// const sendEmail=require("../utils/sendEmail");


requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>
{

    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"];

        if(!allowedStatus.includes(status))
        {
             res.status(400).json({
                message:"Invalid status type..... "+status,
             })
        }
        //checking that it is not making connection with himself
        if(fromUserId.equals(toUserId))
        {
            throw new Error("can't be done you are sending connection to your self");
        }

        //checking to user id exist or not
        const touser=await User.findById(toUserId)
        if(!touser)
        {
            res.status(400).send(" user doesn't exists in database");
        }
        

        //check
        //If there is an existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
          $or:[
            {fromUserId,toUserId},
            {fromUserId: toUserId,toUserId: fromUserId},
          ],
        });

        if(existingConnectionRequest)
        {
            return res.status(400).json({
                message:"Already a connection is exits.!!!"
            })
        }

        const connectionRequest=new ConnectionRequest(
            {
                fromUserId,
                toUserId,
                status,
            }
        )

        const data=await connectionRequest.save();
        // const emailRes=await sendEmail.run("A new friend request from"+req.user.firstName,
        //      req.user.firstName + " is " + status + " in " + toUser.firstName
        // );
        // console.log(emailRes);
        res.json({
            message:
            req.user.firstName+" is "+status+" in "+touser.firstName,
            data
        })

    }
    catch(err)
    {
        res.status(400).send("something went wrong "+err.message);
    }
   
});



requestRouter.post("/request/recieve/:status/:requestId",userAuth, async (req,res) =>{
   try{
    const status=req.params.status;
    const {requestId} =req.params;

     const loggedInUser=req.user;

     const allowedStatus=["accepted","rejected"];
     if(!allowedStatus.includes(status))
     {
        res.status(400).json({
                message:"Invalid status type..... "+status,
             })
     }

     const connectionRequest=await ConnectionRequest.findOne(
        {
            _id:requestId,
            toUserId:loggedInUser._id,
            status:"interested",
        });

     if(!connectionRequest)
     {
        res.status(400).json({message:"connection request not found"});
     }

     connectionRequest.status=status;
     
     const data = await connectionRequest.save();
     res.json({
        message:"connection saved successfully",
        data,
     })

    //is loggedinid=====touserId

   }
   catch(err)
   {
    res.status(400).send("ERROR:  "+err.message);
   }
})

module.exports=requestRouter;

