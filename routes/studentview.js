const express = require('express');
const route = express.Router();
const {studentview} = require('../controllers/studentview');


route.get('/',studentview);

module.exports = route;


// <div style="margin-top: 12px;height: 100vh;color: var(--bs-body-bg);background: var(--bs-body-bg);">
//     <div style="margin: 6px;">
//         <% if(checkouts.length>0) {%>
//         <% for(let i=0; i < checkouts.length; i++) { %>
//             <div class="card" style="padding: 0px;margin: 0px;margin-top: 17px;">
//                 <div class="card-body" style="width: 335px;height: 63px;font-size: 7px;padding: 11px;">
//                     <h4 class="card-title" style="font-size: 14.5px;margin-right: 0px;padding-top: 0px;display: inline;">
//                         <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person-circle" style="margin-right: 4px;padding-top: 0px;padding-bottom: 1px;">
//                             <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
//                             <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"></path>
//                         </svg>Name
//                     </h4>
//                     <% const OutpassDateTimeOut = checkouts[i].Outtime; %>
//                     <% if (OutpassDateTimeOut instanceof Date && !isNaN(OutpassDateTimeOut.getTime())) { %>
//                         <h6 class="text-muted card-subtitle mb-2" style="font-size: 12px;padding-top: 5px;margin-right: 0px;margin-left: 2px;">
//                             DateTimeOut: <%= OutpassDateTimeOut.toLocaleString() %>
//                         </h6>
//                     <% } else { %>
//                         <h6 class="text-muted card-subtitle mb-2" style="font-size: 12px;padding-top: 5px;margin-right: 0px;margin-left: 2px;">
//                             Invalid Date
//                         </h6>
//                     <% } %>
//                     <a class="card-link" href="#"></a>
//                 </div>
//             </div>
//         <% } %>
//         <% } %>
        
//     </div>
// </div>