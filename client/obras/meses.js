angular.module("formulas")
.controller("MesesCtrl", MesesCtrl);  
function MesesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);
	this.mes_id = '';
	this.partida_id = '';

	this.subscribe('obra', () => {
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

	this.subscribe('meses',()=>{
		return [{ obra_id : $stateParams.id, estatus:true}]
	});

	this.subscribe('partidas',()=>{
		return [{estatus:true}] 
    });

    this.subscribe('conceptos',()=>{
		return [{partida_id: this.getReactively('partida_id'), estatus:true}] 
    });

    this.subscribe('costos',()=>{
		return [{estatus:true}] 
    });

    this.subscribe('presupuestos',()=>{
		return [{partida_id: this.getReactively('partida_id'),mes_id: this.getReactively('mes_id'),estatus:true}] 
    });

  this.action = true;
  
	this.helpers({
	  obra : () => {
		  return Obras.findOne($stateParams.id);
	  },
	  partidas : () => {
		  return Partidas.find();
	  },
	  meses : () => {
	  return Meses.find();
	  },
	   costos : () => {
	  return Costos.find();
	  },
	  conceptos : () => {
	  return Conceptos.find();
	  },
	  presupuestos : () => {
	  return Presupuestos.find();
	  },
  });


   this.mostrarMes = true;
   this.accionMes = false;

     this.nuevoMes = function()
  {
    this.accionMes = true;
    this.mostrarMes = !this.mostrarMes;
    this.mes = {}; 
  	
  };

  this.guardar = function(mes)
	{
		this.mes.estatus = true;
		mes.obra_id = $stateParams.id;
		this.mes.mes_id = this.mes_id;
		console.log(this.mes);
		Meses.insert(this.mes);
		toastr.success('mes Agregado.');
		this.accionMes = false;
		this.mes = {}; 
		
	};

	this.guardarPresupuesto = function()
	{
		this.presupuesto.estatus = true;
		this.presupuesto.partida_id = this.partida_id;
		this.presupuesto.mes_id = this.mes_id;
		//mes.obra_id = $stateParams.id;
		//mes.partida_id = this.partida_id;
		console.log(this.presupuesto);
		Presupuestos.insert(this.presupuesto);
		toastr.success('presupuesto Agregado.');
		this.presupuesto = {}; 
		
	};
	
	this.editar = function(id)
	{
    this.obra = Meses.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Meses.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = Meses.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		Meses.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };

    this.mostrarArchivos= function(id)
	{
		this.presupuesto = {}; 
		console.log(id);
		//rc.nada = nombre;
		this.mes_id = id;
	};

	 this.mostrarPresupuestos = function(id)
	{
		this.partida_id = id;
		console.log(id);
	};

	this.getConcepto= function(concepto_id)
	{
		var concepto = Conceptos.findOne(concepto_id);
		if(concepto)
		return concepto.nombre;
	};
	this.getCosto= function(costo_id)
	{
		var costo = Costos.findOne(costo_id);
		if(costo)
		return costo.nombre;
	};		
};
