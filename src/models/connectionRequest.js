const mongoose =require("mongoose");

//const User=require("./user");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","rejected","accepted"],
            message:`{VALUE} is incorrect status type`
        },
        required:true,

    }
},
{
    timestamps:true
}
);


//ConnectionRequest.find({fromUserId:234423545432},toUserId:23423451)
//Adding index will make query faster and this is example of compond indexing
connectionRequestSchema.index({fromUserId : 1, toUserId:1});//means in ascending order ...-1 for descending


// This function is called before saving the data into this database model
//acts as middleware 
connectionRequestSchema.pre("save",async function(next)//
{
    const connection=this;
    if(connection.fromUserId.equals(connection.toUserId))
    {
        throw new Error("Cannot send connection request to yourself");
    }
    next();//always use next function
});

module.exports=mongoose.model("ConnectionRequestSchema",connectionRequestSchema);