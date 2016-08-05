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

     this.subscribe('presupuestosCampo',()=>{
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
	return [{mes_id: this.getReactively('mes_id'),estatus:true,modo:false}] 
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
	  campos : () => {
		  return PresupuestosCampo.find();
	  },
	  cobros : () => {
		  return Cobros.find();
	  },
	  periodos : () => {
	  	return Periodos.find();
	  },
	  totalAnual : () => {
	  	var obrasCalculadas = [];
	  	if(this.getReactively("obras") != undefined){
	  		_.each(this.obras,function(obra){
	  			console.log("entré");
				var totalA=0;
				var cobros = Cobros.find({obra_id: obra._id, modo:false}).fetch();
				_.each(cobros,function(cobro){
					totalA += cobro.cIva + cobro.cIva;
				});
				obrasCalculadas.push({nombre : obra.nombre, total : totalA});
			});
			console.log(obrasCalculadas)
	  	}		
		return obrasCalculadas;
	  }
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

	this.TotalFinal = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	};

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
	};


	this.TotalFinalGO = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	//{{(GI.TotalFinalGO()) * (GI.cobroTotalFinal(obra._id) / GI.ingresosTotales(GI.obras)) | currency}
	this.TotalFinalCalculo = function(){
		totalFinalGO = this.TotalFinalGO();
		cobroTotal = this.cobroTotalFinal();
		ingresoTotal = this.ingresosTotales();
		porcentaje = cobroTotal / ingresoTotal;
		var arreglo = [];

		total = 0;
			var meses = Meses.find().fetch();
			_.each(this.meses,function(mes){
				var gastosOficina = GastosOficina.find({ mes_id : mes._id});
				var totalGastoOficina = 0.00;
				_.each(gastosOficina, function(gastoOficina){
					totalGastoOficina += gastoOficina.importeFijo + gastoOficina.importeVar;
				})
				console.log(totalGastoOficina);
				arreglo.push({mes : mes.mes, totalGastosOficina : totalGastosOficina});
			});
			console.log("arreglo", arreglo);
			if(mes == mesSeleccionado){
				porcentaje = mesSeleccionado.porcentaje;
			}
		
		return totalFinalGO * porcentaje
	}



};
