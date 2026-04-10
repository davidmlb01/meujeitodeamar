#!/usr/bin/env node
/**
 * Kanban Generator — lê MASTER-BACKUPs e gera HTML estilo Trello
 * Uso: node tools/kanban-gen.js
 * Saída: tools/kanban.html (abrir no browser)
 */

const fs = require('fs');
const path = require('path');

// ─── Configuração dos projetos ───────────────────────────────────────────────
const PROJECTS = [
  {
    id: 'freud',
    name: 'Freud / MJDA',
    tag: 'MJDA',
    color: '#f97316',
    file: path.join(__dirname, '../docs/MASTER-BACKUP.md'),
  },
  {
    id: 'easysite',
    name: 'EasySite',
    tag: 'EASYSITES',
    color: '#3b82f6',
    file: path.join(__dirname, '../docs/easysite/MASTER-BACKUP.md'),
  },
  {
    id: 'destaka',
    name: 'Destaka',
    tag: 'DESTAKA',
    color: '#22c55e',
    file: '/Users/davidlevy/Desktop/PJ/GMM/docs/MASTER-BACKUP.md',
  },
  {
    id: 'unlmtd',
    name: 'UNLMTD',
    tag: 'UNLMTD',
    color: '#a855f7',
    file: null, // sem MASTER-BACKUP com checkboxes
    staticTodo: [
      'Execução do brandbook em Figma',
      'Licenciar fontes Canela Display + Neue Haas Grotesk',
      'Definir arquitetura de produto UNLMTD',
    ],
    staticDone: [
      'Brandbook HTML completo (specs prontas)',
      'Paleta secundária aprovada (Terra + Ouro + Grafite)',
      'Fontes confirmadas por David',
    ],
  },
];

// ─── Parser de checkboxes ────────────────────────────────────────────────────
function parseCheckboxes(filePath, project) {
  if (!filePath || !fs.existsSync(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const tasks = [];
  let currentSection = '';

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentSection = line.replace(/^## /, '').trim();
    } else if (line.startsWith('### ')) {
      currentSection = line.replace(/^### /, '').trim();
    }

    const todoMatch = line.match(/^[-*]\s+\[ \]\s+(.+)$/);
    const doingMatch = line.match(/^[-*]\s+\[~\]\s+(.+)$/);
    const doneMatch = line.match(/^[-*]\s+\[x\]\s+(.+)$/i);

    if (todoMatch) {
      tasks.push({
        text: todoMatch[1].replace(/\*\*/g, '').trim(),
        status: 'todo',
        section: currentSection,
        project,
      });
    } else if (doingMatch) {
      tasks.push({
        text: doingMatch[1].replace(/\*\*/g, '').trim(),
        status: 'doing',
        section: currentSection,
        project,
      });
    } else if (doneMatch) {
      tasks.push({
        text: doneMatch[1].replace(/\*\*/g, '').trim(),
        status: 'done',
        section: currentSection,
        project,
      });
    }
  }

  return tasks;
}

// ─── Agrupa todas as tarefas ─────────────────────────────────────────────────
function getAllTasks() {
  const todo = [];
  const doing = [];
  const done = [];

  for (const project of PROJECTS) {
    const tasks = parseCheckboxes(project.file, project);

    // Static tasks (para projetos sem MASTER-BACKUP com checkboxes)
    if (project.staticTodo) {
      project.staticTodo.forEach(text =>
        tasks.push({ text, status: 'todo', section: 'Geral', project })
      );
    }
    if (project.staticDoing) {
      project.staticDoing.forEach(text =>
        tasks.push({ text, status: 'doing', section: 'Geral', project })
      );
    }
    if (project.staticDone) {
      project.staticDone.forEach(text =>
        tasks.push({ text, status: 'done', section: 'Geral', project })
      );
    }

    tasks.forEach(t => {
      if (t.status === 'done') done.push(t);
      else if (t.status === 'doing') doing.push(t);
      else todo.push(t);
    });
  }

  return { todo, doing, done };
}

// ─── Helpers HTML ────────────────────────────────────────────────────────────
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function cardHtml(task) {
  const p = task.project;
  const file = p.file ? escapeHtml(p.file) : '';
  return `
    <div class="card"
         data-project="${p.id}"
         data-file="${file}"
         data-text="${escapeHtml(task.text)}"
         data-status="${task.status}"
         draggable="true"
         ondragstart="onDragStart(event)">
      <div class="card-header">
        <span class="card-tag">
          <span class="card-dot" style="background:${p.color}"></span>
          ${escapeHtml(p.tag)}
        </span>
      </div>
      <div class="card-text">${escapeHtml(task.text)}</div>
      ${task.section ? `<div class="card-section">${escapeHtml(task.section)}</div>` : ''}
    </div>`;
}

// ─── Gera o HTML completo ─────────────────────────────────────────────────────
function generateHtml(todo, doing, done) {
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const projectFilters = PROJECTS.map(
    p =>
      `<button class="filter-btn active" data-filter="${p.id}" style="--accent:${p.color}" onclick="toggleFilter('${p.id}', this)">${p.tag}</button>`
  ).join('');

  const todoCards = todo.map(cardHtml).join('');
  const doingCards = doing.map(cardHtml).join('');
  const doneCards = done.map(cardHtml).join('');

  const stats = PROJECTS.map(p => {
    const ptodo = todo.filter(t => t.project.id === p.id).length;
    const pdoing = doing.filter(t => t.project.id === p.id).length;
    const pdone = done.filter(t => t.project.id === p.id).length;
    const total = ptodo + pdoing + pdone;
    const pct = total > 0 ? Math.round((pdone / total) * 100) : 0;
    return `
      <div class="stat-card">
        <div class="stat-top">
          <span class="stat-name" style="color:${p.color}">${p.tag}</span>
          <span class="stat-pct" style="color:${p.color}">${pct}%</span>
        </div>
        <div class="stat-track">
          <div class="stat-fill" style="width:${pct}%;background:${p.color}"></div>
        </div>
        <span class="stat-counts">${pdone} de ${total} concluidas${pdoing > 0 ? ` · ${pdoing} em andamento` : ''}</span>
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kanban — BIG HEAD</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:       #09090b;
    --surface:  #111113;
    --surface2: #18181b;
    --border:   #27272a;
    --border2:  #3f3f46;
    --text:     #fafafa;
    --muted:    #71717a;
    --muted2:   #52525b;
    --col-todo:  #f97316;
    --col-doing: #eab308;
    --col-done:  #22c55e;
    --radius:   12px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
  }

  /* ── Header ─────────────────────────────────────────────────────────── */
  .header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 28px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-left { display: flex; align-items: center; gap: 20px; }
  .header-logo {
    display: flex; align-items: center; gap: 10px;
  }
  .header-logo-mark {
    width: 28px; height: 28px; border-radius: 7px;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; color: white; letter-spacing: -1px;
  }
  .header-title { font-size: 15px; font-weight: 600; color: var(--text); letter-spacing: -0.3px; }
  .header-sep { width: 1px; height: 18px; background: var(--border2); }
  .header-date { font-size: 12px; color: var(--muted); font-weight: 400; }
  .header-right { display: flex; align-items: center; gap: 8px; }
  .pill {
    font-size: 11px; font-weight: 600; padding: 3px 9px;
    border-radius: 20px; border: 1px solid; letter-spacing: 0.1px;
    font-feature-settings: 'tnum';
  }
  .pill-todo  { color: var(--col-todo);  border-color: #f9731630; background: #f9731610; }
  .pill-doing { color: var(--col-doing); border-color: #eab30830; background: #eab30810; }
  .pill-done  { color: var(--col-done);  border-color: #22c55e30; background: #22c55e10; }

  /* ── Stats ──────────────────────────────────────────────────────────── */
  .stats {
    padding: 16px 28px;
    display: flex;
    gap: 12px;
    overflow-x: auto;
    border-bottom: 1px solid var(--border);
    background: var(--surface);
  }
  .stat-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    min-width: 160px;
    flex-shrink: 0;
    transition: border-color 0.2s;
  }
  .stat-card:hover { border-color: var(--border2); }
  .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .stat-name {
    font-size: 11px; font-weight: 600; letter-spacing: 0.5px;
    text-transform: uppercase; color: var(--muted);
  }
  .stat-pct {
    font-size: 13px; font-weight: 700;
    font-feature-settings: 'tnum';
  }
  .stat-track {
    height: 3px; background: var(--border2); border-radius: 2px; overflow: hidden;
    margin-bottom: 8px;
  }
  .stat-fill { height: 100%; border-radius: 2px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1); }
  .stat-counts { font-size: 11px; color: var(--muted2); font-feature-settings: 'tnum'; }

  /* ── Filters ────────────────────────────────────────────────────────── */
  .filters {
    padding: 10px 28px;
    display: flex;
    gap: 6px;
    align-items: center;
    border-bottom: 1px solid var(--border);
    background: var(--bg);
  }
  .filters-sep { width: 1px; height: 14px; background: var(--border2); margin: 0 4px; }
  .filter-btn {
    font-size: 11px; font-weight: 600; padding: 4px 10px;
    border-radius: 20px; cursor: pointer;
    transition: background 0.15s, border-color 0.15s, opacity 0.15s;
    border: 1px solid transparent;
    background: transparent;
    color: var(--muted);
    letter-spacing: 0.3px;
    font-family: inherit;
  }
  .filter-btn.active {
    color: var(--accent, var(--text));
    border-color: color-mix(in srgb, var(--accent, #fff) 35%, transparent);
    background: color-mix(in srgb, var(--accent, #fff) 10%, transparent);
  }
  .filter-btn:hover { opacity: 0.8; }

  /* ── Board ──────────────────────────────────────────────────────────── */
  .board {
    display: flex;
    gap: 14px;
    padding: 20px 28px 32px;
    overflow-x: auto;
    align-items: flex-start;
    min-height: calc(100vh - 170px);
  }

  /* ── Column ─────────────────────────────────────────────────────────── */
  .column {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    width: 310px;
    min-width: 310px;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 190px);
    overflow: hidden;
  }
  .column-accent {
    height: 3px;
    border-radius: var(--radius) var(--radius) 0 0;
    flex-shrink: 0;
  }
  .column-header {
    padding: 14px 16px 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    flex-shrink: 0;
  }
  .column-title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.6px;
    text-transform: uppercase;
    color: var(--muted);
  }
  .column-count {
    font-size: 11px; font-weight: 600; padding: 2px 7px;
    border-radius: 20px;
    background: var(--bg);
    border: 1px solid var(--border2);
    color: var(--muted);
    font-feature-settings: 'tnum';
  }
  .cards {
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  /* ── Card ───────────────────────────────────────────────────────────── */
  .card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 9px;
    padding: 13px 14px;
    cursor: grab;
    transition: border-color 0.15s, transform 0.15s, box-shadow 0.15s;
    position: relative;
  }
  .card:hover {
    border-color: var(--border2);
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.35);
  }
  .card:active { cursor: grabbing; }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
  .card-tag {
    font-size: 10px; font-weight: 700; letter-spacing: 0.6px;
    text-transform: uppercase; display: flex; align-items: center; gap: 5px;
    color: var(--muted);
  }
  .card-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
  .card-text {
    font-size: 13px; font-weight: 500; color: var(--text);
    line-height: 1.55; letter-spacing: -0.1px;
  }
  .card-section {
    margin-top: 8px;
    font-size: 10px; font-weight: 500; color: var(--muted2);
    letter-spacing: 0.4px; text-transform: uppercase;
  }

  /* ── Done column ────────────────────────────────────────────────────── */
  .column-done .card {
    opacity: 0.5;
    transition: opacity 0.15s, transform 0.15s, box-shadow 0.15s;
  }
  .column-done .card:hover { opacity: 0.9; }
  .column-done .card-text { text-decoration: line-through; text-decoration-color: var(--muted2); }

  /* ── Drag & Drop ────────────────────────────────────────────────────── */
  .card.dragging { opacity: 0.25; transform: scale(0.97) rotate(1deg); }
  .cards.drag-over {
    background: #ffffff05;
    outline: 1px dashed var(--border2);
    outline-offset: -6px;
    border-radius: 8px;
  }

  /* ── Empty state ────────────────────────────────────────────────────── */
  .empty-state {
    padding: 32px 16px;
    text-align: center;
    color: var(--muted2);
    font-size: 12px;
    font-weight: 500;
    border: 1px dashed var(--border);
    border-radius: 8px;
    margin: 4px;
  }

  /* ── Toast ──────────────────────────────────────────────────────────── */
  #toast {
    position: fixed; bottom: 20px; right: 20px;
    background: var(--surface2); border: 1px solid var(--border2);
    color: var(--text); font-size: 12px; font-weight: 500;
    padding: 9px 14px; border-radius: 9px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.5);
    transform: translateY(60px) scale(0.97); opacity: 0;
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    z-index: 999; pointer-events: none; font-family: inherit;
  }
  #toast.show { transform: translateY(0) scale(1); opacity: 1; }
  #toast.ok::before { content: '✓  '; color: var(--col-done); }
  #toast.err { color: #f87171; }
  #toast.err::before { content: '✗  '; }

  /* ── Scrollbar ──────────────────────────────────────────────────────── */
  ::-webkit-scrollbar { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }

  /* ── Animations ─────────────────────────────────────────────────────── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card { animation: fadeUp 0.2s ease both; }
</style>
</head>
<body>

<div class="header">
  <div class="header-left">
    <div class="header-logo">
      <div class="header-logo-mark">BH</div>
      <span class="header-title">BIG HEAD</span>
    </div>
    <div class="header-sep"></div>
    <span class="header-date">${now}</span>
  </div>
  <div class="header-right">
    <span class="pill pill-todo">${todo.length} a fazer</span>
    <span class="pill pill-doing">${doing.length} em andamento</span>
    <span class="pill pill-done">${done.length} concluidos</span>
  </div>
</div>

<div class="stats">${stats}</div>

<div class="filters">
  <button class="filter-btn active" data-filter="all" style="--accent:#a1a1aa" onclick="toggleAll(this)">Todos</button>
  <div class="filters-sep"></div>
  ${projectFilters}
</div>

<div id="toast"></div>

<div class="board">
  <div class="column" id="col-todo">
    <div class="column-accent" style="background:var(--col-todo)"></div>
    <div class="column-header">
      <span class="column-title">A fazer</span>
      <span class="column-count" id="count-todo">${todo.length}</span>
    </div>
    <div class="cards" id="cards-todo">
      ${todoCards || '<div class="empty-state">Nenhuma tarefa pendente</div>'}
    </div>
  </div>

  <div class="column column-doing" id="col-doing">
    <div class="column-accent" style="background:var(--col-doing)"></div>
    <div class="column-header">
      <span class="column-title">Em andamento</span>
      <span class="column-count" id="count-doing">${doing.length}</span>
    </div>
    <div class="cards" id="cards-doing">
      ${doingCards || '<div class="empty-state">Nenhuma tarefa em andamento</div>'}
    </div>
  </div>

  <div class="column column-done" id="col-done">
    <div class="column-accent" style="background:var(--col-done)"></div>
    <div class="column-header">
      <span class="column-title">Concluido</span>
      <span class="column-count" id="count-done">${done.length}</span>
    </div>
    <div class="cards" id="cards-done">
      ${doneCards || '<div class="empty-state">Nenhuma tarefa concluida</div>'}
    </div>
  </div>
</div>

<script>
  const API = 'http://localhost:3777/update-task';
  const COL_STATUS = { 'cards-todo': 'todo', 'cards-doing': 'doing', 'cards-done': 'done' };
  let dragged = null;
  let toastTimer = null;

  // ── Drag & Drop ──────────────────────────────────────────────────────────
  function onDragStart(e) {
    dragged = e.currentTarget;
    setTimeout(() => dragged.classList.add('dragging'), 0);
    e.dataTransfer.effectAllowed = 'move';
  }

  document.addEventListener('dragend', () => {
    if (dragged) { dragged.classList.remove('dragging'); dragged = null; }
    document.querySelectorAll('.cards').forEach(c => c.classList.remove('drag-over'));
  });

  // drop zones
  document.querySelectorAll('.cards').forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      document.querySelectorAll('.cards').forEach(c => c.classList.remove('drag-over'));
      zone.classList.add('drag-over');
    });
    zone.addEventListener('dragleave', e => {
      if (!zone.contains(e.relatedTarget)) zone.classList.remove('drag-over');
    });
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (!dragged || dragged.parentElement === zone) return;

      const newStatus = COL_STATUS[zone.id];
      if (!newStatus) return;

      const file = dragged.dataset.file;
      const text = dragged.dataset.text;
      const oldStatus = dragged.dataset.status;

      // move o card visualmente imediatamente
      zone.prepend(dragged);
      dragged.dataset.status = newStatus;

      // remove empty-state se existia
      zone.querySelectorAll('.empty-state').forEach(el => el.remove());

      updateCounts();

      // persiste no arquivo via servidor
      if (file) {
        fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ file, text, newStatus }),
        })
          .then(r => r.json())
          .then(data => {
            if (data.ok) {
              showToast('ok', 'Salvo no MASTER-BACKUP');
            } else {
              showToast('err', data.error || 'Erro ao salvar');
              // reverte visualmente
              const oldZone = document.getElementById('cards-' + oldStatus);
              if (oldZone) { oldZone.prepend(dragged); dragged.dataset.status = oldStatus; }
              updateCounts();
            }
          })
          .catch(() => showToast('err', 'Servidor offline — rode kanban-server.cjs para salvar'));
      } else {
        showToast('ok', 'Movido (projeto sem arquivo direto)');
      }
    });
  });

  function showToast(type, msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'show ' + type;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.className = ''; }, 3000);
  }

  function updateCounts() {
    document.getElementById('count-todo').textContent =
      document.querySelectorAll('#cards-todo .card:not(.hidden)').length;
    document.getElementById('count-doing').textContent =
      document.querySelectorAll('#cards-doing .card:not(.hidden)').length;
    document.getElementById('count-done').textContent =
      document.querySelectorAll('#cards-done .card:not(.hidden)').length;
  }

  // ── Filtros ───────────────────────────────────────────────────────────────
  const activeFilters = new Set(['all', ${PROJECTS.map(p => `'${p.id}'`).join(', ')}]);

  function toggleFilter(projectId, btn) {
    // desativa "Todos" se estava ativo
    const allBtn = document.querySelector('[data-filter="all"]');
    if (activeFilters.has('all')) {
      activeFilters.delete('all');
      allBtn.classList.remove('active');
    }

    if (activeFilters.has(projectId)) {
      activeFilters.delete(projectId);
      btn.classList.remove('active');
    } else {
      activeFilters.add(projectId);
      btn.classList.add('active');
    }

    // se nada ativo, ativa tudo
    if (activeFilters.size === 0) {
      activeFilters.add('all');
      allBtn.classList.add('active');
      ${PROJECTS.map(p => `document.querySelector('[data-filter="${p.id}"]').classList.add('active');`).join('\n      ')}
      ${PROJECTS.map(p => `activeFilters.add('${p.id}');`).join('\n      ')}
    }

    applyFilters();
  }

  function toggleAll(btn) {
    const allActive = activeFilters.has('all');
    activeFilters.clear();
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));

    if (!allActive) {
      activeFilters.add('all');
      btn.classList.add('active');
      ${PROJECTS.map(p => `activeFilters.add('${p.id}');`).join('\n      ')}
      document.querySelectorAll('.filter-btn:not([data-filter="all"])').forEach(b => b.classList.add('active'));
    }

    applyFilters();
  }

  function applyFilters() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const proj = card.dataset.project;
      if (activeFilters.has('all') || activeFilters.has(proj)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });

    updateCounts();
  }
</script>

</body>
</html>`;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const { todo, doing, done } = getAllTasks();
const html = generateHtml(todo, doing, done);
const outPath = path.join(__dirname, 'kanban.html');
fs.writeFileSync(outPath, html, 'utf8');

console.log(`\nKanban gerado: ${outPath}`);
console.log(`  A fazer:      ${todo.length} tarefas`);
console.log(`  Em andamento: ${doing.length} tarefas`);
console.log(`  Concluido:    ${done.length} tarefas`);
console.log(`\nProjetos:`);
for (const p of PROJECTS) {
  const pt = todo.filter(t => t.project.id === p.id).length;
  const pd = doing.filter(t => t.project.id === p.id).length;
  const pc = done.filter(t => t.project.id === p.id).length;
  console.log(`  ${p.tag.padEnd(10)} ${pt} pendentes / ${pd} em andamento / ${pc} concluidos`);
}
console.log(`\nDica: marque tarefas com - [~] no MASTER-BACKUP para mover para "Em andamento"`);
console.log(`Abrir no browser: open ${outPath}`);
