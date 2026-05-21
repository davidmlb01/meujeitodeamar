#!/bin/bash
# AIOX Parallel Session — inicia sessão multi-projeto no tmux
# Uso: ./bin/aiox-parallel.sh [projeto1] [projeto2]
# Exemplo: ./bin/aiox-parallel.sh destaka gmm

PROJECT1=${1:-"destaka"}
PROJECT2=${2:-"gmm"}
SESSION="aiox-$(date +%H%M%S)"
WORK_DIR="/Users/davidlevy/Desktop/PJ/BIG\ HEAD"

# Criar nova sessão tmux
tmux new-session -d -s "$SESSION"

# Window 0: Projeto 1
tmux rename-window -t "$SESSION:0" "$PROJECT1"
tmux send-keys -t "$SESSION:0" "cd $WORK_DIR && echo '=== Projeto: $PROJECT1 ===' && echo 'Digite comandos AIOX para este projeto aqui'" Enter

# Window 1: Projeto 2
tmux new-window -t "$SESSION:1" -n "$PROJECT2"
tmux send-keys -t "$SESSION:1" "cd $WORK_DIR && echo '=== Projeto: $PROJECT2 ===' && echo 'Digite comandos AIOX para este projeto aqui'" Enter

# Window 2: Orion (orquestrador)
tmux new-window -t "$SESSION:2" -n "orion"
tmux send-keys -t "$SESSION:2" "cd $WORK_DIR && echo '=== ORION — Orquestrador ===' && echo 'Sessão: $SESSION' && echo 'Projetos: $PROJECT1 (janela 0), $PROJECT2 (janela 1)' && echo 'Navegar: Ctrl+B + numero da janela'" Enter

# Anexar a sessão
echo "✓ Sessão AIOX iniciada: $SESSION"
echo "  Janela 0: $PROJECT1"
echo "  Janela 1: $PROJECT2"
echo "  Janela 2: Orion (orquestrador)"
echo ""
echo "Atalhos tmux úteis:"
echo "  Ctrl+B, 0/1/2 — mudar para janela específica"
echo "  Ctrl+B, c — criar nova janela"
echo "  Ctrl+B, & — fechar janela (depois confirmar com 'y')"
echo "  Ctrl+B, d — desanexar (sessão continua rodando)"
echo "  tmux attach-session -t $SESSION — reconectar"
echo ""

tmux attach-session -t "$SESSION"
