import { Router } from 'express';
import { comparisonController } from '../controllers/comparisonController';

const router = Router();

/**
 * @swagger
 * /api/comparisons:
 *   post:
 *     summary: Compare two cases
 *     tags: [Comparisons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               case1Id:
 *                 type: integer
 *               case2Id:
 *                 type: integer
 *             required:
 *               - case1Id
 *               - case2Id
 *     responses:
 *       200:
 *         description: Successful comparison
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 case1:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     # Add other case properties here
 *                 case2:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     # Add other case properties here
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Cases not found
 *       500:
 *         description: Server error
 */
router.post('/', comparisonController.compareCase);

/**
 * @swagger
 * /api/comparisons/{id}:
 *   get:
 *     summary: Get comparison by ID
 *     tags: [Comparisons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Comparison ID
 *     responses:
 *       200:
 *         description: Successful retrieval of comparison
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 case1:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     # Add other case properties here
 *                 case2:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     # Add other case properties here
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Comparison not found
 *       500:
 *         description: Server error
 */
router.get('/:id', comparisonController.getComparisonById);

export const comparisonRoutes = router; 