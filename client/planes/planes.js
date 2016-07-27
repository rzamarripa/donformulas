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
			this.plan.factorRecuperacion = (1/(1-(this.plan.isr*(this.plan.trema/100))));
			this.plan.totalEgresos = ((this.plan.ingresos / this.plan.factorRecuperacion) * 1)
			// Funciones Costo Directo
			this.plan.costosDirectosTotal1 = this.plan.costosDirectosMateriales1 + this.plan.costosDirectosMaquinarias1 + this.plan.costosDirectosManoObra1 + this.plan.costosDirectosCombustibleFleteTransporte1 + this.plan.costosDirectosRentas1 + this.plan.costosDirectosSubcontratos1 + this.plan.costosDirectosGastosVarios1
			this.plan.costosDirectosMateriales = (this.plan.costosDirectosMateriales1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosMaquinarias = (this.plan.costosDirectosMaquinarias1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosManoObra = (this.plan.costosDirectosManoObra1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosCombustibleFleteTransporte = (this.plan.costosDirectosCombustibleFleteTransporte1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosRentas = (this.plan.costosDirectosRentas1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosSubcontratos = (this.plan.costosDirectosSubcontratos1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosGastosVarios = (this.plan.costosDirectosGastosVarios1 / this.plan.costosDirectosTotal1) * 100
			this.plan.costosDirectosTotal = this.plan.costosDirectosMateriales + this.plan.costosDirectosMaquinarias + this.plan.costosDirectosManoObra + this.plan.costosDirectosCombustibleFleteTransporte + this.plan.costosDirectosRentas + this.plan.costosDirectosSubcontratos + this.plan.costosDirectosGastosVarios
			this.plan.costosDirecto = this.plan.costosDirectosTotal1
			// Funciones Costo Directo
			this.plan.costosDirectosMateriales3 = this.plan.costosDirectosMateriales1 - ((this.plan.costosDirectosMateriales1 * this.plan.costosDirectosMateriales2) / 100)
			this.plan.costosDirectosMaquinarias3 = this.plan.costosDirectosMaquinarias1 - ((this.plan.costosDirectosMaquinarias1 * this.plan.costosDirectosMaquinarias2) / 100)
			this.plan.costosDirectosManoObra3 = this.plan.costosDirectosManoObra1 - ((this.plan.costosDirectosManoObra1 * this.plan.costosDirectosManoObra2) / 100)
			this.plan.costosDirectosCombustibleFleteTransporte3 = this.plan.costosDirectosCombustibleFleteTransporte1 - ((this.plan.costosDirectosCombustibleFleteTransporte1 * this.plan.costosDirectosCombustibleFleteTransporte2) / 100)
			this.plan.costosDirectosRentas3 = this.plan.costosDirectosRentas1 - ((this.plan.costosDirectosRentas1 * this.plan.costosDirectosRentas2) / 100)
			this.plan.costosDirectosSubcontratos3 = this.plan.costosDirectosSubcontratos1 - ((this.plan.costosDirectosSubcontratos1 * this.plan.costosDirectosSubcontratos2) / 100)
			this.plan.costosDirectosGastosVarios3 = this.plan.costosDirectosGastosVarios1 - ((this.plan.costosDirectosGastosVarios1 * this.plan.costosDirectosGastosVarios2) / 100)
			this.plan.costosDirectosTotal3 = this.plan.costosDirectosMateriales3 + this.plan.costosDirectosMaquinarias3 + this.plan.costosDirectosManoObra3 + this.plan.costosDirectosCombustibleFleteTransporte3 + this.plan.costosDirectosRentas3 + this.plan.costosDirectosSubcontratos3 + this.plan.costosDirectosGastosVarios3
			//Relacion % Cd/Ingresos
			this.plan.relacionCdIngresos = (this.plan.costosDirectosTotal1 / this.plan.ingresos) * 100
			//gastosIndirectos 				this.gastosDirectosCalc = function() {
			this.plan.gastosIndirectos = this.plan.totalEgresos - this.plan.costosDirectosTotal1
			// Funciones Distribucion de Gastos
			this.plan.gastosFijosOficina =  this.plan.gastosIndirectos - this.plan.gastosIndirectosCampo
// 			this.plan.gastosIndirectosCampo =  GIc23
			this.plan.gastosFijosOficina2 = this.plan.gastosFijosOficina - (this.plan.gastosFijosOficina * this.plan.gastosFijosOficina1) / 100
			this.plan.gastosIndirectosCampo2 = this.plan.gastosIndirectosCampo - (this.plan.gastosIndirectosCampo * this.plan.gastosIndirectosCampo1) / 100
			this.plan.dgtotal = this.plan.gastosFijosOficina + this.plan.gastosIndirectosCampo
			this.plan.dgtotal2 = this.plan.gastosFijosOficina2 + this.plan.gastosIndirectosCampo2
			this.plan.dgtotal3 = (this.plan.dgtotal2 / this.plan.ingresos) * 100
			// Estadisticas de Gastos Indirectos para la Obra
			this.plan.estadisticaGastosIndirectosObraGastosFijosOficina = this.plan.estadisticaGastosIndirectosObraPresupuestoIndirectoTotal - this.plan.gastosIndirectosCampo
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