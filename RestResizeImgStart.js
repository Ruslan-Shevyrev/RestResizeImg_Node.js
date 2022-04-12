const RestResizeImage = require('./RestResizeImg.js');
const webServerConfig = require('./config/web-server-config.js');
const dbConfig = require('./config/dbconfig.js');
const query = require('./DBquery/query.js');

RestResizeImage.startup(webServerConfig, dbConfig, query);