const schedule = require('node-schedule');
const notificacionesController = require("../controllers/notificaciones");

function checkEndOfLife() {
    var j = schedule.scheduleJob('fin_vida_util_job', '* * 0 * *', function(){
        console.log('checkEndOfLife');
        notificacionesController.getListActivos();
    });
}

module.exports = {
    checkEndOfLife
};
