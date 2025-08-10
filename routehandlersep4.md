// app.use("...",(req,res) =>{
//     res.send("hello from r..");
// });


// app.use("/",(req,res) =>{
//     res.send("hello from server..");
// });

// app.use("/about",(req,res) =>{
//     res.send("hello from about..");
// });


// app.use("/home",(req,res) =>{
//     res.send("hello from home..");
// });

// app.use("/test",(req,res) =>{
//     res.send("hello from test..");

// });

// app.use("/hope",(req,res) =>{
//     res.send("hello from fun..");
// });
// app.use("/fun",(req,res) =>{
//     res.send("hello from fun..");
// });



// app.use("/",(req,res) =>{
//     res.send("hello from server..");
// });


episode 4


episode 6,7
app.post("/signup",async (req,res)=>{
    // const userobj={
    //     firstName : "Manish",
    //     lastName : "Gupta",
    //     email: "helo@gmail.com",
    //     password:"hello"
    // }
    //creating a new user instance of the user model
    // const user=new User({
    //     firstName : "virat",
    //     lastName : "kholi",
    //     email: "virat@gmail.com",
    //     password:"virat"
    // });

    const user=new User( req.body());
       

    await user.save();
    res.send("user added successfully");

});