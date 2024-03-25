const { User, OutpassRequest } = require('../models');

const rejectedoutpasses = async (req, res) => {
    try {
        const rejectedoutpasses = await OutpassRequest.findAll({ where: { status: false, issuedby: req.user.id } });
        const userNamesAndDatetimeouts = [];

        // Use map instead of forEach to get an array of promises
        const promises = rejectedoutpasses.map(async outpass => {
            const userName = await User.findByPk(outpass.userid);
            const datetimeout = outpass.datetimeout;
            const userAndDatetime = {
                userName: userName.firstName,
                datetimeout: datetimeout
            };
            userNamesAndDatetimeouts.push(userAndDatetime);
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        res.render("AcceptedOutpasses", { userNamesAndDatetimeouts, csrfToken: req.csrfToken() });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { rejectedoutpasses };
