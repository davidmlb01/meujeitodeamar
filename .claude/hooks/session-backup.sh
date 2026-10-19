#!/bin/bash
# Stop hook: auto-commit MASTER-BACKUP.md if changed
cd "/Users/davidlevy/Desktop/PJ/BIG HEAD" || exit 0

if git status --porcelain docs/MASTER-BACKUP.md | grep -q .; then
  git add docs/MASTER-BACKUP.md
  git commit -m "auto: session backup $(date '+%Y-%m-%d %H:%M')"
  echo '{"systemMessage": "MASTER-BACKUP.md salvo localmente (push manual necessario)."}'
fi
