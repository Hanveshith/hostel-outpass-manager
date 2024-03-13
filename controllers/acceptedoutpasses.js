const {OutpassRequest} = require('../models');

const acceptedoutpasses = async (req, res) => {
    const acceptedoutpasses = await OutpassRequest.findAll({ where: { status: true } });
    res.render("AcceptedOutpasses", { acceptedoutpasses });
}

module.exports = {acceptedoutpasses};