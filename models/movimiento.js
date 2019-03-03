/**
 * @swagger
 * definitions:
 *   Movimiento:
 *     type: object
 *     required:
 *       - tipo
 *       - cod_usuario_aprobador
 *       - n_activo
 *     properties:
 *       id:
 *         description: Id único incremental del movimiento.
 *         type: integer
 *       tipo:
 *         description: Tipo de movimiento.
 *         type: string
 *         enum: ['asignacion', 'reasignacion', 'prestamo', 'desincorporacion', 'reparacion', 'salida']
 *       motivo:
 *         description: Motivo por el cual se ejecuta el movimiento.
 *         type: string
 *       tiempo_limite:
 *         description: Tiempo limite en el que ese movimiento caducará.
 *         type: string
 *         format: date-time
 *       ubicacion:
 *         description: Ubicación en la que el activo estará una vez ejecutado el movimiento.
 *         type: integer
 *       cod_empresa:
 *         description: Código de la empresa la cual pertenece el movimiento.
 *         type: string
 *       n_activo:
 *         description: Número de activo que involucra el movimiento.
 *         type: string
 *       cod_personal_involucrado:
 *         description: Código del personal que involucra este movimiento.
 *         type: string
 *       cod_usuario_aprobador:
 *         description: Código del usuario que realizó el movimiento.
 *         type: string
 *       created_at:
 *         description: Fecha a la que el activo fue ingresado al sistema.
 *         type: string
 *         format: date-time
 *       ubicacion_geografica:
 *         description: Ubicación geográfica a la que fue asignada este activo.
 *         type: string
 *       ubicacion_administrativa:
 *         description: Ubicación administrativa a la que fue asignada este activo.
 *         type: string
 *       departamento:
 *         description: Departamento al que pertenece el activo.
 *         type: number
 */