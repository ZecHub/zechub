#!/bin/bash

inputCSV="${1}" 

echo
echo "Removing previous \"cleaned.csv\" file ..."
sleep 2s
if [ -f cleaned.csv ]; then
	rm cleaned.csv
fi 

echo "Transforming data to our needs ..."
sleep 2s
# Convert unix timestamp to human readable date/time using the date command + awk
awk 'BEGIN { FS=","; OFS="," } {

  # Build date command to convert timestamp (adjust format and timezone if needed, e.g., --utc or -u for UTC)
  cmd = "date -d @" $5 " +\"%Y-%m-%d %H:%M:%S\"";

  # Execute and capture output
  cmd | getline newdate;

  close(cmd);  # Close pipe to avoid too many open files
  $5 = newdate;
  print $0;
}' $inputCSV > output


# Display only certain columns and add lable the headers on top
cat output | awk 'BEGIN { FS=","; OFS="," } { print $2, $3, $5, $9, $8, $11, $10, $12}' > cleaned.csv

sed -i '1itxid,block,time,fee,amount,price,category_id,category\' cleaned.csv

rm output

echo "Zkool account data transformed. "
echo
sleep 2s
cat cleaned.csv