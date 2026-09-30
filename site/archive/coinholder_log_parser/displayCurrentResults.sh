#!/bin/bash

logfile="${1}"

for (( i=1; i<=11; i++ ))
do 
        result=$(./numberOfBallets.sh $logfile $i)
        echo "Election $i : $result ballets"
done