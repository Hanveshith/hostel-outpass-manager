const {OutpassRequest} = require('../models');

const getQR = async (request, response) => {
    try {
        const outpassId = request.params.id;

        // Fetch the QR code BLOB data from the database based on the outpass ID
        const outpass = await OutpassRequest.findByPk(outpassId);
        if (!outpass) {
            return res.status(404).send("Outpass not found");
        }

        // Send the BLOB data as a response
        response.setHeader('Content-Type', 'image/png');
        response.send(outpass.qrimage); // Assuming "qrCodeImage" is the field in your model containing the QR code BLOB data
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
}

module.exports = {getQR};