const webServer = require('./services/WebServer.js');
//const dbConfig = require('./config/dbconfig.js');
const database = require('./services/database.js');
//const defaultThreadPoolSize = 4;

//process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize; 

async function startup() {
  console.log('starting service');
  
	try {
		console.log('starting database');
 
		await database.initialize(); 
	} catch (err) {
		console.error(err);
 
		process.exit(1);
	}
  
  try {
    console.log('starting server');
 
    await webServer.initialize();
  } catch (err) {
    console.error(err);
 
    process.exit(1);
  }
}
 
startup();

async function shutdown(e) {
  let err = e;
    
  console.log('Shutting down');
  
  try {
    console.log('Closing database');
 
    await database.close(); 
  } catch (err) {
    console.log('Encountered error', e);
 
    err = err || e;
  }
  
  try {
    console.log('Closing server');
 
    await webServer.close();
  } catch (e) {
    console.log('Encountered error', e);
 
    err = err || e;
  }
 
  console.log('Exiting process');
 
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}
 
process.on('SIGTERM', () => {
  console.log('Received SIGTERM');
 
  shutdown();
});
 
process.on('SIGINT', () => {
  console.log('Received SIGINT');
 
  shutdown();
});
 
process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);
  shutdown(err);
});