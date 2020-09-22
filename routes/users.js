// const express = require ('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');

// //User model

// const User = require('./models/User');

// router.get("/Signup",function(req,res){
//     res.render("Signup");
// });
// router.get("/Login",function(req,res){
//     res.render("Login");
// });
// router.get("/Login2",function(req,res){
//     res.render("Login");
// });


// router.post('/Signup', (req,res)=>{
//     const {name,email,password,type} = req.body; 

//     let errors=[];
//     User.findOne({email:email}).then(user=>{
//         if(user){ 
//             errors.push({msg: 'Email is already registered!'});
         
//             // console.log("Email already exists, try another")
//         }
//         else{
//         const newUser = new User ({
//             name,
//             email,
//             password,
//             type

//         });
        

//         //Hash password
//         bcrypt.genSalt(10,(err,salt)=>{
//             bcrypt.hash(newUser.password,salt,(err,hash)=>{
//             if(err) throw err;
//             //set password to hash
//             newUser.password=hash;
//             //save user
//             newUser.save()
//             .then(user => {
//                 req.flash('success_msg', 'You are now registered and can log in');
//                 if(req.body.type=="Tenant"){
//                     res.redirect('/users/Login');

//                 }else if(req.body.type=="Owner"){
//                     res.redirect('/users/Login2');
//                 }
                
                
//             })
//             .catch(err => console.log(err))
//         });
//     });
//     }
// });
// });

// router.post('/Login',(req,res,next)=> {
//     passport.authenticate('local',{
//         successRedirect: '/Tenant',
//         failureRedirect:'/users/Login',
//         failureFlash: true
//     })(req,res,next);

// });


// router.post('/Login2',(req,res,next)=> {
//     passport.authenticate('local',{
//         successRedirect: '/Owner',
//         failureRedirect:'/users/Login2',
//         failureFlash: true
//     })(req,res,next);
// });

// router.get("/Logout" , function(req,res){
//     req.logOut();
//     req.flash('success_msg', 'You are logged out!')
//     res.redirect("/users/Login");
// });



// module.exports = router;
