#!/bin/bash

logfile="${1}"
electionNum="${2}"

./filterForElection.sh $logfile $electionNum | tail -2 | head -1 | cut -d ":" -f7 | column -t
