#!/bin/bash

code="${1}"   #1 represent 1st argument
myfile="${2}"   #1 represent 1st argument

output=$(wormhole send --code $code $myfile)

echo $output
