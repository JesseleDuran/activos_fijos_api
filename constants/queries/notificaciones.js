const CREATE_NOTIFICACION = `INSERT INTO notificaciones(tipo, data)
VALUES ($1, $2) RETURNING *`;

const TRUNCATE_NOTIFICACION = `TRUNCATE notificaciones`;

module.exports = {
    CREATE_NOTIFICACION,
    TRUNCATE_NOTIFICACION
};