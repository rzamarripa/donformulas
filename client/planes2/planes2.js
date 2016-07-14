angular.module('formulas')
.controller('Planes2Ctrl', Planes2Ctrl);
function Planes2Ctrl($scope, $meteor, $reactive, $state, toastr) {
$reactive(this).attach($scope);

  this.subscribe('planes');

   this.subscribe('obras',()=>{
	return [{estatus:true}] 
  });

    this.subscribe('costos',()=>{
	return [{estatus:true}] 
  });


  this.action = true;  
  this.nuevo = true;
  this.anticipoObras = 0.00;
  
  this.helpers({
	  planes : () => {
		  return Planes.find();
	  },
	   obras : () => {
		  return Obras.find();
	  },
	  costos : () => {
		  return Costos.find();
	  },
  });
  this.plan2 = {};
 
  this.nuevoplan2 = function()
  {
	  this.action = true;
    this.nuevo = !this.nuevo;
    this.plan2 = {}; 
  };
  
 this.guardar = function(empresa)
	{
	  this.plan2.estatus = true;
		console.log(this.plan2);
		plan2es.insert(this.plan2);
		toastr.success('plan2 guardado.');
		this.plan2 = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.plan2es');
	};
	
	
	this.editar = function(id)
	{
		this.plan2 = plan2es.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};	
	
	this.actualizar = function(plan2)
	{
		var idTemp = plan2._id;
		delete plan2._id;		
		plan2es.update({_id:idTemp},{$set:plan2});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
		
	this.cambiarEstatus = function(id)
	{
		var plan2 = plan2es.findOne({_id:id});
		if(plan2.estatus == true)
			plan2.estatus = false;
		else
			plan2.estatus = true;
		
		plan2es.update({_id:id}, {$set : {estatus : plan2.estatus}});
		};
		


	this.anticipoDeObras = function (plan2)
	{
		var operacion = plan2.ingresos + plan2.porcentajeObras;
		return operacion;
	};

	 this.getObra= function(obra_id)
	{
		var obra = Obras.findOne(obra_id);
		if(obra)
		return obra.nombre;
	};
}