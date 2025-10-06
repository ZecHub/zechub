#!/bin/bash

memo="${1}"     # $1 represent first argument

# Change the from address to the UA that is in your zallet wallet
from="u1tv302n3z3nagchg9naa9tgr5vlx5uxk69lv9l2n84wxk8vjdagqkgugln8vk2mh2l5tna8gmhnfyxlm36mc3cpss7uyex7u62wu3el08qecm60dcxdp3psklpugqtr7padq0s9mvdx2acs54rhjjzt8deh8qqkn3cemhje354xs0xrdw7crg2p5py375ym834krx36x2wrd6k7eczev"
amount=0.0001
memo=$(./ascii2hex $memo)
memo="$(echo $memo | sed 's/\ /20/g')"
fee=null
privPol="FullPrivacy"

RED='\033[0;31m'
GREEN='\033[0;32m'
LIGHTRED='\033[1;31m'
LIGHTGRAY='\033[0;37m'
LIGHTPURPLE='\033[1;35m'
LIGHTBLUE='\033[1;34m'
CYAN='\033[0;36m'
NC='\033[0m'


#Read UA's from file
IFS=$'\n' read -d '' -r -a lines < daoAddresses.md
numberOfUAs=$(wc -w < daoAddresses.md)


#Temp index vars for the loops
b1=$numberOfUAs
c1=$numberOfUAs

echo
echo -e "${GREEN}$b1 UA's loaded: ${NC}"
echo

#Display UA's found
while [[ c1 -ge 0 ]]
do 
	echo -e "${LIGHTRED}${lines[c1]}${NC}"
	c1=$(( $c1 - 1 ))
done  

echo
echo -e "${LIGHTBLUE}Building tx now${NC}... "

#Build an Array of the outgoing UA's in proper format from the given file
while [[ numberOfUAs -gt 0 ]]
do 
	lines[numberOfUAs-1]="{\"address\": \"${lines[numberOfUAs-1]}\",\"amount\": $amount, \"memo\":\"$memo\"}"
	numberOfUAs=$(( $numberOfUAs - 1 ))
done   


# Build another Array of formatted UA's in proper order
index=0
while [[ "$index" -lt "$b1" ]]
do
	if [ "$(($index+1))" -eq "$b1" ]
	then
		myAddresses+="${lines[index]}"
        else
		myAddresses+="${lines[index]},"
        fi

	index=$(( $index + 1 ))
done

#Format example for Zallet
#/toCurl.sh z_sendmany u1tv302n3z3nagchg9naa9tgr5vlx5uxk69lv9l2n84wxk8vjdagqkgugln8vk2mh2l5tna8gmhnfyxlm36mc3cpss7uyex7u62wu3el08qecm60dcxdp3psklpugqtr7padq0s9mvdx2acs54rhjjzt8deh8qqkn3cemhje354xs0xrdw7crg2p5py375ym834krx36x2wrd6k7eczev u1zhgy24tweexhjcsstya5qqzrus4cgv0amasfv5jp6f3p3qvw265rugn8ref5djg472l5s382mwuffremffr7se6xjlh5exagwg2d6frs 0.001 "66726f6d5a616c6c6574"
myOwl="./zallet rpc z_sendmany '\"$from\"' '[$myAddresses]'"

#uncomment to help debug command
#echo "$myOwl"
OPID=$(eval $myOwl)

END="\"]'"
BEGIN="./zallet rpc z_getoperationresult '[\""
RESULT=$BEGIN$OPID$END

sleep 5s # Waits 5 seconds.

temp=$(echo $(eval $RESULT) | jq)

# grab tx associated with result
myResult=$(echo -e "$temp" | jq .[].status)

if [[ "$myResult" == "\"success\"" ]]; then
	myTx=$(echo -e "$temp" | jq -r '.[].result.txid')
else
	echo "else ran"
	myTx=$(echo -e "$temp" | jq )
fi
myBal=$(echo -e "$(eval ./zallet rpc z_gettotalbalance 0 true)" | jq .total)

echo -e "${LIGHTBLUE}Zallet working${NC}..."
echo
echo -e "=>  ${GREEN}$OPID${NC}... "
sleep 1s
echo -e "=> ${GREEN}$myResult${NC}... "
sleep 1s
echo -e "=>  ${GREEN}$myTx${NC}..."
sleep 1s
echo -e "=>  ${GREEN}Remaining balance: ${NC}${RED}$myBal${NC}..."
sleep 1s
echo 
echo -e "${LIGHTBLUE}Waiting for TX to be mined${NC}..."
echo
echo

#Wait for tx to be mined
#sleep 60s

##Once these methods become avail, will update this part of the code

chainHeight=$(./toCurl.sh getinfo | jq .blocks)
temp=$(( $chainHeight - 1 ))
isMined=""

while [[ chainHeight -gt temp ]]
do
	check=$(./toCurl.sh getinfo | jq .blocks)
        
	sleep 2s
	#echo "check=$check"

	if [[ "$check" -gt "$chainHeight" ]]
	then
		temp=$chainHeight
        fi
done

myConfs="./zallet rpc z_viewtransaction '\"$myTx\"' | jq .confirmations"
myConfs=$(eval $myConfs)


myString="Your TX has been confimred"
end="times."

echo -e "$myString ${LIGHTRED}$myConfs${NC} $end"
echo
echo "----------------------------------------------"
echo
