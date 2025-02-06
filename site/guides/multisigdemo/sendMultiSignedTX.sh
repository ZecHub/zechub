#!/bin/bash

signedhex="${1}"

zcash-cli sendrawtransaction "$signedhex"
