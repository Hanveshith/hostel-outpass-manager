const express = require('express');
const app = express();


const requestoutpass = (request, reponse) => {
    reponse.render("outpass-request",{
        csrfToken: request.csrfToken(),
    });
}

const {OutpassRequest} = require('../models');

const requestverify = async (request,reponse) => {
    try{
        const r =await OutpassRequest.create({
            PlaceToBeVisited: request.body.PlaceToBeVisited,
            PurposeOfVisit: request.body.PurposeOfVisit,
            datetimeout: request.body.DateTimeOut,
            datetimein: request.body.DateTimein,
            scannedstatus: false,
            status: false,
            userid: request.user.id
        })
        console.log(r);
        reponse.redirect("/student");
    }catch(error){
        console.log("Error in requesting outpass",error);
    }
    
}

module.exports = {requestoutpass,requestverify};