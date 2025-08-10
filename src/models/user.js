const mongoose=require("mongoose");

const validator=require("validator");
const jwt=require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:12
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("not a valid email: "+value);
            }
        }
    },
    password:{
        type:String,
        required:true,
          validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(" Not a Strong Password re-enter "+value);
            }
        }
     
    },
    age:{
        type:Number,
        min:18,//for minimum age 18
    },
    gender:{
        type:String,
        validate(value){//only work for the new user entering
            if(!["male","female","others"].includes(value)){
                    throw new Error("gender data is not vaild");
            }
        }
    },
    photoUrl:{
        type:String,
          validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo url: "+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default value",
    },
    skills:{
        type:[String],
    }

},{
    timestamps:true,//use for add time means.... createdAt and updatedAt
});

userSchema.methods.getJWT= async function(){//it should not be a arrow function
    const user=this;
     const token= await jwt.sign({ _id: user._id},"DEV@TINDER",
                    {expiresIn:"1d",

                    });
    return token;
};




const User=mongoose.model("User",userSchema);

module.exports=User;