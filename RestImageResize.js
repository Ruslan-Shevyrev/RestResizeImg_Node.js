const express = require("express");
const oracledb = require('oracledb');
const dbConfig = require('./config/dbconfig.js');
const fs = require("fs");
const app = express();
const config = require('./config/config.json');
const sharp = require('sharp');

try {
	oracledb.fetchAsBuffer = [ oracledb.BLOB ];
  } catch (err) {
    console.error(err);
    process.exit(1);
  }; 

app.get("/img/get/:id", function(req, res){
	async function run() {
			 try{
				connection = await oracledb.getConnection(dbConfig);
				
				binds = {};

			options = {
			  outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
			  // extendedMetaData: true,               // get extra metadata
			  // prefetchRows:     100,                // internal buffer allocation size for tuning
			  // fetchArraySize:   100                 // internal buffer allocation size for tuning
			};
			
			result = await connection.execute('SELECT FILE_NAME, BDATA FROM APEX_APP.AUDIT_STANDART_WORK_PHOTO where ID = ' + req.params.id, binds, options);
			//console.dir(result.metaData, { depth: null });
			
			//console.dir(result.rows[0]['BDATA']);
			
			//fs.writeFileSync('C:\\'+result.rows[0]['FILE_NAME'], result.rows[0]['BDATA']);
			
			const { data, info } = await sharp(result.rows[0]['BDATA'])
			  .resize(100)
			  .toBuffer({ resolveWithObject: true });
			 /* .toFile('C:\output.jpg', function(err) {
			  });*/
			res.end(data);
			//res.end('success');
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