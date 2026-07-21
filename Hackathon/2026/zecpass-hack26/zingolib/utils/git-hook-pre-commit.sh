#!/bin/bash
#
# zingolib pre-commit hook
#
# zingolib devs can ensure consistent commits by using this pre-commit
# hook. Install with:
#
# $ ln -s ../../utils/git-hook-pre-commit.sh .git/hooks/pre-commit

set -efuo pipefail

echo 'Running zingolib pre-commit checks.'

cd "$(git rev-parse --show-toplevel)"

./utils/git-require-clean-worktree.sh

set -x
./utils/trailing-whitespace.sh reject
cargo fmt -- --check
cargo check
cargo test --bins --lib
#cargo test --doc # No doc tests yet.
cargo clippy
