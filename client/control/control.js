angular.module("formulas")
.controller("ControlCrtl", ControlCrtl);  
function ControlCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);
    
    this.costo_id = '';
    this.nada = undefined;
	this.totalCosto = 0;
	this.costo = {};
	this.costo.detalle = [];	

	this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
    });



	this.subscribe('control',()=>{
	return [{costo_id: this.getReactively('costo_id'),estatus:true}] 
    });
    this.subscribe('controlPlan',()=>{
	return [{costo_id: this.getReactively('costo_id'),estatus:true}] 
    });
    this.subscribe('controlForma',()=>{
	return [{costo_id: this.getReactively('costo_id'),estatus:true}] 
    });
    this.subscribe('controlResponsables',()=>{
	return [{costo_id: this.getReactively('costo_id'),estatus:true}] 
    });

	this.subscribe('periodos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });

    this.subscribe('costos',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('presupuestos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });

	   this.subscribe('conceptos',()=>{
	return [{obra_id : $stateParams.id,partida_id: this.getReactively('partida_id'),estatus:true}] 
    });
    this.subscribe('planes',()=>{
	return [{estatus:true, obra_id : $stateParams.id}] 
    });

  this.action = true;
  
	this.helpers({
	  obras : () => {
		  return Obras.find();
	  },
	  controles : () => {
		  return Control.find();
	  },

	  controlesPlan : () => {
		  return ControlPlan.find();
	  },
	  controlesForma : () => {
		  return ControlForma.find();
	  },
	  controlesResponsables : () => {
		  return ControlResponsables.find();
	  },
	  
	   partidas : () => {
		  return Partidas.find();
	  },
	  presupuestos : () => {
		  return Presupuestos.find();
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	  plan : () => {
	  	var plan = Planes.findOne();
	  	var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
  		if(plan){
  			_.each(costosPeriodos,function(costoPeriodo){
  				_.each(plan.costos,function(costo){				
					if(costo._id == costoPeriodo.costo_id){						
						costo.compras = costoPeriodo.comprasSinIva; 
						costo.contado = costoPeriodo.contadoSinIva;
						costo.totalDeCostos = costoPeriodo.comprasSinIva + costoPeriodo.contadoSinIva;

						//console.log("entré", costo);
					}					
				});
		  	});
  		}
  		//console.log("plan", plan);
  		return plan;
	  },
	    costos : () => {
	

  	    var costos = Costos.find({estatus:true});
  	    for (var i = 0; i < costos.length; i++) {
				if(!costos[i].factor)
					costos[i].factor=0;
			}
  	    return costos;
		 
	  },




	    totalGastosAnual : () => {
	  	var obrasGastos = [];
	  	if(this.getReactively("obras") != undefined){
	  		_.each(this.obras,function(obra){
	  			//console.log("ESTAAAAA");
				var totalAn=0;
				var gastosCampo = Periodos.find({obra_id: obra._id}).fetch();
				_.each(gastosCampo,function(gasto){
					totalAn += gasto.comprasSinIva + gasto.contadoSinIva 
				});
				obrasGastos.push({nombre : obra.nombre, total : totalAn });
			});
			//console.log(obrasGastos)
	  	}		
		return obrasGastos;
	  },
	    planes : () => {
		  return Planes.find();
	  },
	   periodos : () => {
		  return Periodos.find();
	  },
	  periodosGastos : () => {
		  return Periodos.find({tipo:"costo"});
	  },
	  costosTotales : () => {
	  	 	var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
			var costosTotales = {};

		   		_.each(rc.getReactively("partidas"), function(partida){
		   			_.each(rc.getReactively("conceptos"), function(concepto){
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   					var totalFinal = 0.00;
		   					if(presupuesto.partida_id == partida._id && presupuesto.concepto_id == concepto._id){
		   						_.each(presupuesto.costos, function(costoPresupuesto){
		   							if("undefined" == typeof costosTotales[costoPresupuesto.nombre]){
		   								costosTotales[costoPresupuesto.nombre] = {};
		   								costosTotales[costoPresupuesto.nombre].partida = partida.nombre;
		   								costosTotales[costoPresupuesto.nombre].partida_id = partida._id;
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
	   		this.totalFinalCostosDirectos = 0.00;
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
	   		_.each(rc.getReactively("planes"), function(plan){
		   		_.each(costosTotalesArreglos, function(costoTotal){
		   			_.each(plan.costos, function(costosPlan){
		   				if(costoTotal.costo_id  ==  costosPlan.costo_id){
		   					costoTotal.factor = costosPlan.factor;
						}
		   			});

		   		});
		   	});


	   		

	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("entro al plan",plan);
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			var totalPer=0.00;
	   			_.each(rc.getReactively("periodosGastos"),function(costoPeriodo){
	   				
	   				

	   				
	   			

	   			
	   				//console.log("entro papa",costosPlan);
	   				
	   				
	   				
	   					
	   					//console.log("entro al arreglo",costoTotal);
	   					
	   					if(costoTotal.costo_id  ==  costoPeriodo.costo_id)
	   					{
	   						console.log("hola jaime", costoTotal.costo_id, costoPeriodo.costo_id, costoTotal, costoPeriodo)
	   						costoTotal.presupuestoTotal = (costoTotal.total) - ((costoTotal.total * costoTotal.factor)/100);
	   						totalPer += costoPeriodo.comprasSinIva + (costoPeriodo.comprasIva / 1.16) + costoPeriodo.contadoSinIva 
	   						+ (costoPeriodo.contadoIva / 1.16);
	   						costoTotal.real = totalPer;
	   						console.log("total acumulado", totalPer);
	   						
	   						//console.log("entro final", costoTotal);
	   					// }else{
	   					// 	costoTotal.real = 0.00;
	   					}


	   				});
	   			
	   		});
	   	});
	   		



_.each(rc.getReactively("planes"), function(plan){
	totalReal=0;
		_.each(plan.costos, function(costosPlan){
			
	   		_.each(rc.getReactively("periodosGastos"),function(costoPeriodo){
	   			
	   			_.each(costosTotalesArreglos, function(costoTotal){
	   				if(costoTotal.costo_id == costosPlan.costo_id)
	   					totalReal += costoTotal.real
	   				costoTotal.reales = totalReal


	   			});
	   		});
	   		});

});




	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			rc.totalFinalCostosDirectos += costoTotal.total;
	   			//costoTotal.finalesDirectos = rc.totalFinalCostosDirectos;
	   			costoTotal.totalDePorcentaje = costoTotal.total / costoTotal.finalesDirectos * 100;
	   		});


	   		_.each(rc.getReactively("controles"), function(control){
	   			_.each(costosTotalesArreglos, function(costoTotal){
       
	             if(costoTotal.costo_id == control.costo_id)
	   					{
	   						costoTotal.medida = control.descripcion;	
	   						
	   					}
	   				
	   		});
	   			});


             _.each(rc.getReactively("controlesResponsables"), function(control){
	   		_.each(costosTotalesArreglos, function(costoTotal){
	             if(costoTotal.costo_id == control.costo_id )
	   					{
	   						costoTotal.responsables = control.descripcionResponsables;
	   					}
	   				
	   		});

	   		});


            _.each(rc.getReactively("controlesPlan"), function(control){
	   		_.each(costosTotalesArreglos, function(costoTotal){
	             if(costoTotal.costo_id == control.costo_id )
	   					{
	   						costoTotal.plan = control.descripcionTrabajo;
	   					}
	   				
	   		});

	   		});
	   		_.each(rc.getReactively("controlesForma"), function(control){
	   		_.each(costosTotalesArreglos, function(costoTotal){
	             if(costoTotal.costo_id == control.costo_id )
	   					{
	   						costoTotal.forma = control.descripcionForma;
	   					}
	   				
	   		});

	   		});
	   		costosTotalesArreglos.push({final : totalCosto});

	   		console.log("arreglo",costosTotalesArreglos);
	   		return costosTotales;
		},
  });
  
	this.nuevo = true; 
	this.act = true; 	  
  this.nuevoControl = function()
  {
    this.nuevo = !this.nuevo;
    this.control = {};		
  };
  
	
	this.cambiarEstatus = function(id)
	{
		var control = Control.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		Control.update({_id: id},{$set :  {estatus : control.estatus}});
    };

/////////////////////////////////////////MEDIDAS POTENCIALES/////////////////////////////
    this.medidas = false;
    this.medidasText = false;
    this.medidasSave = false;
    this.panel = false
  

    this.mostrar = function(costo_id,costo) {

    	 this.costo_id = costo_id;
	     // this.medidasText = true;
	     // this.medidasSave = true;
	     // this.planTrabajo = false;
	     // this.forma = false;
	     // this.responsables = false;
	     this.act = true;
	     this.panel = true;
	     this.control = {};	
	      console.log(costo_id,costo);
	     
	     
 	};
 	  this.mostrarMedidas = function() {

    	

    	
	     this.medidas = true
	     this.medidasText = true;
	     this.medidasSave = true;
	     this.planTrabajo = false;
	     this.forma = false;
	     this.responsables = false;
	     this.act = true;
	     this.control = {};	
	 
	     
	     
 	};
 	 this.guardar = function(control)
	{
		this.control.costo_id = this.costo_id;
		this.control.estatus = true;
		console.log(this.control);
		Control.insert(this.control);
		toastr.success('Comentario guardado.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;


	};

 		this.editar = function(id)
	{
	    this.control = Control.findOne({_id:id});
	    this.act = false;
	    this.medidasText = true;
	    this.medidasSave = false;
	};
	this.actualizar = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		Control.update({_id:idTemp},{$set:control});
		this.act = true;
		this.medidasText = false;
	    this.medidasSave = false;
		console.log(control);
	};

	this.borrar  = function(id)
	{
		var control = Control.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		Control.update({_id: id},{$set :  {estatus : control.estatus}});
    };

    
    this.mostrarModal = function() { 
	    $('#myModal').modal('show');	
    };

    this.guardarModal = function() 
    {
    	this.control.estatus = true;
		console.log(this.control);
		ControlCostos.insert(this.control);
		toastr.success('Obra guardada.');
		this.control = {}; 

    }

    	this.editarModal = function(id)
	{
	    this.control = ControlResponsables.findOne({_id:id});
	};
		this.actualizarModal = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlCostos.update({_id:idTemp},{$set:control});
		console.log(control);
	};
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////

    this.ocultar = function()
    {
	    this.forma = false;
	    this.responsables = false;
	    this.medidas = false;
	    this.planTrabajo = false;
	    this.cosas = false;
	    this.panel = false

    };
		//////////////////////////// PLAN DE TRABAJO  /////////////////////////////////////////////////////////
    this.planTrabajo = false;
    this.planTrabajoText = false;
    this.planTrabajoSave = false;
      this.actTrabajo = true;
    this.mostrarPlanTrabajo = function() {
    	
	     this.planTrabajo = true;
	     this.planTrabajoText = true;
	     this.planTrabajoSave = true;
	     this.medidas = false;
	     this.forma = false;
	     this.responsables = false;
	     this.control = {};	
    };
     this.guardarPlan = function(control)
	{
		this.control.costo_id = this.costo_id;
		this.control.estatus = true;
		console.log(this.control);
		ControlPlan.insert(this.control);
		toastr.success('Comentario guardado.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
	
	};
    	this.editarPlan = function(id)
	{
	    this.control = ControlPlan.findOne({_id:id});
	    this.actTrabajo = false;
		this.planTrabajoText = true;
		this.planTrabajoSave = false;
	};
	this.actualizarPlan = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlPlan.update({_id:idTemp},{$set:control});
		this.actTrabajo = true;
		this.planTrabajoText = false;
	    this.planTrabajoSave = false;
		console.log(control);
	};
	this.borrarPlan = function(id)
	{
		var control = ControlPlan.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		ControlPlan.update({_id: id},{$set :  {estatus : control.estatus}});
    };

/////////////////////////////////////  FORMA  ////////////////////////////////////////////////////
    this.forma = false;
     this.formaText = false;
     this.formaSave = false;
       this.actForma = true;
    this.mostrarForma = function() {
    	
    	this.forma = true;
    	 this.formaText = true;
    	 this.formaSave = true;
    	this.medidas = false;
	    this.planTrabajo = false;
	    this.responsables = false;
	    this.control = {};	
    };
     this.guardarForma = function(control)
	{
		this.control.costo_id = this.costo_id;
		this.control.estatus = true;
		console.log(this.control);
		ControlForma.insert(this.control);
		toastr.success('Comentario guardado.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
		
	};
    	this.editarForma = function(id)
	{
	    this.control = ControlForma.findOne({_id:id});
	    this.actForma = false;
		this.formaText = true;
		this.formaSave = false;
	};

		this.actualizarForma = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlForma.update({_id:idTemp},{$set:control});
		this.actForma = true;
		this.formaText = false;
	    this.formaSave = false;
		console.log(control);
	};
	this.borrarForma = function(id)
	{
		var control = ControlForma.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		ControlForma.update({_id: id},{$set :  {estatus : control.estatus}});
    };
    /////////////////////////////////  RESPONSABLES  //////////////////////////////////////////////////
    this.responsables = false;
    this.responsablesText = false;
    this.responsablesSave = false;
    this.actResponsables = true;
    this.mostrarResponsables = function() { 
    	
    	

	    this.responsables = true;
	    this.responsablesText = true;
	    this.responsablesSave = true;
	    this.forma = false;
	    this.medidas = false;
	    this.planTrabajo = false;

	    this.control = {};	
    };
     this.guardarResponsables = function(control)
	{
		this.control.costo_id = this.costo_id;
		this.control.estatus = true;
		console.log(this.control);
		ControlResponsables.insert(this.control);
		toastr.success('Comentario guardado.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
	
	};
    	this.editarResponsables = function(id)
	{
	    this.control = ControlResponsables.findOne({_id:id});
	    this.actResponsables = false;
		this.responsablesText = true;
		this.responsablesSave = false;
	};
	this.actualizarResponsables = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlResponsables.update({_id:idTemp},{$set:control});
		this.actResponsables = true;
		this.responsablesText = false;
		this.responsablesSave = false;
		console.log(control);
	};
	this.borrarResponsables = function(id)
	{
		var control = ControlResponsables.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		ControlResponsables.update({_id: id},{$set :  {estatus : control.estatus}});
    };
    ///////////////////////////////// Modal//////////////////////////////////////////////////////
};
