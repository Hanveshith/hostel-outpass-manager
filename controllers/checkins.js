const {User, ScannedOutpasses,OutpassRequest } = require('../models');
const Sequelize = require('sequelize');


const checkins = async (request, response) => {
    const checkins = await ScannedOutpasses.findAll({
        where: {
            checkIn: true,
        }
    })
    response.render('checkouts', { checkins, csrfToken: request.csrfToken() });
};

const fetchcheckins = async (request, response) => {
    const fetchdate = request.params.date;
    const checkIns = await ScannedOutpasses.findAll({
        where: {
            checkout: true,
            Outtime: {
                [Sequelize.Op.between]: [new Date(fetchdate), new Date(fetchdate + 'T23:59:59')]
            }
        }
    });
    console.log(checkIns)
    const checkinDetails = [];
    for (const checkin of checkIns) {
        const outpassId = checkin.OutpassId;
        const outpass = await OutpassRequest.findByPk(outpassId);
        console.log(outpass)
        const user = await User.findByPk(outpass.userid);
        console.log(user)
        if (user) {
            checkinDetails.push({
                username: user.firstName,
                outTime: checkin.intime
            });
        }
    }

    console.log(checkinDetails);
    return response.json(checkinDetails);
};

module.exports = { checkins, fetchcheckins };
