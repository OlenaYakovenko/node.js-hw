import { Router } from 'express';
import { getHealthCheck } from '../../controllers/health-check-controller.js';

const healthCheckRoute = Router();

/**
 * @swagger
 * /health-check:
 *  get:
 *    summary: Check connection to the server
 *    responses:
 *       200:
 *         description: Server works message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: Server works
 *       404:
 *         description: Page is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Can't find this page
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

healthCheckRoute.get('/', getHealthCheck);

export { healthCheckRoute };
