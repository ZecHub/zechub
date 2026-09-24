#!/bin/bash

# HISTORICAL -- part of the Magic-Wormhole memo demo, which no longer runs.
#
# This helper itself only calls wormhole. The receiving side of the demo,
# receiveOwlsWormhole.sh, drives zcashd through zcash-cli, and zcashd reached
# its automatic End-of-Support halt on 18 July 2026, so the workflow this
# helper supports cannot be completed as written.
#
# Kept as a record of the Magic-Wormhole memo demo. For reading memos with
# Zallet see:
#   https://zechub.wiki/using-zcash/zallet-quick-reference-guide

code="${1}"   #1 represent 1st argument
myfile="${2}"   #1 represent 1st argument

output=$(wormhole send --code $code $myfile)

echo $output
