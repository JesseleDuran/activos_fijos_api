const CREATE_MOVIMIENTO = `INSERT INTO saf_movimientos (tipo, motivo, tiempo_limite, ubicacion, cod_empresa, 
n_activo, cod_personal_involucrado, cod_usuario_aprobador) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

module.exports = {
    CREATE_MOVIMIENTO
};