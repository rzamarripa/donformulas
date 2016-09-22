angular.module("formulas")
.controller("CostosCtrl", CostosCtrl);  
function CostosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('costos',()=>{
	return [{ obra_id : $stateParams.id,estatus : true}] 
    });
      this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
  });


	this.subscribe('empresas');

  this.action = true;
  
	this.helpers({
	  costos : () => {
		  return Costos.find();
	  },
	  empresas : () => {
		  return Empresas.find();
	  },
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
  });
  
	this.nuevo = true;  	  
  this.nuevoCosto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.costo = {};		
  };
  
  this.guardar = function(costo)
	{
		this.costo.estatus = true;
		costo.obra_id = $stateParams.id;
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
	
	this.actualizar = function(costo)
	{
		var idTemp = costo._id;
		delete costo._id;		
		Costos.update({_id:idTemp},{$set:costo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		this.action = true;
		this.costo = {};		
	};

	this.cambiarEstatus = function(id)
	{
		var costo = Costos.findOne({_id:id});
		if(costo.estatus == true)
			costo.estatus = false;
		else
			costo.estatus = true;
		
		Costos.update({_id: id},{$set :  {estatus : costo.estatus}});
    };
		
};
