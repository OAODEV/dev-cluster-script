# dev-cluster-script

Set up and tear down a k8s cluster on schedule. Slightly over-engineered in that a cronjob with a few `gcloud container cluster` commands could do the same, but using Cloud Functions gives us the opportunity to trigger these functions in other ways in the future.

To deploy included Cloud Functions, first `gcloud auth login` then:

```
gcloud beta functions deploy getCluster  --trigger-http
gcloud beta functions deploy createCluster  --trigger-http
gcloud beta functions deploy deleteCluster --trigger-http
```

Hopefully the function names are self-explanatory; each can take an optional `name` parameter for the cluster, which defaults to `dev-playground`.

Functions can be called with

```
curl -H "Content-Type: application/json" -X POST \
-d '{"name": "<$cluster_name>"}' \
https://us-central1-lexical-cider-93918.cloudfunctions.net/<$function_name>
```

Includes Dockerfile for container that calls deleteCluster and createCluster on `dev-playground` from cron daily at midnight CST. This intentionally doesn't do any authentication; you'll want to run it from inside another cluster, where the default service account will already be authorized.
