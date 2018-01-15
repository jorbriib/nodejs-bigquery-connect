# README #

This repository is responsible for connecting to BigQuery using SQL

### How do I get set up? ###

* git clone https://bitbucket.org/sem_magic/bigquery-service.git
* cd bigquery-service && npm install
* Rename config-default.json to config.json
* Rename client_secret-default.json to client_secret.json
* Set your credentials in config.json
* Set your BigQuery credentials in client_secret.json
* Set NODE_ENV=production (or development)

### How Can I use the API? ###

* Call the API via GET, using the Server URL and PORT of your config.json
    * Required params
        * query: SQL statement of BigQuery  
    * Ouput 
        * URL with the report in CSV format

### Checking problems ###

* Check log in log/info.log