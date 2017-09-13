module.exports = function(app){

	var Cliente = app.models.cliente;
	
	app.get('/clientes', function(req, res){
				
		Cliente.find({}).then(function(response){
			res.json(response);
		});
	});
	
	app.get('/clientes/:id', function(req, res){
		var _id = req.params.id;
		
		Cliente.findById(_id).exec().then(function(client) {
			res.json(client);
		});
	});
	
	app.put('/deposito/:id', function(req, res){
		
		req.assert("valor", "Por favor informe o valor do saque").notEmpty();

		var errors = req.validationErrors();
		
		if(errors){
			res.status(400).send(errors);
			return;
		}
		
		var _id = req.params.id;
		
		//FindById
		Cliente.findById(_id).exec().then(function(client) {
			
			client.saldo = parseFloat(client.saldo) + parseFloat(req.body.valor);
			
			var query = { _id: _id };
			var updateQuery = {"saldo":client.saldo};
			
			Cliente.update(query, updateQuery, {mult: true}).then(function(response){
				res.json(response);
			});
		});
	});

	app.put('/saque/:id', function(req, res){
		var saque = req.body;
				
		var _id = req.params.id;
		
		req.assert("valor", "Por favor informe o valor do saque").notEmpty();

		var errors = req.validationErrors();
		
		if(errors){
			res.status(400).send(errors);
			return;
		}
		
		//FindById
		Cliente.findById(_id).exec().then(function(client) {
			
			client.saldo = parseFloat(client.saldo);
			saque.valor= parseFloat(saque.valor);
			
			if(saque.valor > client.saldo){
				res.status(400).send('Saldo insuficiente.');
				return;
			}	
			
			client.saldo -= saque.valor;
			
			var query = { _id: _id };
			var updateQuery = {"saldo":client.saldo};
			
			Cliente.update(query, updateQuery, {mult: true}).then(function(response){
				retorno = {
					data : notasSaque(saque.valor)
				}
				res.send(retorno);
			});
		
		});
	});
	
	var notasSaque = function(valorSaque){
		var notas = [100,50,20,10,5,2,1];
		var notasSaque = [0,0,0,0,0,0,0];
		
		var auxSaque = valorSaque;
		var cont = 0;
		while (auxSaque>0) {
			if(auxSaque>=notas[cont]){
				auxSaque-=notas[cont];
				notasSaque[cont]++;
				cont = 0;
				continue;
			}
			cont++;
		}
		
		var notasRetornadas = [];

		for (i = 0; i < notasSaque.length; i++) { 
			if(notasSaque[i]>0){
				notasRetornadas.push(notas[i] + " : " + notasSaque[i] + " nota(s).");
			}
		} 
				
		return notasRetornadas;
	}
}