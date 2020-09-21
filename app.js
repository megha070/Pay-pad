require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const request = require("request");
const LocalStrategy = require('passport-local').Strategy;
const https= require("https")
const expressLayouts=require("express-ejs-layouts");
const bcrypt = require("bcryptjs");
const flash = require('connect-flash');
const session = require('express-session');
// var popup = require('popups');


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }));

//Passport config
require('./config/passport')(passport);

//DB config
const db=require('./config/keys').MongoURI;
// Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//User model

const User = require('./models/User');

const {ensureAuthenticated} = require('./config/auth');
//Express session

  //Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());


//   Connect Flash
  app.use(flash())

  //Global Vars

  app.use((req,res,next)=>{
      res.locals.success_msg = req.flash('success_msg');
      res.locals.error_msg = req.flash('error_msg');
      next();

  });



app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html")
})


app.get("/Owners" , function(req,res){
    res.sendFile(__dirname+"/Owners.html");
})

app.get("/FAQ",function(req,res){
    res.sendFile(__dirname+"/FAQ.html");
})

app.get("/Signup",function(req,res){
    res.sendFile(__dirname+"/Signup.html");
});
app.get("/Login",function(req,res){
    res.sendFile(__dirname+"/Login.html");
});

app.get("/Success",function(req,res){
    res.sendFile(__dirname+"/Success.html");
});

app.post('/Signup', (req,res)=>{
    const {name,email,password,type} = req.body; 
    User.findOne({email:email}).then(user=>{
        if(user){ 
            console.log("Email already exists, try another")
        }
    // res.sendFile(__dirname+'/Signup.html')    
        else{
        const newUser = new User ({
            name,
            email,
            password,
            type

        });
        

        //Hash password
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err;
            //set password to hash
            newUser.password=hash;
            //save user
            newUser.save()
            .then(user => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/Login');
            })
            .catch(err => console.log(err))
        });
    });
    }
});
});


app.post('/Login',(req,res,next)=> {
    passport.authenticate('local',{
        successRedirect: '/Admin',
        failureRedirect:'/Login',
        failureFlash: true
    })(req,res,next);
});

    
app.get("/Admin" , ensureAuthenticated, (req,res)=>{
    res.render('Admin', {

        name: req.user.name
    })
});
  


app.get("/Logout" , function(req,res){
    req.logOut();
    res.redirect("/");
});


//MailChimp
app.post("/",function(req,res){

    var data={
        members: [
            {
                email_address: req.body.email,
                status:"subscribed"
            }
        ]
    };


var jsonData= JSON.stringify(data);
const url='https://us2.api.mailchimp.com/3.0/lists/d6de6e11f3'

const options={
    method: "POST",
    auth: "paypad:63bbb120d896b5378a69055286465be5-us2"
}

const request=https.request(url,options,function(response){
    if (response.statusCode=200){
        res.redirect("/Success")
    }else{
        res.redirect("/")
    }

    response.on("data",function(data){
        // console.log(JSON.parse(data));
    });
    
});
request.write(jsonData);
request.end();
});

app.listen(process.env.PORT || 5002 , function() {
    console.log("server running on port 5002")
})



//63bbb120d896b5378a69055286465be5-us2

//d6de6e11f3