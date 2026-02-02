#!/bin/bash

CONTAINER_NAME="${1}"

echo
echo "Container Name is: $CONTAINER_NAME"

docker exec -i "$CONTAINER_NAME" /bin/bash <<'EOF'
# Commands inside the container

echo "Starting commands inside container..."

if [ -f mylog ]; then
    rm mylog
fi

cat /tmp/zcash-vote-server-stdout* > mylog

echo "Current log copied."
echo
EOF


docker cp zechub:/mylog ~/
echo

./displayCurrentResults.sh mylog | column -t
echo
