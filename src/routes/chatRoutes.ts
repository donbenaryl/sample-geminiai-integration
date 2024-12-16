import { Router } from 'express';
import { chatController } from '../controllers/chatController';

const router = Router();

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat message
 *     tags: [Chats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               comparisonId:
 *                 type: integer
 *               caseId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Chat message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The chat message ID
 *                 message:
 *                   type: string
 *                   description: The chat message content
 *                 comparisonId:
 *                   type: integer
 *                   description: The comparison ID
 *                 caseId:
 *                   type: integer
 *                   description: The case ID
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Creation timestamp
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */
router.post('/', chatController.createChat);

export const chatRoutes = router; 