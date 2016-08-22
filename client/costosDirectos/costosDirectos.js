angular.module("formulas")
.controller("CostosDirectosCrtl", CostosDirectosCrtl);  
function CostosDirectosCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('CostosDirectos',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('partidas',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('costos',()=>{
	return [{estatus:true}] 
    });

  this.action = true;
  
	this.helpers({
	  costosDirectos : () => {
		  return CostosDirectos.find();
	  },
	  partidas : () => {
		  return Partidas.find();
	  },
	   costos : () => {
		  return Costos.find();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoCostoDirecto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.CostoDirecto = {};		
  };
  
  this.guardar = function(CostoDirecto)
	{
		this.costoDirecto.estatus = true;
		console.log(this.costoDirecto);
		CostoDirecto.insert(this.costoDirecto);
		toastr.success(' guardado con exito.');
		this.costoDirecto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.obras')
	};
	
	this.editar = function(id)
	{
    this.costoDirecto = CostoDirecto.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(costoDirecto)
	{
		var idTemp = costoDirecto._id;
		delete costoDirecto._id;		
		CostoDirecto.update({_id:idTemp},{$set:costoDirecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(costoDirecto);
	};

	this.cambiarEstatus = function(id)
	{
		var costoDirecto = CostoDirecto.findOne({_id:id});
		if(costoDirecto.estatus == true)
			costoDirecto.estatus = false;
		else
			costoDirecto.estatus = true;
		
		CostoDirecto.update({_id: id},{$set :  {estatus : costoDirecto.estatus}});
    };
		
};
