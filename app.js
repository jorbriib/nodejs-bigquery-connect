module.exports = {
  run: function(req, res, configParams, logger) {

      const BigQuery = require('@google-cloud/bigquery');
      const json2csv = require('json2csv');
      const fs = require('fs');
      const reportDir = 'reports';

      const configDir = 'config';

      // Your Google Cloud Platform project ID
      const projectId = configParams.project_id;

      let query    = req.query.q;

      if(query ) {
          // Instantiates a client
          let bigquery = BigQuery({
              projectId: projectId,
              keyFilename: configDir+'/client_secret.json'
          });

          let options = {
              query: query,
              useLegacySql: false // Use standard SQL syntax for queries.
          };

          // Runs the query
          bigquery
              .query(options)
              .then((results) => {
                  if(results.length > 0) {
                      results =  results[0];

                      let fields = [];
                      if(results.length > 0) {
                          fields = Object.keys(results[0]);
                      }
                      results = json2csv({data: results, fields: fields, quotes: ''});

                      let nameFile = Date.now() + '.csv';
                      fs.writeFile('./' + reportDir + '/' + nameFile, results, function (err) {
                          if (err) {
                              logger.error(err);
                              res.status(500).json(err);
                          } else {
                              let results = {
                                  report_url: req.protocol + '://' + req.get('host') + configParams.SERVERURL + '/reports/' + nameFile
                              };
                              res.json(results);
                          }
                      });
                  }
              })
              .catch((err) => {
                  logger.error(err);
                  res.status(500).json(err);
              });
      }else{
          logger.info("q not found");
          res.status(404).json('"q" not found');
      }
  }
};