angular.module('formulas')
.controller('PlanesCtrl', PlanesCtrl);
function PlanesCtrl($scope, $meteor, $reactive, $state, toastr) {
$reactive(this).attach($scope);

  this.subscribe('planes');
  this.action = true;  
  this.nuevo = true;
  
  this.helpers({
	  planes : () => {
		  return Planes.find();
	  }
  });
  this.plan = {};
 
  this.nuevoPlan = function()
  {
	  this.action = true;
    this.nuevo = !this.nuevo;
    this.plan = {}; 
  };
  
 this.guardar = function(empresa)
	{
	  this.plan.estatus = true;
		console.log(this.plan);
		Planes.insert(this.plan);
		toastr.success('Plan guardado.');
		this.plan = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.planes');
	};
	
	
	this.editar = function(id)
	{
		this.plan = Planes.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};	
	
	this.actualizar = function(plan)
	{
		var idTemp = plan._id;
		delete plan._id;		
		Planes.update({_id:idTemp},{$set:plan});
		$('.collapse').collapse('hide');
		this.nuevo = true;
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
			this.plan.factorRecuperacion = ((1/(1-((this.plan.isr * this.plan.trema)/100)))/100)*100
			// 		this.totalEgresosCalc = function() {
			this.plan.totalEgresos = ((this.plan.ingresos / this.plan.factorRecuperacion) * 1)
		};

// Funciones Costo Directo		
		this.costosDirectosTotalPorcentajeCalc = function(){
			this.plan.costosDirectosTotal = this.plan.costosDirectosMateriales + this.plan.costosDirectosMaquinarias + this.plan.costosDirectosManoObra + this.plan.costosDirectosCombustibleFleteTransporte + this.plan.costosDirectosRentas + this.plan.costosDirectosSubcontratos + this.plan.costosDirectosGastosVarios
		};
			
		this.costosDirectosTotal1Calc = function(){
			this.plan.costosDirectosTotal1 = this.plan.costosDirectosMateriales1 + this.plan.costosDirectosMaquinarias1 + this.plan.costosDirectosManoObra1 + this.plan.costosDirectosCombustibleFleteTransporte1 + this.plan.costosDirectosRentas1 + this.plan.costosDirectosSubcontratos1 + this.plan.costosDirectosGastosVarios1
			//Costos Directos 			this.costodirectoCalc = function() {
			this.plan.costosDirecto = this.plan.costosDirectosTotal1
			//Relacion % Cd/Ingresos
			this.plan.relacionCdIngresos = (this.plan.costosDirectosTotal1 / this.plan.ingresos) * 100
			//gastosIndirectos 				this.gastosDirectosCalc = function() {
			this.plan.gastosIndirectos = this.plan.totalEgresos - this.plan.costosDirectosTotal1
			// Funciones Distribucion de Gastos
			this.plan.gastosFijosOficina1 =  this.plan.gastosIndirectos * (this.plan.gastosFijosOficina / 100)
			this.plan.gastosVariablesOficina1 =  this.plan.gastosIndirectos * (this.plan.gastosVariablesOficina / 100)
			this.plan.gastosIndirectosCampo1 =  this.plan.gastosIndirectos * (this.plan.gastosIndirectosCampo / 100)
			// Funciones Distribucion de Gastos
			this.plan.gastosFijosOficina3 = this.plan.gastosFijosOficina1 - ((this.plan.gastosFijosOficina1 * this.plan.gastosFijosOficina2) / 100)
			this.plan.gastosVariablesOficina3 = this.plan.gastosVariablesOficina1 - ((this.plan.gastosVariablesOficina1 * this.plan.gastosVariablesOficina2) / 100)
			this.plan.gastosIndirectosCampo3 = this.plan.gastosIndirectosCampo1 - ((this.plan.gastosIndirectosCampo1 * this.plan.gastosIndirectosCampo2) / 100)
			// Funciones Distribucion de Gastos
			this.plan.dgtotal = this.plan.gastosFijosOficina + this.plan.gastosVariablesOficina + this.plan.gastosIndirectosCampo
			this.plan.dgtotal1 = this.plan.gastosFijosOficina1 + this.plan.gastosVariablesOficina1 + this.plan.gastosIndirectosCampo1
			this.plan.dgtotal3 = this.plan.gastosIndirectosCampo3 + this.plan.gastosVariablesOficina3 + this.plan.gastosFijosOficina3
			this.plan.dgtotal4 = (this.plan.dgtotal3 / this.plan.ingresos) * 100
			// Funciones Costo Directo
			this.plan.costosDirectosMateriales3 = this.plan.costosDirectosMateriales1 - ((this.plan.costosDirectosMateriales1 * this.plan.costosDirectosMateriales2) / 100)
			this.plan.costosDirectosMaquinarias3 = this.plan.costosDirectosMaquinarias1 - ((this.plan.costosDirectosMaquinarias1 * this.plan.costosDirectosMaquinarias2) / 100)
			this.plan.costosDirectosManoObra3 = this.plan.costosDirectosManoObra1 - ((this.plan.costosDirectosManoObra1 * this.plan.costosDirectosManoObra2) / 100)
			this.plan.costosDirectosCombustibleFleteTransporte3 = this.plan.costosDirectosCombustibleFleteTransporte1 - ((this.plan.costosDirectosCombustibleFleteTransporte1 * this.plan.costosDirectosCombustibleFleteTransporte2) / 100)
			this.plan.costosDirectosRentas3 = this.plan.costosDirectosRentas1 - ((this.plan.costosDirectosRentas1 * this.plan.costosDirectosRentas2) / 100)
			this.plan.costosDirectosSubcontratos3 = this.plan.costosDirectosSubcontratos1 - ((this.plan.costosDirectosSubcontratos1 * this.plan.costosDirectosSubcontratos2) / 100)
			this.plan.costosDirectosGastosVarios3 = this.plan.costosDirectosGastosVarios1 - ((this.plan.costosDirectosGastosVarios1 * this.plan.costosDirectosGastosVarios2) / 100)
			//this.totalcostosDirectosPresupuestoCalc = function(){
			this.plan.costosDirectosTotal3 = this.plan.costosDirectosMateriales3 + this.plan.costosDirectosMaquinarias3 + this.plan.costosDirectosManoObra3 + this.plan.costosDirectosCombustibleFleteTransporte3 + this.plan.costosDirectosRentas3 + this.plan.costosDirectosSubcontratos3 + this.plan.costosDirectosGastosVarios3
			// Productividad
			this.plan.productividadPeriodo1 = (this.plan.ingresos * 20) / 100
			this.plan.productividadPeriodo2 = (this.plan.ingresos * 40) / 100
			this.plan.productividadPeriodo3 = (this.plan.ingresos * 45) / 100
			this.plan.productividadPeriodo4 = (this.plan.ingresos * 15) / 100
			// Mano de Obra
			this.plan.manoObraPeriodo1 = (this.plan.costosDirectosManoObra3 * 20) / 100
			this.plan.manoObraPeriodo2 = (this.plan.costosDirectosManoObra3 * 40) / 100
			this.plan.manoObraPeriodo3 = (this.plan.costosDirectosManoObra3 * 45) / 100
			this.plan.manoObraPeriodo4 = (this.plan.costosDirectosManoObra3 * 15) / 100
			// Materiales
			this.plan.materialesPeriodo1 = (this.plan.costosDirectosMateriales3 * 20) / 100
			this.plan.materialesPeriodo2 = (this.plan.costosDirectosMateriales3 * 40) / 100
			this.plan.materialesPeriodo3 = (this.plan.costosDirectosMateriales3 * 45) / 100
			this.plan.materialesPeriodo4 = (this.plan.costosDirectosMateriales3 * 15) / 100
			// Tabla Arriba Actual Proyectado
			this.plan.utilidadFisica = (this.plan.ingresos - this.plan.costosDirecto) - this.plan.gastosIndirectos
			this.plan.isr1 = (this.plan.utilidadFisica * 3) / 10
			this.plan.ptu1 = (this.plan.utilidadFisica * 1) / 10
			this.plan.utilidadNeta = (this.plan.utilidadFisica - this.plan.isr1) - this.plan.ptu1
			this.plan.rentabilidad = (this.plan.utilidadNeta / this.plan.ingresos) * 100
			// Ultima Actual Proyectado
			this.plan.gastosProyectado = this.plan.dgtotal3 + (this.plan.ajustePresupuestalIndirectos * this.plan.meses)
			// Ultima Tabla
			this.plan.nuevoPresupuestoGastosIndirectos = this.plan.dgtotal4 / this.plan.meses
			this.plan.ajustePresupuestalIndirectos = this.plan.estadisticaGastosIndirectosObraPresupuestoGastosIndirectosMes - this.plan.nuevoPresupuestoGastosIndirectos
			this.plan.porcentajeObras = (this.plan.ingresos * this.plan.anticipoObras) / 100
			
			this.plan.nuevoPresupuestoGastosIndirectos = this.plan.dgtotal3 / this.plan.meses
			this.plan.anticipoObras = this.plan.ingresos * this.plan.porcentajeObras
		};
		
		
// Estadisticas de Gastos Indirectos para la Obra
		this.estadisticaGastosIndirectosObraPresupuestoGastosIndirectosMesCalc = function (){
			this.plan.estadisticaGastosIndirectosObraPresupuestoGastosIndirectosMes = (this.plan.estadisticaGastosIndirectosObraGastosFijosOficina * this.plan.estadisticaGastosIndirectosObraPorcentajeIndirectos) + (this.plan.estadisticaGastosIndirectosObraGastosCampo / this.plan.meses)
		};
	
// Estado de Resultado Proyectado y Actual
	this.gastosProyectadoCalc = function (){
		this.plan.gastosProyectado = this.plan.dgtotal4 + (this.plan.porcentajeObras * this.plan.meses)
	};
	
	this.utilidadFisicaProyectadoCalc = function (){
		this.plan.utilidadFisicaProyectado = this.plan.ingresos - this.plan.dgtotal4 - gastosProyectado
	};
	
	this.isrProyectadoCalc = function (){
		this.plan.isrProyectado = (this.plan.utilidadFisicaProyectado * 30) / 100
	};

	this.ptuProyectadoCalc = function (){
		this.plan.ptuProyectado = (this.plan.utilidadFisicaProyectado * 10) / 100
	};

	this.utilidadNetaProyectadoCalc = function (){
		this.plan.utilidadNetaProyectado = this.plan.utilidadFisicaProyectado - this.plan.isrProyectado - this.plan.ptuProyectado
	};

	   //  this.remove = function(empresa)
       // {
       //     this.empresa.estatus = false;
       //     this.empresas.save(empresa);
       // };
} 