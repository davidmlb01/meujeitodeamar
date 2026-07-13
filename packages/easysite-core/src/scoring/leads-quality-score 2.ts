/**
 * EasySite Leads Quality Scoring Engine
 *
 * Score Model:
 * score = (engagement × 0.4) + (profile × 0.3) + (temporal × 0.2) + (source × 0.1)
 *
 * Usage:
 * const scorer = new LeadsQualityScorer();
 * const score = scorer.calculateScore(leadData);
 */

interface Lead {
  id: string;
  timeOnPage: number;
  clicks: number;
  scrollDepth: number;
  formsCompleted: number;
  location?: string;
  device?: string;
  businessCategory?: string;
  createdAt: string | Date;
  visitCount: number;
  channel?: string;
  campaignPerformance?: { conversionRate?: number };
  abVariant?: { performance?: number };
}

interface ScoreResult {
  totalScore: number;
  scores: {
    engagement: number;
    profile: number;
    temporal: number;
    source: number;
  };
  grade: string;
  recommendation: string;
}

interface ScoredLead extends Lead {
  scoringResult: ScoreResult;
}

export class LeadsQualityScorer {
  private weights = {
    engagement: 0.4,
    profile: 0.3,
    temporal: 0.2,
    source: 0.1
  };

  private thresholds = {
    timeOnPage: 120,
    minClicks: 1,
    scrollDepth: 0.5,
    recencyHours: 24
  };

  private locationWeights = {
    recife: 1.0,
    default: 0.6
  };

  private deviceWeights = {
    desktop: 1.0,
    mobile: 0.7,
    tablet: 0.8
  };

  private channelWeights = {
    tiktok: 1.0,
    instagram: 0.8,
    youtube: 0.7,
    organic: 0.6
  };

  private businessCategoryWeights = {
    saude: 1.0,
    pet: 0.9,
    juridico: 0.95,
    default: 0.5
  };

  calculateEngagementScore(lead: Lead): number {
    const timeScore = Math.min(lead.timeOnPage / this.thresholds.timeOnPage, 1.0);
    const clickScore = Math.min(lead.clicks / 3, 1.0);
    const scrollScore = lead.scrollDepth || 0;
    const formScore = lead.formsCompleted > 0 ? 1.0 : 0.0;

    const engagement = (timeScore * 0.4) + (clickScore * 0.3) + (scrollScore * 0.2) + (formScore * 0.1);
    return Math.min(engagement, 1.0);
  }

  calculateProfileScore(lead: Lead): number {
    const locationScore = this.locationWeights[
      (lead.location?.toLowerCase() as keyof typeof this.locationWeights) || 'default'
    ] || this.locationWeights.default;

    const deviceScore = this.deviceWeights[
      (lead.device?.toLowerCase() as keyof typeof this.deviceWeights) || 'mobile'
    ] || this.deviceWeights.mobile;

    const categoryScore = this.businessCategoryWeights[
      (lead.businessCategory?.toLowerCase() as keyof typeof this.businessCategoryWeights) || 'default'
    ] || this.businessCategoryWeights.default;

    const profile = (locationScore * 0.4) + (deviceScore * 0.3) + (categoryScore * 0.3);
    return Math.min(profile, 1.0);
  }

  calculateTemporalScore(lead: Lead): number {
    const now = new Date();
    const createdAt = new Date(lead.createdAt);
    const hoursSinceContact = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

    const recencyScore = Math.exp(-hoursSinceContact / 24);
    const frequencyScore = Math.min(lead.visitCount / 3, 1.0);

    const temporal = (recencyScore * 0.7) + (frequencyScore * 0.3);
    return Math.min(temporal, 1.0);
  }

  calculateSourceScore(lead: Lead): number {
    const channelScore = this.channelWeights[
      (lead.channel?.toLowerCase() as keyof typeof this.channelWeights) || 'organic'
    ] || 0.5;

    const campaignBoost = lead.campaignPerformance?.conversionRate || 0.5;
    const variantScore = lead.abVariant?.performance || 0.5;

    const source = (channelScore * 0.5) + (campaignBoost * 0.3) + (variantScore * 0.2);
    return Math.min(source, 1.0);
  }

  private validateLead(lead: Lead): boolean {
    const required = [
      'id',
      'timeOnPage',
      'clicks',
      'scrollDepth',
      'formsCompleted',
      'createdAt',
      'visitCount'
    ];

    return required.every(field => field in lead && (lead as any)[field] !== undefined);
  }

  private getGrade(score: number): string {
    if (score >= 0.8) return 'A';
    if (score >= 0.6) return 'B';
    if (score >= 0.4) return 'C';
    if (score >= 0.2) return 'D';
    return 'F';
  }

  private getRecommendation(score: number): string {
    if (score >= 0.8) return 'Ligar imediatamente - high intent';
    if (score >= 0.6) return 'Ligar hoje - warm lead';
    if (score >= 0.4) return 'Ligar esta semana - follow-up';
    if (score >= 0.2) return 'Nurture via email - cold lead';
    return 'Arquivar - muito baixa intenção';
  }

  calculateScore(lead: Lead): ScoreResult {
    if (!this.validateLead(lead)) {
      throw new Error('Lead data inválido ou incompleto');
    }

    const engagement = this.calculateEngagementScore(lead);
    const profile = this.calculateProfileScore(lead);
    const temporal = this.calculateTemporalScore(lead);
    const source = this.calculateSourceScore(lead);

    const weightedScore =
      (engagement * this.weights.engagement) +
      (profile * this.weights.profile) +
      (temporal * this.weights.temporal) +
      (source * this.weights.source);

    return {
      totalScore: Math.round(weightedScore * 100),
      scores: {
        engagement: Math.round(engagement * 100),
        profile: Math.round(profile * 100),
        temporal: Math.round(temporal * 100),
        source: Math.round(source * 100)
      },
      grade: this.getGrade(weightedScore),
      recommendation: this.getRecommendation(weightedScore)
    };
  }

  scoreLeads(leads: Lead[]): ScoredLead[] {
    return leads.map(lead => ({
      ...lead,
      scoringResult: this.calculateScore(lead)
    })).sort((a, b) => b.scoringResult.totalScore - a.scoringResult.totalScore);
  }
}

export { Lead, ScoreResult, ScoredLead };
