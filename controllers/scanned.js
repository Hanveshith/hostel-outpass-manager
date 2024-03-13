const {OutpassRequest,ScannedOutpasses} = require('../models');

const scanned = async (request, response) => {
    try{
        const outpass = await OutpassRequest.findOne({id: request.params.id});
        await OutpassRequest.scanned({ id: request.params.id });
        await ScannedOutpasses.scanned({ id: request.params.id });
        
        if(outpass.status === true){
            request.flash("error","Already Scanned");
            response.redirect("/scanner")
        }
    }catch(error){
        console.log("Error in  scanning",error);
    }
}

module.exports = {scanned};