import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { aiService } from "../services/aiService";
import { CompareSchema } from "../types/schemas";

const prisma = new PrismaClient();

class ComparisonController {
	async compareCase(req: Request, res: Response) {
		try {
			const validation = CompareSchema.safeParse(req.body);
			if (!validation.success) {
				return res.status(400).json({ error: validation.error });
			}

			const { case1Id, case2Id } = validation.data;

			const [case1, case2] = await Promise.all([
				prisma.cases.findUnique({ where: { id: case1Id } }),
				prisma.cases.findUnique({ where: { id: case2Id } }),
			]);

			if (!case1 || !case2) {
				return res
					.status(404)
					.json({ error: "One or both cases not found" });
			}

			const { differences, result } = await aiService.compareCases(
				case1.content,
				case2.content
			);

			const comparison = await prisma.comparisons.create({
				data: {
					case1Id,
					case2Id,
					differences,
					result,
				},
			});

			res.status(201).json(comparison);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Failed to compare cases" });
		}
	}

	async getComparisonById(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const comparison = await prisma.comparisons.findUnique({
				where: { id: Number(id) },
			});

			if (!comparison) {
				return res.status(404).json({ error: "Comparison not found" });
			}

			res.json(comparison);
		} catch (error) {
			res.status(500).json({ error: "Failed to fetch comparison" });
		}
	}
}

export const comparisonController = new ComparisonController();
