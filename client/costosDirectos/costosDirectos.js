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
    return [{ _id : $stateParams.id, estatus : true}]});

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
 this.subscribe('periodos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
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
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
	  presupuestos : () => {
		  return Presupuestos.find().fetch();
	  },
	  

	  costosTotales : () => {	
	        //var presupuestosPartidas = Presupuestos.find({partida_id : rc.getReactively("partida_id")});
			//var conceptos = Conceptos.find().fetch();
			//var planes = Planes.find().fetch();
			var costosTotales = {};
			var partidas = Partidas.find().fetch();

	   		_.each(rc.getReactively("partidas"), function(partida){
	   			//_.each(rc.getReactively("conceptos"), function(concepto){
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id ){
	   						_.each(presupuesto.costos, function(costoPresupuesto){
	   							if("undefined" == typeof costosTotales[partida.nombre + " - " + costoPresupuesto.nombre]){
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre] = {};
	   								//costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].value = costoPresupuesto.value;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].cantidad = presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].direct = costoPresupuesto.value * presupuesto.cantidad;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}
	   						});
	   					}
	   				})
	   			//})
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
	   				
	   					totalPresupuestos += costoTotal.total; 
	   				costosDirectosTotales[costoTotal.partida].costos = [];
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					PresupuestosTotales: totalPresupuestos,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,

	   			

	   				});   				
	   			}else{
	   			    costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   			    costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   			    costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   			     costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   			     costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   		
	   				
	   				totalPresupuestos += costoTotal.total; 
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					PresupuestosTotales: totalPresupuestos,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,

	   					
	   				});
	   			}
	   		});

			
	// 		_.each(partidas, function(partida){
	// 		_.each(costosDirectosTotales, function(costoTotal){
	// 			var totalReal = 0.00;
				
	// 			if (costoTotal.partida_id == partida._id) {
	// 			}
	// 				//console.log("arreglin",costoTotal)
	// 			_.each(costoTotal.costos, function(costo){
	// 				//console.log("dentro",costo);				
	// 	   			totalReal += costo.realPeriodo
		   			
	// 	   	});
	// 			costoTotal.realFinal = totalReal;
	// 			costoTotal.directo = totalP;
	// 	});

	// });


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
				
				//costoTotal.directo = totalP;
		});
	});

 				



	   	//	console.log("presupuestos", rc.presupuestos);
			
            
	   		console.log("nuevoArreglo",_.toArray(costosDirectosTotales));
	   		return costosDirectosTotales;
		},




//////////////////////////////// SEGUNDO ARREGLO  //////////////////////////////////////////////////////

jaime : () => {
		
		 arreglo = [];
		var periodosCampo = Periodos.find().fetch;
	
		var periodos = 0.00;
			  var gastos = 0.00;
	 		_.each(rc.getReactively("periodosCampo"), function(campo){
	 			console.log("per",campo)
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
		console.log(this.costoDirecto);
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
