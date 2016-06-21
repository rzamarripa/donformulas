angular.module("formulas")
.controller("CostosCtrl", CostosCtrl);  
function CostosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('costos',()=>{
	return [{estatus:true}] 
    });

    

	this.subscribe('empresas');

  this.action = true;
  
	this.helpers({
	  costos : () => {
		  return Costos.find();
	  },
	  empresas : () => {
		  return Empresas.find();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoCosto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.costo = {};		
  };
  
  this.guardar = function(obra)
	{
		this.costo.estatus = true;
		console.log(this.costo);
		Costos.insert(this.costo);
		toastr.success('Costo guardado.');
		this.costo = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.costo = Costos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Costos.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var obra = Costos.findOne({_id:id});
		if(obra.estatus == true)
			obra.estatus = false;
		else
			obra.estatus = true;
		
		Costos.update({_id: id},{$set :  {estatus : obra.estatus}});
    };
		
};
