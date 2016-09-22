angular.module("formulas")
.controller("CostosDirectosCrtl", CostosDirectosCrtl);  
function CostosDirectosCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);


this.tipoPeriodo = 'costo';
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
	return [{tipo: this.getReactively('tipoPeriodo'),obra_id : $stateParams.id,estatus:true}] 
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



  this.action = true;
  
	this.helpers({
	  costosDirectos : () => {
		  return CostosDirectos.find();
	  },
	  partidas : () => {
		  return Partidas.find();
	  },
	   costos : () => {
		  return Costos.find();
	  },
	   periodos : () => {
		  return Periodos.find();
	  },
	   planes : () => {
		  return Planes.find();
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
	  presupuestos : () => {
		  return Presupuestos.find();
	  },
	  presupuestosPartidas : () => {
		  return Presupuestos.find({partida_id : this.getReactively("partida_id")});
	   },
	  totalPeriodos : () => {
	  	var periodos = Periodos.find().fetch();
	  	var partidas = Partidas.find().fetch();
	  	var costos = Costos.find().fetch();
	  	var totalPer=0;
	  	var periodosTotales = [];
	  	_.each(partidas, function(partida){
	  	  _.each(costos, function(costo){
	  		_.each(periodos, function(periodo){
	  			if (periodo.costo_id == costo._id) {
	  				totalPer += periodo.comprasSinIva + periodo.contadoSinIva
	  			}	
	  		});

	  	});

  	});
  	periodosTotales.push({total: totalPer});
  	//console.log("periodoArreglo", periodosTotales);

  	return periodosTotales;

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
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}
	   						})
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
	   		var costosPeriodos = Periodos.find().fetch();
   			_.each(costosPeriodos, function(costoPeriodo){
			  	_.each(costosTotalesArreglos, function(kaka){
		  			var totalPer=0.00;
		  			if (kaka.costo_id == costoPeriodo.costo_id && kaka.partida_id == costoPeriodo.partida_id){
		  				totalPer += costoPeriodo.comprasSinIva + costoPeriodo.comprasIva + costoPeriodo.contadoSinIva + costoPeriodo.contadoIva
		  				kaka.periodo = totalPer;
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
	   			var totalReal = 0.00;
	   			if("undefined" == typeof costosDirectosTotales[costoTotal.partida]){
	   			//	console.log("entré acá");
	   				costosDirectosTotales[costoTotal.partida] = {};
	   				costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   				costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   				 costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   				 costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   				 totalReal = costosDirectosTotales[costoTotal.partida].real;
	   				costosDirectosTotales[costoTotal.partida].totalReal = totalReal;
	   				costosDirectosTotales[costoTotal.partida].costos = [];
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,

	   				});   				
	   			}else{
	   			    costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   			    costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   			     costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   			     costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   				 totalReal = costosDirectosTotales[costoTotal.partida].real;
	   				costosDirectosTotales[costoTotal.partida].totalReal = totalReal;
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real
	   				});
	   			}
	   		});

	   		console.log("nuevoArreglo",_.toArray(costosDirectosTotales));
	   		return costosDirectosTotales;
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
		
};
