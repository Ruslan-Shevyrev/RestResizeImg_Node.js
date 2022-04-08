const RestResizeImage = require('./RestResizeImg.js');
const webServerConfig = require('./config/web-server-config.js');
const dbConfig = require('./config/dbconfig_.js');
const query = require('./DBquery/query_.js');

RestResizeImage.startup(webServerConfig, dbConfig, query);