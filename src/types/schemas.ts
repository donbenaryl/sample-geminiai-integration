import { z } from 'zod';

export const CreateCaseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const CompareSchema = z.object({
  case1Id: z.number().int().positive(),
  case2Id: z.number().int().positive(),
});

export const CreateChatSchema = z.object({
  message: z.string().min(1),
  comparisonId: z.number().int().positive().optional(),
  caseId: z.number().int().positive().optional(),
}).refine(data => data.comparisonId || data.caseId, {
  message: "Either comparisonId or caseId must be provided"
}); 