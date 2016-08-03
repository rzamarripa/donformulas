angular.module("formulas")
.controller("MesesCtrl", MesesCtrl);  
function MesesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);
	this.mes_id = '';
	this.partida = "";
	this.action = true;
	this.presupuesto = {};
	this.periodo = {};
	this.cobro = {};
	this.presupuesto.gastos = [];
	this.pagoProveedor = {};
	this.panelId = "";
	this.tipoPeriodo = 'costo';
	this.obra_id = $stateParams.id;
	this.totalDelCobro = 0.00;
	////////////PERIODO///////////////////////////////////////////////
	//this.tipoPeriod = 'gasto';
	this.subscribe('obra', () => {
		return [{ _id : $stateParams.id, estatus : true}]});

	this.subscribe('meses',()=>{
		return [{estatus:true}]
	});

	this.subscribe('partidas',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('conceptos',()=>{
	return [{partida_id: this.getReactively('partida_id'),estatus:true}] 
  });

  this.subscribe('costos',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('gastosOficina',()=>{
	return [{estatus:true}] 
  });

   this.subscribe('cobros',()=>{
	return [{obra_id : $stateParams.id,mes_id: this.getReactively('mes_id'),estatus:true}] 
  });

  this.subscribe('presupuestos',()=>{
	return [{partida_id: this.getReactively('partida_id'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });
  this.subscribe('periodos',()=>{
	return [{obra_id : $stateParams.id, tipo: this.getReactively('tipoPeriodo'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });

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
			var cost = Costos.find().fetch();
			for (var i = 0; i < cost.length; i++) {
				if(!cost[i].value)
					cost[i].value=0;
			}
			return cost;
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
	  	return GastosOficina.find();
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
	this.nuevo = true;
	

  this.nuevoMes = function()
  {
  
    this.nuevo = !this.nuevo;
  	
  };

   this.nuevoPresupuesto = function()
  {

    this.accionMes = true;
    this.mostrarMes = !this.mostrarMes;
    //this.presupuesto.costo.value = 0.00;
    
  	
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
		//this.presupuesto.costo.value = 0.00;
		this.presupuesto.estatus = true;
		this.presupuesto.obra_id = this.obra_id;
		this.presupuesto.mes_id = this.mes_id;
		this.presupuesto.partida_id = this.partida_id;
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

		periodo.estatus = true;
		periodo.obra_id = this.obra_id;
		periodo.mes_id = this.mes_id;
		if(periodo.costo_id != undefined)
			periodo.tipo = 'costo';
		if(periodo.gasto != undefined)
			periodo.tipo = 'gasto';
		console.log(periodo);
		Periodos.insert(periodo);
		toastr.success('Periodo Agregado.');
		this.periodo = {}; 

		
	};

	this.guardarPago = function(pagoProveedor)
	{
		pagoProveedor.estatus = true;
		pagoProveedor.obra_id = this.obra_id;
		pagoProveedor.mes_id = this.mes_id;
		PagosProveedores.insert(pagoProveedor);
		toastr.success('Pago Agregado.');
		console.log(pagoProveedor);
		this.pagoProveedor = {}; 
		this.pagoProveedor.pIva = 0.00;
		this.pagoProveedor.pSinIva = 0.00;
		
	};

	this.guardarCobro = function(cobro)
	{
		this.cobro.estatus = true;
		this.cobro.obra_id = this.obra_id;
		this.cobro.mes_id = this.mes_id;
		console.log(cobro);
		Cobros.insert(cobro);
		toastr.success('cobro Agregado.');
		this.cobro = {}; 
		this.cobro.cIva =0.00;
		this.cobro.cSinIva =0.00;
		
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
    this.mostrarListas= function(mes_id,obra_id)
	{
		
		this.panelId = mes_id;
		this.action = false;
		this.mes_id = mes_id;
		this.obra_id = $stateParams.id;
		this.accionPeriodo = true;
		this.accionPago = false;
		this.panelColor = true;
		this.accionCobro = false;
		this.accionResumen = false;
		this.accionGI = false;
        this.Resumen = true;
        console.log(mes_id);
        
	};

    this.mostrarArchivos= function(mes_id,obra_id)
	{
		this.presupuesto = {}; 
		//this.presupuesto.costo = 0.00;
		this.mes_id = mes_id;
		this.obra_id = $stateParams.id;
		this.accionPresupuesto = false;
		this.accionPeriodo = true;
		this.mostrarFormPre = true;
		this.Pagos = true;
		this.Cobro = true;
		console.log(mes_id);
		console.log(obra_id);

	
	};
	 this.mostrarPeriodo= function(obra_id,mes_id)
	{
		this.periodo = {}; 
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
		this.obra_id = obra_id;
		this.mes_id = mes_id;
		this.accionPeriodo = false;
		this.accionPresupuesto = true;
		this.Pagos = true;
		this.mostrarFormPre = true;
		console.log(obra_id);
		console.log(mes_id);
	
	};

	 this.mostrarPresupuestos = function(mes_id,partida_id)
	{
		this.obra_id = $stateParams.id;
		this.mes_id = mes_id;
		this.partida_id = partida_id;
		this.mostrarFormPre = false;
		this.gastoCosto = false;
		this.Resumen = true;
		this.Cobro = true;
		this.Pagos = true;
		
		console.log(this.mes_id);
		console.log(this.partida_id);

	};

     this.Pagos = true;
     this.accionPago = true;
	this.mostrarPagos = function(obra_id,mes_id)
	{
		this.Pagos = false;
		this.obra_id = obra_id;
		this.mes_id = mes_id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Resumen = true;
		this.Cobro = true;
		this.gastoCosto = false;
		this.pagoProveedor.pIva = 0.00;
		this.pagoProveedor.pSinIva = 0.00;
	};

	this.Cobro = true;
	this.mostrarCobro = function(obra_id,mes_id)
	{

		this.cobro.cIva =0.00;
		this.cobro.cSinIva =0.00;
		this.obra_id = obra_id;
		this.mes_id = mes_id;
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Pagos = true;
		this.Resumen = true;
		this.gastoCosto = false;
		this.Cobro = false;
	
	};

	this.mostrarResumen = function(id,obra_id)
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
	/*this.getGasto= function(gasto_id)
	{
		var gasto = Gastos.findOne(gasto_id);
		if(gasto)
		return gasto.nombre;
	};*/

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

	/*this.totalPer = function(periodo){
		var suma = periodo.comprasIva + periodo.comprasSinIva + periodo.contadoIva + periodo.contadoSinIva;
		return suma;
	}*/

	this.totalPag = function(pagoProveedor){
		
		var suma = this.pagoProveedor.pIva + this.pagoProveedor.pSinIva;

		return suma;
	}
	
	this.cobroTotalFinal = function(){
		total = 0;
		_.each(this.cobros,function(cobro){total += cobro.cIva + cobro.cSinIva});
		return total
	}

	this.cobroTotalFinalPeriodo = function(){
		total = 0;
		_.each(this.periodos,function(periodo){total += periodo.comprasIva + periodo.comprasSinIva + periodo.contadoIva + periodo.contadoSinIva});
		return total
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
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
   		this.gastoCosto = false;
   		this.mostrarFormPre = false;
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

	this.reiniciarCobro = function()
	{
		this.cobro.cobro = {}; 
		this.cobro.cIva =0.00;
		this.cobro.cSinIva =0.00;

	}

	this.input = function()
	{
        this.periodo.gasto = 'Gastos de Campo';
        this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
    }

    this.pollo = true;

    this.editarPresupuesto = function(id)
	{
    this.presupuesto = Presupuestos.findOne({_id:id});
    this.pollo = false;
	};
	
	this.actualizarPresupuesto = function(presupuesto,costos)
	{
		var idTemp = costos._id;
		delete costos._id;		
		Presupuestos.update({_id:idTemp},{$set:costos});
		console.log(presupuesto);
	};

	this.cambiarEstatusPresupuesto = function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = Presupuestos.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		Presupuestos.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };
    this.period = true;

    this.editarPeriodo = function(id)
	{
    this.periodo = Periodos.findOne({_id:id});
    this.period = false;
	};


	
	this.actualizarPeriodo = function(periodo)
	{
		var idTemp = periodo._id;
		delete periodo._id;		
		Periodos.update({_id:idTemp},{$set:periodo});
		this.period = true;

		console.log(periodo);
		this.periodo = {};
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
	};

	this.cambiarEstatusPeriodo= function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = Periodos.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		Periodos.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };

     this.pag = true;

    this.editarPago = function(id)
	{
    this.pagoProveedor = PagosProveedores.findOne({_id:id});
    this.pag = false;
	};


	
	this.actualizarPago = function(pagoProveedor)
	{
		var idTemp = pagoProveedor._id;
		delete pagoProveedor._id;		
		PagosProveedores.update({_id:idTemp},{$set:pagoProveedor});
		this.pag = true;

		console.log(pagoProveedor);
		this.pagoProveedor = {};
		this.pagoProveedor.pIva = 0.00;
		this.pagoProveedor.pSinIva = 0.00;  
	};

	this.cambiarEstatusPago= function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = PagosProveedores.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		PagosProveedores.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };

    this.cob = true;

    this.editarCobro = function(id)
	{
    this.cobro = Cobros.findOne({_id:id});
    this.pag = false;
	};


	
	this.actualizarCobro = function(cobro)
	{
		var idTemp = cobro._id;
		delete cobro._id;		
		Cobros.update({_id:idTemp},{$set:cobro});
		this.pag = true;

		console.log(cobro);
		this.cobro = {};
		this.cobro.cIva = 0.00;
		this.cobro.cSinIva = 0.00;  
	};

	this.cambiarEstatusCobros= function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = Cobros.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		Cobros.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };
      
      this.preIva = true;
     this.agregarIvaPre = function()
     {
     	this.preIva = true;
     }
      this.quitarIvaPre = function()
     {
     	this.preIva = false;
     }
      this.pagIva = true;
     this.agregarIvaPag = function()
     {
     	this.pagIva = true;
     }
      this.quitarIvaPag = function()
     {
     	this.pagIva = false;
     }
      this.preIva = true;
     this.agregarIvaCobro = function()
     {
     	this.cobIva = true;
     }
      this.quitarIvaCobro = function()
     {
     	this.cobIva = false;
     }
};