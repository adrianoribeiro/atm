// app/models/cliente.js
var mongoose = require('mongoose');

module.exports = function() {
	var schema = mongoose.Schema({
		nome: {
			type: 'String',
			required: true,
			index: {
				unique: true
			}
		},
		saldo: {
			type: 'String',
			required: true
		}
	});
	
	return mongoose.model('Cliente', schema);
};