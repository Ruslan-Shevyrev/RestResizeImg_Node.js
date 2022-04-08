const express = require('express');
//const webServerConfig = require('../config/web-server-config.js');
const morgan = require('morgan');
const database = require('./database.js');
const sharp = require('sharp');
//const query = require('../DBquery/query_.js');
let server;

function initialize(webServerConfig, query) {
  return new Promise((resolve, reject) => {
    const app = express();
	
    app.use(morgan('combined'));
	app.get("/img/get/:id?/:width?/:height?", async (req, res) => {
		try {
			if (req.params.id!=undefined){
					result = await database.Execute( query.SQL_GET_IMAGE + req.params.id);
					
		 			if (req.params.width!=undefined){
						if (req.params.height!=undefined){
							const { data, info } = await sharp(result.rows[0][0])
										.resize(parseInt(req.params.width),parseInt(req.params.height),{
																							fit: sharp.fit.centre /*fill outside inside centre cover*/
																						  })
										.toBuffer({ resolveWithObject: true });
								res.end(data);							
						} else {
							const { data, info } = await sharp(result.rows[0][0])
										.resize(parseInt(req.params.width))
										.toBuffer({ resolveWithObject: true });
							res.end(data);
						}
					} else {
						const { data, info } = await sharp(result.rows[0][0])
									.toBuffer({ resolveWithObject: true });
						res.end(data);
					}

			} else {
				res.status(500).send('Не указан идентификатор');
			}
				
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