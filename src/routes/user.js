const express=require("express");
const { userAuth } = require("../middlewares/userAuth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter=express.Router();

//get all the pending connection request for the loggedin user
userRouter.get("/user/request/received",userAuth,async(req,res)=>
{
    try{
        const loggedInUser=req.user;

        const connectionRequest= await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested",
       // }).populate("fromUserId",["firstName","lastName"]);//episode 13 1:0:0
        }).populate("fromUserId","firstName lastName photoUrl age gender about skills");
       
        if(connectionRequest.length==0)
        {
           return res.send("There is no Connection");
        }
        res.json({
            message:"Data Fetched Successfully",
            data:connectionRequest,
        })

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});


userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequest=await ConnectionRequest.find({
            $or:[
               { toUserId:loggedInUser._id,status:"accepted"},
               { fromUserId:loggedInUser._id,status:"accepted"},
             ]

        }).populate("fromUserId","firstName lastName photoUrl age gender about skills")
        .populate("toUserId","firstName lastName photoUrl age gender about skills");
        //console.log(connectionRequest);

        //see the results are in [{fromUserId},{toUserId},status,...]
        //by using the console.log
        const data=connectionRequest.map(row =>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;//baciscally we have do this because currentUser also seeing his connection with himself also
            }
            return row.fromUserId;
         });
     res.json({
            message:"connection successfully",
            data:data,
        });

    }catch(err)
    {
        res.status(400).send("ERROR:"+err.message);
    }
});

userRouter.get("/user/feed",userAuth, async (req,res) =>{
    try{

        const loggedInUser=req.user;

        const page=parseInt(req.query.page) || 1;
        let limit=parseInt(req.query.limit) || 10;
        limit=limit > 50 ? 50: limit//max limit to fetch from dadabase is 50 only
        const skip = (page-1) * limit;
        //how to pass in postman /feed?limit=2&page=4

        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();//acts a data structure
        connectionRequests.forEach(req =>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users=await User.find({
           $and:[
            { _id:{ $nin: Array.from(hideUsersFromFeed) }},
            {_id:{$ne :loggedInUser._id}}

           ]
        }).select("firstName lastName photoUrl age gender about skills")
        .skip(skip)
        .limit(limit);//episode 14 0:55:0

        res.send(users);

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})

module.exports=userRouter;