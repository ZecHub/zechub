#! /usr/bin/env sh

set -ex

GITBRANCH="$1"
CHAIN="$2"
REPOROOT=`git rev-parse --show-toplevel`
WALLETDIR=$REPOROOT/zingocli/tests/data/wallets/v26/${GITBRANCH}/${CHAIN}

if [[ "$CHAIN" = "regtest" ]]
then 
  COMMANDARGS="--data-dir=$WALLETDIR save --regtest"
elif [[ "$CHAIN" = "mainnet" ]]
then
  COMMANDARGS="--data-dir=$WALLETDIR save"
else
  exit 99
fi

echo $COMMANDARGS
generate_wallet () {
  git checkout $GITBRANCH && \
  mkdir -p $WALLETDIR && \
  cargo clean && \
  cargo build --release && \
  $REPOROOT/target/release/zingo-cli $COMMANDARGS
}

generate_wallet
