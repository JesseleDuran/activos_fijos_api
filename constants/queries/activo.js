const CREATE_ACTIVO = 'INSERT INTO saf_activos'
+ '(modelo, ubicacion_geografica, is_depreciable, serial, descripcion, id_soc_ordencompra, vida_util, estado_actual, clasificacion, marca)' 
+ 'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

const LIST_ACTIVOS = 'SELECT * FROM saf_activos';

const GET_ACTIVO = 'SELECT * FROM saf_activos WHERE id = $1';

const DELETE_ACTIVO = 'DELETE FROM saf_activos WHERE id = $1';

const GET_CLASIFICACIONES = 'SELECT DISTINCT clasificacion FROM saf_activos';

const GET_MARCAS = 'SELECT DISTINCT marca FROM saf_activos';

module.exports = {
    CREATE_ACTIVO,
    LIST_ACTIVOS,
    GET_ACTIVO,
    DELETE_ACTIVO,
    GET_CLASIFICACIONES,
    GET_MARCAS
};