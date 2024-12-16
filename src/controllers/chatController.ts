import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { aiService } from '../services/aiService';
import { CreateChatSchema } from '../types/schemas';

const prisma = new PrismaClient();

class ChatController {
  async createChat(req: Request, res: Response) {
    try {
      const validation = CreateChatSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error });
      }

      const { message, comparisonId, caseId } = validation.data;

      let context = '';
      if (comparisonId) {
        const comparison = await prisma.comparison.findUnique({
          where: { id: comparisonId },
        });
        context = `Previous comparison:\nDifferences: ${comparison?.differences}\nResult: ${comparison?.result}`;
      } else if (caseId) {
        const case_ = await prisma.case.findUnique({
          where: { id: caseId },
        });
        context = `Case: ${case_?.description}`;
      }

      const response = await aiService.continueChat(context, message);

      const chat = await prisma.chat.create({
        data: {
          message,
          response,
          comparisonId,
          caseId,
        },
      });

      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create chat' });
    }
  }
}

export const chatController = new ChatController(); 