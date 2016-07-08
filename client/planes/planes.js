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
	
	this.actualizar = function(empresa)
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
		
// Funciones Distribucion de Gastos
		this.gastosFijosCalc = function(){
			this.plan.gastosFijosOficina1 = (gastosFijosOficina / 100) * gastosIndirectos
		};
		
		this.gastosVariablesOficinaCalc = function(){
			this.plan.gastosVariablesOficina1 = (gastosVariablesOficina / 100) * gastosIndirectos
		};
		
		this.gastosIndirectosCampoCalc = function(){
			this.plan.gastosIndirectosCampo1 = (gastosIndirectosCampo / 100) * gastosIndirectos
		};
		
		this.gastosFijosPresupuestoCalc = function(){
			this.plan.gastosFijosOficina3 = gastosFijosOficina1 - ((gastosFijosOficina1 * gastosFijosOficina2) / 100)
		};
		
		this.gastosVariablesOficinaPresupuestoCalc = function(){
			this.plan.gastosVariablesOficina3 = gastosVariablesOficina1 - ((gastosVariablesOficina1 * gastosVariablesOficina2) / 100)
		};
		
		this.gastosIndirectosCampoPresupuestoCalc = function(){
			this.plan.gastosIndirectosCampo3 = gastosIndirectosCampo1 - ((gastosIndirectosCampo1 * gastosIndirectosCampo2) / 100)
		};

		this.totaldgtotal3PresupuestoCalc = function(){
			this.plan.dgtotal3 = gastosIndirectosCampo3 + gastosVariablesOficina3 + gastosFijosOficina3
		};

		this.totalDistribucionGastosporcentajeCalc = function(){
			this.plan.dgtotal= this.plan.gastosFijosOficina + this.plan.gastosVariablesOficina + this.plan.gastosIndirectosCampo
		};
		
		this.totalDistribucionGastosCalc = function(){
			this.plan.dgtotal= this.plan.gastosFijosOficina1 + this.plan.gastosVariablesOficina1 + this.plan.gastosIndirectosCampo1
		};

// Funciones Costo Directo
		this.costosDirectosMaterialesPresupuestoCalc = function(){
			this.plan.costosDirectosMateriales3 = this.plan.costosDirectosMateriales1 - ((this.plan.costosDirectosMateriales1 * this.plan.costosDirectosMateriales2) / 100)
		};
		
		this.costosDirectosMaquinariasPresupuestoCalc = function(){
			this.plan.costosDirectosMaquinarias3 = this.plan.costosDirectosMaquinarias1 - ((this.plan.costosDirectosMaquinarias1 * this.plan.costosDirectosMaquinarias2) / 100)
		};
		
		this.costosDirectosManoObraPresupuestoCalc = function(){
			this.plan.costosDirectosManoObra3 = this.plan.costosDirectosManoObra1 - ((this.plan.costosDirectosManoObra1 * this.plan.costosDirectosManoObra2) / 100)
		};
		
		this.costosDirectosCombustibleFleteTransportePresupuestoCalc = function(){
			this.plan.costosDirectosCombustibleFleteTransporte3 = this.plan.costosDirectosCombustibleFleteTransporte1 - ((this.plan.costosDirectosCombustibleFleteTransporte1 * this.plan.costosDirectosCombustibleFleteTransporte2) / 100)
		};
		
		this.costosDirectosRentasPresupuestoCalc = function(){
			this.plan.costosDirectosRentas3 = this.plan.costosDirectosRentas1 - ((this.plan.costosDirectosRentas1 * this.plan.costosDirectosRentas2) / 100)
		};
		
		this.costosDirectosSubcontratosPresupuestoCalc = function(){
			this.plan.costosDirectosSubcontratos3 = this.plan.costosDirectosSubcontratos1 - ((this.plan.costosDirectosSubcontratos1 * this.plan.costosDirectosSubcontratos2) / 100)
		};
		
		this.costosDirectosGastosVariosPresupuestoCalc = function(){
			this.plan.costosDirectosGastosVarios3 = this.plan.costosDirectosGastosVarios1 - ((this.plan.costosDirectosGastosVarios1 * this.plan.costosDirectosGastosVarios2) / 100)
		};
		
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
		};
		
		this.totalcostosDirectosPresupuestoCalc = function(){
			this.plan.costosDirectostotal3 = this.plan.costosDirectosMateriales3 + this.plan.costosDirectosMaquinarias3 + this.plan.costosDirectosManoObra3 + this.plan.costosDirectosCombustibleFleteTransporte3 + this.plan.costosDirectosRentas3 + this.plan.costosDirectosSubcontratos3 + this.plan.costosDirectosGastosVarios3
		};
		
		
// Estadisticas de Gastos Indirectos para la Obra
		this.estadisticaGastosIndirectosObraPresupuestoGastosIndirectosMesCalc = function (){
			this.plan.estadisticaGastosIndirectosObraPresupuestoGastosIndirectosMes = (this.plan.estadisticaGastosIndirectosObraGastosFijosOficina * this.plan.estadisticaGastosIndirectosObraPorcentajeIndirectos) + (this.plan.estadisticaGastosIndirectosObraGastosCampo / this.plan.meses)
		};

// Productividad
	this.productividadPeriodo1Calc = function () {
		this.plan.productividadPeriodo1 = (this.plan.ingresos * 20) / 100
	};

	this.productividadPeriodo2Calc = function () {
		this.plan.productividadPeriodo2 = (this.plan.ingresos * 40) / 100
	};
	
	this.productividadPeriodo3Calc = function () {
		this.plan.productividadPeriodo3 = (this.plan.ingresos * 45) / 100
	};
	
	this.productividadPeriodo4Calc = function () {
		this.plan.productividadPeriodo4 = (this.plan.ingresos * 15) / 100
	};
	
	
// Mano de Obra
	this.manoObraPeriodo1Calc = function () {
		this.plan.manoObraPeriodo1 = (this.plan.costosDirectosManoObra3 * 20) / 100
	};

	this.manoObraPeriodo2Calc = function () {
		this.plan.manoObraPeriodo2 = (this.plan.costosDirectosManoObra3 * 40) / 100
	};
	
	this.manoObraPeriodo3Calc = function () {
		this.plan.manoObraPeriodo3 = (this.plan.costosDirectosManoObra3 * 45) / 100
	};
	
	this.manoObraPeriodo4Calc = function () {
		this.plan.manoObraPeriodo4 = (this.plan.costosDirectosManoObra3 * 15) / 100
	};
	
// Materiales
	this.materialesPeriodo1Calc = function () {
		this.plan.materialesPeriodo1 = (this.plan.costosDirectosMateriales3 * 20) / 100
	};

	this.materialesPeriodo2Calc = function () {
		this.plan.materialesPeriodo2 = (this.plan.costosDirectosMateriales3 * 40) / 100
	};
	
	this.materialesPeriodo3Calc = function () {
		this.plan.materialesPeriodo3 = (this.plan.costosDirectosMateriales3 * 45) / 100
	};
	
	this.materialesPeriodo4Calc = function () {
		this.plan.materialesPeriodo4 = (this.plan.costosDirectosMateriales3 * 15) / 100
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

// Ultima Tabla
	this.nuevoPresupuestoGastosIndirectosCalc = function (){
		this.plan.nuevoPresupuestoGastosIndirectos = this.plan.dgtotal4 / this.plan.meses
	};
	
	this.ajustePresupuestalIndirectosCalc = function (){
		this.plan.ajustePresupuestalIndirectos = this.plan.estadisticaGastosIndirectosObraPresupuestoGastosIndirectosMes - this.plan.nuevoPresupuestoGastosIndirectos
	};
	
	this.porcentajeObrasCalc = function (){
		this.plan.porcentajeObras = (this.plan.ingresos * this.plan.anticipoObras) / 100
	};

	   //  this.remove = function(empresa)
       // {
       //     this.empresa.estatus = false;
       //     this.empresas.save(empresa);
       // };
}