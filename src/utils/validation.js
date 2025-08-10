
const validator=require("validator");

const validateSignUpData=(req)=>
{
    const {firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
   else if(!validator.isEmail(email)){
    throw new Error("email is not valid");
   }
    else if(!validator.isStrongPassword(password)){
        throw new Error(" Not a Strong Password re-enter ");
    }
               
  
              
};

const validateEditProfileData=(req)=>
{
    const allowedEdit=["firstName","lastName","about",
        "photoUrl","gender","age","skills"];

    const isallowed=Object.keys(req.body).every(field=>
        allowedEdit.includes(field)
    );

    return isallowed;
    
}

module.exports={
    validateSignUpData,
    validateEditProfileData,
};