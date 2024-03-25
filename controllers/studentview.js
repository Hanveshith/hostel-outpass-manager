const express = require('express');
const app = express();

const {User,OutpassRequest} = require('../models');

const studentview = async (request, response) => {
    try{
        const user = await User.findByPk(request.user.id);
        console.log(user);
        const reqoutpasses = await OutpassRequest.findOutPassByUserId({ userid: request.user.id });
        response.render("Studentview", {
            csrfToken: request.csrfToken(),
            user, outpasses: reqoutpasses,
            error: request.flash("error occured")
        });
    }catch(error){
        console.log("error in studentview: ",error)
    }
}

module.exports = {studentview};