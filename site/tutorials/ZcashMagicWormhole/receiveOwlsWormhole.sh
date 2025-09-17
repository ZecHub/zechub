#!/bin/bash


current_block=$(zcash-cli getbestblockhash | xargs zcash-cli getblock | jq .height)

result=""

while true
do
    # Get latest block count
    latest_block=$(zcash-cli getbestblockhash | xargs zcash-cli getblock | jq .height)
    
    # Check if latest block is greater than current block
    if [ "$latest_block" -gt "$current_block" ]
    then
        clear
	result=$(zcash-cli z_listunspent | jq .[] | jq -s 'sort_by(.confirmations)' | jq -r 'reverse' | jq .[-1].memoStr | tr -d \")
        echo
        echo "Current Memo: $result"
        echo
        read -r -p "Use memo for Secret code? [y/N] " response
	case "$response" in
    		[yY][eE][sS]|[yY]) 
        	wormhole receive --accept-file $result
       		;;
    	*)
        	clear
        	;;
	esac
        current_block=$latest_block
    fi   
    # Wait for 5 seconds before checking again
    sleep 5

done