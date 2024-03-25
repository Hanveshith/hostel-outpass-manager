const {OutpassRequest,ScannedOutpasses} = require('../models');

const scanned = async (request, response) => {
    try{
        const outpass = await ScannedOutpasses.findOne({id: request.params.id});
        const requestedoutpass = await OutpassRequest.findOne({id: request.params.id});
        console.log("status:",requestedoutpass.scannedstatus)
        if (requestedoutpass.scannedstatus === false) {
            await OutpassRequest.scanned({ id: request.params.id });
            await ScannedOutpasses.scanned({ id: request.params.id });
            await ScannedOutpasses.Outscan({ id: request.params.id });
            response.redirect('/')
        }
        else if(outpass.checkout === true && outpass.checkIn === true){
            request.flash("error","Already Scanned");
            response.redirect("/scanner")
        }
        else if(outpass.checkIn === false && outpass.checkout === true){
            await ScannedOutpasses.Inscan({ id: request.params.id });
            response.redirect('/')
        }
        else{
            response.redirect('/')
        }
    }catch(error){
        console.log("Error in  scanning",error);
    }
}

module.exports = {scanned};