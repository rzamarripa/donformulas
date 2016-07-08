angular.module("formulas")
.controller("MesesCtrl", MesesCtrl);  
function MesesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.mes_id = '';
	this.partida_id = '';
	this.action = true;
	this.presupuesto = {};
	this.periodo = {};
	this.presupuesto.gastos = [];
	this.panelId = "";
	this.tipoPeriodo = 'gasto';
	this.subscribe('obra', () => {
		return [{ _id : $stateParams.id, estatus : true}]});

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

  this.subscribe('gastos',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('presupuestos',()=>{
	return [{partida_id: this.getReactively('partida_id'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });
  this.subscribe('periodos',()=>{
	return [{partida_id: this.getReactively('partida_id'),tipo: this.getReactively('tipoPeriodo'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });

  
  
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
	  periodos : () => {
	  	return Periodos.find();
	  },
	  gastos : () => {
	  	return Gastos.find();
	  },
  });

	this.panelColor = false;	
	this.mostrarMes = true;
	this.accionMes = false;
	this.accionPresupuesto = false;
	this.accionPeriodo = false;
	

  this.nuevoMes = function()
  {
    this.accionMes = true;
    this.mostrarMes = !this.mostrarMes;
    this.mes = {}; 
  	
  };

  this.guardar = function(mes)
	{
		moment.locale("es"); 
		this.mes.estatus = true;
		this.mes.mes = moment(mes.fecha).format('MMMM-YYYY')
		mes.obra_id = $stateParams.id;
		this.mes.mes_id = this.mes_id;
		console.log(this.mes);
		Meses.insert(this.mes);
		toastr.success('Mes Agregado.');
		this.accionMes = false;
		this.mes = {};		
	};

	this.guardarPresupuesto = function(costos)
	{
		console.log(costos);
		this.presupuesto.estatus = true;
		this.presupuesto.partida_id = this.partida_id;
		this.presupuesto.mes_id = this.mes_id;
		//mes.obra_id = $stateParams.id;
		//mes.partida_id = this.partida_id;
		_.each(costos, function(costo){
			delete costo.$$hashKey;
		});
		this.presupuesto.costos = costos;
		console.log(this.presupuesto);
		Presupuestos.insert(this.presupuesto);
		toastr.success('presupuesto Agregado.');
		this.presupuesto = {}; 
		
	};
	this.guardarPeriodo = function(periodo)
	{
		this.periodo.estatus = true;
		this.periodo.partida_id = this.partida_id;
		this.periodo.mes_id = this.mes_id;
		if(periodo.costo_id != undefined)
			periodo.tipo = 'costo';
		if(periodo.gasto_id != undefined)
			periodo.tipo = 'gasto';
		console.log(periodo);
		Periodos.insert(periodo);
		toastr.success('Periodo Agregado.');
		this.periodo = {}; 
		
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

    this.mostrarListas= function(id)
	{
		this.panelId = id;
		this.action = false;
		this.mes_id = id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.panelColor = true;

	
	};

    this.mostrarArchivos= function(id)
	{
		this.presupuesto = {}; 
		console.log(id);
		//rc.nada = nombre;
		this.mes_id = id;
		this.accionPresupuesto = false;
		this.accionPeriodo = true;
		this.mostrarFormPre = true;
	
	};
	 this.mostrarPeriodo= function(id)
	{
		this.periodo = {}; 
		console.log(id);
		//rc.nada = nombre;
		this.mes_id = id;
		this.accionPeriodo = false;
		this.accionPresupuesto = true;
		this.mostrarFormPre = true;
	
	};

	 this.mostrarPresupuestos = function(id)
	{
		this.partida_id = id;
		this.mostrarFormPre = false;
		this.gastoCosto = false;
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
	this.getGasto= function(gasto_id)
	{
		var gasto = Gastos.findOne(gasto_id);
		if(gasto)
		return gasto.nombre;
	};

	this.periodo= function(mes)
	{
		//mes.mes_id = $stateParams.id;
		mes.mes_id = $stateParams.id;	
	};	
	
	this.totalPre = function(costos){
		console.log(costos);
		var suma = 0.00;
		_.each(costos, function(costo){
			suma += parseFloat(costo.value);
		});
		return suma;
	}

	this.totalPer = function(periodo){
		console.log(periodo);
		var suma = periodo.comprasIva + periodo.comprasSinIva + periodo.contadoIva + periodo.contadoSinIva;
		return suma;
	}

     
    this.mostrarFormPre = true;
    this.clickPartida = function()
   	{
	   this.mostrarFormPre = false;
	}


    this.gastoCosto = false;
	this.gastoCostos = function()
   	{
   		this.gastoCosto = true;
	    console.log(this.gastoCosto);
	    if (this.tipoPeriodo == 'gasto') 
	    {
	    	this.tipoPeriodo = 'costo';

	    };
	}

	this.gastoCostosito = function()
   	{
   		this.gastoCosto = false;
   		this.mostrarFormPre = false;
	    console.log(this.gastoCosto);
	}



    this.cambio = true;
	this.cambioTabla = function()
	{
		this.cambio = !this.cambio;
		console.log(this.cambio);

	}
};
