#!/usr/bin/env node
/**
 * Kanban Server — serve o kanban com drag-drop que salva nos MASTER-BACKUPs
 * Uso: node tools/kanban-server.cjs
 * Abre: http://localhost:3777
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3777;
const GEN = path.join(__dirname, 'kanban-gen.cjs');

// ─── Atualiza status no MASTER-BACKUP ────────────────────────────────────────
function updateTaskStatus(filePath, taskText, newStatus) {
  if (!fs.existsSync(filePath)) {
    return { ok: false, error: `Arquivo não encontrado: ${filePath}` };
  }

  const markers = { todo: '[ ]', doing: '[~]', done: '[x]' };
  const newMarker = markers[newStatus];
  if (!newMarker) return { ok: false, error: `Status inválido: ${newStatus}` };

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // normaliza o texto para comparação
  const normalize = s => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  const needle = normalize(taskText);

  let found = false;
  const updated = lines.map(line => {
    const m = line.match(/^([-*]\s+)\[[ ~x]\]\s+(.+)$/i);
    if (!m) return line;
    if (normalize(m[2]) === needle) {
      found = true;
      return `${m[1]}${newMarker} ${m[2]}`;
    }
    return line;
  });

  if (!found) return { ok: false, error: `Tarefa não encontrada: "${taskText}"` };

  fs.writeFileSync(filePath, updated.join('\n'), 'utf8');
  return { ok: true };
}

// ─── Regenera o HTML ─────────────────────────────────────────────────────────
function regenerate() {
  // limpa cache do require para forçar re-execução
  delete require.cache[require.resolve(GEN)];
  try {
    require(GEN);
    return true;
  } catch (e) {
    console.error('Erro ao regenerar:', e.message);
    return false;
  }
}

// ─── Server ──────────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Serve o HTML
  if (req.method === 'GET' && (req.url === '/' || req.url === '/kanban')) {
    regenerate();
    const htmlPath = path.join(__dirname, 'kanban.html');
    if (!fs.existsSync(htmlPath)) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('kanban.html não encontrado — rode kanban-gen.cjs primeiro');
      return;
    }
    res.writeHead(200, { ...corsHeaders, 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.readFileSync(htmlPath, 'utf8'));
    return;
  }

  // API: mover tarefa
  if (req.method === 'POST' && req.url === '/update-task') {
    let body = '';
    req.on('data', d => (body += d));
    req.on('end', () => {
      try {
        const { file, text, newStatus } = JSON.parse(body);
        const result = updateTaskStatus(file, text, newStatus);

        if (result.ok) {
          regenerate();
          console.log(`  ✓ [${newStatus.toUpperCase()}] ${text.slice(0, 60)}`);
        } else {
          console.error(`  ✗ ${result.error}`);
        }

        res.writeHead(result.ok ? 200 : 400, {
          ...corsHeaders,
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400, { ...corsHeaders, 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404, corsHeaders);
  res.end('Not found');
});

server.listen(PORT, () => {
  regenerate();
  console.log(`\nKanban server rodando em http://localhost:${PORT}`);
  console.log('Drag-drop salva automaticamente nos MASTER-BACKUPs');
  console.log('Ctrl+C para parar\n');

  // abre no browser automaticamente
  const { exec } = require('child_process');
  exec(`open http://localhost:${PORT}`);
});
