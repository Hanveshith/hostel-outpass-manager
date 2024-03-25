const {User, ScannedOutpasses,OutpassRequest } = require('../models');
const Sequelize = require('sequelize');


const checkouts = async (request, response) => {
    const checkouts = await ScannedOutpasses.findAll({
        where: {
            checkout: true,
        }
    })
    response.render('checkouts', { checkouts, csrfToken: request.csrfToken() });
};

const fetchcheckouts = async (request, response) => {
    const fetchdate = request.params.date;
    const checkOuts = await ScannedOutpasses.findAll({
        where: {
            checkout: true,
            Outtime: {
                [Sequelize.Op.between]: [new Date(fetchdate), new Date(fetchdate + 'T23:59:59')]
            }
        }
    });
    console.log(checkOuts)
    const checkoutDetails = [];
    for (const checkout of checkOuts) {
        const outpassId = checkout.OutpassId;
        const outpass = await OutpassRequest.findByPk(outpassId);
        console.log(outpass)
        const user = await User.findByPk(outpass.userid);
        console.log(user)
        if (user) {
            checkoutDetails.push({
                username: user.firstName,
                outTime: checkout.Outtime
            });
        }
    }

    console.log(checkoutDetails);
    return response.json(checkoutDetails);
};

module.exports = { checkouts, fetchcheckouts };
