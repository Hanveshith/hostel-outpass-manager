const {OutpassRequest,Students} = require('../models');
const qr = require('qrcode')

const acceptoutpass = async (request, response) => {
    try{
        const outpass = await OutpassRequest.findByPk(request.params.id);
        const req_stu_details = await Students.findStudentByUserId(outpass.userid);
        const qrData = {
            outpassId: request.params.id,
            StudentName: req_stu_details.firstName,
            College: req_stu_details.college,
            Mobile: req_stu_details.mobile,
            CurrentYear: req_stu_details.currentyear,
            DateTimeOut: outpass.datetimeout,
            DateTimeIn: outpass.datetimein
        };
        const qrCodeBuffer = await qr.toBuffer(JSON.stringify(qrData));
        const acceptedoutpass = await OutpassRequest.accept({ id: request.params.id, qr: qrCodeBuffer });
        console.log(outpass);
        response.redirect("/admin");
    }catch(error){
        console.log("Error in accepting outpass",error);
    }
}

module.exports = {acceptoutpass};
