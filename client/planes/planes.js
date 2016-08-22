angular.module('formulas')
.controller('PlanesCtrl', PlanesCtrl);
function PlanesCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);

	this.plan = {};
	this.plan.costos = [];
	this.totalCosto = 0;

	

  this.subscribe('planes',()=>{
		return [{estatus:true}] 
  });
  this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
  });
  this.subscribe('GI',()=>{
		return [{estatus:true}] 
  });
  this.subscribe('periodos',()=>{
		return [{estatus:true}] 
  });
  this.subscribe('cobros',()=>{
		return [{estatus:true}] 
  });
   this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
  });
   this.subscribe('costos',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:false}] 
    });
    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true}] 
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
	  obra : () => {
		  return Obras.findOne($stateParams.id);
	  },
	  
	  gi : ()=> {
		  return GI.find();
	  },
	  costos : () => {

  	    var costos = Costos.find().fetch();
  		  _.each(costos,function(costo){
    		rc.plan.costos.push({_id : costo._id, nombre : costo.nombre, valor : 0, factor : 0});
    		costo.presupuesto = costo.valor * costo.factor - costo.valor;
   		 });
  	    console.log("costos", costos);
  	    console.log("plan costos",rc.plan);
  	    return costos;
		 
	  },
	  periodos : () => {
		  return Periodos.find();
	  },
	  cobros : () => {
		  return Cobros.find();
	  },
	  gastos : () => {
		  return GastosOficina.find();
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
	  
	  indirectosEmpresas : () => {
		var gastosIndirectoEmpresa = [];
		var gastosOficinas = [];
		var campo = [];
		var ingresos = [];
          
		  	//GASTOS OFICINA;
		  	var totalGastosOficinas = 0;
		  	var gastosOF = GastosOficina.find().fetch();
 				_.each(gastosOF,function(gasto){
 					totalGastosOficinas += gasto.importeFijo + gasto.importeVar
 					gasto.gastoOficina = parseInt(totalGastosOficinas);
 					
 				});

 				gastosIndirectoEmpresa.push({total : totalGastosOficinas});

 				
 	            
 				var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(cobros,function(cobro){
 					totalIngresos += cobro.cSinIva
 					cobro.ingresos = parseInt(totalIngresos);
 				
 				});

 				gastosIndirectoEmpresa.push({total : totalIngresos});
				
 				
 	           
 				var totalGastosCampo = 0;
 				var periodos = Periodos.find().fetch();
 				_.each(periodos,function(campo){
 				  totalGastosCampo += campo.comprasIva + campo.contadoIva
 				  campo.gastosCampo = parseInt(totalGastosCampo);
 				  
				});

				gastosIndirectoEmpresa.push({total : totalGastosCampo});

                
               var cantidadesSumadas = (totalGastosOficinas  + totalGastosCampo) / (totalIngresos) * 100;

              gastosIndirectoEmpresa.push({total : cantidadesSumadas })



        console.log("gastos", gastosIndirectoEmpresa);
	//	console.log("final", final);

		return gastosIndirectoEmpresa;
	},

  });
 
  this.nuevoPlan = function()
  {
	  this.action = true;
    this.nuevo = !this.nuevo;
    


};

  
 this.guardar = function(plan,empresa)
	{
	  plan.estatus = true;
	  plan.obra_id = $stateParams.id;
	  plan.fechaCreacion = new Date();
	  _.each(rc.plan.costos, function(costo){
			delete costo.$$hashKey;
		});
		console.log(rc.plan);
		Planes.insert(plan);
		toastr.success('Plan guardado.');
		plan = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		this.plan = {};
	};
	
	
	this.editar = function(id)
	{
		this.plan = Planes.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
		rc.totalCosto = 0;
		rc.totalPor = 0;
		_.each(rc.plan.costos, function(costo){
			rc.totalCosto += parseInt(costo.valor)
			rc.totalPor = costo.valor / rc.totalCosto ;
		});
	};	
	
	this.actualizar = function(plan)
	{
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
                           													
		this.factorRecuperacionCalc = function() {
			rc.totalCosto = 0;
			rc.totalPor = 0;
			_.each(rc.plan.costos, function(costo){
				rc.totalCosto += parseInt(costo.valor)
				rc.totalPor = parseInt(costo.valor) / rc.totalCosto;
			});
			this.plan.isrCalculado = 100 / (100 - this.plan.isr - this.plan.ptu)
			this.plan.factorRecuperacion = (1/(1-(1.6666*(this.plan.trema/100))));//=(1/(1-(1.6666*E5)))/100
			this.plan.totalEgresos = ((this.plan.ingresos / this.plan.factorRecuperacion) * 1)
			// Funciones Costo Directo
			this.plan.costosDirectosTotal1 = this.plan.costosDirectosMateriales1 + this.plan.costosDirectosMaquinarias1 + this.plan.costosDirectosManoObra1 + this.plan.costosDirectosCombustibleFleteTransporte1 + this.plan.costosDirectosRentas1 + this.plan.costosDirectosSubcontratos1 + this.plan.costosDirectosGastosVarios1
			this.plan.costosDirectosPorcentaje = (this.plan.costosDirectosMateriales1 / this.plan.costosDirectosTotal1) * 100
		
	        this.plan.costosDirectosGastosVarios = (this.plan.costosDirectosGastosVarios1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosTotal = this.plan.costosDirectosPorcentaje + this.plan.costosDirectosMaquinarias + this.plan.costosDirectosManoObra + this.plan.costosDirectosCombustibleFleteTransporte + this.plan.costosDirectosRentas + this.plan.costosDirectosSubcontratos + this.plan.costosDirectosGastosVarios
			this.plan.costosDirecto = this.plan.costosDirectosTotal1
			// Funciones Costo Directo
			this.plan.costosDirectosPorcentajeRequerido = this.plan.costosDirectosMateriales1 - ((this.plan.costosDirectosMateriales1 * this.plan.costosDirectosMateriales2) / 100)
			this.plan.costosDirectosTotal3 = this.plan.costosDirectosPorcentajeRequerido + this.plan.costosDirectosMaquinarias3 + this.plan.costosDirectosManoObra3 + this.plan.costosDirectosCombustibleFleteTransporte3 + this.plan.costosDirectosRentas3 + this.plan.costosDirectosSubcontratos3 + this.plan.costosDirectosGastosVarios3
			//Relacion % Cd/Ingresos
			this.plan.relacionCdIngresos = (this.plan.costosDirectosTotal1 / this.plan.ingresos) * 100
			//gastosIndirectos 				this.gastosDirectosCalc = function() {
			this.plan.gastosIndirectos = this.plan.totalEgresos - this.plan.costosDirectosTotal1
			// Funciones Distribucion de Gastos
			this.plan.gastosFijosOficina =  this.plan.gastosIndirectos - this.obra.gastosPCampo
// 			this.obra.gastosPCampo =  GIc23
			this.plan.gastosFijosOficina2 = this.plan.gastosFijosOficina - (this.plan.gastosFijosOficina * this.plan.gastosFijosOficina1) / 100
			this.plan.gastosIndirectosCampo2 = this.obra.gastosPCampo - (this.obra.gastosPCampo * this.plan.gastosIndirectosCampo1) / 100
			this.plan.dgtotal = this.plan.gastosFijosOficina + this.obra.gastosPCampo
			this.plan.dgtotal2 = this.plan.gastosFijosOficina2 + this.plan.gastosIndirectosCampo2
			this.plan.dgtotal3 = (this.plan.dgtotal2 / this.plan.ingresos) * 100
			// Estadisticas de Gastos Indirectos para la Obra
			this.plan.estadisticaGastosIndirectosObraGastosFijosOficina = this.plan.estadisticaGastosIndirectosObraPresupuestoIndirectoTotal - this.obra.gastosPCampo
			// Tabla Arriba Actual Proyectado
			this.plan.utilidadFisica = (this.plan.ingresos - this.plan.costosDirecto) - this.plan.gastosIndirectos
			this.plan.isr1 = (this.plan.utilidadFisica * 3) / 10
			this.plan.ptu1 = (this.plan.utilidadFisica * 1) / 10
			this.plan.utilidadNeta = (this.plan.utilidadFisica - this.plan.isr1) - this.plan.ptu1
			this.plan.rentabilidad = (this.plan.utilidadNeta / this.plan.ingresos) * 100
			// Tabla Meses
			this.plan.nuevoPresupuestoGastosIndirectos = this.plan.estadisticaGastosIndirectosObraGastosFijosOficina / this.plan.meses
			this.plan.ajustePresupuestalIndirectos = this.plan.estadisticaGastosIndirectosObraPorcentajeIndirectos - this.plan.nuevoPresupuestoGastosIndirectos
			this.plan.porcentajeObras = (this.plan.ingresos * this.plan.anticipoObras) / 100
			// Ultima Proyectado y Actual
			this.plan.gastosProyectado = this.plan.dgtotal2 + (this.plan.ajustePresupuestalIndirectos * this.plan.meses)
			this.plan.utilidadFisicaProyectado = this.plan.ingresos - this.plan.costosDirectosTotal3 - this.plan.gastosProyectado
			this.plan.isrProyectado = (this.plan.utilidadFisicaProyectado * 30) / 100
			this.plan.ptuProyectado = (this.plan.utilidadFisicaProyectado * 10) / 100
			this.plan.utilidadNetaProyectado = this.plan.utilidadFisicaProyectado - this.plan.isrProyectado - this.plan.ptuProyectado
			this.plan.rentabilidad1 = (this.plan.utilidadNetaProyectado / this.plan.ingresos) * 100

		};
	   //  this.remove = function(empresa)
       // {
       //     this.empresa.estatus = false;
       //     this.empresas.save(empresa);
       // };
};