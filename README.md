<p align="center">
  <img src="/media/logo.gif" width="350" title="hover text">
</p>
# RestResizeImg

Rest API resize image from Oracle database

## install

```
npm install
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