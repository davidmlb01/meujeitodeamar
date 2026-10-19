#!/bin/bash
# PreToolUse hook: block Bash commands containing secrets
if echo "$TOOL_INPUT" | grep -qiE '(sk_live|pk_live|sk_test|whsec_|sb_secret|SUPABASE_SERVICE_ROLE|ENCRYPTION_KEY)'; then
  echo '{"decision": "block", "reason": "Blocked: command contains a secret or sensitive key pattern"}'
fi
