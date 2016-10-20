angular.module('formulas')
.controller('PlanesCtrl', PlanesCtrl);
function PlanesCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);

	this.plan = {};
	this.plan.costos = [];


	this.totalCosto = 0;
	this.totalFinalCostosDirectos = 0.00;
	this.costoTotalTotal = [];
	this.costoTotalPres = [];

  this.subscribe('planes',()=>{
		return [{obra_id : $stateParams.id,estatus:true}] 
  });
  this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
  });
  this.subscribe('GI',()=>{
		return [{obra_id : $stateParams.id,estatus:true}] 
  });
   this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
     });
  this.subscribe('periodos',()=>{
		return [{estatus:true}] 
  });
   this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
  });
   this.subscribe('costos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:false}] 
    });
    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('conceptos',()=>{
	return [{obra_id : $stateParams.id,partida_id: this.getReactively('partida_id'),estatus:true}] 
    });
    this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('presupuestos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });

    this.subscribe('pagosProveedores',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });



  this.action = true;  
  this.nuevo = true;
  
 // console.log($stateParams);
  this.helpers({
	  planes : () => {
		  return Planes.find();
	  },
	  cobros : () => {
		  return Cobros.find();
	  },
	   gastosOficina : () => {
		  return GastosOficina.find();
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	   partidas : () => {
		  return Partidas.find();
	  },
	   presupuestos : () => {
		  return Presupuestos.find();
	  },
	  obra : () => {
		  return Obras.findOne($stateParams.id);
	  },
	  gi : ()=> {
		  return GI.find();
	  },
	  periodos : () => {
		  return Periodos.find();
	  },

	  periodosCampo : () => {
	  	return Periodos.find({tipo : "gasto"});
	  },
	  periodosGasto : () => {
	  	return Periodos.find({tipo : "costo",obra_id: this.getReactively('obra_id')});
	  },

	  gastos : () => {
		  return GastosOficina.find();
	  },
	    jaime : () => {
		var obras = Obras.find().fetch();
		var ingresosTotalesPorObra = [];

	
		
 			_.each(obras, function(obra){ 				
 				var ingresos = 0; 
 				var totalCobro = 0;
 				var ingresosObras = Cobros.find({modo : false}).fetch(); 				
 				_.each(ingresosObras, function(ingresoObra){
 					ingresos += ingresoObra.cSinIva + ingresoObra.cIva/1.16;
 				});


                 
                 var per= Periodos.find({obra_id : obra._id, tipo : "costo"}).fetch();
 				_.each(per, function(cobro){
 					totalCobro += cobro.comprasSinIva + (cobro.comprasIva / 1.16)
 				  + cobro.contadoSinIva + (cobro.contadoIva / 1.16);
 				});

 				var totalGastoOficinaPorMes = 0; 
 				_.each(rc.getReactively("gastosOficina"), function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

 				var totalIngresos=0;
					var cobros = Cobros.find().fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
					});


						var totalCampo = 0;
						_.each(rc.getReactively("periodosCampo"),function(periodo){
							var obra_id=obra._id;
							if(obra_id == periodo.obra_id)
							totalCampo += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
						 + (periodo.contadoIva / 1.16) + periodo.contadoSinIva
						});


					var x = 0;
					x= parseFloat(totalIngresos.toFixed(2)) / parseFloat(ingresos.toFixed(2));
					var y = 0;
					y = parseFloat(totalGastoOficinaPorMes.toFixed(2)) * parseFloat(x);
					var z = 0;
					z = parseFloat(totalCampo.toFixed(2)) + parseFloat(y.toFixed(2))


 				
 				ingresosTotalesPorObra.push({ obra_id : obra._id, obra_nombre : obra.nombre,oficinas:parseFloat(totalGastoOficinaPorMes.toFixed(2)), total : parseFloat(ingresos.toFixed(2))
 					,costo: parseFloat(totalCobro.toFixed(2)),ingresosObra:parseFloat(totalIngresos.toFixed(2)),
 					calculo:parseFloat(x), gasto:parseFloat(y.toFixed(2)),campo:parseFloat(totalCampo.toFixed(2)),
 					gastosEstado:parseFloat(z.toFixed(2)) });
 			});


 		console.log("probando", ingresosTotalesPorObra);
 		//console.log("resultado", ingresosPorObraConPorcentaje);
 		return ingresosTotalesPorObra; 
	},

	 		costosTotales : () => {
			var costosTotales = {};
			var partidas = Partidas.find().fetch();
			var obras = Obras.find().fetch();
			var presupuestos = Presupuestos.find().fetch();
			var conceptos = Conceptos.find().fetch();
			var planes = Planes.find().fetch();
		   		_.each(rc.getReactively("partidas"), function(partida){
		   			_.each(rc.getReactively("conceptos"), function(concepto){
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
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
		   								
		   							};
		   							
		   						});
		   					};

		   				});
		   			});
		   		});
	   		var costosTotalesArreglos = _.toArray(costosTotales);
	   		var totalCosto = 0;
	   		var factorPlan = 0;
	   		var totalPresupuestoTotal  = 0;
	   		this.totalFinalCostosDirectos = 0.00;
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("entro al plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("entro papa",costosPlan);
	   				_.each(costosTotalesArreglos, function(costoTotal){
	   					//console.log("entro al arreglo",costoTotal);
	   					if(costoTotal.costo_id == costosPlan._id)
	   					{
	   						costoTotal.factor = costosPlan.factor;
	   						costoTotal.presupuestoTotal = (costoTotal.total) - ((costoTotal.total * costosPlan.factor)/100);

	   						//console.log("entro final", costoTotal);
	   					}
	   				})
	   			})
	   		})
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			rc.totalFinalCostosDirectos += costoTotal.total;
	   			costoTotal.finalesDirectos = rc.totalFinalCostosDirectos;
	   			costoTotal.totalDePorcentaje = costoTotal.total / costoTotal.finalesDirectos * 100;
	   			totalPresupuestoTotal += costoTotal.presupuestoTotal;
	   			costoTotal.totalPresupuestos += totalPresupuestoTotal;
	   		});

totalPresupuestoTotal = 0.00;
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   					//console.log("entro al arreglo",costoTotal);
	   					//if(costoTotal.costo_id == costosPlan._id)
	   					//{
	   						totalPresupuestoTotal += costoTotal.presupuestoTotal
	   						costoTotal.totalpreFinal =  totalPresupuestoTotal

	   						//console.log("entro final", costoTotal);
	   					//}
	   				})



	   		rc.costoTotalTotal = costosTotalesArreglos[0]
	   		rc.costoTotalPres = costosTotalesArreglos[3]
	   		costosTotalesArreglos.push({final : totalCosto, totalpre: totalPresupuestoTotal});
	   		console.log("arreglo",costosTotalesArreglos);
	   		return costosTotales;
		},


///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////)























	  
	  costos : () => {
	  // 	var cost = Costos.find().fetch();
			// for (var i = 0; i < cost.length; i++) {
			// 	if(!cost[i].factor)
			// 		cost[i].factor=0;
			// }
			// return cost;

  	    var costos = Costos.find().fetch();
  	    for (var i = 0; i < costos.length; i++) {
				if(!costos[i].factor)
					costos[i].factor=0;
			}
  		  // _.each(costos,function(costo){
    		// rc.plan.costos.push({_id : costo._id, nombre : costo.nombre, factor : 0});
    		// //costo.presupuesto = costo.valor * costo.factor - costo.valor;
   		 // });
  	   //  console.log("costos", costos);
  	   //  console.log("plan costos",rc.plan);
  	    return costos;
		 
	  },
	  
	  	  totalFinalCalculo :() => {
		var arreglo = [];
		total = 0;
		var meses = Meses.find().fetch();
		if(this.meses){
			_.each(this.meses,function(mes){
				//var gastosOficina = GastosOficina.find({ mes_id : mes._id});
				var totalGastoOficina = 0.00;
				_.each(rc.gastosOficinas, function(gastoOficina){
					if(gastoOficina.mes_id == mes._id){
						totalGastoOficina += gastoOficina.importeFijo + gastoOficina.importeVar;
					}
				});
				arreglo.push({mes : mes.mes, totalGastosOficina : totalGastoOficina});

			});
			return arreglo;

		}
	},


	  totalIngresos :  () => {
	  	var ingresos = [];

 				var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(cobros,function(cobro){
 					totalIngresos += cobro.cSinIva || cobro.cIva;
 					cobro.ingresos = parseInt(totalIngresos);
 				});
 				ingresos.push({total : totalIngresos })
 				//
 				//console.log(ingresos);
 				return  ingresos;
	  },
	  totalAnual : () => {
	  	var obrasCalcu = [];

	  	if(this.getReactively("obras") != undefined){

	  		_.each(this.obras,function(obra){
	  			//console.log("ESTAAAAA");
				var totalAn=0;
				var gastosCampo = Periodos.find({obra_id: obra._id}).fetch();
				_.each(gastosCampo,function(gasto){
					totalAn += gasto.comprasIva + gasto.contadoIva 
				});
				obrasGastos.push({nombre : obra.nombre, total : totalAn});
			});
			//console.log(obrasGastos)
	  	}		
		return obrasCalcu;
	  },




	  //////////////////////////////////////////  GASTOS DE OFICINA /////////////////////////////////////////////////
	  
	  indirectosEmpresas : () => {
		var gastosIndirectoEmpresa = [];

		  	//GASTOS OFICINA;
		  	var totalGastosOficinas = 0;
		  	
		  	//var totalGastosCampo = 0;
		  	var gastosOF = GastosOficina.find().fetch();
		  	var plan_ingresos = 0;
		  	_.each(rc.getReactively("planes"),function(plan){
		  		 plan_ingresos = plan.ingresos;
 				_.each(rc.gastosOficina,function(gasto){
 					totalGastosOficinas += gasto.importeFijo + gasto.importeVar
 					gasto.gastoOficina = totalGastosOficinas;

 					

	  		  });
 		  });


		  	var totalIngresos = 0;


		  	_.each(rc.getReactively("cobros"),function(cobro){
 						totalIngresos += cobro.cSinIva + cobro.cIva

 						
 					
 					});


		  	// _.each(rc.periodosCampo,function(campo){
 				//  			 totalGastosCampo += campo.comprasIva + campo.contadoIva + campo.contadoSinIva + campo.comprasSinIva
 				// 				  campo.gastosCampo = parseInt(totalGastosCampo);
 				
 				// 		});


 				var totalGastosCampo = 0;
 				var periodos = Periodos.find().fetch();
 				_.each(rc.getReactively("periodosCampo"),function(campo){
 				  totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				  campo.gastosCampo = parseInt(totalGastosCampo);
 				  
				});

var finalDirectos = 0;
				_.each(rc.costosTotales, function(costoTotal){
					finalDirectos = costoTotal.finalesDirectos;
					console.log("eaaa",finalDirectos);

	   					
	   				})


			gastosIndirectoEmpresa.push({totalGastos : totalGastosOficinas, totalCobros : totalIngresos,
			 totalGastosCampo : totalGastosCampo, planIngresos : plan_ingresos });
 	  

               var cantidadesSumadas = plan_ingresos * ((totalGastosOficinas  + totalGastosCampo) / (totalIngresos));
               var oficinaMasCampo = (totalGastosOficinas  / (totalGastosOficinas + totalGastosCampo) * 100);
               var GastoIndiCampo = totalGastosCampo / (totalGastosOficinas + totalGastosCampo ) * 100;
               var oficinaCampoIngresos= ((totalGastosOficinas +  totalGastosCampo) / totalIngresos * 100);




              gastosIndirectoEmpresa.push({total : cantidadesSumadas, cantidades : parseFloat(oficinaCampoIngresos.toFixed(2))* finalDirectos /100    ,
              	GasIndiCampo : cantidadesSumadas * GastoIndiCampo/100, estadisticos :  cantidadesSumadas - (cantidadesSumadas * GastoIndiCampo/100)})



        console.log("gastos", gastosIndirectoEmpresa);
	//	console.log("final", final);

		return gastosIndirectoEmpresa;
	},




	//////////////////////////////////////////////////////////////////////////////////////////////////////////

  });
 
  this.nuevoPlan = function()
  {
	  this.action = true;
    this.nuevo = !this.nuevo;
    //this.plan = {};

};

  
 this.guardar = function(costos)
	{

		console.log(costos);
		   rc.plan.estatus = true;
		   rc.plan.obra_id = $stateParams.id;
		   rc.plan.fechaCreacion = new Date();
	   _.each(costos, function(costo){
		 	delete costo.$$hashKey;
		 });
	   rc.plan.costos = costos;
		console.log("objeto insertado en plan", rc.plan);
		Planes.insert(rc.plan);		

		toastr.success('Plan guardado.')
		this.costo = {};
		this.plan = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		
	};

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
	
	
	this.editar = function(id)
	{
		this.plan = Planes.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
		
		//_.each(rc.costosTotales, function(costo){
			//rc.totalPor = costo.valor / rc.totalCosto ;
		//});
		//console.log("arreglo", rc.costosTotales)
	};	
	
	this.actualizar = function(plan,costos)
	{
		console.log(costos);
		rc.plan.costos = costos;
		var idTemp = plan._id;
		delete plan._id;
		_.each(rc.plan.costos, function(costo){
			delete costo.$$hashKey;
		});		
		Planes.update({_id:idTemp},{$set:plan});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(rc.plan);
	};
this.actCam = true;
	this.actualizarCambios = function(plan,costos,id)
	{
		console.log(costos);
		rc.plan.costos = costos;
		var idTemp = plan._id;
		delete plan._id;
		_.each(rc.plan.costos, function(costo){
			delete costo.$$hashKey;
		});		
		Planes.update({_id:idTemp},{$set:plan});
		this.plan = Planes.findOne({_id:id});
	
		console.log(rc.plan);
	};

	this.editarCambios = function(id)
	{
		this.plan = Planes.findOne({_id:id});
		this.editCam = false;
		this.actCam = true;
	   
		
		//_.each(rc.costosTotales, function(costo){
			//rc.totalPor = costo.valor / rc.totalCosto ;
		//});
		//console.log("arreglo", rc.costosTotales)
	};	
		
	this.cambiarEstatus = function(id)
	{
		var plan = Planes.findOne({_id:id});
		if(plan.estatus == true)
			plan.estatus = false;
		else
			plan.estatus = true;
		
		Planes.update({_id:id}, {$set : {estatus : plan.estatus}});
		};

// Funciones de precio proyecto                                                 
                           													
// 		

			this.TotalFinalGO = function()
			{
				total = 0;
				_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
				return total
			}

			$(document).ready(function(){
  			  $('[data-toggle="popover"]').popover();
		});

		


	   //  this.remove = function(empresa)
       // {
       //     this.empresa.estatus = false;
       //     this.empresas.save(empresa);
       // };
};