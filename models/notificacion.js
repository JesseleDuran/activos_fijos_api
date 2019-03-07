/**
 * @swagger
 * definitions:
 *   Notificacion:
 *     type: object
 *     properties:
 *       id:
 *         description: Identificador de la notificación.
 *         type: integer
 *       tipo:
 *         description: Código del error.
 *         type: string
 *         enum: ['fin_prestamo', 'fin_vida_util']
 *       data:
 *         description: Datos que involucran la notificación.
 *         type: string
 *       created_at:
 *         description: Fecha en la que se creó la notificación.
 *         type: string
 *         format: date-time
 */

