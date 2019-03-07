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
 *         type: string
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
 *         description: Fecha a la que el movimiento fue creado.
 *         type: string
 *         format: date-time
 *       ubicacion_geografica:
 *         description: Ubicación geográfica a la que fue asignada este activo.
 *         type: string
 *       ubicacion_administrativa:
 *         description: Ubicación administrativa a la que fue asignada este activo.
 *         type: string
 *       departamento:
 *         description: Departamento al que fue asignado el activo.
 *         type: number
 */


 /**
 * @swagger
 * definitions:
 *   MovimientoConUser:
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
 *         type: string
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
 *       ubicacion_geografica:
 *         description: Ubicación geográfica a la que fue asignada este activo.
 *         type: string
 *       ubicacion_administrativa:
 *         description: Ubicación administrativa a la que fue asignada este activo.
 *         type: string
 *       departamento:
 *         description: Departamento al que fue asignado el activo.
 *         type: number
 *       fecha_movimiento:
 *         description: Fecha a la que el movimiento fue creado.
 *         type: string
 *         format: date-time
 *       cedula_usuario:
 *         description: Cédula del usuario que realizó el movimiento.
 *         type: string
 *       nombre_usuario:
 *         description: Nombre del usuario que realizó el movimiento.
 *         type: string
 *       apellido_usuario:
 *         description: Apellido del usuario que realizó el movimiento.
 *         type: string
 *       cargo_user:
 *         description: Cargo del usuario que realizó el movimiento.
 *         type: string
 *       cedula_personal:
 *         description: Cédula del personal involucrado en el movimiento.
 *         type: string
 *       nombre_personal:
 *         description: Nombre del personal involucrado en el movimiento.
 *         type: number
 *       apellido_personal:
 *         description: Apellido del personal involucrado en el movimiento.
 *         type: string
 *       telefono_habitacion_personal:
 *         description: Teléfono de habitación del personal involucrado en el movimiento.
 *         type: number
 *       telefono_movil_personal:
 *         description: Teléfono móvil del personal involucrado en el movimiento.
 *         type: string
 */