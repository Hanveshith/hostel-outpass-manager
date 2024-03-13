const express = require('express');
const app = express();
const path = require("path");
const bodypaser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const csrf = require("tiny-csrf");
const cookieParser = require('cookie-parser');
const qr = require('qrcode');
const saltRounds = 10;

const {User} = require('./models');
// const { where } = require('sequelize');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(flash());
app.use(bodypaser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser("secret key"));

app.use(
    session({
        secret: "my-super-secret-key-21647134443213215",
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
        resave: true,
        saveUninitialized: true,
    })
);
app.use(function(request, response, next) {
    response.locals.messages = request.flash();
    next();
  });

app.use(passport.initialize());
app.use(passport.session());

const userauth = async(mail,password,done) =>{
    try{
        const user = await User.findOne({where : {email:mail}});
        if(!user){
            // request.flash("error","User Not Found");
            return done(null,false,{message: "User Not Found"});
        }
        const result = await bcrypt.compare(password,user.password);
        if(result){
            return done(null,user);
        }else{
            // request.flash("error","Invalid")
            return done(null,false,{message:"Invalid password"});
        }
    }catch(err){
        console.log("Error in userauth",err);
        return done(err);
    }
}
console.log(userauth);
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        userauth,
    )
);
passport.serializeUser((user, done) => {
    console.log("Serializing user in session", user.id);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findByPk(id)
        .then((user) => {
            done(null, user);
        })
        .catch((error) => {
            done(error, null);
        });
});


//csrf token 
const csrfProtection = csrf("123456789iamasecret987654321look", [
    "POST",
    "PUT",
    "DELETE",
  ]);
app.use(csrfProtection);



const {islogined, logincheck, isstudent,isadmin,isscanner} = require('./middleware');


//routes

app.get("/",logincheck,(request,response) => {
    response.redirect('/login');
})

app.get("/login",islogined,(request,response) => {
    response.render("main",{
        error: request.flash("error"),
        success: request.flash("success"),
        csrfToken: request.csrfToken(),
    })
})

// app.get("/",async (req,res) => {
    // const hashedpwd = await bcrypt.hash("abc@121", saltRounds);
    // await User.create({
    //     firstName: "Naresh",
    //     lastName: "G",
    //     email: "b@gmail.com",
    //     password: hashedpwd,
    //     role: "Admin"
    // })
    // await User.create({
    //     firstName: "Hanveshith",
    //     lastName: "Reddy",
    //     email: "a@gmail.com",
    //     password: hashedpwd,
    //     role: "Student"
    // })
    // await User.create({
    //     firstName: "WatchMan",
    //     lastName: "G1",
    //     email: "c@gmail.com",
    //     password: hashedpwd,
    //     role: "Scanner"
    // })
    // await Students.create({
    //     firstName: "Hanveshith",
    //     lastName: "Reddy",
    //     email: "a@gmail.com",
    // })

//     res.render("main"); 
// })
app.get('/createusers', async(request,response) => {
    const hashedpwd = await bcrypt.hash("abc@121", saltRounds);
    await User.create({
        firstName: "Naresh",
        lastName: "G",
        email: "b@gmail.com",
        password: hashedpwd,
        role: "Admin"
    })
    await User.create({
        firstName: "Hanveshith",
        lastName: "Reddy",
        email: "a@gmail.com",
        password: hashedpwd,
        role: "Student"
    })
    await User.create({
        firstName: "WatchMan",
        lastName: "G1",
        email: "c@gmail.com",
        password: hashedpwd,
        role: "Scanner"
    })
    await Students.create({
        firstName: "Hanveshith",
        lastName: "Reddy",
        email: "a@gmail.com",
    })
    response.send("CREATED SUCCESSFULLY");
})

app.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    async (request, response) => {
        console.log(request.user.id);
        if (request.user.role == "Student") {
            response.redirect("/student");
        }
        if (request.user.role == "Admin") {
           response.redirect("/admin");
        }
        if(request.user.role == "Scanner"){
            response.render("Scannerview");
        }
    }
);


app.get("/signout", function (request, response) {
    request.logout(function (err) {
      if (err) {
        return next(err);
      }
      response.redirect("/login");
    });
  });

const studentview = require('./routes/studentview');
const adminview = require('./routes/adminview');
const requestoutpass = require('./routes/requestoutpass');
const getQR = require('./routes/getQR');
const acceptoutpass = require('./routes/acceptoutpass');
const scanned = require('./routes/scanned');
const acceptedoutpasses = require('./routes/acceptedoutpasses');

app.use('/student',csrfProtection,logincheck,isstudent,studentview);
app.use('/admin',csrfProtection,logincheck,isadmin,adminview);
app.get('/scanner',csrfProtection,logincheck,isscanner,async(request,response) => {
    response.render('Scannerview',{
        csrfToken: request.csrfToken(),
    });
})
app.use('/requestoutpass',csrfProtection,requestoutpass);
app.use('/getQRCode',csrfProtection,getQR);
app.use('/acceptoutpass',csrfProtection,acceptoutpass);
app.use('/scanned',csrfProtection,scanned);
app.use('/acceptedoutpasses',csrfProtection,acceptedoutpasses);

module.exports = app;
