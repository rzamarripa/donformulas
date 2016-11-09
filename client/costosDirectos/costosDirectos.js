angular.module("formulas")
.controller("CostosDirectosCrtl", CostosDirectosCrtl);  
function CostosDirectosCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);

window.rc = rc;
//this.tipoPeriodo = 'costo';
//this.tipo = "gasto";

	this.subscribe('CostosDirectos',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('costos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
     this.subscribe('periodos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
     this.subscribe('presupuestos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
       this.subscribe('conceptos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
      this.subscribe('planes',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('obra', () => {
    return [{ _id : $stateParams.id,empresa_id : Meteor.user() != undefined ? Meteor.user().profile.empresa_id : undefined,
     estatus : true}]});

    this.subscribe('presupuestosCosas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
         this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
     });
    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true}] 
     });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:false}] 
    });
     this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
     });
    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });




  this.action = true;
  
	this.helpers({
	  costosDirectos : () => {
		  return CostosDirectos.find();
	  },
	  gastosOficinas : () => {
		  return GastosOficina.find();
	  },
	  partidas : () => {
		  return Partidas.find();
	  },
	  meses : () => {
		  return Meses.find();
	  },
	   costos : () => {
	   var strings = [];
	   var costos = Costos.find().fetch();
	   _.each(costos, function(costo){
	   	costo.nombre = costo.nombre;
	

	 strings.push({   nombre: costo.nombre,
	   					presupuestoString : "Presupuesto",
	   					ajusteString: "Ajuste",
	   					realString: "Real",
	   					diferenciaString:"Diferencia"});
	   });
	  

	   // console.log("costisa", strings);
		  return strings;
		  
	  },
	   periodos : () => {
		  return Periodos.find();
	  },
	  periodosCampo : () => {
	  	return Periodos.find({tipo : "gasto"})
	  },
	   planes : () => {
		  return Planes.find();                        
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	  cosas : () => {
			return PresupuestosCosas.find();
		},
	   cobros : () => {
			return Cobros.find();
		},
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
		obras : () => {
		  return Obras.find();
		},
		meses : () => {
		  return Meses.find();
		},

	  presupuestos : () => {
		  return Presupuestos.find().fetch();
	  },
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
				});

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
 				var periodisa = Periodos.find({obra_id : obra._id,tipo:"gasto"}).fetch();
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
	  



	 ////////////////////////////////////  ARREGLO MAS GDRANDE  ///////////////////////////////////////////////
	 ////////////////////////////////////////////////////////////////////////////////////////////////////////////


	  costosTotales : () => {	
	        //var presupuestosPartidas = Presupuestos.find({partida_id : rc.getReactively("partida_id")});
			var costosTotales = {};
			var partidas = Partidas.find().fetch();

	   		_.each(rc.getReactively("partidas"), function(partida){
	   			//_.each(rc.getReactively("conceptos"), function(concepto){
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id ){
	   						_.each(presupuesto.costos, function(costoPresupuesto){
	   							if("undefined" == typeof costosTotales[partida.nombre + " - " + costoPresupuesto.nombre]){
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre] = {};	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].cantidad = presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].direct = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].precioUnitario = costoPresupuesto.precioUnitario;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}
	   						});
	   					}
	   				})
	   		});
	   
	   		var costosTotalesArreglos = _.toArray(costosTotales);
	   		//var totalPer=0.00;
	   	
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("este es el plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("costos plan",costosPlan);
	   				_.each(costosTotalesArreglos, function(costoReal){
	   				//	console.log("costos reales",costoReal);

	   					if(costoReal.costo_id == costosPlan._id){
	   						costoReal.factor = costosPlan.factor;
	   						//console.log("costos de if",costoReal);
	   					}
	   					//console.log(costoReal);
	   				});
	   			});
	   		});
	   		var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
   			_.each(costosPeriodos, function(costoPeriodo){
			  	_.each(costosTotalesArreglos, function(kaka){
		  			var totalPer=0.00;
		  			var directoReales = 0.00;
		  			if (kaka.costo_id == costoPeriodo.costo_id && kaka.partida_id == costoPeriodo.partida_id){
		  				totalPer += costoPeriodo.comprasSinIva + (costoPeriodo.comprasIva / 1.16) + costoPeriodo.contadoSinIva + (costoPeriodo.contadoIva / 1.16)
		  				kaka.periodo = totalPer;
		  				directoReales += kaka.periodo;
		  				kaka.directoReal = directoReales;
		  			}else{
		  			  if(kaka.periodo == undefined)
		  			  	kaka.periodo = 0.00;
		  			}
		  		});	
		  	});
	   		//console.log("esto tengo", costosTotalesArreglos);
	   		var costosDirectosTotales = {};
	   		
	   		//console.log();
	   		var zamaPresupuesto = 0.00;
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			//console.log("entré") 
	   			var totalPresupuestos = 0.00;
	   			
	   			if("undefined" == typeof costosDirectosTotales[costoTotal.partida]){
	   			//	console.log("entré acá");
	   				costosDirectosTotales[costoTotal.partida] = {};

	   				costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   				costosDirectosTotales[costoTotal.partida].partida_id = costoTotal.partida_id;
	   				costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   				costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   				 costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   				 costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   				costosDirectosTotales[costoTotal.partida].costos = [];
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					partida_id : costoTotal.partida_id,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}else{
	   			    costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   			    costosDirectosTotales[costoTotal.partida].partida_id = costoTotal.partida_id;
	   			    costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   			    costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   			     costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   			     costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   		
	   				
	   				totalPresupuestos += costoTotal.total; 
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					partida_id : costoTotal.partida_id,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,

	   					
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}

	   		});


var totalP = 0.00;
			

	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					_.each(presupuesto.costos, function(costo){
	   						costo.direct = costo.value * presupuesto.cantidad;
	   						_.each(costosDirectosTotales, function(costoTotal){
	   							totalP += costo.value;
	   							costoTotal.directo = totalP;

     

	   						});
	   					});
	   				});


	   				var totalSuma = 0.00;

 					_.each(rc.getReactively("cosas"), function(cosa){
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){

		   					_.each(presupuesto.costos, function(costo){
		   						totalSuma += costo.direct;
		   						//costo.directSumados = totalSuma;
		   						
		   					});
		   					presupuesto.totalOtro = totalSuma;
		   					presupuesto.costoIndi = (presupuesto.totalOtro * cosa.costoIndirecto) / 100;
		   					presupuesto.financiamiento = (presupuesto.totalOtro + presupuesto.costoIndi) * cosa.costoFinanciamento / 100;
		   					presupuesto.utilidad = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento) * cosa.cargoUtilidad / 100;
		   					presupuesto.adicional = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento + presupuesto.utilidad) * cosa.cargoAdicional / 100;
		   					presupuesto.precioUnitario = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento + presupuesto.utilidad + presupuesto.adicional);
		   					totalSuma = 0.00;
		   				});
	   			});


 			_.each(partidas, function(partida){
 				 rc.totalPrecioUnitario = 0.00;
 				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   				  
		   				   rc.totalPrecioUnitario += presupuesto.precioUnitario
		 	      	});
	   			});


_.each(partidas, function(partida){
	
			_.each(costosDirectosTotales, function(costoTotal){
				var todosPresu = 0.00;
				if (costoTotal.partida_id == partida._id) {
					_.each(costoTotal.costos, function(costo){				
		   			todosPresu += costo.presupuesto
		   	});
			}
				
				
				costoTotal.presus = todosPresu;
		});
	});


			costosDirectosTotalesSuma = {};
 			_.each(costosDirectosTotales, function(partidas){
 				_.each(partidas.costos, function(costos){
 					if("undefined" == typeof costosDirectosTotalesSuma[costos.costo]){
						costosDirectosTotalesSuma[costos.costo] = {};
						costosDirectosTotalesSuma[costos.costo].presupuestos = costos.presupuesto;
						costosDirectosTotalesSuma[costos.costo].ajuste = costos.ajuste;
						costosDirectosTotalesSuma[costos.costo].real = costos.realPeriodo;
						costosDirectosTotalesSuma[costos.costo].diferencia =  costos.diferencia;
						costosDirectosTotalesSuma[costos.costo].partida_id =  partidas.partida_id;
						costosDirectosTotalesSuma[costos.costo].costo_id =  costos.costo_id;
						
					}else{
						costosDirectosTotalesSuma[costos.costo].presupuestos += costos.presupuesto;
						costosDirectosTotalesSuma[costos.costo].ajuste += costos.ajuste;
						costosDirectosTotalesSuma[costos.costo].real += costos.realPeriodo;
						costosDirectosTotalesSuma[costos.costo].diferencia += costos.diferencia;
						costosDirectosTotalesSuma[costos.costo].partida_id =  partidas.partida_id;
						costosDirectosTotalesSuma[costos.costo].costo_id =  costos.costo_id;
					
					}

 				})
 			});


 		

 			//console.log(rc.presupuestos);
 			sumaPreciosUnitarios = {};
 			
			_.each(this.getReactively("presupuestos"), function(presupuesto){
				if("undefined" == typeof sumaPreciosUnitarios[presupuesto.partida_id]){
					sumaPreciosUnitarios[presupuesto.partida_id] = {};
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario = presupuesto.precioUnitario;
					sumaPreciosUnitarios[presupuesto.partida_id].partida_id = presupuesto.partida_id;
				}else{
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario += presupuesto.precioUnitario;
					sumaPreciosUnitarios[presupuesto.partida_id].partida_id = presupuesto.partida_id;
				}
			});


				_.each(sumaPreciosUnitarios, function(suma){
 			  _.each(costosDirectosTotales, function(partidas){
 			  
 			  		if (partidas.partida_id == suma.partida_id ) 
 			  		
				partidas.totalPrecioUnitarioFin = suma.precioUnitario
 			});
 		});	

				
				_.each(costosDirectosTotales, function(arreglo){
          var directoReal = 0.00;
 				_.each(arreglo.costos, function(costo){



 					if (arreglo.partida_id == costo.partida_id)
		   				 {
		   				 	directoReal += costo.realPeriodo
		   				 }  
		 	      	});
 				arreglo.directoReal1 = directoReal
	   			});
_.each(rc.planes, function(plan){
	   			_.each(rc.indirectoMes2, function(indi){
	   				indirectoObra = indi.indirecto
	   			_.each(costosDirectosTotales, function(arreglo){
	   				arreglo.indirectoReal= arreglo.directoReal1 * parseFloat(indirectoObra.toFixed(2)/100);
	   				arreglo.costoUnitario = arreglo.indirectoReal + arreglo.directoReal1
	   				arreglo.baseGravable= arreglo.totalPrecioUnitarioFin - arreglo.costoUnitario
	   				arreglo.utilidadNeta = arreglo.baseGravable -(plan.isr/100*arreglo.baseGravable)-(arreglo.baseGravable*0.1)

	   			});
	   		});
	   			});

	   		// 	_.each(rc.getReactively("presupuestos"), function(presu){
	   		// 	_.each(costosDirectosTotales, function(arreglo){
	   		// 		arreglo.baseGravable= presupuesto.totalPrecioUnitario 
	   			
	   		// 	});
	   		// });





			


 			//console.log("precios Unitarios", _.toArray(sumaPreciosUnitarios));
			
            //console.log("suma", _.toArray(costosDirectosTotalesSuma));
	   		console.log("nuevoArreglo",_.toArray(costosDirectosTotales));
	   		return costosDirectosTotales;
		},


//////////////////////////////// SEGUNDO ARREGLO  //////////////////////////////////////////////////////



	  costosTotales2 : () => {	
			var costosTotales = {};
			var partidas = Partidas.find().fetch();

	   		_.each(rc.getReactively("partidas"), function(partida){
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id ){
	   						_.each(presupuesto.costos, function(costoPresupuesto){
	   							if("undefined" == typeof costosTotales[partida.nombre + " - " + costoPresupuesto.nombre]){
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre] = {};	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].cantidad = presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].direct = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].precioUnitario = costoPresupuesto.precioUnitario;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}
	   						});
	   					}
	   				})
	   		});
	   		var costosTotalesArreglos = _.toArray(costosTotales);
	   		//var totalPer=0.00;
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("este es el plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("costos plan",costosPlan);
	   				_.each(costosTotalesArreglos, function(costoReal){
	   				//	console.log("costos reales",costoReal);

	   					if(costoReal.costo_id == costosPlan._id){
	   						costoReal.factor = costosPlan.factor;
	   						//console.log("costos de if",costoReal);
	   					}
	   					//console.log(costoReal);
	   				});
	   			});
	   		});
	   		var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
   			_.each(costosPeriodos, function(costoPeriodo){
			  	_.each(costosTotalesArreglos, function(kaka){
		  			var totalPer=0.00;
		  			var directoReales = 0.00;
		  			if (kaka.costo_id == costoPeriodo.costo_id && kaka.partida_id == costoPeriodo.partida_id){
		  				totalPer += costoPeriodo.comprasSinIva + (costoPeriodo.comprasIva / 1.16) + costoPeriodo.contadoSinIva + (costoPeriodo.contadoIva / 1.16)
		  				kaka.periodo = totalPer;
		  				directoReales += kaka.periodo;
		  				kaka.directoReal = directoReales;
		  			}else{
		  			  if(kaka.periodo == undefined)
		  			  	kaka.periodo = 0.00;
		  			}
		  		});	
		  	});
	   		//console.log("esto tengo", costosTotalesArreglos);
	   		var costosDirectosTotales = {};
	   		//console.log();
	   		var zamaPresupuesto = 0.00;
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			//console.log("entré") 
	   			var totalPresupuestos = 0.00;
	   			
	   			if("undefined" == typeof costosDirectosTotales[costoTotal.partida]){
	   			//	console.log("entré acá");
	   				costosDirectosTotales[costoTotal.partida] = {};
	   				costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   				costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   				costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   				 costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   				 costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   				costosDirectosTotales[costoTotal.partida].costos = [];
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}else{
	   			    costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   			    costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   			    costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   			     costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   			     costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   
	   				totalPresupuestos += costoTotal.total; 
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}
	   		});

var totalP = 0.00;
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					_.each(presupuesto.costos, function(costo){
	   						costo.direct = costo.value * presupuesto.cantidad;
	   						_.each(costosDirectosTotales, function(costoTotal){
	   							totalP += costo.value;
	   							costoTotal.directo = totalP; 
	   						});
	   					});
	   				});
	   				var totalSuma = 0.00;
 					_.each(rc.getReactively("cosas"), function(cosa){
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   					_.each(presupuesto.costos, function(costo){
		   						totalSuma += costo.direct;	   						
		   					});
		   					presupuesto.totalOtro = totalSuma;
		   					presupuesto.costoIndi = (presupuesto.totalOtro * cosa.costoIndirecto) / 100;
		   					presupuesto.financiamiento = (presupuesto.totalOtro + presupuesto.costoIndi) * cosa.costoFinanciamento / 100;
		   					presupuesto.utilidad = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento) * cosa.cargoUtilidad / 100;
		   					presupuesto.adicional = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento + presupuesto.utilidad) * cosa.cargoAdicional / 100;
		   					presupuesto.precioUnitario = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento + presupuesto.utilidad + presupuesto.adicional);
		   					totalSuma = 0.00;
		   				});
	   			});
 			_.each(partidas, function(partida){
 				 rc.totalPrecioUnitario = 0.00;
 				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   				  
		   				   rc.totalPrecioUnitario += presupuesto.precioUnitario
		 	      	});
	   			});
_.each(partidas, function(partida){
			_.each(costosDirectosTotales, function(costoTotal){
				var todosPresu = 0.00;
				if (costoTotal.partida_id == partida._id) {
					_.each(costoTotal.costos, function(costo){				
		   			todosPresu += costo.presupuesto
		   	});
			}	
				costoTotal.presus = todosPresu;
		});
	});
			costosDirectosTotalesSuma = {};
 			_.each(costosDirectosTotales, function(partidas){
 				_.each(partidas.costos, function(costos){
 					if("undefined" == typeof costosDirectosTotalesSuma[costos.costo]){
						costosDirectosTotalesSuma[costos.costo] = {};
						costosDirectosTotalesSuma[costos.costo].presupuestos = costos.presupuesto;
						costosDirectosTotalesSuma[costos.costo].ajuste = costos.ajuste;
						costosDirectosTotalesSuma[costos.costo].real = costos.realPeriodo;
						costosDirectosTotalesSuma[costos.costo].diferencia =  costos.diferencia;
						costosDirectosTotalesSuma[costos.costo].partida_id =  partidas.partida_id;
						costosDirectosTotalesSuma[costos.costo].costo_id =  costos.costo_id;
					}else{
						costosDirectosTotalesSuma[costos.costo].presupuestos += costos.presupuesto;
						costosDirectosTotalesSuma[costos.costo].ajuste += costos.ajuste;
						costosDirectosTotalesSuma[costos.costo].real += costos.realPeriodo;
						costosDirectosTotalesSuma[costos.costo].diferencia += costos.diferencia;
						costosDirectosTotalesSuma[costos.costo].partida_id =  partidas.partida_id;
						costosDirectosTotalesSuma[costos.costo].costo_id =  costos.costo_id;
					}

 				})
 			});
 			_.each(costosDirectosTotalesSuma, function(suma){
 			  _.each(costosDirectosTotales, function(partidas){
 			  	_.each(partidas.costos, function(costos){
 			  		if (costos.costo_id == suma.costo_id ) {
 			  			costos.presupuestoFinal = suma.presupuestos
 			  		}
 			});
 		});
 	 });
 			//console.log(rc.presupuestos);
 			sumaPreciosUnitarios = {};
			_.each(this.getReactively("presupuestos"), function(presupuesto){
				if("undefined" == typeof sumaPreciosUnitarios[presupuesto.partida_id]){
					sumaPreciosUnitarios[presupuesto.partida_id] = {};
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario = presupuesto.precioUnitario;
				}else{
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario += presupuesto.precioUnitario;
				}
			});





           // console.log("suma de costosTotales2", _.toArray(costosDirectosTotalesSuma));
	   		return costosDirectosTotalesSuma;
		},


///////////////////////////////////////////////////////////////////////////////////////////////////////////

jaime : () => {
		
		 arreglo = [];
		var periodosCampo = Periodos.find().fetch;
		var periodos = 0.00;
			  var gastos = 0.00;
	 		_.each(rc.getReactively("periodosCampo"), function(campo){
	 			//console.log("per",campo)
	 				periodos +=  campo.comprasSinIva + (campo.comprasIva / 1.16)
	 				  + campo.contadoSinIva + (campo.contadoIva / 1.16);
	 		 });	
	 		  _.each(rc.getReactively("gastosOficinas"),function(gasto){
	 				  	gastos += gasto.importeFijo + gasto.importeVar;
	 				  });
	 				  var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(cobros,function(cobro){
 					totalIngresos += cobro.cSinIva || cobro.cIva;
 					cobro.ingresos = parseInt(totalIngresos);
 				});	
 		arreglo.push({indirectos : (periodos + gastos) / totalIngresos * 100,});
 		//console.log("probando", arreglo);
 		//console.log("resultado", ingresosPorMesPorObraConPorcentaje);
 		return arreglo; 
	},

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

    this.getConcepto= function(concepto_id)
	{
		var concepto = Conceptos.findOne(concepto_id);
		if(concepto)
		return concepto.nombre;
	};
	this.totalPre = function(costos){
		
		var suma = 0.00;
		_.each(costos, function(costo){
			suma += parseFloat(costo.value);
		});
		//console.log("totalre" , suma)
		return suma;
	}
		
};







// var costosDirectosTotalesFinal = {};
	   		
// 	   		//console.log();
// 	   		var zamaPresupuesto = 0.00;
// 	   		_.each(costosTotalesArreglos, function(costoTotal){
// 	   			//console.log("entré") 
// 	   			var totalPresupuestos = 0.00;
	   			
// 	   			if("undefined" == typeof costosDirectosTotalesFinal[costoTotal.partida]){
// 	   			//	console.log("entré acá");
// 	   				costosDirectosTotalesFinal[costoTotal.partida] = {};

// 	   				costosDirectosTotalesFinal[costoTotal.partida].partida = costoTotal.partida;
// 	   				costosDirectosTotalesFinal[costoTotal.partida].cantidad = costoTotal.cantidad;
// 	   				costosDirectosTotalesFinal[costoTotal.partida].factor = costoTotal.factor;
// 	   				 costosDirectosTotalesFinal[costoTotal.partida].real = costoTotal.periodo;
// 	   				 costosDirectosTotalesFinal[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
// 	   				 costosDirectosTotalesFinal[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotalesFinal[costoTotal.partida].ajustePresu;
// 	   				costosDirectosTotalesFinal[costoTotal.partida].costos = [];
// 	   				costosDirectosTotalesFinal[costoTotal.partida].costos.push({
// 	   					costo_id : costoTotal.costo_id,
// 	   					costo : costoTotal.costo,
// 	   					presupuesto : costoTotal.total,
// 	   					partida : costoTotal.partida,
// 	   					factor : costoTotal.factor,
// 	   					realPeriodo : costosDirectosTotalesFinal[costoTotal.partida].real,
// 	   					ajuste : costosDirectosTotalesFinal[costoTotal.partida].ajuste,
// 	   					diferencia : costoTotal.total - costosDirectosTotalesFinal[costoTotal.partida].real,
// 	   					value :  costosDirectosTotalesFinal[costoTotal.partida].value = costoTotal.direct,
// 	   					cantidad : costosDirectosTotalesFinal[costoTotal.partida].cantidad = costoTotal.cantidad,
// 	   				});
// 	   				zamaPresupuesto += costoTotal.total;
// 	   			}else{
// 	   			    costosDirectosTotalesFinal[costoTotal.partida].partida = costoTotal.partida;
// 	   			    costosDirectosTotalesFinal[costoTotal.partida].cantidad = costoTotal.cantidad;
// 	   			    costosDirectosTotalesFinal[costoTotal.partida].factor = costoTotal.factor;
// 	   			     costosDirectosTotalesFinal[costoTotal.partida].real = costoTotal.periodo;
// 	   			     costosDirectosTotalesFinal[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
// 	   				 costosDirectosTotalesFinal[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotalesFinal[costoTotal.partida].ajustePresu;
	   		
	   				
// 	   				totalPresupuestos += costoTotal.total; 
// 	   				costosDirectosTotalesFinal[costoTotal.partida].costos.push({
// 	   					costo_id : costoTotal.costo_id,
// 	   					costo : costoTotal.costo,
// 	   					presupuesto : costoTotal.total,
// 	   					partida : costoTotal.partida,
// 	   					factor : costoTotal.factor,
// 	   					realPeriodo : costosDirectosTotalesFinal[costoTotal.partida].real,
// 	   					ajuste : costosDirectosTotalesFinal[costoTotal.partida].ajuste,
// 	   					diferencia : costoTotal.total - costosDirectosTotalesFinal[costoTotal.partida].real,
// 	   					value :  costosDirectosTotalesFinal[costoTotal.partida].value = costoTotal.direct,
// 	   					cantidad : costosDirectosTotalesFinal[costoTotal.partida].cantidad = costoTotal.cantidad,

	   					
// 	   				});
// 	   				zamaPresupuesto += costoTotal.total;
// 	   			}

	   		// });


























	 	

