const express = require('express');
const app = express();

const {User,Students,OutpassRequest} = require('../models');

const studentview = async (request, response) => {
    try{
        const user = await User.findByPk(request.user.id);
        const student = await Students.findByPk(request.user.id);
        const reqoutpasses = await OutpassRequest.findOutPassByUserId({ userid: request.user.id });
        response.render("Studentview", {
            csrfToken: request.csrfToken(),
            user, student, outpasses: reqoutpasses,
            error: request.flash("error occured")
        });
    }catch(error){
        console.log("error in studentview: ",error)
    }
}

module.exports = {studentview};