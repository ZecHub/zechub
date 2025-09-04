#!/bin/bash

command="${1}"   #1 represent 1st argument
arg1="${2}"      #2 represent 2nd argument
arg2="${3}"      #3 represents 3rd argument
arg3="${4}"      #4 represents 4th argument
arg4="${5}"      #4 represents 4th argument
arg5="${6}"      #4 represents 4th argument

# Determine proper credentials

if pgrep "zenithserver" > /dev/null; then

      # Zenith RPC
	user="user"           #set your  username
	pw="superSecret"      #set your  pw
	port="8234" 
else
	# Zebra
	user="__cookie__"                                     #set your  username
	pw="yourzebrapassword="      #set your  pw
	port="8232"                                            #set your port 
fi

credentials="$user:$pw"

# To determine if "" are needed

array_args=() # Declare an empty array
numOfArgs=$(echo $#)
index=1


while [ $index -lt $numOfArgs ]
do

	currentArg=\$arg$index
	
	eval result=$currentArg

	if [[ "$command" == "listreceived" ]] || [[ "$command" == "getoperationstatus" ]]  ; then
		#special case
		result=\"$result\"

	elif [[ "$result" =~ ^-?[0-9]+$ ]] || [[ "$result" =~ ^-?[0-9].+$ ]] ; then

 		#echo "Variable is a number"
		:
	else
		#echo "Variable is not a number"
		result=\"$result\"
	fi

	array_args[$index]=$result
        index=$(( $index + 1 ))
  
done


# Cases

if [ "$command" == "getmetrics" ]; then
	myCurl="curl -s --data-binary '{\"jsonrpc\": \"2.0\", \"id\":0, \"method\": \"$command\", \"params\": [] }' -H 'content-type: application/json' http://127.0.0.1:$port"
elif [ "$command" == "getrawmempool" ]; then
        myCurl="curl -s -u $credentials --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"$command\", \"params\": [${array_args[1]}] }' -H 'content-type: application/json' http://127.0.0.1:$port/"
elif [ "$command" == "sendmany" ]; then
	 myCurl="curl -s -u $credentials --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"$command\", \"params\": [${array_args[1]}, ${array_args[2]}, [{\"address\": ${array_args[3]}, \"amount\": ${array_args[4]}, \"memo\": ${array_args[5]}}]] }' -H 'content-type: application/json' http://127.0.0.1:$port/"
elif [ -n "$arg1" ]; then
        if [ -n "$arg2" ]; then
		myCurl="curl -s -u $credentials --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"$command\", \"params\": [${array_args[1]}, ${array_args[2]}] }' -H 'content-type: application/json' http://127.0.0.1:$port/"
        else
		myCurl="curl -s -u $credentials --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"$command\", \"params\": [${array_args[1]}] }' -H 'content-type: application/json' http://127.0.0.1:$port/"
        fi
else
        myCurl="curl -s -u $credentials --data-binary '{\"jsonrpc\": \"1.0\", \"id\":\"curltest\", \"method\": \"$command\", \"params\": [] }' -H 'content-type: application/json' http://127.0.0.1:$port/"
fi

#echo $myCurl

eval $myCurl | jq .result


