angular.module("formulas")
.controller("MesesCtrl", MesesCtrl);  
function MesesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);
	this.mes_id = '';
	this.partida_id = '';
	this.action = true;
	this.presupuesto = {};
	this.periodo = {};
	this.cobro = {};
	this.presupuesto.gastos = [];
	this.pagoProveedor = {};
	this.panelId = "";
	this.tipoPeriodo = 'costo';
	////////////PERIODO///////////////////////////////////////////////
	
	//this.tipoPeriod = 'gasto';



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

  this.subscribe('cobros',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('presupuestos',()=>{
	return [{partida_id: this.getReactively('partida_id'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });
  this.subscribe('periodos',()=>{
	return [{tipo: this.getReactively('tipoPeriodo'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });

  /*this.subscribe('periodo',()=>{
	return [{tipo: this.getReactively('tipoPeriod'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });*/

  this.subscribe('pagosProveedores',()=>{
	return [{mes_id: this.getReactively('mes_id'),estatus:true}] 
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
	   pagosProveedores : () => {
	  	return PagosProveedores.find();
	  },
	   cobros : () => {
	  	return Cobros.find();
	  },
  });

	this.panelColor = false;	
	this.mostrarMes = true;
	this.accionMes = false;
	this.accionPresupuesto = true;
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
		this.presupuesto.obra_id = this.obra_id;
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

	this.guardarPago = function(pagoProveedor)
	{

		console.log(pagoProveedor);
		PagosProveedores.insert(pagoProveedor);
		toastr.success('Pago Agregado.');
		this.pagoProveedor = {}; 
		
	};

	this.guardarCobro = function(cobro)
	{
		this.cobro.estatus = true;
		this.cobro.mes_id = this.mes_id;
		this.cobro.obra_id = this.obra_id;
		console.log(cobro);
		Cobros.insert(cobro);
		toastr.success('cobro Agregado.');
		this.cobro = {}; 
		
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

   
    this.accionCobro = true;
    this.accionResumen = true;
    this.mostrarListas= function(id)
	{
		this.panelId = id;
		this.action = false;
		this.mes_id = id;
		this.obra_id = id;
		this.accionPeriodo = true;
		this.accionPago = false;
		this.panelColor = true;
		this.accionCobro = false;
		this.accionResumen = false;
		this.accionGI = false;
        this.Resumen = true;

		

	
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
		this.Pagos = true;
		this.Cobro = true;

	
	};
	 this.mostrarPeriodo= function(id)
	{
		this.periodo = {}; 
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
		console.log(id);
		//rc.nada = nombre;
		this.mes_id = id;
		this.accionPeriodo = false;
		this.accionPresupuesto = true;
		this.Pagos = true;
		this.mostrarFormPre = true;
	
	};

	 this.mostrarPresupuestos = function(id)
	{
		this.partida_id = id;
		this.obra_id = id;
		this.mostrarFormPre = false;
		this.gastoCosto = false;
		this.Resumen = true;
		this.Cobro = true;
		this.Pagos = true;
		console.log(id);
	};

     this.Pagos = true;
     this.accionPago = true;
	this.mostrarPagos = function(id)
	{
		this.Pagos = false;
		this.mes_id = id;
		this.obra_id = id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Resumen = true;
		this.Cobro = true;
		this.gastoCosto = false;
		console.log(id);
	};

	this.Cobro = true;
	this.mostrarCobro = function(id)
	{
	
		this.mes_id = id;
		this.obra_id = id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Pagos = true;
		this.Resumen = true;
		this.gastoCosto = false;
		this.Cobro = false;
		console.log(id);
	};

	this.mostrarResumen = function(id)
	{
		
		this.mes_id = id;
		this.obra_id = id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Cobro = true;
		this.Pagos = true;
		this.gastoCosto = false;
		this.Resumen = false;
	};
	this.accionGI = true;

	this.mostrarGI = function(id)
	{
		
		this.mes_id = id;
		this.obra_id = id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Cobro = true;
		this.Pagos = true;
		this.gastoCosto = false;
		this.Resumen = true;
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
		
		var suma = 0.00;
		_.each(costos, function(costo){
			suma += parseFloat(costo.value);
		});
		return suma;
	}

	this.totalPer = function(periodo){
		var suma = periodo.comprasIva + periodo.comprasSinIva + periodo.contadoIva + periodo.contadoSinIva;
		return suma;
	}

	this.totalPag = function(pagoProveedor){
		
		var suma = pagoProveedor.pIva + pagoProveedor.pSinIva;
		return suma;
	}
	this.totalCobro = function(cobro){
		
		var suma = cobro.cIva + cobro.cSinIva;
		return suma;
	}


    this.cobro.modo = true;
	this.cambiarEstatusCobro = function(id)
	{
		var cobro = Cobros.findOne({_id:id});
		if(cobro.modo == true)
			cobro.modo = false;
		else
			cobro.modo = true;
		
		Cobros.update({_id: id},{$set :  {modo : cobro.modo}});
    };

     
    this.mostrarFormPre = true;
    this.clickPartida = function()
   	{
	   this.mostrarFormPre = false;
	}


    this.gastoCosto = true;
   
	this.gastoCostos = function()
   	{
   		this.tipoPeriodo = 'costo';
   		this.gastoCosto = true;
	    console.log(this.gastoCosto);

	}

	this.gastoCostosito = function()
   	{
   		this.tipoPeriodo = 'gasto';
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

	this.reiniciar = function()
	{
		this.periodo = {}; 
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;

	}
};
