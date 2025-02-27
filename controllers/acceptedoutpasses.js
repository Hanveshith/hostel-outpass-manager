const { User, OutpassRequest } = require('../models');

const acceptedoutpasses = async (req, res) => {
    try {
        const acceptedoutpasses = await OutpassRequest.findAll({ where: { status: true, issuedby: req.user.id } });
        const userNamesAndDatetimeouts = [];

        // Use map instead of forEach to get an array of promises
        const promises = acceptedoutpasses.map(async outpass => {
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

module.exports = { acceptedoutpasses };
