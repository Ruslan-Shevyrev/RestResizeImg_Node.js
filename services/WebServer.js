const express = require('express');
const morgan = require('morgan');
const database = require('./database.js');
const sharp = require('sharp');
let server;

function initialize(webServerConfig, query) {
  return new Promise((resolve, reject) => {
    const app = express();
	
    app.use(morgan('combined'));
	//app.get("/img/get/:id?/:width?/:height?/:fit?", async (req, res) => {
	  app.get("/img/get/:id?", async (req, res) => {
		try {
			if (req.params.id!=undefined){
					binds = {id : req.params.id}
					
					let QUERY = query.DEFAULT_SQL_GET_IMAGE;
					
					if (req.query.query != undefined){
						QUERY = query[req.query.query];
					}
					
					result = await database.Execute(QUERY, binds);
					
					sharp_param = {
						fit: 	sharp.fit.cover
					};
					if (req.query.width != undefined){
						sharp_param.width = parseInt(req.query.width);
					}
					
					if (req.query.height != undefined){
						sharp_param.height = parseInt(req.query.height);
					}
					
					if (req.query.fit!= undefined) {
					switch (req.query.fit) {
						  case "fill":
							sharp_param.fit = sharp.fit.fill
							break;
						  case "outside":
							sharp_param.fit = sharp.fit.outside
							break;
						  case "inside":
							sharp_param.fit = sharp.fit.inside
							break;
						  case "contain":
							sharp_param.fit = sharp.fit.contain
							break;
						  default:
							break;
						}
					}
					
					const { data, info } = await sharp(result.rows[0][0])
								.resize(sharp_param)
								.toBuffer({ resolveWithObject: true });
					res.end(data);							

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