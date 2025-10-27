#!/bin/bash

location="${1}"   #1 represent 1st argument

fileLines=$(cat $location | wc -l)
length=0
index=0
count=0
myMemo=""

CYAN='\033[0;36m'
YELLOW='\033[1;33m'
ORANGE='\033[0;33m'
GREEN='\033[0;32m'
NC='\033[0m'

declare -a memos

bytesInFile=$(cat $location | wc -c)

if [[ bytesInFile -lt 512 ]]
then
	echo
	echo -e "${GREEN}Reading data into single 512 char memo${NC}..."
	result=$(cat $location)
	# create new memo with result
        myMemo=$(./ascii2hex "$result")
        memos[count]=$myMemo
        count=1
else

	echo
	echo -e "${GREEN}Reading data into 512 char memo chunks${NC}..."

	sleep 2s

	while IFS= read -r line; do

    	#echo "$line"
    	length=$(echo "$line" | wc -c)
    	size=$(( $index + $length))
    	#size=$length
  
    		if [[ size -gt 512 ]]
    		then 

        		# create new memo here, memo size limit hit
            		myMemo=$(./ascii2hex "$myMemo")
	    		memos[count]=$myMemo

            		# create new memo with result
            		myMemo=$(./ascii2hex "$line")
          
            		count=$(( $count + 1 ))
            		memos[count]=$myMemo
  
            		#Reset for next line
            		myMemo=""
            		test=""
            		index=0
	    		count=$(( $count + 1 ))
               else
			# add to current memo
            		index=$(( $index + $length))
            		myMemo+=$line
    	       fi
	done < $location
fi


echo -e "${GREEN}Converting into hex${NC} ..."
sleep 2s
echo
echo -e "${CYAN}${memos[@]}${NC}"
echo

max=$count
count=0

while [[ count -lt max ]]
do
     memoPart=$(./hex2ascii "${memos[count]}")
     echo -e "${GREEN}Memo $(( $count + 1)) of $max is: ${NC}"
     echo
     echo -e "${ORANGE}$memoPart${NC}"
     echo

     ./txBuilderFromFile.sh "$memoPart"
     #./txBuilder.sh "$memoPart"
     #sleep 3m
     count=$(( $count +1 ))
done

	
echo
echo "Shielded Newsletter sent successfully!"
echo


