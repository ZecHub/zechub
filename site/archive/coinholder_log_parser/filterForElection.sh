#!/bin/bash

logfile="${1}"
electionNum="${2}"

cat $logfile | grep -A 2 "ballot height:" | grep -B 2 "election: $electionNum "