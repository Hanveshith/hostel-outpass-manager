const express = require('express');

const {User,OutpassRequest,Students} = require('../models')

const adminview = async (request, response) => {
    const user = await User.findByPk(request.user.id);
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
    response.render("Accepterview", {
        csrfToken: request.csrfToken(),
        outpassesWithUsers, user
    });
}

module.exports = {adminview};