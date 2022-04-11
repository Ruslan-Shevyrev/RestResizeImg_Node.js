<p align="center">
  <img src="/media/RestResizeImage.gif" width="350" title="RestResizeImage">
</p>

# RestResizeImg

Rest API resize image from Oracle database

## install

### option 1
```
npm install restresizeimg
```

### option 2

```
1. https://codeload.github.com/Ruslan-Shevyrev/RestResizeImg-nodejs/zip/refs/heads/master
2. npm install
```

## START

### option 1

If you chose 1 option for installation, then:

```
webServerConfig = {
  port: process.env.HTTP_PORT || 3000
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
  SQL_GET_IMAGE     : "SQL_QUERY_RETURN_BLOB"
};

RestResizeImage.startup(webServerConfig, dbConfig, query);
```

### option 2

If you chose 2 option for installation, then:

1. Change configuration in files:
```
config\dbconfig.js
config\web-server-config.js
DBquery\query.js
```

2. Run service
```
node RestResizeImgStart.js
```

## CONFIG

### config.json

**listener_port :** port\
**SQL_QUERY :** query from database with blob image using primary key like indificator\
**BLOB_COLUMN :** blob image column name

***Example query:***
```
SELECT blob FROM image_table WHERE ID = 
```

### dbconfig.js

**user          :** database user,\
**password      :** database password,\
**connectString :** database connection string

## using

run service
```
node RestImageResize.js
```
use REST API to get resize image
```
<host>:<listener_port>/img/get/<image id from database>/<image size>
```
***Example:***
```
http://localhost:3000/img/get/30/300 
```

<p align="left">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logo_mini.gif" width="49%" title="logo">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logoRS_FULL.png" width="49%" title="RuslanShevyrev" >
</p>