#!/bin/bash

from="${1}"     # $1 represent first argument

qrt="qrencode -m 2 -t utf8 <<< $from"

eval $qrt