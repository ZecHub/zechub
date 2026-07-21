#!/bin/bash
set -efuo pipefail

echo 'Checking for clean git working tree:'

if ! git status --porcelain | grep '^.[^ ]'
then
  echo 'Clean git working tree.'
  exit 0
fi

cat <<EOF

↑ dirty working tree ↑

When running checks prior to a git commit, the working tree is tested
whereas the git commit only includes the index. To ensure pre-commit
checks are verifying the actual commit contents, the working tree must
be clean.

Either add unstaged changes, or you can save them for after the commit
with:

$ git stash -p
$ git commit …
$ git stash pop

EOF
exit 1
