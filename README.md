<p align="center">
  <img src="/media/RestResizeImage.gif" width="350" title="RestResizeImage">
</p>

# RestResizeImg

Rest API resize image from Oracle database

## install

### variant 1
```
npm install restresizeimg
```

### variant 2

```
1. https://codeload.github.com/Ruslan-Shevyrev/RestResizeImg-nodejs/zip/refs/heads/master
2. npm install
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
  <img src="/media/logo.gif" width="49%" title="logo">
  <img src="/media/logoRS_FULL.png" width="49%" title="RuslanShevyrev" >
</p>