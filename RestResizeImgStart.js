const RestResizeImage = require('./RestResizeImg.js');
const webServerConfig = require('./config/web-server-config.js');
const dbConfig = require('./config/dbconfig__.js');
const query = require('./DBquery/query__.js');

RestResizeImage.startup(webServerConfig, dbConfig, query);