import { Router } from 'express';
import { caseController } from '../controllers/caseController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     cases:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         year:
 *           type: string
 *         month:
 *           type: string
 *         url:
 *           type: string
 *         case_date:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/cases:
 *   post:
 *     summary: Create a new case
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               year:
 *                 type: string
 *               month:
 *                 type: string
 *               case_date:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Case created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cases'
 */
router.post('/', caseController.createCase);

/**
 * @swagger
 * /api/cases:
 *   get:
 *     summary: Get all cases
 *     tags: [Cases]
 *     responses:
 *       200:
 *         description: List of all cases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/cases'
 */
router.get('/', caseController.getAllCases);

/**
 * @swagger
 * /api/cases/{id}:
 *   get:
 *     summary: Get a case by ID
 *     tags: [Cases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Case found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/cases'
 *       404:
 *         description: Case not found
 */
router.get('/:id', caseController.getCaseById);

export const caseRoutes = router; 