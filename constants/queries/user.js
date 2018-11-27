const CREATE_MOVIMIENTO = 'INSERT INTO saf_movimientos'
+ '(tipo, motivo, tiempo_limite, ubicacion, cod_empresa, n_activo)' 
+ 'VALUES($1, $2, $3, $4, $5, $6) RETURNING *';

module.exports = {
    CREATE_MOVIMIENTO
};