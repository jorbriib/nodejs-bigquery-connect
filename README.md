# README #
 
This microservice is responsible for connecting to BigQuery using SQL through an HTTP GET call. So, you don't need to implement the BigQuery connector for each application that connects with BigQuery.

### How do I get set up? ###

* git clone https://github.com/jorbriib/nodejs-bigquery-connect-api-rest.git
* cd nodejs-bigquery-connect-api-rest && npm install
* Rename config-default.json to config.json
* Rename client_secret-default.json to client_secret.json
* Set your credentials in config.json
* Set your BigQuery credentials in client_secret.json
* Set NODE_ENV=production (or development)

### How Can I use the API? ###

* Call the API via GET, using the Server URL and PORT of your config.json
    * Required params
        * query: SQL statement of BigQuery
        * Example: http(s)://yourIP:PORT/bigquery?q=SELECT id FROM hotels
    * Ouput 
        * URL with the report in CSV format
    

### Checking problems ###

* Check log in log/info.log
* Be careful with the cost of BigQuery

### Next steps ###
* Send the file directly
* Delete automatically downloaded files
* ...
