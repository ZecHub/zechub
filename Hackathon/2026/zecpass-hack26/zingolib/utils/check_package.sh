#!/bin/bash

# Check if packge name is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <packge-name>"
    echo "Example: $0 zaino-state"
    exit 1
fi

PACKAGE_NAME="$1"

# Run all cargo commands for the specified packge
set -e  # Exit on first error

echo "Running checks for packge: $PACKAGE_NAME"

cargo check -p "$PACKAGE_NAME" && \
cargo check --all-features -p "$PACKAGE_NAME" && \
cargo check --tests -p "$PACKAGE_NAME" && \
cargo check --tests --all-features -p "$PACKAGE_NAME" && \
cargo fmt -p "$PACKAGE_NAME" && \
cargo clippy -p "$PACKAGE_NAME" #&& \
cargo nextest run -p "$PACKAGE_NAME"
