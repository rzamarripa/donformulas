angular.module("formulas")
.controller("GICTRL", GICTRL);  
function GICTRL($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc =$reactive(this).attach($scope);


this.mes_id = '';
this.tipoPeriodo = 'gasto';

	this.subscribe('GI',()=>{
	return [{estatus:true}] 
    });

     this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
     });

    this.subscribe('planes',()=>{
	return [{estatus:true}] 
    });

     this.subscribe('presupuestosCampo',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('obras',()=>{
	return [{empresa_id : Meteor.user() != undefined ? Meteor.user().profile.empresa_id : undefined,estatus:true}] 
    });

    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true}] 
  });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:false}] 
  });
	this.subscribe('periodos',()=>{
	return [{tipo: this.getReactively('tipoPeriodo'),estatus:true}] 
  });

  this.action = true;
  
	this.helpers({
	  meses : () => {
		  return Meses.find();
	  },
	   mes : () => {
		  return Meses.findOne();
	  },
	  obras : () => {
		  return Obras.find().fetch();
	  },
	  gastos : () => {
		  return GI.find();
	  },
	  gastosOficinas : () => {
		  return GastosOficina.find({mes_id: this.getReactively('mes_id')});
	  },
	   todosOficinas : () => {
		  return GastosOficina.find();
	  },
	  pagos : () => {
		  return PagosProveedores.find();
	  },
	  campos : () => {
		  return PresupuestosCampo.find();
	  },
	  
	   PeriodosObra : () => {
		  return Periodos.find({mes_id: this.getReactively('mes_id'),obra_id: this.getReactively('obra_id')});
	  },
	  cobros : () => {
		  return Cobros.find({mes_id: this.getReactively('mes_id')});
	  },

	   cobrosObra : () => {
		  return Cobros.find({obra_id: this.getReactively('obra_id')});
	  },

	   TodosCobros : () => {
		  return Cobros.find();
	  },

	  periodos : () => {
	  	return Periodos.find({mes_id: this.getReactively('mes_id')});
	  },
	  TodosPeriodos : () => {
	  	return Periodos.find();
	  },
	  indirectoMes : () => {
	  	var arreglin = [];

	  		var meses = Meses.find().fetch();
 				
 				_.each(rc.obras, function(obra){ 
 					var totalPorObra = 0; 	
 					var totalGastosCampo = 0;
 					var gastosCampoObra = 0; 

 	
 				_.each(rc.getReactively("cobros"), function(ingresos){
 					
 					totalPorObra += ingresos.cSinIva + ingresos.cIva/1.16; 
 				});

 				//var per = Periodos.find({mes_id : mes._id,obra_id : obra_id, tipo : "gasto"}).fetch();
 				_.each(rc.getReactively("periodos"), function(campo){
 					totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				});

				var periodisa = Periodos.find({obra_id : obra._id}).fetch();
 				_.each(periodisa, function(gc){
 					if (obra._id == gc.obra_id)
 					gastosCampoObra += gc.comprasSinIva + (gc.comprasIva / 1.16)
 				  + gc.contadoSinIva + (gc.contadoIva / 1.16)
 				}); 				
 				var totalGastoOficinaPorMes = 0; 
 				_.each(rc.getReactively("gastosOficinas"), function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

				var obr = Cobros.find({mes_id: rc.getReactively('mes_id'),obra_id : obra._id,modo:false}).fetch();
 				var ingresosMes = 0;
 				_.each(obr,function(cobro){
				if(obra._id == cobro.obra_id)
				ingresosMes += cobro.cIva/1.16 + cobro.cSinIva
				});
				var totalIngresos=0;
					var cobros = Cobros.find().fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
					});
                var ingresoObras = 0;
				ingresoObras = parseFloat(ingresosMes.toFixed(2)) / parseFloat(totalPorObra.toFixed(2)) * 100 ;
				var importe = 0;
				importe = parseFloat(totalGastoOficinaPorMes.toFixed(2)) * parseFloat(ingresoObras.toFixed(2));
				var suma = 0;
				suma = parseFloat(importe.toFixed(2))/100 +  parseFloat(gastosCampoObra.toFixed(2));
				var indirecto=0;
				indirecto = parseFloat(suma.toFixed(2)) / parseFloat(totalIngresos.toFixed(2));

 				arreglin.push({obra_id:obra._id, obra: obra.nombre,  ingresosMensuales : parseFloat(totalPorObra.toFixed(2)), gastosCampo: parseFloat(totalGastosCampo.toFixed(2)),
 				 gastosCampoObra: parseFloat(gastosCampoObra.toFixed(2)), oficinas: parseFloat(totalGastoOficinaPorMes.toFixed(2)),  indirectoMensual: (parseFloat(totalGastosCampo.toFixed(2))+ totalGastoOficinaPorMes) / 
 				 parseFloat(totalPorObra.toFixed(2))*100, ingresoPorObra : parseFloat(ingresoObras.toFixed(2)),pagoPorObra: parseFloat(importe.toFixed(2))/100,
 				sumaDeGastos: parseFloat(suma.toFixed(2)), ingresisa:parseFloat(totalIngresos.toFixed(2)),indirectoPorcentaje : parseFloat(indirecto.toFixed(2))*100
 				,kaka:parseFloat(ingresosMes.toFixed(2))});
 				
 			}); 
 				 	_.each(rc.indirectoMes2, function(indi){
 						 _.each(arreglin, function(arreglo){
 				 		if (arreglo.obra_id == indi.obra_id) {
 				 			arreglo.indirecto = indi.indirecto

 				 		}

 				 }); 
 				}); 
 		
            
 				console.log("dsd",arreglin);
 				return arreglin;
	  },
	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	    indirectoMes2 : () => {
	  	var arreglin = [];
 		  var pago = 0;
 		  _.each(rc.getReactively("obras"), function(obra){ 
 			 _.each(rc.getReactively("meses"), function(mes){ 
 			 	
				var totalGastoOficinaPorMes = 0;
				var totalPorObra = 0;
				var oficinas = GastosOficina.find({mes_id: mes._id,}).fetch(); 
 				_.each(oficinas, function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

 				var ingresosMes = 0
				var obr = Cobros.find({mes_id: mes._id,obra_id : obra._id,modo:false}).fetch();
 				_.each(obr,function(cobro){
				if(obra._id == cobro.obra_id)
				ingresosMes += cobro.cIva/1.16 + cobro.cSinIva
				})

                var ingresosMesTotales = 0
 				var cobros = Cobros.find({mes_id: mes._id,obra_id : obra._id,modo:false}).fetch();
 				_.each(cobros, function(ingresos){
 					
 					ingresosMesTotales += ingresos.cSinIva + ingresos.cIva/1.16; 
 				}); 

 				var cobrosM = Cobros.find({mes_id: mes._id}).fetch();
 				_.each(cobrosM, function(ingresos){

 					totalPorObra += ingresos.cSinIva + ingresos.cIva/1.16; 
 				});
 	
 				var gastosCampoObra = 0;
 				var periodisa = Periodos.find({obra_id : obra._id}).fetch();
 				_.each(periodisa, function(gc){
 					if (obra._id == gc.obra_id)
 					gastosCampoObra += gc.comprasSinIva + (gc.comprasIva / 1.16)
 				  + gc.contadoSinIva + (gc.contadoIva / 1.16)
 				});
 				var totalGastosCampo = 0;
 				var period = Periodos.find({mes_id : mes._id}).fetch();
 				_.each(period, function(campo){
 					totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				});

 				var totalIngresos=0;
					var cobros = Cobros.find().fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
					});

 				var porcentaje = ingresosMes / totalPorObra * 100;
 				var pago =  totalGastoOficinaPorMes * porcentaje 
 				


				arreglin.push({obra:obra.nombre,obra_id:obra._id,mes:mes.mes,gastosDeOficinaMes:totalGastoOficinaPorMes,ingresosMes:ingresosMesTotales, gastoDeCampo:gastosCampoObra,
				gastosCampoTotales:totalGastosCampo, ingresosObraMes:ingresosMes,porcentaje:parseFloat(porcentaje.toFixed(2)),pago:parseFloat(pago.toFixed(2)),
			    ingresisa:parseFloat(totalPorObra.toFixed(2)),ingresoTotal:parseFloat(totalIngresos.toFixed(2)) })
					});
				
				});



            totalPago = {};
			_.each(arreglin, function(arreglo){
			
				if("undefined" == typeof totalPago[arreglo.obra_id]){
					totalPago[arreglo.obra_id] = {};
					if (arreglo.pago > 0) {
						totalPago[arreglo.obra_id].pago = arreglo.pago;
					}
					totalPago[arreglo.obra_id].obra_id = arreglo.obra_id;
					
				}else{
					if (arreglo.pago > 0) {
						totalPago[arreglo.obra_id].pago += arreglo.pago;
					}
					totalPago[arreglo.obra_id].obra_id = arreglo.obra_id;
				}
			});

 			_.each(totalPago, function(pago){
 				_.each(arreglin, function(arreglo){
 					if (pago.obra_id == arreglo.obra_id) {
 						arreglo.pagoEmpresa = pago.pago
 						arreglo.indirecto = ((arreglo.pagoEmpresa/100 + arreglo.gastoDeCampo) / arreglo.ingresoTotal) * 100;
 					}

 				});
 			 });

 			 
            
 				console.log("calculo",arreglin);
 				return arreglin;
	  },

	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  
	  jaime : () => {
		var meses = Meses.find().fetch();
		var obras = Obras.find().fetch();
		var ingresosTotalesPorMesPorObra = [];
		var ingresosTotalesPorMes = [];
		var gastosTotalesDeOficinaPorMes = [];
	
 		_.each(this.meses, function(mes){ 			
 			_.each(rc.obras, function(obra){ 				
 				//Ingresos por obra por mes (Obra)
 				var totalPorObraPorMes = 0; 
 				var ingresosObrasMes = Cobros.find({mes_id : mes._id, obra_id : obra._id, modo : false}).fetch(); 				
 				_.each(ingresosObrasMes, function(ingresoObraMes){
 					totalPorObraPorMes += ingresoObraMes.cSinIva + ingresoObraMes.cIva/1.16;
 				});
 				ingresosTotalesPorMesPorObra.push({mes_id : mes._id, mes_nombre : mes.mes, obra_id : obra._id, obra_nombre : obra.nombre, total : totalPorObraPorMes.toFixed(0)});

				//Gastos de Oficina 				
 				var totalGastoOficinaPorMes = 0;
 				_.each(rc.todosOficinas, function(gastoOficina){
 					if(gastoOficina.mes_id == mes._id){
 						totalGastoOficinaPorMes += gastoOficina.importeFijo + gastoOficina.importeVar;
 					}
 				});
 				gastosTotalesDeOficinaPorMes.push({mes_id : mes._id, mes_nombre: mes.mes, total : totalGastoOficinaPorMes.toFixed(0)});
 			});

 				

 			//Ingresos por mes (General)
			var ingresosPorMes = Cobros.find({mes_id : mes._id, modo : false}).fetch();
			var totalPorMes = 0;
			_.each(ingresosPorMes, function(ingresoMes){
				totalPorMes += ingresoMes.cSinIva;
			});
			ingresosTotalesPorMes.push({mes_id : mes._id, mes_nombre : mes.mes, total : totalPorMes.toFixed(0)});
 			// console.log("gastosTotalesDeOficicobrosTotalescobcobrosTotalenaPorMes", gastosTotalesDeOficinaPorMes);
 			// console.log("ingresosTotalesPorMes", ingresosTotalesPorMes);
 			// console.log("ingresosTotalesPorMesPorObra", ingresosTotalesPorMesPorObra);
 		});

 		var ingresosPorMesPorObraConPorcentaje = [];
 		_.each(ingresosTotalesPorMes, function(ingresoTotal){
 			_.each(ingresosTotalesPorMesPorObra, function(ingresoTotalMesObra){
 				if(ingresoTotalMesObra.mes_id == ingresoTotal.mes_id && ingresoTotal.total != 0){
 					var porcentaje = (ingresoTotalMesObra.total / ingresoTotal.total) * 100;
 					ingresosPorMesPorObraConPorcentaje.push({
 						mes_id : ingresoTotal.mes_id,
 						mes : ingresoTotal.mes_nombre,
 						obra_id : ingresoTotalMesObra.obra_id,
 						obra : ingresoTotalMesObra.obra_nombre,
 						porcentaje : parseInt(porcentaje.toFixed(0))
 					});
 				}
 			});
 		});

 
 		
		var cantidadesSumadas = 0;
 		_.each(ingresosPorMesPorObraConPorcentaje,function(ingresoPorMesPorObraConPorcentaje){
 			_.each(gastosTotalesDeOficinaPorMes,function(gastoTotalDeOficinaPorMes){

 				if (ingresoPorMesPorObraConPorcentaje.mes_id == gastoTotalDeOficinaPorMes.mes_id) {

 					//console.log("1", ingresoPorMesPorObraConPorcentaje);
 					// console.log("2", gastoTotalDeOficinaPorMes);
 					ingresoPorMesPorObraConPorcentaje.ingreso = parseInt(gastoTotalDeOficinaPorMes.total);
 					ingresoPorMesPorObraConPorcentaje.aPagar = parseInt(gastoTotalDeOficinaPorMes.total) * (ingresoPorMesPorObraConPorcentaje.porcentaje / 100);
 					

 				}
 			})
 		});

 		ingresosPorMesPorObraConPorcentaje = _.sortBy(ingresosPorMesPorObraConPorcentaje, 'obra_id');

 		//console.log("obra ordenada", ingresosPorMesPorObraConPorcentaje);
 		var resultado = [];
 		var pluck = _.pluck(ingresosPorMesPorObraConPorcentaje, "obra_id");
 		var uniq = _.uniq(pluck);
 		//console.log("uniq", uniq);
 		_.each(uniq, function(u){
 			var totalSumaUniq = 0;
 			var ingresoPrueba = {};
 			_.each(ingresosPorMesPorObraConPorcentaje, function(i){
 				if(u == i.obra_id){
 					totalSumaUniq += i.aPagar;
 					ingresoPrueba = i;
 				}
 			});
 			resultado.push({obra_id : ingresoPrueba.obra_id, obra : ingresoPrueba.obra, total : totalSumaUniq});
 		});



		var cantidadesSumadas = 0;
 		_.each(ingresosPorMesPorObraConPorcentaje,function(ingresoPorMesPorObraConPorcentaje){
 			_.each(gastosTotalesDeOficinaPorMes,function(gastoTotalDeOficinaPorMes){

 				if (ingresoPorMesPorObraConPorcentaje.mes_id == gastoTotalDeOficinaPorMes.mes_id) {

 					//console.log("1", ingresoPorMesPorObraConPorcentaje);
 					// console.log("2", gastoTotalDeOficinaPorMes);
 					ingresoPorMesPorObraConPorcentaje.ingreso = parseInt(gastoTotalDeOficinaPorMes.total);
 					ingresoPorMesPorObraConPorcentaje.aPagar = parseInt(gastoTotalDeOficinaPorMes.total) * (ingresoPorMesPorObraConPorcentaje.porcentaje / 100);
 					

 				}
 			})
 		});


 		var resultadoFinal = [];
 		_.each(resultado,function(result){
 				var totalAn=0;
				_.each(rc.TodosPeriodos,function(gasto){
					if (result.obra_id == gasto.obra_id ) {
						totalAn += gasto.comprasSinIva + (gasto.comprasIva / 1.16)
						 + gasto.contadoSinIva + (gasto.contadoIva / 1.16)

						result.gastosCampo =  parseInt(totalAn);
						result.totalDeFinalTodo = parseFloat(result.gastosCampo) + parseFloat(result.total);


					}
					 
			});
 		});

 		var IngresosTotalesMasResultados = [];
 		_.each(resultado,function(result){
 				var totalIn=0;
 				var ingresoIndirecto=0;
 				var resultadoFinalIndirecto=0;
				_.each(rc.TodosCobros,function(cobro){
					if (result.obra_id == cobro.obra_id ) {
						totalIn += cobro.cIva/1.16 + cobro.cSinIva

						result.ingresosTotales =  parseFloat(totalIn.toFixed(2));
						resultadoFinalIndirecto =  (parseFloat(result.totalDeFinalTodo.toFixed(2)) / parseFloat(result.ingresosTotales.toFixed(2))) * 100;
						result.ingresoIndirectoFinal =  parseFloat(resultadoFinalIndirecto.toFixed(2));
					}
					 
			});
 		});







 		//console.log("probando", resultado);


 		//console.log("resultado", ingresosPorMesPorObraConPorcentaje);
 		return resultado; 
	},
	  indirectos : () => {
		var gastosIndirectoEmpresa = [];
          
		  	//GASTOS OFICINA;
		  	var totalGastosOficinas = 0;
		  	var gastosOF = GastosOficina.find().fetch();
 				_.each(gastosOF,function(gasto){
 					totalGastosOficinas += gasto.importeFijo + gasto.importeVar
 					gasto.gastoOficina = parseInt(totalGastosOficinas);
 					
 				});

 				gastosIndirectoEmpresa.push({totalGO : totalGastosOficinas});

 				
 	            
 				var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(rc.TodosCobros,function(cobro){
 					totalIngresos += cobro.cSinIva || cobro.cIva/1.16;
 					cobro.ingresos = parseInt(totalIngresos);
 				
 				});

 				gastosIndirectoEmpresa.push({totalIngreso : totalIngresos});
				
 				
 	           
 				var totalGastosCampo = 0;
 				var periodos = Periodos.find().fetch();
 				_.each(rc.TodosPeriodos,function(campo){
 				  totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				  campo.gastosCampo = parseInt(totalGastosCampo);
 				  
				});

				gastosIndirectoEmpresa.push({totalGCampo : totalGastosCampo});

                
               var cantidadesSumadas = (totalGastosOficinas  + totalGastosCampo) / (totalIngresos) * 100;

              gastosIndirectoEmpresa.push({total : cantidadesSumadas })



        //console.log("gastos", gastosIndirectoEmpresa);
	//	console.log("final", final);

		return gastosIndirectoEmpresa;
	},
  });
  
	this.nuevo = true; 
	this.accionAgregar = false; 	  
  this.nuevoGastoIndirecto = function()
  {
    this.accionAgregar = true;
    this.nuevo = !this.nuevo;
    this.gastosIndirecto= {};		
  };
  
  this.guardarPreGC = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Obras.update({_id:idTemp},{$set:obra});
		this.campos = false;
		console.log(obra);
	};

     this.campos = false;
	this.editarObra = function(id)
	{
    this.obra = Obras.findOne({_id:id});
    this.campos = true;
	};
	
	this.editar = function(id)
	{
    this.gastoIndirecto = GI.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(gastoIndirecto)
	{
		var idTemp = gastoIndirecto._id;
		delete gastoIndirecto._id;		
		GI.update({_id:idTemp},{$set:gastoIndirecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var gastoIndirecto = GI.findOne({_id:id});
		if(gastoIndirecto.estatus == true)
			gastoIndirecto.estatus = false;
		else
			gastoIndirecto.estatus = true;
		
		GI.update({_id: id},{$set :  {estatus : gastoIndirecto.estatus}});
    };

    this.cambiarEstatusMes = function(id)
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


     this.borrarGC = function(id)
	{
	    var gc;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = gc = Obras.findOne({_id:id});
		if(gc.estatus == true)
			gc.estatus = false;
		else
			gc.estatus = true;
		
		Obras.update({_id: id},{$set :  {estatus : gc.estatus}});

	    } else {
	        gc.estatus = true;
	    }
    };


     this.mostrarMeses= function(mes_id)
	{
		this.panelId = mes_id;
		this.mes_id = mes_id;
		this.panelColor = true;
		this.accionImporte = false;
	};

	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(rc.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva/1.16 + cobro.cSinIva
		});
		return total
	}

	this.cobroTotalFinalPeriodo = function(obra_id){
		var total = 0;
		_.each(this.periodos,function(periodo){
			if(obra_id == periodo.obra_id)
			total += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
		 + (periodo.contadoIva / 1.16) + periodo.contadoSinIva
		});
		return total
	}

		this.TotalFinalGO = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	this.TotalFinalGO = function(){
		total = 0;
		_.each(rc.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	this.todosGastosOficinas = function(){
		total = 0;
		_.each(rc.todosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}




	


	this.cobrosTotales=function(obras){
		var totalCobros=0;
		_.each(obras, function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id)
					totalCobros += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
				 			+ (periodo.contadoIva/ 1.16) + periodo.contadoSinIva
			})

		});
		return totalCobros
	}



	this.camposTotales=function(){
		var totalCobros=0;
		_.each(rc.getReactively("obras"), function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id)
					totalCobros += (periodo.comprasIva /1.16) + periodo.comprasSinIva
				 			+ (periodo.contadoIva / 1.16) + periodo.contadoSinIva
			})

		});
		return totalCobros
	};

		this.TotalFinal = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	};


///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(rc.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva/1.16 + cobro.cSinIva
		});
		return total
	}

	


	this.TotalFinal = function(){
		total = 0;
		_.each(rc.todosGastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	};



 

 	this.totalCantidadApagar = function(){
		total = 0;
		_.each(rc.todosGastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	this.TotalFinalGastos = function()
	{
		total = 0;
		_.each(rc.periodos,function(periodo)
		  {total += periodo.comprasIva + periodo.comprasSinIva
		 + periodo.contadoIva + periodo.contadoSinIva});
		return total
	}

	this.cobrosTotalesOF =function(obras){
		var totalOF=0;
		_.each(obras, function(obra){
			var gastosOficinas = GastosOficina.find().fetch();
			_.each(rc.todosGastosOficinas,function(gasto){
				var obra_id=obra._id;
				if(obra_id == gasto.obra_id)
					totalOF += gasto.importeFijo + gasto.importeVar
			})

		});
		return totalOF
	};


	this.ingresosTotales=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(rc.TodosCobros,function(cobro){
				var obra_id=obra._id;
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
			})

		});
		return totalIngresos
 	};

	this.ingresosTotalesMes=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
		
			_.each(rc.getReactively("cobros"),function(cobro){
				var obra_id=obra._id;
				
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
			})

		});
		return totalIngresos
	};




















};
