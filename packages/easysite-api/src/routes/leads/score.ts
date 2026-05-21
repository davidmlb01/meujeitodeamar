/**
 * POST /api/leads/score
 * Score multiple leads with LeadsQualityScorer
 */

import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { LeadsQualityScorer, Lead, ScoredLead } from '../../easysite-core/src/scoring/leads-quality-score';

const router = Router();

// Zod schema for input validation
const LeadInputSchema = z.object({
  id: z.string().min(1, 'Lead ID é obrigatório'),
  timeOnPage: z.number().min(0, 'timeOnPage deve ser >= 0'),
  clicks: z.number().min(0, 'clicks deve ser >= 0'),
  scrollDepth: z.number().min(0).max(1, 'scrollDepth deve estar entre 0 e 1'),
  formsCompleted: z.number().min(0, 'formsCompleted deve ser >= 0'),
  createdAt: z.union([z.string().datetime(), z.date()], {
    errorMap: () => ({ message: 'createdAt deve ser ISO 8601 ou Date' })
  }),
  visitCount: z.number().min(0, 'visitCount deve ser >= 0'),
  location: z.string().optional(),
  device: z.enum(['desktop', 'mobile', 'tablet']).optional(),
  businessCategory: z.string().optional(),
  channel: z.enum(['tiktok', 'instagram', 'youtube', 'organic']).optional(),
  campaignPerformance: z.object({
    conversionRate: z.number().min(0).max(1).optional()
  }).optional(),
  abVariant: z.object({
    performance: z.number().min(0).max(1).optional()
  }).optional()
});

const ScoreLeadsRequestSchema = z.object({
  leads: z.array(LeadInputSchema).min(1, 'Deve haver pelo menos 1 lead para pontuar').max(1000, 'Máximo de 1000 leads por requisição')
});

type ScoreLeadsRequest = z.infer<typeof ScoreLeadsRequestSchema>;

/**
 * POST /api/leads/score
 * Score a batch of leads
 *
 * Request:
 * {
 *   "leads": [
 *     {
 *       "id": "lead-001",
 *       "timeOnPage": 240,
 *       "clicks": 5,
 *       "scrollDepth": 0.8,
 *       "formsCompleted": 1,
 *       "createdAt": "2026-05-10T12:00:00Z",
 *       "visitCount": 3,
 *       "location": "Recife",
 *       "device": "desktop",
 *       "businessCategory": "saude",
 *       "channel": "tiktok",
 *       "campaignPerformance": { "conversionRate": 0.8 },
 *       "abVariant": { "performance": 0.7 }
 *     }
 *   ]
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "data": {
 *     "scoredLeads": [
 *       {
 *         "id": "lead-001",
 *         "timeOnPage": 240,
 *         ...,
 *         "scoringResult": {
 *           "totalScore": 85,
 *           "scores": {
 *             "engagement": 90,
 *             "profile": 100,
 *             "temporal": 95,
 *             "source": 80
 *           },
 *           "grade": "A",
 *           "recommendation": "Ligar imediatamente - high intent"
 *         }
 *       }
 *     ]
 *   }
 * }
 */
router.post('/', (req: Request, res: Response) => {
  try {
    // Validate request payload
    const validation = ScoreLeadsRequestSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Erro de validação',
        details: validation.error.flatten()
      });
    }

    const { leads } = validation.data;

    // Convert dates to Date objects if they're strings
    const normalizedLeads: Lead[] = leads.map(lead => ({
      ...lead,
      createdAt: typeof lead.createdAt === 'string' ? new Date(lead.createdAt) : lead.createdAt
    }));

    // Instantiate scorer and process leads
    const scorer = new LeadsQualityScorer();

    try {
      const scoredLeads = scorer.scoreLeads(normalizedLeads);

      return res.status(200).json({
        success: true,
        data: {
          scoredLeads,
          count: scoredLeads.length,
          summary: {
            averageScore: Math.round(
              scoredLeads.reduce((sum: number, lead: ScoredLead) => sum + lead.scoringResult.totalScore, 0) /
              scoredLeads.length
            ),
            gradeDistribution: {
              A: scoredLeads.filter((l: ScoredLead) => l.scoringResult.grade === 'A').length,
              B: scoredLeads.filter((l: ScoredLead) => l.scoringResult.grade === 'B').length,
              C: scoredLeads.filter((l: ScoredLead) => l.scoringResult.grade === 'C').length,
              D: scoredLeads.filter((l: ScoredLead) => l.scoringResult.grade === 'D').length,
              F: scoredLeads.filter((l: ScoredLead) => l.scoringResult.grade === 'F').length
            }
          }
        }
      });
    } catch (scoringError: any) {
      return res.status(400).json({
        success: false,
        error: 'Erro ao processar scoring dos leads',
        message: scoringError.message
      });
    }
  } catch (error: any) {
    console.error('Erro ao processar requisição de scoring:', error);

    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message
    });
  }
});

export default router;
