var mongoose = require('mongoose');
var Con = mongoose.model('Contenido');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
module.exports.main = function(req, res ) {
  res.render('index', { title: 'Main' });
};

module.exports.newBlog = function(req, res ){
	if(!req.body.titulo || req.body.titulo==""){sendJsonResponse(res,401,{msjerr:'falta titulo'})}
	if(!req.body.categoria || req.body.categoria==""){sendJsonResponse(res,401,{msjerr:'falta categoria'})}
	if(!req.body.descripcion || req.body.descripcion==""){sendJsonResponse(res,401,{msjerr:'falta descrpcion'})}
    if(!req.body.autor || req.body.autor==""){sendJsonResponse(res,401,{msjerr:'falta autor'})}
	var nuevo = {
		titulo: req.body.titulo,
		fecha_hora: new Date(),
		categoria: req.body.categoria,
		descripcion: req.body.descrpcion,
		autor: req.body.autor,
	};
	Con.create(nuevo,function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{sendJsonResponse(res,201,dato);}
	});
}

module.exports.getBlog = function(req, res){
	Con.find({},function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{sendJsonResponse(res,200,dato);}
	});
};


module.exports.getIdBlog = function(req, res){
	Con
	.findById(req.params.blogid)
	.exec(function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{sendJsonResponse(res,200,dato);}
	});
}

module.exports.updateBlog = function(req, res){
	Con
	.findById(req.params.blogid)
	.exec(function(err,dato){
		if(err){sendJsonResponse(res,401,{msjerr:err})}
		else{
			if(!req.body.titulo || req.body.titulo==""){sendJsonResponse(res,401,{msjerr:'falta titulo'})}
			if(!req.body.categoria || req.body.categoria==""){sendJsonResponse(res,401,{msjerr:'falta categoria'})}
	        if(!req.body.descripcion || req.body.descripcion==""){sendJsonResponse(res,401,{msjerr:'falta descrpcion'})}
            if(!req.body.autor || req.body.autor==""){sendJsonResponse(res,401,{msjerr:'falta autor'})}
			dato.titulo = req.body.titulo;
			dato.categoria = req.body.categoria;
			dato.descrpcion = req.body.descrpcion;
			dato.autor = req.body.autor;
			dato.save(function(err,dato){
				if(err){sendJsonResponse(res,401,{msjerr:err})}
				else{sendJsonResponse(res,200,dato);}
			});
		}
	});
}

module.exports.deleteBlog = function(req, res){
	Con
	.findByIdAndRemove(req.params.blogid)
	.exec(function(err,dato){
		if(err){sendJsonResponse(res,404,{msjerr:err})}
		else{sendJsonResponse(res,204,dato);}
	});
}