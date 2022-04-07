const express = require('express');
const webServerConfig = require('../config/web-server-config.js');
const morgan = require('morgan');
const database = require('./database.js');
const sharp = require('sharp');
const query = require('../DBquery/query_.js');
let server;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
	
    app.use(morgan('combined'));
	app.get("/img/get/:id/:size", async (req, res) => {
		try {
			result = await database.Execute( query.SQL_QUERY + req.params.id);
 
			const { data, info } = await sharp(result.rows[0][0])
						.resize(parseInt(req.params.size))
						.toBuffer({ resolveWithObject: true });

			res.end(data);
		}
		catch (err){
			res.status(500).send(err.toString());
		}
    });
 
    server = app.listen(webServerConfig.port)
		.on('listening', () => {
			console.log('server awaiting...');
 
			resolve();
		})
		.on('error', err => {
			reject(err);
		});
  });
}
 
module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) {
        reject(err);
        return;
      }
 
      resolve();
    });
  });
}
 
module.exports.close = close;