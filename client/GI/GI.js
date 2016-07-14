angular.module("formulas")
.controller("GICTRL", GICTRL);  
function GICTRL($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('gastosIndirectos',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('obras',()=>{
	return [{estatus:true}] 
    });

  this.action = true;
  
	this.helpers({
	  obras : () => {
		  return Obras.find();
	  },
	  gastosIndirectos : () => {
		  return GastosIndirectos.find();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoGastoIndirecto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.gastosIndirecto= {};		
  };
  
  this.guardar = function(gastoIndirecto)
	{
		this.gastoIndirecto.estatus = true;
		console.log(this.gastoIndirecto);
		GastosIndirectos.insert(this.gastoIndirecto);
		toastr.success('Obra guardada.');
		this.gastoIndirecto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.gastoindirectos')
	};
	
	this.editar = function(id)
	{
    this.gastoIndirecto = GastosIndirectos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(gastoIndirecto)
	{
		var idTemp = gastoIndirecto._id;
		delete gastoIndirecto._id;		
		GastosIndirectos.update({_id:idTemp},{$set:gastoIndirecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var gastoIndirecto = GastosIndirectos.findOne({_id:id});
		if(gastoIndirecto.estatus == true)
			gastoIndirecto.estatus = false;
		else
			gastoIndirecto.estatus = true;
		
		GastosIndirectos.update({_id: id},{$set :  {estatus : gastoIndirecto.estatus}});
    };
		
};
