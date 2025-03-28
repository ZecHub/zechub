#!/bin/bash


tAddy="${1}" 


zcash-cli validateaddress $tAddy | jq -r .pubkey