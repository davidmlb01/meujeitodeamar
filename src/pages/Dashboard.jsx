'use client'

import React, { useState } from 'react'
import './Dashboard.css'

const CAMPAIGNS_DATA = [
  {
    date: '11/05/2026',
    campaign: '[PRE PRE ANUNCIO VENDEDOR ADS 2]',
    reach: 1086,
    impressions: 1275,
    cpm: 32.20,
    clicks: 30,
    ctr: 2.35,
    lpViews: 26,
    checkoutInitiated: 4,
    lpToCheckout: 15.38,
    purchases: 2,
    checkoutToCompra: 50.0,
    revenue: 63.10,
    spent: 41.05,
    profit: 1.54,
    profitMargin: 0.54,
    roas: 1.54,
    ticketAverage: 65.10,
  },
]

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState(CAMPAIGNS_DATA)
  const [csvInput, setCsvInput] = useState('')

  const handleAddCampaign = () => {
    if (!csvInput.trim()) return
    const lines = csvInput.trim().split('\n')
    const headers = lines[0].split(',').map(h => h.trim())

    const newCampaigns = []
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim())
      if (values.length > 1) {
        newCampaigns.push({
          date: values[0],
          campaign: values[2],
          reach: parseInt(values[4]),
          impressions: parseInt(values[5]),
          cpm: parseFloat(values[6]),
          clicks: parseInt(values[10]),
          ctr: parseFloat(values[9]),
          lpViews: parseInt(values[12]),
          checkoutInitiated: parseInt(values[15]),
          lpToCheckout: parseFloat(values[14]),
          purchases: parseInt(values[17]),
          checkoutToCompra: parseFloat(values[21]),
          revenue: parseFloat(values[20]),
          spent: parseFloat(values[24]),
          profit: parseFloat(values[25]),
          profitMargin: parseFloat(values[26]),
          roas: parseFloat(values[22]),
          ticketAverage: parseFloat(values[28]),
        })
      }
    }
    setCampaigns([...campaigns, ...newCampaigns])
    setCsvInput('')
  }

  const totalMetrics = {
    spent: campaigns.reduce((sum, c) => sum + c.spent, 0),
    revenue: campaigns.reduce((sum, c) => sum + c.revenue, 0),
    profit: campaigns.reduce((sum, c) => sum + c.profit, 0),
    purchases: campaigns.reduce((sum, c) => sum + c.purchases, 0),
    clicks: campaigns.reduce((sum, c) => sum + c.clicks, 0),
    impressions: campaigns.reduce((sum, c) => sum + c.impressions, 0),
    avgRoas: campaigns.length > 0 ? (campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length).toFixed(2) : 0,
  }

  const profitMargin = totalMetrics.revenue > 0 ? ((totalMetrics.profit / totalMetrics.revenue) * 100).toFixed(2) : 0

  const downloadPDF = () => {
    const element = document.getElementById('dashboard-content')
    const opt = {
      margin: 10,
      filename: 'freud-dashboard.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
    }
    // Requer html2pdf library — fallback para JSON export
    const data = JSON.stringify({ campaigns, metrics: totalMetrics }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'freud-dashboard-data.json'
    link.click()
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>📊 Freud Campanha Dashboard</h1>
        <p>Acompanhe ROAS, Lucro e Conversão em tempo real</p>
      </header>

      {/* Metrics Cards */}
      <section className="dashboard__metrics">
        <div className="metric-card">
          <h3>Lucro Total</h3>
          <p className="metric-value" style={{ color: totalMetrics.profit > 0 ? '#10B981' : '#EF4444' }}>
            R$ {totalMetrics.profit.toFixed(2)}
          </p>
          <span className="metric-label">{profitMargin}% margem</span>
        </div>

        <div className="metric-card">
          <h3>ROAS Médio</h3>
          <p className="metric-value" style={{ color: totalMetrics.avgRoas >= 1.5 ? '#10B981' : '#F59E0B' }}>
            {totalMetrics.avgRoas}x
          </p>
          <span className="metric-label">retorno sobre gasto</span>
        </div>

        <div className="metric-card">
          <h3>Compras</h3>
          <p className="metric-value">{totalMetrics.purchases}</p>
          <span className="metric-label">{totalMetrics.clicks > 0 ? ((totalMetrics.purchases / totalMetrics.clicks) * 100).toFixed(1) : 0}% de cliques</span>
        </div>

        <div className="metric-card">
          <h3>Gasto em Ads</h3>
          <p className="metric-value">R$ {totalMetrics.spent.toFixed(2)}</p>
          <span className="metric-label">{totalMetrics.impressions} impressões</span>
        </div>

        <div className="metric-card">
          <h3>Receita</h3>
          <p className="metric-value">R$ {totalMetrics.revenue.toFixed(2)}</p>
          <span className="metric-label">{totalMetrics.purchases} vendas</span>
        </div>

        <div className="metric-card">
          <h3>CTR Médio</h3>
          <p className="metric-value">
            {campaigns.length > 0 ? ((campaigns.reduce((sum, c) => sum + c.ctr, 0) / campaigns.length).toFixed(2)) : 0}%
          </p>
          <span className="metric-label">cliques por impressão</span>
        </div>
      </section>

      {/* Funnel Analysis */}
      <section className="dashboard__funnel">
        <h2>🔗 Funil de Conversão</h2>
        <div className="funnel-chart">
          {campaigns.map((c, i) => {
            const funnelData = [
              { label: 'Impressões', value: c.impressions, color: '#3B82F6' },
              { label: 'Cliques', value: c.clicks, color: '#06B6D4' },
              { label: 'Landing Page', value: c.lpViews, color: '#10B981' },
              { label: 'Checkout', value: c.checkoutInitiated, color: '#F59E0B' },
              { label: 'Compra', value: c.purchases, color: '#10B981' },
            ]
            const maxValue = Math.max(...funnelData.map(d => d.value))
            return (
              <div key={i} className="funnel-item">
                <h3 className="funnel-title">{c.date}</h3>
                {funnelData.map((stage, j) => (
                  <div key={j} className="funnel-stage">
                    <div className="stage-bar" style={{
                      width: `${(stage.value / maxValue) * 100}%`,
                      backgroundColor: stage.color,
                    }}>
                      <span className="stage-label">{stage.label}: {stage.value}</span>
                    </div>
                    <span className="stage-percent">
                      {j > 0 ? `${((stage.value / funnelData[j - 1].value) * 100).toFixed(1)}%` : ''}
                    </span>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </section>

      {/* Table */}
      <section className="dashboard__table">
        <h2>📋 Histórico de Campanhas</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Cliques</th>
                <th>CTR</th>
                <th>LP → Checkout</th>
                <th>Checkout → Compra</th>
                <th>Gasto</th>
                <th>Receita</th>
                <th>Lucro</th>
                <th>ROAS</th>
                <th>Ticket</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i}>
                  <td>{c.date}</td>
                  <td>{c.clicks}</td>
                  <td>{c.ctr.toFixed(2)}%</td>
                  <td>{c.lpToCheckout.toFixed(1)}%</td>
                  <td>{c.checkoutToCompra.toFixed(1)}%</td>
                  <td>R$ {c.spent.toFixed(2)}</td>
                  <td>R$ {c.revenue.toFixed(2)}</td>
                  <td style={{ color: c.profit > 0 ? '#10B981' : '#EF4444' }}>
                    R$ {c.profit.toFixed(2)}
                  </td>
                  <td>{c.roas.toFixed(2)}x</td>
                  <td>R$ {c.ticketAverage.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CSV Import */}
      <section className="dashboard__import">
        <h2>➕ Adicionar Dados</h2>
        <p>Cole aqui as linhas do CSV do Meta Ads (a partir da linha de dados)</p>
        <textarea
          className="csv-input"
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder="2026-05-12,2026-05-12,&quot;Campanha&quot;,active,1086,1275,32.20..."
        />
        <button className="btn-add" onClick={handleAddCampaign}>
          ✓ Adicionar Campanhas
        </button>
        <button className="btn-export" onClick={downloadPDF}>
          📥 Exportar Dados (JSON)
        </button>
      </section>

      {/* Footer */}
      <footer className="dashboard__footer">
        <p>💡 Dashboard atualiza em tempo real. Copie a linha completa do CSV do Meta Ads e cole acima.</p>
      </footer>
    </div>
  )
}
