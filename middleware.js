const islogined = async(request,response,next) => {
    if (request.isAuthenticated()) {
        if (request.user.role == "Student") {
            response.redirect("/student");
        }
        if (request.user.role == "Admin") {
           response.redirect("/admin");
        }
        if(request.user.role == "Scanner"){
            response.render("Scannerview");
        }
    }else{
          next();
      }
};


const logincheck = (request,response,next) => {
    if(request.isAuthenticated()){
        next()
    }else{
        console.log("User",request.user);
        response.redirect('/login');
    }
};

const isstudent = (request, response, next) => {
    if (request.user && request.user.role === "Student") {
      return next();
    } else {
      const message =
        "You don't have permission to access this page as an student.";
      return response.status(403).render("error", { message });
    }
  };

const isadmin = (request, response, next) => {
    if (request.user && request.user.role === "Admin") {
      return next();
    } else {
      const message =
        "You don't have permission to access this page as an admin.";
      return response.status(403).render("error", { message });
    }
  };

const isscanner = (request, response, next) => {
    if (request.user && request.user.role === "Scanner") {
      return next();
    } else {
      const message =
        "You don't have permission to access this page as an Scanner.";
      return response.status(403).render("error", { message });
    }
  };
module.exports = {islogined,logincheck,isstudent,isadmin,isscanner};