//Configurações do express.
var app = require('./config/config-express')();
//var database = require('./config/database')();
require('./config/database.js')('mongodb://localhost:27018/atmdb');

var port = '3000';

app.listen(port);
