angular.module("formulas")
.controller("MesesCtrl", MesesCtrl);  
function MesesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc =$reactive(this).attach($scope);
	this.mes_id = '';
	this.partida = "";

	this.action = true;
	this.presupuesto = {};
	this.periodo = {};
	this.cobro = {};
	this.presupuesto.gastos = []; 
	this.pagoProveedor = {};
	this.panelId = "";
	//this.tipoPeriodo = 'costo';
	this.obra_id = $stateParams.id;
	this.totalDelCobro = 0.00;
	this.cantidad = 0.00;
	this.costosTotales = [];
	this.Resumen = true;
	////////////PERIODO///////////////////////////////////////////////
	//this.tipoPeriod = 'gasto';
		//this.presupuesto.concepto_id = $stateParams.id;
	this.subscribe('planes',()=>{
		return [{obra_id : $stateParams.id,estatus:true}]
	});
	this.subscribe('obra', () => {
		return [{ _id : $stateParams.id, estatus : true}]});

	this.subscribe('meses',()=>{
		return [{estatus:true}]
	});

	this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

  this.subscribe('conceptos',()=>{
	return [{partida_id: this.getReactively('partida_id'),estatus:true}] 
  });

  this.subscribe('costos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

  this.subscribe('gastosOficina',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

   this.subscribe('cobros',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

  this.subscribe('presupuestos',()=>{
	return [{obra_id : $stateParams.id, partida_id: this.getReactively('partida_id'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });

   this.subscribe('presupuestosCosas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

 //  this.subscribe('periodos',()=>{
	// return [{obra_id : $stateParams.id,partida_id: this.getReactively('partida_id'),obra_id : $stateParams.id, tipo: this.getReactively('tipoPeriodo'),mes_id: this.getReactively('mes_id'),estatus:true}] 
 //  });
  this.subscribe('periodos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

  this.subscribe('pagosProveedores',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
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
		cosas : () => {
			return PresupuestosCosas.find();
		},
		periodos : () => {
			return Periodos.find({tipo: this.getReactively('tipoPeriodo'),partida_id: this.getReactively('partida_id'),mes_id: this.getReactively('mes_id')});
		},
		periodosCampo : () => {
			return Periodos.find({tipo: this.getReactively('tipoPeriodo'),mes_id: this.getReactively('mes_id')});
		},
		periodosTodos : () => {
			return Periodos.find();
		},

		gastos : () => {
			return GastosOficina.find();
		},
		pagosProveedores : () => {
			return PagosProveedores.find({mes_id: this.getReactively('mes_id')});
		},
		pagosTodos : () => {
			return PagosProveedores.find();
		},
		cobros : () => {
			return Cobros.find({mes_id: this.getReactively('mes_id')});
		},
		cobrosPorCobrar : () => {
			return Cobros.find({modo:true});
		},
		cobrosTodos : () => {
			return Cobros.find({modo:false});
		},
		costos : () => {
			var cost = Costos.find().fetch();
			for (var i = 0; i < cost.length; i++) {
				if(!cost[i].value)
					cost[i].value=0;
			}
			return cost;
		},
		planes : () => {
			return Planes.find();
		},
		conceptos : () => {
			return Conceptos.find();
		},
		presupuestos : () => {
			return Presupuestos.find();
		},
		// presupuestosPartida : () => {
		// 	return Prespuestos.find({partida_id : this.getReactively("partida_id")})
		// },
		costosTotales : () => {
			var costosTotales = {};
			var partidas = Partidas.find().fetch();
			var presupuestos = Presupuestos.find().fetch();
			var conceptos = Conceptos.find().fetch();
			var planes = Planes.find().fetch();
	   		_.each(partidas, function(partida){
	   			_.each(conceptos, function(concepto){
	   				_.each(presupuestos, function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id && presupuesto.concepto_id == concepto._id){
	   						_.each(presupuesto.costos, function(costoPresupuesto){
	   							if("undefined" == typeof costosTotales[costoPresupuesto.nombre]){
	   								costosTotales[costoPresupuesto.nombre] = {};
	   								costosTotales[costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								
	   							}else{
	   								costosTotales[costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   								
	   							}
	   							
	   						})
	   					}

	   				})
	   			})
	   		});
	   		var costosTotalesArreglos = _.toArray(costosTotales);
	   		_.each(planes, function(plan){
	   			_.each(plan.costos, function(costosPlan){
	   				_.each(costosTotalesArreglos, function(costoTotal){
	   					if(costoTotal.costo_id == costosPlan._id){
	   						costoTotal.factor = costosPlan.factor;

	   					}
	   				})
	   			})
	   		});

          
            _.each(partidas, function(partida){
	   			_.each(conceptos, function(concepto){
	   				_.each(presupuestos, function(presupuesto){
	   					_.each(presupuesto.costos, function(costo){
	   						 var totalCost = 0;
	   					_.each(costosTotalesArreglos, function(costoTotal){
	   						if(presupuesto.partida_id == partida._id && presupuesto.concepto_id == concepto._id){
						   totalCost += costo.value;
						    costoTotal.directo = totalCost
	   				   }
	   				});
	   		      });
	   			});
	   		  });
	   		});
	   		console.log("arreglo",costosTotalesArreglos);
	   		return costosTotales;
		},
		//////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////
		/////////////////////////////////////////////////////////////////////

		
		presupuestosTabla : () => {
			tabla = [];
			var presupuestos = Presupuestos.find().fetch()
			var totalPresu = 0.00;
			_.each(rc.partidas, function(partida){	
				_.each(presupuestos, function(presupuesto){	
					if (presupuesto.partida_id == partida._id) {}
					//console.log(presupuesto);
					_.each(presupuesto.costos, function(costo){
					totalPresu += costo.value;
					costo.cDirecto = totalPresu;
					costo.costoDirecto = costo.cDirecto * presupuesto.cantidad;


			});

		});
    });
			// obrasCalculadas.push({nombre : obra.nombre, total : totalA});
			tabla.push({costoD: totalPresu, });
           // console.log("tabla",tabla)
			return tabla;
		},
	});


	this.panelColor = false;	
	this.mostrarMes = true;
	this.accionMes = false;
	this.accionPresupuesto = true;
	this.accionPeriodo = true;
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
	this.presupuesto.cantidad = 0.00;

	this.guardarPresupuesto = function(costos)
	{
		console.log(costos);
				 
		//this.presupuesto.costo.value = 0.00;
		this.presupuesto.estatus = true;
		this.presupuesto.obra_id = this.obra_id;
		this.presupuesto.mes_id = this.mes_id;
		this.presupuesto.partida_id = this.partida_id;
		//this.presupuesto.concepto_id = $stateParams.id;
		_.each(costos, function(costo){
			delete costo.$$hashKey;
		});
		this.presupuesto.costos = costos;
		console.log(this.presupuesto);
		Presupuestos.insert(this.presupuesto);
		toastr.success('presupuesto Agregado.');
		this.presupuesto = {};
		this.costo = {};
		this.presupuesto.costo = {};
		this.presupuesto.cantidad = 0.00;

		
	};
	this.guardarPeriodo = function(periodo)
	{

		periodo.estatus = true;
		this.gastoCosto = false;
		periodo.obra_id = this.obra_id;
		periodo.mes_id = this.mes_id;
		periodo.partida_id = this.partida_id;
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
    this.gastoPer = true;
    this.mostrarListas= function(mes_id,obra_id)
	{
		
		this.panelId = mes_id;
		this.action = false;
		this.mes_id = mes_id;
		this.obra_id = $stateParams.id;
		this.gastoPer = false;
		this.accionPeriodo = true;
		this.accionPago = false;
		this.panelColor = true;
		this.accionCobro = false;
		this.accionResumen = false;
		this.accionGI = false;
        this.Resumen = true;

      //  console.log(mes_id);
        
	};

    
	 this.mostrarPeriodo= function(obra_id,mes_id,partida_id)
	{
		//this.periodo = {}; 
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
		this.obra_id = $stateParams.id;
		this.mes_id = mes_id;
		this.partida_id = partida_id;
		this.gastoCosto = true;
		this.tablaPeriodos = true;
   		 this.PeriodoIva = false;
   		 this.Resumen = true;

   		 	 this.period = true;
   
		this.accionPeriodo = false;
		this.accionPresupuesto = true;
		this.Pagos = true;
		this.mostrarFormPre = true;
		console.log(mes_id);
		console.log(partida_id);
	
	};

	 this.mostrarPresupuestos = function(mes_id,partida_id)
	{
		
		this.mes_id = mes_id;
		this.partida_id = partida_id;
		this.obra_id = $stateParams.id;
		this.mostrarFormPre = false;
		

		this.Cobro = true;
		this.Pagos = true;
		this.Resumen = true;
		this.presupuesto.cantidad = 0.00;
		
		console.log(this.mes_id);
		console.log(this.partida_id);

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
		this.Resumen = true;
		console.log(mes_id);
		console.log(obra_id);

	
	};

	this.mostrarArchivosPeriodos= function(obra_id,mes_id)
	{
		this.periodo = {}; 
		//this.presupuesto.costo = 0.00;
		this.obra_id = $stateParams.id;
		this.mes_id = mes_id;
		
		this.accionPresupuesto = true;
		this.accionPeriodo = false;
		this.mostrarFormPre = true;
		this.Pagos = true;
		this.Cobro = true;
		this.Resumen = true;
		console.log(mes_id);
		console.log(obra_id);

	
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

	this.mostrarResumen = function(obra_id)
	{
		
		this.obra_id = obra_id
		this.accionPresupuesto = true;
		this.accionPeriodo = true;
		this.Cobro = true;
		this.Pagos = true;
		this.gastoCosto = false;
		this.Resumen = false;
		console.log(obra_id);
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

	this.periodo= function(mes)
	{
		mes.mes_id = $stateParams.id;	
	};	
	
	this.totalPre = function(costos){
		
		var suma = 0.00;
		_.each(costos, function(costo){
			suma += parseFloat(costo.value);
		});
		//console.log("totalre" , suma)
		return suma;
	}

	/*this.totalPer = function(periodo){
		var suma = periodo.comprasIva + periodo.comprasSinIva + periodo.contadoIva + periodo.contadoSinIva;
		return suma;
	}*/

	this.cobroTotalFinal = function(){
		total = 0;
		_.each(this.cobros,function(cobro){total += cobro.cIva/1.16 + cobro.cSinIva});
		return total
	}

	this.cobroTotalFinalPeriodo = function(){
		total = 0;
		_.each(this.periodos,function(periodo){total += (periodo.comprasIva / 1.16) + periodo.comprasSinIva + (periodo.contadoIva / 1.16) + periodo.contadoSinIva});
		return total
	}
	this.cobroTotalFinalPeriodoCampo = function(){
		total = 0;
		_.each(rc.periodosCampo,function(periodo){total += (periodo.comprasIva / 1.16) + periodo.comprasSinIva + (periodo.contadoIva / 1.16) + periodo.contadoSinIva});
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

    this.PeriodoIva = true;
    
    this.accionPartidas = true;
    this.tablaPeriodos = false;
   
	this.gastoCostos = function(mes_id,obra_id)
   	{
   		this.tipoPeriodo = 'costo';
   		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
		this.mes_id = mes_id;
		this.obra_id = $stateParams.id;
   		this.accionPartidas = false;
   			 this.period = false;
   		 this.tablaPeriodos = false;
   		 this.PeriodoIva = true;
   		 
   		 this.period = false;
   		console.log(this.mes_id);
  
	    console.log(this.gastoCosto);

	}

	this.gastoCampos = function(mes_id,obra_id)
   	{
   		
		this.tipoPeriodo = 'gasto'; 
		this.periodo.comprasIva = 0.00;
		this.periodo.comprasSinIva = 0.00;  
		this.periodo.contadoIva = 0.00;
		this.periodo.contadoSinIva = 0.00;
		this.mes_id = mes_id;
		this.obra_id = $stateParams.id;
		this.gastoCampo = true
   		this.gastoCosto = false;
   		this.PeriodoIva = false;
   		 this.true = false;
   		 this.period = true;
   		 this.tablaPeriodos = true;
   		this.accionPartidas = true;
   		console.log(this.mes_id);
	}

	this.resumen = function(mes_id,obra_id)
   {
		this.mes_id = mes_id;
		this.obra_id = $stateParams.id;
   		console.log(this.mes_id);

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
    //this.presupuesto.costos = Presupuestos.findOne({_id:id})
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
    
this.actPeriod = true;
    this.editarPeriodo = function(id)
	{
    this.periodo = Periodos.findOne({_id:id});
    this.actPeriod = false;
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
    this.cob = false;
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
		this.cob = true;  
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

     ///////////////////////////////////////////////////COSA DE PRESUPUESTOS////////////////////////////////////
	 this.cosa = {};
	 this.botonEdit = false;
	 this.editarCosita = false;
	 this.actualizarCosita = false;
	 this.thing = true;

	 this.editarCo = function()
     { 
 
     this.botonEdit = false;
     };
	
     this.guardarCosa = function(cosa)
     { 
     	this.cosa.estatus = true;
     	this.cosa.obra_id = this.obra_id;


     	PresupuestosCosas.insert(this.cosa);
     	toastr.success('Guardado');
     	console.log(this.cosa);
  
     	this.editarCosita = true ;
     	this.thing = false;

     };
     this.editarCosa = function(id)
     { 
 
     	this.cosa = PresupuestosCosas.findOne({_id:id});
     	this.thing = false;
     	this.editarCosita = true;
     	this.actualizarCosita = true;
     };
 
	
	this.actualizarCosa = function(cosa)
	{
		var idTemp = cosa._id;
		delete cosa._id;		
		PresupuestosCosas.update({_id:idTemp},{$set:cosa});
		console.log(cosa); 
		this.actualizarCosita = false;
		this.editarCosita = false;
	};

	this.gastosMasCostos = function()
	{
		total = 0;
		_.each(rc.getReactively("periodosTodos"),function(periodo)
		  {total += periodo.contadoIva/1.16 + periodo.contadoSinIva});
		return total
	};
	this.gastosMasCostosTotales = function()
	{
		total = 0;
		_.each(rc.getReactively("periodosTodos"),function(periodo)
		  {total += (periodo.comprasIva /1.16) + periodo.comprasSinIva
		         + (periodo.contadoIva / 1.16) + periodo.contadoSinIva});
		return total
	};

	this.cobrosTotales = function()
	{
		total = 0;
		_.each(rc.getReactively("cobrosTodos"),function(cobro)
		  {total += cobro.cIva/1.16});
		return total
	};

	this.cobrosPorCobrarTotales = function()
	{
		total = 0;
		_.each(rc.getReactively("cobrosPorCobrar"),function(cobro)
		  {total += cobro.cIva/1.16});
		return total
	};
	this.pagosProveedoresTotales = function()
	{
		total = 0;
		_.each(rc.getReactively("pagosTodos"),function(pago)
		  {total += pago.pIva/1.16 + pago.pSinIva});
		return total
	};


};