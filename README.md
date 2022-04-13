<p align="center">
  <img src="/media/RestResizeImage.gif" width="350" title="RestResizeImage">
</p>

# RestResizeImg

Rest API resize image from Oracle database.\
You can use this when you need a service to reduce the size of images from an ORACLE database. For example, to save traffic and you don't want to modify the original image in the database.
## Install

### Install like npm package (option 1)

```
npm install restresizeimg
```
<p align="center">
  <img src="/media/npm_install.gif" width="350" title="npm_install">
</p>

### Install like service (Option 2)

```
1. https://codeload.github.com/Ruslan-Shevyrev/RestResizeImg-nodejs/zip/refs/heads/master
2. npm install
```
<p align="center">
  <img src="/media/service_install.gif" width="350" title="service_install">
</p>

## Start

### Option 1

If you installed it like npm package ***(option 1)***, then:

```
const restresizeimg = require('restresizeimg');
webServerConfig = {
  port: process.env.HTTP_PORT || /*listener_port*/ 3000
}

dbConfig = {
	hrPool: {
		user          : "DB_USER",
		password      : "DB_PASSWORD",
		connectString : "DB_LINK",
		poolMin: 10,
		poolMax: 10,
		poolIncrement: 0
	  }
};

query = {
  DEFAULT_SQL_GET_IMAGE     : "SQL_QUERY_RETURN_BLOB"
};

restresizeimg.startup(webServerConfig, dbConfig, query);
```

### Option 2

If you installed it like service ***(option 2)***, then:

1. Change configuration in files:
```
./config/dbconfig.js
./config/web-server-config.js
./DBquery/query.js
```

2. Run service
```
node RestResizeImgStart.js
```

## Config

### webServerConfig (webServerConfig.js)

**listener_port :** port ***(default 3000)***

### dbConfig (dbconfig.js)

**user          :** database user,\
**password      :** database password,\
**connectString :** database connection string 
```
<server>:<port>/<DB>
```
**poolMin		:** Min connection pool ***(default 10)***,\
**poolMin		:** Max connection pool ***(default 10)***,\
**poolIncrement	:** Pool Increment ***(default 0)***

### query (query.js)

**DEFAULT_SQL_GET_IMAGE :** sql query from database with blob image using {:id} like indificator

***Example query:***
```
SELECT blob FROM image_table WHERE ID = :id
```

## Using

```
<host>:<listener_port>/img/get/<image id from database>/?parameters
```
parameters:

***width :*** width of image (default: source width)\
***height :*** height of image (default: source height)\
***fit :*** how the image should be resized (cover, fill, outside, inside, contain) (default: cover)\
***query :*** set query for blob. You can set more than one predetermined query (you need one query named **DEFAULT_SQL_GET_IMAGE** by default)
```
query = {
  DEFAULT_SQL_GET_IMAGE : "SQL_QUERY_RETURN_BLOB",
  SECOND_SQL : "SECOND_SQL",
  THIRD_SQL : "THIRD_SQL"
};
```
<p align="center">
  <img src="/media/example.gif" width="700" title="example">
</p>

<p align="left">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logo_mini.gif" width="49%" title="logo">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logoRS_FULL.png" width="49%" title="RuslanShevyrev" >
</p>