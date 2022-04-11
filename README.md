<p align="center">
  <img src="/media/RestResizeImage.gif" width="350" title="RestResizeImage">
</p>

# RestResizeImg

Rest API resize image from Oracle database.\
You can use this when you need a service to reduce the size of images from an ORACLE database. For example, to save traffic and you don't want to modify the original image in the database.
## install

### Install like npm package (option 1)

```
npm install restresizeimg
```

### Install like service (Option 2)

```
1. https://codeload.github.com/Ruslan-Shevyrev/RestResizeImg-nodejs/zip/refs/heads/master
2. npm install
```

## start

### Option 1

If you are install like npm package ***(option 1)***, then:

```
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
  SQL_GET_IMAGE     : "SQL_QUERY_RETURN_BLOB"
};

RestResizeImage.startup(webServerConfig, dbConfig, query);
```

### Option 2

If you are install like service ***(option 2)***, then:

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

### webServerConfig (webServerConfig.js)

**listener_port :** port ***(default 3000)***

### dbConfig (dbconfig.js)

**user          :** database user,\
**password      :** database password,\
**connectString :** database connection string\
**poolMin		:** Min connection pool ***(default 10)***\
**poolMin		:** Max connection pool ***(default 10)***\
**poolIncrement	:** Pool Increment ***(default 0)***

### query (query.js)

**SQL_GET_IMAGE :** sql query from database with blob image using primary key like indificator

***Example query:***
```
SELECT blob FROM image_table WHERE ID = 
```

options.fit String  how the image should be resized to fit both provided dimensions, one of cover, contain, fill, inside or outside. (optional, default 'cover')

<p align="left">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logo_mini.gif" width="49%" title="logo">
  <img src="https://github.com/Ruslan-Shevyrev/Ruslan-Shevyrev/blob/main/logoRS/logoRS_FULL.png" width="49%" title="RuslanShevyrev" >
</p>