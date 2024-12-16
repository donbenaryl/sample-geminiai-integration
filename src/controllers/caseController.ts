import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CreateCaseSchema } from '../types/schemas';

const prisma = new PrismaClient();

class CaseController {
  async createCase(req: Request, res: Response) {
    try {
      const validation = CreateCaseSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ error: validation.error });
      }

      const { title, description } = validation.data;
      const newCase = await prisma.case.create({
        data: {
          title,
          description,
        },
      });

      res.status(201).json(newCase);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create case' });
    }
  }

  async getAllCases(req: Request, res: Response) {
    try {
      const cases = await prisma.case.findMany();
      res.json(cases);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch cases' });
    }
  }

  async getCaseById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const case_ = await prisma.case.findUnique({
        where: { id: Number(id) },
      });

      if (!case_) {
        return res.status(404).json({ error: 'Case not found' });
      }

      res.json(case_);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch case' });
    }
  }
}

export const caseController = new CaseController(); 