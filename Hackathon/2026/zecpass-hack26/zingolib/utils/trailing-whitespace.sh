#!/bin/bash
set -efuo pipefail

function main
{
  [ $# -eq 1 ] || usage-error 'expected a single arg'

  # cd to repo dir:
  cd "$(git rev-parse --show-toplevel)"

  case "$1" in
    fix) fix ;;
    reject) reject ;;
    *) usage-error "unknown command: $1" ;;
  esac
}

function fix
{
  process-well-known-text-files sed -i 's/ *$//'
}

function reject
{
  local F="$(mktemp --tmpdir zingolib-trailing-whitespace.XXX)"

  process-well-known-text-files grep -E --with-filename ' +$' \
    | sed 's/$/\\n/' \
    | tee "$F"

  local NOISE="$(cat "$F" | wc -l)"
  rm "$F"

  if [ "$NOISE" -eq 0 ]
  then
    echo 'No trailing whitespace detected.'
  else
    echo -e '\nRejecting trailing whitespace above.'
    exit 1
  fi
}

function process-well-known-text-files
{
  find . \
    \( -type d \
      \( \
        -name '.git' \
        -o -name 'target' \
      \) \
      -prune \
    \) \
    -o \( \
      -type f \
      \( \
        -name '*.rs' \
        -o -name '*.toml' \
        -o -name '*.yaml' \
      \) \
      -exec "$@" '{}' \; \
    \)
}

function usage-error
{
  echo "usage error: $*"
  echo
  echo "usage: $0 ( fix | reject )"
  exit 1
}

main "$@"
