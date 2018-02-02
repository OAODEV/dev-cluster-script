#!/bin/sh
curl -q -H "Content-Type: application/json" -X POST \
-d '{"name":"playground"}' \
https://us-central1-lexical-cider-93918.cloudfunctions.net/deleteCluster

echo "$(date '+%FT%TZ') | waiting .... "
sleep 120
curl -q -H "Content-Type: application/json" -X POST \
-d '{"name":"playground"}' \
https://us-central1-lexical-cider-93918.cloudfunctions.net/createCluster
