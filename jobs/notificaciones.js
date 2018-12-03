const schedule = require('node-schedule');
const notificacionesController = require("../controllers/notificaciones");

function checkEndOfLife() {
    var j = schedule.scheduleJob('fin_vida_util_job', '5 * * * * *', function(){
        console.log('The answer to life, the universe, and everything!');
        notificacionesController.getListActivos();
    });
}

module.exports = {
    checkEndOfLife
};
