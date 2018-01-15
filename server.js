const express     = require('express');
const bodyParser  = require('body-parser');
const config = require('./config/config.json');
const loggerFile = require('./logger.js');
const appFile = require('./app.js');


// LOADING CONFIG FILE
const node_env = process.env.NODE_ENV || 'development';
let configParams = config[node_env];
let port = configParams.PORT;        // set our port

//LOADING LOGGER
let logger = loggerFile.init(node_env);

// LOADING EXPRESS FRAMEWORK
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTES FOR OUR API
// =============================================================================
let router = express.Router();              // get an instance of the express Router
router.get('/', function(req, res) {
    appFile.run(req, res, configParams, logger);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /configParams.SERVERURL
app.use(configParams.SERVERURL+"/reports", express.static(__dirname + '/reports'));
app.use(configParams.SERVERURL, router);

app.use(function (err, req, res, next) {
    res.status(500).send('Something broke!')
});

// START THE SERVER
// =============================================================================
app.listen(port);


