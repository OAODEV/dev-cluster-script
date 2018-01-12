#!/bin/sh
curl -H "Content-Type: application/json" -X POST \
-d '{"name":"dev-playground"}' \
https://us-central1-lexical-cider-93918.cloudfunctions.net/deleteCluster >> /var/log/cluster-script.log
echo "$(date '+%FT%TZ') | waiting .... "
curl -H "Content-Type: application/json" -X POST \
-d '{"name":"dev-playground"}' \
https://us-central1-lexical-cider-93918.cloudfunctions.net/createCluster >> /var/log/cluster-script.log
