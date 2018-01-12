var google = require('googleapis');
var container = google.container('v1');
// OAO's GCP project and [current customary] zone
var project = 'lexical-cider-93918';
var zone = 'us-central1-a';

exports.getCluster = function(req, res) { authorize(function(authClient) {
  // Get cluster name from request body
  var cluster_name = req.body.name  || 'dev-playground';
  var request = {
    projectId: project,  
    zone: zone,
    clusterId: cluster_name,
    auth: authClient,
  };

  container.projects.zones.clusters.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    res.send(JSON.stringify(response, null, 2));
  });
});
};

exports.createCluster = function(req, res) { authorize(function(authClient) {
  // Get cluster name from request body
  var cluster_name = req.body.name || 'dev-playground';
  var request = {
    projectId: project,  
    zone: zone,
    resource: {
      "cluster": {
          "name": cluster_name,
          "description": "Shared Dev cluster for trial/integration deployment.",
          "initialNodeCount": 3
      }
    },
    auth: authClient,
  };

  container.projects.zones.clusters.create(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    res.send(JSON.stringify(response, null, 2));
  });
});
};


exports.deleteCluster = function(req, res) { authorize(function(authClient) {
  // Get cluster name from request body
  var cluster_name = req.body.name  || 'dev-playground';
  var request = {
    projectId: project,  
    zone: zone,
    clusterId: cluster_name,
    auth: authClient,
  };

  container.projects.zones.clusters.delete(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }

    res.send(JSON.stringify(response, null, 2));
  });
});
};


function authorize(callback) {
  google.auth.getApplicationDefault(function(err, authClient) {
    if (err) {
      console.error('authentication failed: ', err);
      return;
    }
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      var scopes = ['https://www.googleapis.com/auth/cloud-platform'];
      authClient = authClient.createScoped(scopes);
    }
    callback(authClient);
  });
}
