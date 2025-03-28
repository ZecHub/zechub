#!/bin/bash

txid="${1}"
voutIndex="${2}" 
scriptPubKey="${3}" 
redeemScript="${4}"
oldAmount="${5}"
tAddy="${6}"
amount="${7}"
changeAddy="${8}"
fee=0.0004

changeAmount=$(echo "scale=2; $oldAmount - $amount - $fee" | bc)
echo
echo "..::Transaction plan::.."
echo "------------------------"
echo
echo "Old Amount: $oldAmount"
echo "To Send   : $amount"
echo "Change    : $changeAmount"
echo
echo "Press y to proceed: "
echo
read proceed

if [[ "$proceed" == "y" ]]
then
	if [ $(echo "$amount < 1" | bc -l) -eq 1 ]; then

		result=$(zcash-cli createrawtransaction "[{\"txid\":\"$txid\",\"vout\":$voutIndex,\"scriptPubKey\":\"$scriptPubKey\",\"redeemScript\":\"$redeemScript\"}]" "{\"$tAddy\":0$amount,\"$changeAddy\":0$changeAmount}")

	elif [ $(echo "$changeAmount < 1" | bc -l) -eq 1  ]; then
		
		result=$(zcash-cli createrawtransaction "[{\"txid\":\"$txid\",\"vout\":$voutIndex,\"scriptPubKey\":\"$scriptPubKey\",\"redeemScript\":\"$redeemScript\"}]" "{\"$tAddy\":$amount,\"$changeAddy\":0$changeAmount}")
	else
		
	       	result=$(zcash-cli createrawtransaction "[{\"txid\":\"$txid\",\"vout\":$voutIndex,\"scriptPubKey\":\"$scriptPubKey\",\"redeemScript\":\"$redeemScript\"}]" "{\"$tAddy\":$amount,\"$changeAddy\":$changeAmount}") 
	fi

        echo
	echo "Raw transaction created! ..."
	echo
	echo "Press y to sign '$result' "
	echo
	read sign
	echo

	if [[ "$sign" == "y" ]]
	then
	      echo "Signing transaction now ..."
	      echo

	      myhex=$(./signMultiSigTX.sh $result $txid $voutIndex $scriptPubKey $redeemScript $oldAmount)   
	      complete=$(echo $myhex | jq .complete)

	      if [[ "$complete" == "true" ]]
	      then
		        echo "Result: $complete, all signatures complete!"
			echo "Broadcast this signed transaction: "
		        echo
		        echo $myhex | jq .hex
			echo
	      else
		        echo "Result: $complete, more sigatures needed!"
		        echo "Share this partially signed transaction: "
		        echo
		        echo $myhex | jq .hex
			echo       
	      fi
	else
	      echo "exit"
	fi
else
	echo "exit"
fi



