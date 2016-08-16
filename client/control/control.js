angular.module("formulas")
.controller("ControlCrtl", ControlCrtl);  
function ControlCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('obras',()=>{
	return [{estatus:true}] 
    });

	this.subscribe('control',()=>{
	return [{estatus:true}] 
    });

	this.subscribe('costos',()=>{
	return [{estatus:true}] 
    });

	this.subscribe('conceptos',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('planes',()=>{
	return [{estatus:true}] 
    });

  this.action = true;
  
	this.helpers({
	  obras : () => {
		  return Obras.find();
	  },
	  controles : () => {
		  return Control.find();
	  },
	   costos : () => {
		  return Costos.find();
	  },
	    planes : () => {
		  return Planes.find();
	  },
  });
  
	this.nuevo = true;  	  
  this.nuevoControl = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.control = {};		
  };
  
  this.guardar = function(obra)
	{
		this.control.estatus = true;
		console.log(this.control);
		Control.insert(this.control);
		toastr.success('Obra guardada.');
		this.control = {}; 
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.control = Control.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = control._id;
		delete control._id;		
		Control.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(obra);
	};

	this.cambiarEstatus = function(id)
	{
		var obra = Control.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		Control.update({_id: id},{$set :  {estatus : control.estatus}});
    };
		
};
