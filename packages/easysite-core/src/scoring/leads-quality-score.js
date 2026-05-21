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

class LeadsQualityScorer {
  constructor() {
    // Pesos do modelo
    this.weights = {
      engagement: 0.4,
      profile: 0.3,
      temporal: 0.2,
      source: 0.1
    };

    // Thresholds de qualidade
    this.thresholds = {
      timeOnPage: 120, // segundos
      minClicks: 1,
      scrollDepth: 0.5, // 50%
      recencyHours: 24
    };

    // Configurações por vertical/canal
    this.locationWeights = {
      recife: 1.0,
      default: 0.6
    };

    this.deviceWeights = {
      desktop: 1.0,
      mobile: 0.7,
      tablet: 0.8
    };

    this.channelWeights = {
      tiktok: 1.0,
      instagram: 0.8,
      youtube: 0.7,
      organic: 0.6
    };

    this.businessCategoryWeights = {
      saude: 1.0,
      pet: 0.9,
      juridico: 0.95,
      default: 0.5
    };
  }

  /**
   * Calcula score de engajamento (0-1)
   * Dimensões: tempo na página, cliques, scroll depth, forms
   */
  calculateEngagementScore(lead) {
    const timeScore = Math.min(lead.timeOnPage / this.thresholds.timeOnPage, 1.0);
    const clickScore = Math.min(lead.clicks / 3, 1.0); // normaliza para 3 cliques = máx
    const scrollScore = lead.scrollDepth || 0;
    const formScore = lead.formsCompleted > 0 ? 1.0 : 0.0;

    // Média ponderada: tempo 40%, cliques 30%, scroll 20%, forms 10%
    const engagement = (timeScore * 0.4) + (clickScore * 0.3) + (scrollScore * 0.2) + (formScore * 0.1);

    return Math.min(engagement, 1.0);
  }

  /**
   * Calcula score de perfil (0-1)
   * Dimensões: localização, device, categoria de negócio
   */
  calculateProfileScore(lead) {
    const locationScore = this.locationWeights[lead.location?.toLowerCase()] || this.locationWeights.default;
    const deviceScore = this.deviceWeights[lead.device?.toLowerCase()] || this.deviceWeights.mobile;
    const categoryScore = this.businessCategoryWeights[lead.businessCategory?.toLowerCase()] || this.businessCategoryWeights.default;

    // Média: location 40%, device 30%, category 30%
    const profile = (locationScore * 0.4) + (deviceScore * 0.3) + (categoryScore * 0.3);

    return Math.min(profile, 1.0);
  }

  /**
   * Calcula score temporal (0-1)
   * Dimensões: recência, frequência de retorno
   */
  calculateTemporalScore(lead) {
    const now = new Date();
    const createdAt = new Date(lead.createdAt);
    const hoursSinceContact = (now - createdAt) / (1000 * 60 * 60);

    // Recência: leads < 24h = 1.0, decresce exponencialmente
    const recencyScore = Math.exp(-hoursSinceContact / 24);

    // Frequência de retorno (número de visitas)
    const frequencyScore = Math.min(lead.visitCount / 3, 1.0); // 3+ visitas = máx

    // Média: recência 70%, frequência 30%
    const temporal = (recencyScore * 0.7) + (frequencyScore * 0.3);

    return Math.min(temporal, 1.0);
  }

  /**
   * Calcula score de fonte (0-1)
   * Dimensões: canal origem, campanha, variant
   */
  calculateSourceScore(lead) {
    const channelScore = this.channelWeights[lead.channel?.toLowerCase()] || 0.5;
    const campaignBoost = lead.campaignPerformance?.conversionRate || 0.5; // 0-1
    const variantScore = lead.abVariant?.performance || 0.5; // 0-1

    // Média: channel 50%, campaign 30%, variant 20%
    const source = (channelScore * 0.5) + (campaignBoost * 0.3) + (variantScore * 0.2);

    return Math.min(source, 1.0);
  }

  /**
   * Calcula score total (0-100)
   */
  calculateScore(lead) {
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

  /**
   * Valida se o lead tem os campos necessários
   */
  validateLead(lead) {
    const required = [
      'id',
      'timeOnPage',
      'clicks',
      'scrollDepth',
      'formsCompleted',
      'location',
      'device',
      'businessCategory',
      'createdAt',
      'visitCount',
      'channel'
    ];

    return required.every(field => lead.hasOwnProperty(field));
  }

  /**
   * Retorna grade de qualidade
   */
  getGrade(score) {
    if (score >= 0.8) return 'A'; // High-intent
    if (score >= 0.6) return 'B'; // Medium-high
    if (score >= 0.4) return 'C'; // Medium
    if (score >= 0.2) return 'D'; // Low
    return 'F'; // Very Low
  }

  /**
   * Retorna recomendação de ação
   */
  getRecommendation(score) {
    if (score >= 0.8) return 'Ligar imediatamente - high intent';
    if (score >= 0.6) return 'Ligar hoje - warm lead';
    if (score >= 0.4) return 'Ligar esta semana - follow-up';
    if (score >= 0.2) return 'Nurture via email - cold lead';
    return 'Arquivar - muito baixa intenção';
  }

  /**
   * Calcula scores em batch para múltiplos leads
   */
  scoreLeads(leads) {
    return leads.map(lead => ({
      ...lead,
      scoringResult: this.calculateScore(lead)
    })).sort((a, b) => b.scoringResult.totalScore - a.scoringResult.totalScore);
  }
}

module.exports = LeadsQualityScorer;
