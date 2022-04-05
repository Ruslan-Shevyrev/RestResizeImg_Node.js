const express = require("express");
const oracledb = require('oracledb');
const config = require('./config/config_.json');
const dbConfig = require('./config/dbconfig_.js');
const fs = require("fs");
const app = express();
const sharp = require('sharp');

try {
	oracledb.fetchAsBuffer = [ oracledb.BLOB ];
  } catch (err) {
    console.error(err);
    process.exit(1);
  }; 

app.get("/img/get/:id/:size", function(req, res){
	async function run() {
			try{
				connection = await oracledb.getConnection(dbConfig);
				
				binds = {};

				options = {
						outFormat: oracledb.OUT_FORMAT_OBJECT,
				};
			
				result = await connection.execute(config.SQL_QUERY + req.params.id, binds, options);
			
				const { data, info } = await sharp(result.rows[0][config.BLOB_COLUMN])
				.resize(parseInt(req.params.size))
				.toBuffer({ resolveWithObject: true });

				res.end(data);

			}
			catch (err) {
				console.error(err);
			  } finally {
				if (connection) {
				  try {
					await connection.close();
				  } catch (err) {
					console.error(err);
				  }
				}
			  }
		}
run();
});
   
app.listen(config.listener_port, function(){
    console.log("Сервер ожидает подключения...");
});