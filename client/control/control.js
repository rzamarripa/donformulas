angular.module("formulas")
.controller("ControlCrtl", ControlCrtl);  
function ControlCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);

    
	this.totalCosto = 0;
	this.control = {};	

	this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
    });

	this.subscribe('control',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('controlForma',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('controlPlan',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('controlResponsables',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('controlCostos',()=>{
	return [{estatus:true}] 
    });

	this.subscribe('periodos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('costos',()=>{
	return [{estatus:true}] 
    });

	this.subscribe('conceptos',()=>{
	return [{estatus:true}] 
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
	  controlesForma : () => {
		  return ControlForma.find();
	  },
	  controlesResponsables : () => {
		  return ControlResponsables.find();
	  },
	  controlesPlan : () => {
		  return ControlPlan.find();
	  },
	  controlesCostos : () => {
		  return ControlCostos.find();
	  },
	  plan : () => {
	  	var plan = Planes.findOne();
	  	var costosPeriodos = Periodos.find().fetch();
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
	   	var resultados = [];
  	    var costos = Costos.find().fetch();
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
    this.act = true;
    this.mostrarMedidas = function() {
	     this.medidas = true;
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
		this.control.estatus = true;
		console.log(this.control);
		Control.insert(this.control);
		toastr.success('Obra guardada.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
		this.responsablesSave = false;
	};

 		this.editarMedidas = function(id)
	{
	    this.control = Control.findOne({_id:id});
	    this.act = false;
	    this.medidasText = true;
	    this.medidasSave = false;
	};
	this.actualizarMedidas = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		Control.update({_id:idTemp},{$set:control});
		this.act = true;
		this.medidasText = false;
	    this.medidasSave = false;
		console.log(control);
	};

	this.borrarMedidas = function(id)
	{
		var control = Control.findOne({_id:id});
		if(control.estatus == true)
			control.estatus = false;
		else
			control.estatus = true;
		
		Control.update({_id: id},{$set :  {estatus : control.estatus}});
    };
////////////////////////////// PLAN DE TRABAJO  /////////////////////////////////////////////////////////
    this.planTrabajo = false;
    this.planTrabajoText = false;
    this.planTrabajoSave = false;
    this.mostrarPlanTrabajo = function() {
	     this.planTrabajo = true;
	     this.planTrabajoText = true;
	     this.planTrabajoSave = true;
	     this.medidas = false;
	     this.forma = false;
	     this.responsables = false;
	     this.act = true;
	     this.control = {};	
    };
     this.guardarPlan = function(control)
	{
		this.control.estatus = true;
		console.log(this.control);
		ControlPlan.insert(this.control);
		toastr.success('Obra guardada.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
		this.responsablesSave = false;
	};
    	this.editarPlan = function(id)
	{
	    this.control = ControlPlan.findOne({_id:id});
	    this.act = false;
		this.planTrabajoText = true;
		this.planTrabajoSave = false;
	};
	this.actualizarPlan = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlPlan.update({_id:idTemp},{$set:control});
		this.act = true;
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
    this.mostrarForma = function() {
    	this.forma = true;
    	 this.formaText = true;
    	 this.formaSave = true;
    	this.medidas = false;
	    this.planTrabajo = false;
	    this.responsables = false;
	    this.act = true;
	    this.control = {};	
    };
     this.guardarForma = function(control)
	{
		this.control.estatus = true;
		console.log(this.control);
		ControlForma.insert(this.control);
		toastr.success('Obra guardada.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
		this.responsablesSave = false;
	};
    	this.editarForma = function(id)
	{
	    this.control = ControlForma.findOne({_id:id});
	    this.act = false;
		this.formaText = true;
		this.formaSave = false;
	};

		this.actualizarForma = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlForma.update({_id:idTemp},{$set:control});
		this.act = true;
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
    this.mostrarResponsables = function() { 
	    this.responsables = true;
	    this.responsablesText = true;
	    this.responsablesSave = true;
	    this.forma = false;
	    this.medidas = false;
	    this.planTrabajo = false;
	    this.act = true;
	    this.control = {};	
    };
     this.guardarResponsables = function(control)
	{
		this.control.estatus = true;
		console.log(this.control);
		ControlResponsables.insert(this.control);
		toastr.success('Obra guardada.');
		this.control = {}; 
		this.nuevo = true;
		this.formaText = false;
	    this.responsablesText = false;
	    this.medidasText = false;
	    this.planTrabajoText = false;
	    this.medidasSave = false;
		this.planTrabajoSave = false;
		this.formaSave = false;
		this.responsablesSave = false;
	};
    	this.editarResponsables = function(id)
	{
	    this.control = ControlResponsables.findOne({_id:id});
	    this.act = false;
		this.responsablesText = true;
		this.responsablesSave = false;
	};
	this.actualizarResponsables = function(control)
	{
		var idTemp = control._id;
		delete control._id;		
		ControlResponsables.update({_id:idTemp},{$set:control});
		this.act = true;
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

    }


		
};
