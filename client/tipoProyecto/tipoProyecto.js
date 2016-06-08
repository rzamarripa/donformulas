angular.module("formulas")
.controller("TipoProyectoCtrl", TipoProyectoCtrl);  
 function TipoProyectoCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
 	$reactive(this).attach($scope);
  this.action = true;
	this.subscribe('tipoproyecto');

	this.helpers({
	  tipoProyectos : () => {
		  return TipoProyecto.find();
	  }
  });
  	  
  this.nuevo = true;	  
  this.nuevoTipoProyecto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.tipoproyecto = {};		
  };
  
  this.guardar = function(tipoproyecto)
	{
		this.tipoproyecto.estatus = true;
		console.log(this.tipoproyecto);
		TipoProyecto.insert(this.tipoproyecto);
		toastr.success('Tipo Obra guardado.');
		this.tipoproyecto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.tipoproyecto = TipoProyecto.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(tipoproyecto)
	{
		var idTemp = tipoproyecto._id;
		delete tipoproyecto._id;		
		TipoProyecto.update({_id:idTemp},{$set:tipoproyecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var tipoproyecto = TipoProyecto.findOne({_id:id});
		if(tipoproyecto.estatus == true)
			tipoproyecto.estatus = false;
		else
			tipoproyecto.estatus = true;
		
		TipoProyecto.update({_id: id},{$set :  {estatus : tipoproyecto.estatus}});
    };
		
};
