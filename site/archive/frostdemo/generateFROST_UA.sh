#!/bin/bash

./trusted-dealer -C redpallas

echo
ak=$(cat public-key-package.json | jq -r .verifying_key)
echo


echo "Generating UA + UFVK with ak = $ak ..."
echo
#echo "cargo run --quiet --release -- generate --ak $ak --danger-dummy-sapling"
echo

#result=$(cargo run --quiet --release -- generate --ak $ak --danger-dummy-sapling )

result=$(./zcash-sign generate --ak $ak --danger-dummy-sapling)

echo $result > result.md

grep -oP '(?<=Unified Full Viewing Key: ").*' result.md | tr -d '"'
echo