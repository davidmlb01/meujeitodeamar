/**
 * Tests for POST /api/leads/score route
 */

import express from 'express';
import request from 'supertest';
import leadsScoreRouter from '../../src/routes/leads/score';

describe('POST /api/leads/score', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', leadsScoreRouter);
  });

  describe('Validation', () => {
    it('should reject empty leads array', async () => {
      const response = await request(app)
        .post('/')
        .send({ leads: [] });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toContain('validação');
    });

    it('should reject request without leads array', async () => {
      const response = await request(app)
        .post('/')
        .send({ data: 'invalid' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject lead with missing required field', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'test',
              timeOnPage: 100,
              // missing clicks
              scrollDepth: 0.5,
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 1
            }
          ]
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should accept lead with valid data', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'lead-001',
              timeOnPage: 120,
              clicks: 3,
              scrollDepth: 0.8,
              formsCompleted: 1,
              createdAt: new Date().toISOString(),
              visitCount: 2,
              location: 'Recife',
              device: 'desktop',
              businessCategory: 'saude',
              channel: 'tiktok',
              campaignPerformance: { conversionRate: 0.8 },
              abVariant: { performance: 0.7 }
            }
          ]
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should accept optional fields', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'lead-minimal',
              timeOnPage: 50,
              clicks: 1,
              scrollDepth: 0.3,
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 1
              // location, device, businessCategory, channel all optional
            }
          ]
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it('should reject scrollDepth > 1', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'test',
              timeOnPage: 100,
              clicks: 2,
              scrollDepth: 1.5, // invalid
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 1
            }
          ]
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject invalid device enum', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'test',
              timeOnPage: 100,
              clicks: 2,
              scrollDepth: 0.5,
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 1,
              device: 'xbox' // invalid
            }
          ]
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('should reject more than 1000 leads', async () => {
      const leads = Array.from({ length: 1001 }, (_, i) => ({
        id: `lead-${i}`,
        timeOnPage: 100,
        clicks: 2,
        scrollDepth: 0.5,
        formsCompleted: 0,
        createdAt: new Date().toISOString(),
        visitCount: 1
      }));

      const response = await request(app)
        .post('/')
        .send({ leads });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Scoring', () => {
    it('should return scored leads in descending order', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'low-quality',
              timeOnPage: 10,
              clicks: 0,
              scrollDepth: 0.1,
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 0
            },
            {
              id: 'high-quality',
              timeOnPage: 240,
              clicks: 8,
              scrollDepth: 0.95,
              formsCompleted: 1,
              createdAt: new Date().toISOString(),
              visitCount: 4,
              location: 'Recife',
              device: 'desktop',
              businessCategory: 'saude',
              channel: 'tiktok',
              campaignPerformance: { conversionRate: 0.85 },
              abVariant: { performance: 0.8 }
            }
          ]
        });

      expect(response.status).toBe(200);
      expect(response.body.data.scoredLeads).toHaveLength(2);
      expect(response.body.data.scoredLeads[0].id).toBe('high-quality');
      expect(response.body.data.scoredLeads[1].id).toBe('low-quality');
      expect(response.body.data.scoredLeads[0].scoringResult.totalScore).toBeGreaterThan(
        response.body.data.scoredLeads[1].scoringResult.totalScore
      );
    });

    it('should return complete scoring result', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'test-lead',
              timeOnPage: 120,
              clicks: 3,
              scrollDepth: 0.8,
              formsCompleted: 1,
              createdAt: new Date().toISOString(),
              visitCount: 2
            }
          ]
        });

      const lead = response.body.data.scoredLeads[0];

      expect(lead.scoringResult).toHaveProperty('totalScore');
      expect(lead.scoringResult).toHaveProperty('scores');
      expect(lead.scoringResult.scores).toHaveProperty('engagement');
      expect(lead.scoringResult.scores).toHaveProperty('profile');
      expect(lead.scoringResult.scores).toHaveProperty('temporal');
      expect(lead.scoringResult.scores).toHaveProperty('source');
      expect(lead.scoringResult).toHaveProperty('grade');
      expect(lead.scoringResult).toHaveProperty('recommendation');
    });

    it('should include summary statistics', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'lead-1',
              timeOnPage: 100,
              clicks: 2,
              scrollDepth: 0.5,
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 1
            },
            {
              id: 'lead-2',
              timeOnPage: 200,
              clicks: 5,
              scrollDepth: 0.9,
              formsCompleted: 1,
              createdAt: new Date().toISOString(),
              visitCount: 3,
              location: 'Recife',
              device: 'desktop',
              businessCategory: 'saude',
              channel: 'tiktok'
            }
          ]
        });

      expect(response.body.data).toHaveProperty('count');
      expect(response.body.data.count).toBe(2);
      expect(response.body.data).toHaveProperty('summary');
      expect(response.body.data.summary).toHaveProperty('averageScore');
      expect(response.body.data.summary).toHaveProperty('gradeDistribution');
      expect(response.body.data.summary.gradeDistribution).toHaveProperty('A');
      expect(response.body.data.summary.gradeDistribution).toHaveProperty('B');
      expect(response.body.data.summary.gradeDistribution).toHaveProperty('C');
      expect(response.body.data.summary.gradeDistribution).toHaveProperty('D');
      expect(response.body.data.summary.gradeDistribution).toHaveProperty('F');
    });
  });

  describe('Error handling', () => {
    it('should reject request with invalid JSON structure', async () => {
      const response = await request(app)
        .post('/')
        .send({ invalidKey: 'no leads array' });

      // Should return 400 for validation error
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('Response format', () => {
    it('should return JSON with success flag', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'test',
              timeOnPage: 100,
              clicks: 2,
              scrollDepth: 0.5,
              formsCompleted: 0,
              createdAt: new Date().toISOString(),
              visitCount: 1
            }
          ]
        });

      expect(response.type).toMatch(/json/);
      expect(response.body).toHaveProperty('success');
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
    });

    it('should preserve lead properties in response', async () => {
      const response = await request(app)
        .post('/')
        .send({
          leads: [
            {
              id: 'preserve-test',
              timeOnPage: 150,
              clicks: 4,
              scrollDepth: 0.7,
              formsCompleted: 1,
              createdAt: new Date().toISOString(),
              visitCount: 2,
              location: 'Recife',
              businessCategory: 'saude'
            }
          ]
        });

      const lead = response.body.data.scoredLeads[0];

      expect(lead.id).toBe('preserve-test');
      expect(lead.timeOnPage).toBe(150);
      expect(lead.clicks).toBe(4);
      expect(lead.location).toBe('Recife');
      expect(lead.businessCategory).toBe('saude');
    });
  });
});
