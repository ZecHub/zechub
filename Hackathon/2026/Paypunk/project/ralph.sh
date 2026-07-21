#!/usr/bin/env bash
set +e

while true; do
  count=$(ls ./project/todo/??_step.md 2>/dev/null | wc -l)
  if [ "$count" -eq 0 ]; then
    echo "No step files remaining. Exiting."
    exit 0
  fi
  echo "Steps remaining: $count"
  NOTIFY_DISABLE=1 opencode run "execute ./project/ralph.md" --dangerously-skip-permissions
done

curl -d "finished ralphing" https://blk.to/hiphop_notes
