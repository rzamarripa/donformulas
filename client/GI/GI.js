angular.module("formulas")
.controller("GICTRL", GICTRL);  
function GICTRL($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);


this.mes_id = '';
this.tipoPeriodo = 'gasto';

	this.subscribe('GI',()=>{
	return [{mes_id: this.getReactively('mes_id'),estatus:true}] 
    });

     this.subscribe('gastosOficina',()=>{
	 return [{mes_id: this.getReactively('mes_id'),estatus:true}] 
     });

    this.subscribe('planes',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('obras',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true}] 
  });
    this.subscribe('cobros',()=>{
	return [{mes_id:this.getReactively('mes_id'),estatus:true}] 
  });
	this.subscribe('periodos',()=>{
	return [{tipo: this.getReactively('tipoPeriodo'),mes_id: this.getReactively('mes_id'),estatus:true}] 
  });

  this.action = true;
  
	this.helpers({
	  meses : () => {
		  return Meses.find();
	  },
	  obras : () => {
		  return Obras.find();
	  },
	  gastos : () => {
		  return GI.find();
	  },
	  gastosOficinas : () => {
		  return GastosOficina.find();
	  },
	  pagos : () => {
		  return PagosProveedores.find();
	  },
	  cobros : () => {
		  return Cobros.find();
	  },
	  periodos : () => {
	  	return Periodos.find();
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
  
  this.guardar = function(gastoIndirecto)
	{
		this.GI.estatus = true;
		console.log(this.gastoIndirecto);
		GI.insert(this.gastoIndirecto);
		toastr.success('Obra guardada.');
		this.gastoIndirecto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.gastoindirectos')
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


     this.mostrarMeses= function(id)
	{
		this.panelId = id;
		this.mes_id = id;
		this.panelColor = true;
		this.accionImporte = false;
	};

	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(this.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva + cobro.cSinIva
		});
		return total
	}

	this.cobroTotalFinalPeriodo = function(obra_id){
		var total = 0;
		_.each(this.periodos,function(periodo){
			if(obra_id == periodo.obra_id)
			total += periodo.comprasIva + periodo.comprasSinIva
		 + periodo.contadoIva + periodo.contadoSinIva
		});
		return total
	}

	this.ingresosTotales=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(cobros,function(cobro){
				var obra_id=obra._id;
				
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva + cobro.cSinIva
			})

		});
		return totalIngresos
	}


	this.cobrosTotales=function(obras){
		var totalCobros=0;
	
		_.each(obras, function(obra){
		
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
	
				if(obra_id == periodo.obra_id)
					totalCobros += periodo.comprasIva + periodo.comprasSinIva
				 			+ periodo.contadoIva + periodo.contadoSinIva
			})

		});
		return totalCobros
	}


     this.cobrosIngresos=function(obras){
     	
     	}









	this.TotalFinal = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}



	/*this.TotalFinal = function(mes_id){
		var total = 0;
		_.each(this.gastos,function(gasto){
		  if(mes_id == gasto.mes_id)
		  	 total += gasto.importeFijo + gasto.importeVar
		  	});
		
		return total;
	};*/



		
};
