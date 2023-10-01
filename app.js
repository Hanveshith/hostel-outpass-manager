const express = require('express');
const app = express();
const path = require("path");
const bodypaser = require("body-parser");
const flash = require("connect-flash");
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");
const qr = require('qrcode');
const saltRounds = 10;

const {User,Students,OutpassRequest} = require('./models');
const { where } = require('sequelize');

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(flash());
app.use(bodypaser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (username, password, done) => {
            User.findOne({
                where: {
                    email: username,
                },
            })
                .then(async (user) => {
                    const result = await bcrypt.compare(password, user.password);
                    if (result) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Invalid Password" });
                    }
                })
                .catch((error) => {
                    return done(null, false, { message: "Invalid E-mail" });
                });
        }
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

app.get("/",async (req,res) => {
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

    res.render("main"); 
})

app.get("/user",async(req,res) => {
    const user = await User.findByPk(req.user.id);
    const student = await Students.findByPk(req.user.id);
    const reqoutpasses = await OutpassRequest.findOutPassByUserId({userid: req.user.id});
    res.render("Studentview",{
        user,student,outpasses: reqoutpasses
    });
})

app.get("/admin",async(req,res) => {
    const user = await User.findByPk(req.user.id);
    const pendingoutpasses = await OutpassRequest.findPendingOutpasses();
    const outpassesWithUsers = {};
    for (const outpass of pendingoutpasses) {
        const userDetail = await Students.findStudentByUserId(outpass.userid);
        console.log(userDetail);
        if (userDetail) {
            outpassesWithUsers[outpass.id] = {
                outpass,
                user: userDetail,
            };
        }
    }
    // console.log(pendingoutpasses,outpassesWithUsers);
    res.render("Accepterview",{
        outpassesWithUsers,user
    });
})

app.post(
    "/session",
    passport.authenticate("local", {
        failureRedirect: "/",
        failureFlash: true,
    }),
    async (req, res) => {
        console.log(req.user.id);
        if (req.user.role == "Student") {
            res.redirect("/user");
        }
        if (req.user.role == "Admin") {
           res.redirect("/admin");
        }
        if(req.user.role == "Scanner"){
            res.render("Scannerview");
        }
    }
);


app.get("/requestoutpass",async(req,res) => {
    res.render("outpass-request");
})

app.post("/addrequest",async (req,res) => {
    const r =await OutpassRequest.create({
        PlaceToBeVisited: req.body.PlaceToBeVisited,
        PurposeOfVisit: req.body.PurposeOfVisit,
        datetimeout: req.body.DateTimeOut,
        datetimein: req.body.DateTimein,
        status: false,
        userid: req.user.id
    })
    console.log(r);
    res.redirect("/user");
})

app.get("/acceptoutpass/:id", async (req,res) => {
    const outpass = await OutpassRequest.findByPk(req.params.id);
    const req_stu_details = await Students.findStudentByUserId(outpass.userid);
    const qrData = {
        outpassId: req.params.id,
        StudentName: req_stu_details.firstName, 
        College: req_stu_details.college,
        Mobile: req_stu_details.mobile,
        CurrentYear: req_stu_details.currentyear,
        DateTimeOut: outpass.datetimeout,
        DateTimeIn: outpass.datetimein
    };
    const qrCodeBuffer = await qr.toBuffer(JSON.stringify(qrData));
    const acceptedoutpass = await OutpassRequest.accept({id: req.params.id,qr:qrCodeBuffer});
    console.log(outpass);
    res.redirect("/admin");
})

app.get("/getQRCode/:id", async (req, res) => {
    try {
        const outpassId = req.params.id;

        // Fetch the QR code BLOB data from the database based on the outpass ID
        const outpass = await OutpassRequest.findByPk(outpassId);
        if (!outpass) {
            return res.status(404).send("Outpass not found");
        }

        // Send the BLOB data as a response
        res.setHeader('Content-Type', 'image/png');
        res.send(outpass.qrimage); // Assuming "qrCodeImage" is the field in your model containing the QR code BLOB data
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


app.get("/acceptedoutpasses", async(req,res) => {
    const acceptedoutpasses = await OutpassRequest.findAll({where:{status:true}});
    res.render("AcceptedOutpasses",{acceptedoutpasses});
})

app.get("/scanned/:id",async(req,res) => {
    const outpass = await OutpassRequest.scanned({id:req.params.id});
    res.render("Scannerview");
})

module.exports = app;
