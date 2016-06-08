angular
.module("formulas")
.controller("EstadisticasCtrl", EstadisticasCtrl);
function EstadisticasCtrl($scope, $meteor, $reactive,  $state, $stateParams, toastr) {
$reactive(this).attach($scope);
	this.estadisticas = {}
  this.action = true;
	this.subscribe('obras');
 
  this.helpers({
	  obras : () => {
		  return Obras.find();
	  },
  });

this.estadisticas.gfenero = 0 ;
this.estadisticas.gffebrero = 0 ;
this.estadisticas.gfmarzo = 0 ;
this.estadisticas.gfabril = 0 ;
this.estadisticas.gfmayo = 0 ;
this.estadisticas.gfjunio = 0 ;
this.estadisticas.gfjulio = 0 ;
this.estadisticas.gfagosto = 0 ;
this.estadisticas.gfseptiembre = 0 ;
this.estadisticas.gfoctubre = 0 ;
this.estadisticas.gfnoviembre = 0 ;
this.estadisticas.gfdiciembre = 0 ;
this.estadisticas.gvenero = 0 ;
this.estadisticas.gvfebrero = 0 ;
this.estadisticas.gvmarzo = 0 ;
this.estadisticas.gvabril = 0 ;
this.estadisticas.gvmayo = 0 ;
this.estadisticas.gvjunio = 0 ;
this.estadisticas.gvjulio = 0 ;
this.estadisticas.gvagosto = 0 ;
this.estadisticas.gvseptiembre = 0 ;
this.estadisticas.gvoctubre = 0 ;
this.estadisticas.gvnoviembre = 0 ;
this.estadisticas.gvdiciembre = 0 ;
this.estadisticas.iapresupuesto = 0 ;
this.estadisticas.iaenero = 0 ;
this.estadisticas.iafebrero = 0 ;
this.estadisticas.iamarzo = 0 ;
this.estadisticas.iaabril = 0 ;
this.estadisticas.iamayo = 0 ;
this.estadisticas.iajunio = 0 ;
this.estadisticas.iajulio = 0 ;
this.estadisticas.iaagosto = 0 ;
this.estadisticas.iaseptiembre = 0 ;
this.estadisticas.iaoctubre = 0 ;
this.estadisticas.ianoviembre = 0 ;
this.estadisticas.iadiciembre = 0 ;
this.estadisticas.ibpresupuesto = 0 ;
this.estadisticas.ibenero = 0 ;
this.estadisticas.ibfebrero = 0 ;
this.estadisticas.ibmarzo = 0 ;
this.estadisticas.ibabril = 0 ;
this.estadisticas.ibmayo = 0 ;
this.estadisticas.ibjunio = 0 ;
this.estadisticas.ibjulio = 0 ;
this.estadisticas.ibagosto = 0 ;
this.estadisticas.ibseptiembre = 0 ;
this.estadisticas.iboctubre = 0 ;
this.estadisticas.ibnoviembre = 0 ;
this.estadisticas.ibdiciembre = 0 ;
this.estadisticas.icpresupuesto = 0 ;
this.estadisticas.icenero = 0 ;
this.estadisticas.icfebrero = 0 ;
this.estadisticas.icmarzo = 0 ;
this.estadisticas.icabril = 0 ;
this.estadisticas.icmayo = 0 ;
this.estadisticas.icjunio = 0 ;
this.estadisticas.icjulio = 0 ;
this.estadisticas.icagosto = 0 ;
this.estadisticas.icseptiembre = 0 ;
this.estadisticas.icoctubre = 0 ;
this.estadisticas.icnoviembre = 0 ;
this.estadisticas.icdiciembre = 0 ;
this.estadisticas.idpresupuesto = 0 ;
this.estadisticas.idenero = 0 ;
this.estadisticas.idfebrero = 0 ;
this.estadisticas.idmarzo = 0 ;
this.estadisticas.idabril = 0 ;
this.estadisticas.idmayo = 0 ;
this.estadisticas.idjunio = 0 ;
this.estadisticas.idjulio = 0 ;
this.estadisticas.idagosto = 0 ;
this.estadisticas.idseptiembre = 0 ;
this.estadisticas.idoctubre = 0 ;
this.estadisticas.idnoviembre = 0 ;
this.estadisticas.iddiciembre = 0 ;
this.estadisticas.iepresupuesto = 0 ;
this.estadisticas.ieenero = 0 ;
this.estadisticas.iefebrero = 0 ;
this.estadisticas.iemarzo = 0 ;
this.estadisticas.ieabril = 0 ;
this.estadisticas.iemayo = 0 ;
this.estadisticas.iejunio = 0 ;
this.estadisticas.iejulio = 0 ;
this.estadisticas.ieagosto = 0 ;
this.estadisticas.ieseptiembre = 0 ;
this.estadisticas.ieoctubre = 0 ;
this.estadisticas.ienoviembre = 0 ;
this.estadisticas.iediciembre = 0 ;
this.estadisticas.ifpresupuesto = 0 ;
this.estadisticas.ifenero = 0 ;
this.estadisticas.iffebrero = 0 ;
this.estadisticas.ifmarzo = 0 ;
this.estadisticas.ifabril = 0 ;
this.estadisticas.ifmayo = 0 ;
this.estadisticas.ifjunio = 0 ;
this.estadisticas.ifjulio = 0 ;
this.estadisticas.ifagosto = 0 ;
this.estadisticas.ifseptiembre = 0 ;
this.estadisticas.ifoctubre = 0 ;
this.estadisticas.ifnoviembre = 0 ;
this.estadisticas.ifdiciembre = 0 ;
this.estadisticas.igpresupuesto = 0 ;
this.estadisticas.igenero = 0 ;
this.estadisticas.igfebrero = 0 ;
this.estadisticas.igmarzo = 0 ;
this.estadisticas.igabril = 0 ;
this.estadisticas.igmayo = 0 ;
this.estadisticas.igjunio = 0 ;
this.estadisticas.igjulio = 0 ;
this.estadisticas.igagosto = 0 ;
this.estadisticas.igseptiembre = 0 ;
this.estadisticas.igoctubre = 0 ;
this.estadisticas.ignoviembre = 0 ;
this.estadisticas.igdiciembre = 0 ;
this.estadisticas.ihpresupuesto = 0 ;
this.estadisticas.ihenero = 0 ;
this.estadisticas.ihfebrero = 0 ;
this.estadisticas.ihmarzo = 0 ;
this.estadisticas.ihabril = 0 ;
this.estadisticas.ihmayo = 0 ;
this.estadisticas.ihjunio = 0 ;
this.estadisticas.ihjulio = 0 ;
this.estadisticas.ihagosto = 0 ;
this.estadisticas.ihseptiembre = 0 ;
this.estadisticas.ihoctubre = 0 ;
this.estadisticas.ihnoviembre = 0 ;
this.estadisticas.ihdiciembre = 0 ;
this.estadisticas.itpresupuesto = 0 ;
this.estadisticas.gcapresupuesto = 0 ;
this.estadisticas.gcaenero = 0 ;
this.estadisticas.gcafebrero = 0 ;
this.estadisticas.gcamarzo = 0 ;
this.estadisticas.gcaabril = 0 ;
this.estadisticas.gcamayo = 0 ;
this.estadisticas.gcajunio = 0 ;
this.estadisticas.gcajulio = 0 ;
this.estadisticas.gcaagosto = 0 ;
this.estadisticas.gcaseptiembre = 0 ;
this.estadisticas.gcaoctubre = 0 ;
this.estadisticas.gcanoviembre = 0 ;
this.estadisticas.gcadiciembre = 0 ;
this.estadisticas.gcbpresupuesto = 0 ;
this.estadisticas.gcbenero = 0 ;
this.estadisticas.gcbfebrero = 0 ;
this.estadisticas.gcbmarzo = 0 ;
this.estadisticas.gcbabril = 0 ;
this.estadisticas.gcbmayo = 0 ;
this.estadisticas.gcbjunio = 0 ;
this.estadisticas.gcbjulio = 0 ;
this.estadisticas.gcbagosto = 0 ;
this.estadisticas.gcbseptiembre = 0 ;
this.estadisticas.gcboctubre = 0 ;
this.estadisticas.gcbnoviembre = 0 ;
this.estadisticas.gcbdiciembre = 0 ;
this.estadisticas.gccpresupuesto = 0 ;
this.estadisticas.gccenero = 0 ;
this.estadisticas.gccfebrero = 0 ;
this.estadisticas.gccmarzo = 0 ;
this.estadisticas.gccabril = 0 ;
this.estadisticas.gccmayo = 0 ;
this.estadisticas.gccjunio = 0 ;
this.estadisticas.gccjulio = 0 ;
this.estadisticas.gccagosto = 0 ;
this.estadisticas.gccseptiembre = 0 ;
this.estadisticas.gccoctubre = 0 ;
this.estadisticas.gccnoviembre = 0 ;
this.estadisticas.gccdiciembre = 0 ;
this.estadisticas.gcdpresupuesto = 0 ;
this.estadisticas.gcdenero = 0 ;
this.estadisticas.gcdfebrero = 0 ;
this.estadisticas.gcdmarzo = 0 ;
this.estadisticas.gcdabril = 0 ;
this.estadisticas.gcdmayo = 0 ;
this.estadisticas.gcdjunio = 0 ;
this.estadisticas.gcdjulio = 0 ;
this.estadisticas.gcdagosto = 0 ;
this.estadisticas.gcdseptiembre = 0 ;
this.estadisticas.gcdoctubre = 0 ;
this.estadisticas.gcdnoviembre = 0 ;
this.estadisticas.gcddiciembre = 0 ;
this.estadisticas.gcepresupuesto = 0 ;
this.estadisticas.gceenero = 0 ;
this.estadisticas.gcefebrero = 0 ;
this.estadisticas.gcemarzo = 0 ;
this.estadisticas.gceabril = 0 ;
this.estadisticas.gcemayo = 0 ;
this.estadisticas.gcejunio = 0 ;
this.estadisticas.gcejulio = 0 ;
this.estadisticas.gceagosto = 0 ;
this.estadisticas.gceseptiembre = 0 ;
this.estadisticas.gceoctubre = 0 ;
this.estadisticas.gcenoviembre = 0 ;
this.estadisticas.gcediciembre = 0 ;
this.estadisticas.gcfpresupuesto = 0 ;
this.estadisticas.gcfenero = 0 ;
this.estadisticas.gcffebrero = 0 ;
this.estadisticas.gcfmarzo = 0 ;
this.estadisticas.gcfabril = 0 ;
this.estadisticas.gcfmayo = 0 ;
this.estadisticas.gcfjunio = 0 ;
this.estadisticas.gcfjulio = 0 ;
this.estadisticas.gcfagosto = 0 ;
this.estadisticas.gcfseptiembre = 0 ;
this.estadisticas.gcfoctubre = 0 ;
this.estadisticas.gcfnoviembre = 0 ;
this.estadisticas.gcfdiciembre = 0 ;
this.estadisticas.gcgpresupuesto = 0 ;
this.estadisticas.gcgenero = 0 ;
this.estadisticas.gcgfebrero = 0 ;
this.estadisticas.gcgmarzo = 0 ;
this.estadisticas.gcgabril = 0 ;
this.estadisticas.gcgmayo = 0 ;
this.estadisticas.gcgjunio = 0 ;
this.estadisticas.gcgjulio = 0 ;
this.estadisticas.gcgagosto = 0 ;
this.estadisticas.gcgseptiembre = 0 ;
this.estadisticas.gcgoctubre = 0 ;
this.estadisticas.gcgnoviembre = 0 ;
this.estadisticas.gcgdiciembre = 0 ;
this.estadisticas.gchpresupuesto = 0 ;
this.estadisticas.gchenero = 0 ;
this.estadisticas.gchfebrero = 0 ;
this.estadisticas.gchmarzo = 0 ;
this.estadisticas.gchabril = 0 ;
this.estadisticas.gchmayo = 0 ;
this.estadisticas.gchjunio = 0 ;
this.estadisticas.gchjulio = 0 ;
this.estadisticas.gchagosto = 0 ;
this.estadisticas.gchseptiembre = 0 ;
this.estadisticas.gchoctubre = 0 ;
this.estadisticas.gchnoviembre = 0 ;
this.estadisticas.gchdiciembre = 0 ;
this.estadisticas.gcpresupuesto = 0 ;
this.estadisticas.gianuales = 0 ;
this.estadisticas.aindirectos = 0 ;
this.estadisticas.bindirectos = 0 ;
this.estadisticas.cindirectos = 0 ;
this.estadisticas.dindirectos = 0 ;
this.estadisticas.eindirectos = 0 ;
this.estadisticas.findirectos = 0 ;
this.estadisticas.gindirectos = 0 ;
this.estadisticas.hindirectos = 0 ;
this.estadisticas.eaenero = 0 ;
this.estadisticas.eafebrero = 0 ;
this.estadisticas.eamarzo = 0 ;
this.estadisticas.eaabril = 0 ;
this.estadisticas.eamayo = 0 ;
this.estadisticas.eajunio = 0 ;
this.estadisticas.eajulio = 0 ;
this.estadisticas.eaagosto = 0 ;
this.estadisticas.easeptiembre = 0 ;
this.estadisticas.eaoctubre = 0 ;
this.estadisticas.eanoviembre = 0 ;
this.estadisticas.eadiciembre = 0 ;
this.estadisticas.eatotal = 0 ;
this.estadisticas.ebenero = 0 ;
this.estadisticas.ebfebrero = 0 ;
this.estadisticas.ebmarzo = 0 ;
this.estadisticas.ebabril = 0 ;
this.estadisticas.ebmayo = 0 ;
this.estadisticas.ebjunio = 0 ;
this.estadisticas.ebjulio = 0 ;
this.estadisticas.ebagosto = 0 ;
this.estadisticas.ebseptiembre = 0 ;
this.estadisticas.eboctubre = 0 ;
this.estadisticas.ebnoviembre = 0 ;
this.estadisticas.ebdiciembre = 0 ;
this.estadisticas.ebtotal = 0 ;
this.estadisticas.ecenero = 0 ;
this.estadisticas.ecfebrero = 0 ;
this.estadisticas.ecmarzo = 0 ;
this.estadisticas.ecabril = 0 ;
this.estadisticas.ecmayo = 0 ;
this.estadisticas.ecjunio = 0 ;
this.estadisticas.ecjulio = 0 ;
this.estadisticas.ecagosto = 0 ;
this.estadisticas.ecseptiembre = 0 ;
this.estadisticas.ecoctubre = 0 ;
this.estadisticas.ecnoviembre = 0 ;
this.estadisticas.ecdiciembre = 0 ;
this.estadisticas.ectotal = 0 ;
this.estadisticas.edenero = 0 ;
this.estadisticas.edfebrero = 0 ;
this.estadisticas.edmarzo = 0 ;
this.estadisticas.edabril = 0 ;
this.estadisticas.edmayo = 0 ;
this.estadisticas.edjunio = 0 ;
this.estadisticas.edjulio = 0 ;
this.estadisticas.edagosto = 0 ;
this.estadisticas.edseptiembre = 0 ;
this.estadisticas.edoctubre = 0 ;
this.estadisticas.ednoviembre = 0 ;
this.estadisticas.eddiciembre = 0 ;
this.estadisticas.edtotal = 0 ;
this.estadisticas.eeenero = 0 ;
this.estadisticas.eefebrero = 0 ;
this.estadisticas.eemarzo = 0 ;
this.estadisticas.eeabril = 0 ;
this.estadisticas.eemayo = 0 ;
this.estadisticas.eejunio = 0 ;
this.estadisticas.eejulio = 0 ;
this.estadisticas.eeagosto = 0 ;
this.estadisticas.eeseptiembre = 0 ;
this.estadisticas.eeoctubre = 0 ;
this.estadisticas.eenoviembre = 0 ;
this.estadisticas.eediciembre = 0 ;
this.estadisticas.eetotal = 0 ;
this.estadisticas.efenero = 0 ;
this.estadisticas.effebrero = 0 ;
this.estadisticas.efmarzo = 0 ;
this.estadisticas.efabril = 0 ;
this.estadisticas.efmayo = 0 ;
this.estadisticas.efjunio = 0 ;
this.estadisticas.efjulio = 0 ;
this.estadisticas.efagosto = 0 ;
this.estadisticas.efseptiembre = 0 ;
this.estadisticas.efoctubre = 0 ;
this.estadisticas.efnoviembre = 0 ;
this.estadisticas.efdiciembre = 0 ;
this.estadisticas.eftotal = 0 ;
this.estadisticas.egenero = 0 ;
this.estadisticas.egfebrero = 0 ;
this.estadisticas.egmarzo = 0 ;
this.estadisticas.egabril = 0 ;
this.estadisticas.egmayo = 0 ;
this.estadisticas.egjunio = 0 ;
this.estadisticas.egjulio = 0 ;
this.estadisticas.egagosto = 0 ;
this.estadisticas.egseptiembre = 0 ;
this.estadisticas.egoctubre = 0 ;
this.estadisticas.egnoviembre = 0 ;
this.estadisticas.egdiciembre = 0 ;
this.estadisticas.egtotal = 0 ;
this.estadisticas.ehenero = 0 ;
this.estadisticas.ehfebrero = 0 ;
this.estadisticas.ehmarzo = 0 ;
this.estadisticas.ehabril = 0 ;
this.estadisticas.ehmayo = 0 ;
this.estadisticas.ehjunio = 0 ;
this.estadisticas.ehjulio = 0 ;
this.estadisticas.ehagosto = 0 ;
this.estadisticas.ehseptiembre = 0 ;
this.estadisticas.ehoctubre = 0 ;
this.estadisticas.ehnoviembre = 0 ;
this.estadisticas.ehdiciembre = 0 ;
this.estadisticas.ehtotal = 0 ;

  
// Funciones para las tablas de Periodo de Ejecucion
  this.sumaAnualgf = function(){
  	this.estadisticas.gftotal = 
  	parseFloat(this.estadisticas.gfenero) + 
  	parseFloat(this.estadisticas.gffebrero) + 
  	parseFloat(this.estadisticas.gfmarzo) + 
  	parseFloat(this.estadisticas.gfabril) + 
  	parseFloat(this.estadisticas.gfmayo) + 
  	parseFloat(this.estadisticas.gfjunio) + 
  	parseFloat(this.estadisticas.gfjulio) + 
  	parseFloat(this.estadisticas.gfagosto) + 
  	parseFloat(this.estadisticas.gfseptiembre) + 
  	parseFloat(this.estadisticas.gfoctubre) + 
  	parseFloat(this.estadisticas.gfnoviembre) + 
  	parseFloat(this.estadisticas.gfdiciembre) ;
		return this.estadisticas.gftotal
  }
  
  this.sumaAnualgv = function(){
  	this.estadisticas.gvtotal = 
  	parseFloat(this.estadisticas.gvenero) + 
  	parseFloat(this.estadisticas.gvfebrero) + 
  	parseFloat(this.estadisticas.gvmarzo) + 
  	parseFloat(this.estadisticas.gvabril) + 
  	parseFloat(this.estadisticas.gvmayo) + 
  	parseFloat(this.estadisticas.gvjunio) + 
  	parseFloat(this.estadisticas.gvjulio) + 
  	parseFloat(this.estadisticas.gvagosto) + 
  	parseFloat(this.estadisticas.gvseptiembre) + 
  	parseFloat(this.estadisticas.gvoctubre) + 
  	parseFloat(this.estadisticas.gvnoviembre) + 
  	parseFloat(this.estadisticas.gvdiciembre) ;
		return this.estadisticas.gvtotal
  }
  
  this.sumaMensualEnero=function(){
	  this.estadisticas.tenero = 
	  parseFloat(this.estadisticas.gfenero)  + 
	  parseFloat(this.estadisticas.gvenero);
	  return this.estadisticas.tenero;
  }
  this.sumaMensualFebrero=function(){
	  this.estadisticas.tfebrero = 
	  parseFloat(this.estadisticas.gffebrero) + 
	  parseFloat(this.estadisticas.gvfebrero);
	  return this.estadisticas.tfebrero;
  }
  this.sumaMensualMarzo=function(){
	  this.estadisticas.tmarzo = 
	  parseFloat(this.estadisticas.gfmarzo) + 
	  parseFloat(this.estadisticas.gvmarzo);
	  return this.estadisticas.tmarzo;
  }
  this.sumaMensualAbril=function(){
	  this.estadisticas.tabril = 
	  parseFloat(this.estadisticas.gfabril) + 
	  parseFloat(this.estadisticas.gvabril);
	  return this.estadisticas.tabril;
  }
  this.sumaMensualMayo=function(){
	  this.estadisticas.tmayo = 
	  parseFloat(this.estadisticas.gfmayo) + 
	  parseFloat(this.estadisticas.gvmayo);
	  return this.estadisticas.tmayo;
  }
  this.sumaMensualJunio=function(){
	  this.estadisticas.tjunio = 
	  parseFloat(this.estadisticas.gfjunio) + 
	  parseFloat(this.estadisticas.gvjunio);
	  return this.estadisticas.tjunio;
  }
  this.sumaMensualJulio=function(){
	  this.estadisticas.tjulio = 
	  parseFloat(this.estadisticas.gfjulio) + 
	  parseFloat(this.estadisticas.gvjulio);
	  return this.estadisticas.tjulio;
  }
  this.sumaMensualAgosto=function(){
	  this.estadisticas.tagosto = 
	  parseFloat(this.estadisticas.gfagosto) + 
	  parseFloat(this.estadisticas.gvagosto);
	  return this.estadisticas.tagosto;
  }
  this.sumaMensualSeptiembre=function(){
	  this.estadisticas.tseptiembre = 
	  parseFloat(this.estadisticas.gfseptiembre) + 
	  parseFloat(this.estadisticas.gvseptiembre);
	  return this.estadisticas.tseptiembre;
  }
  this.sumaMensualOctubre=function(){
	  this.estadisticas.toctubre = 
	  parseFloat(this.estadisticas.gfoctubre) + 
	  parseFloat(this.estadisticas.gvoctubre);
	  return this.estadisticas.toctubre;
  }
  this.sumaMensualNoviembre=function(){
	  this.estadisticas.tnoviembre = 
	  parseFloat(this.estadisticas.gfnoviembre) + 
	  parseFloat(this.estadisticas.gvnoviembre);
	  return this.estadisticas.tnoviembre;
  }
  this.sumaMensualDiciembre=function(){
	  this.estadisticas.tdiciembre = 
	  parseFloat(this.estadisticas.gfdiciembre) + 
	  parseFloat(this.estadisticas.gvdiciembre);
	  return this.estadisticas.tdiciembre;
  }
  
  this.sumaTotalgfgv=function(){
	  this.estadisticas.tgfgv = 
	  parseFloat(this.estadisticas.gftotal) + 
	  parseFloat(this.estadisticas.gvtotal);
	  return this.estadisticas.tgfgv;  }


// Funciones para las tablas de Ingresos

  this.ingresoAnualia = function(){
  	this.estadisticas.iatotal = 
  	parseFloat(this.estadisticas.iaenero) + 
  	parseFloat(this.estadisticas.iafebrero) + 
  	parseFloat(this.estadisticas.iamarzo) + 
  	parseFloat(this.estadisticas.iaabril) + 
  	parseFloat(this.estadisticas.iamayo) + 
  	parseFloat(this.estadisticas.iajunio) + 
  	parseFloat(this.estadisticas.iajulio) + 
  	parseFloat(this.estadisticas.iaagosto) + 
  	parseFloat(this.estadisticas.iaseptiembre) + 
  	parseFloat(this.estadisticas.iaoctubre) + 
  	parseFloat(this.estadisticas.ianoviembre) + 
  	parseFloat(this.estadisticas.iadiciembre) ;
		return this.estadisticas.iatotal
  }
  this.ingresoAnualib = function(){
  	this.estadisticas.ibtotal = 
  	parseFloat(this.estadisticas.ibenero) + 
  	parseFloat(this.estadisticas.ibfebrero) + 
  	parseFloat(this.estadisticas.ibmarzo) + 
  	parseFloat(this.estadisticas.ibabril) + 
  	parseFloat(this.estadisticas.ibmayo) + 
  	parseFloat(this.estadisticas.ibjunio) + 
  	parseFloat(this.estadisticas.ibjulio) + 
  	parseFloat(this.estadisticas.ibagosto) + 
  	parseFloat(this.estadisticas.ibseptiembre) + 
  	parseFloat(this.estadisticas.iboctubre) + 
  	parseFloat(this.estadisticas.ibnoviembre) + 
  	parseFloat(this.estadisticas.ibdiciembre) ;
		return this.estadisticas.ibtotal
  }
  this.ingresoAnualic = function(){
  	this.estadisticas.ictotal = 
  	parseFloat(this.estadisticas.icenero) + 
  	parseFloat(this.estadisticas.icfebrero) + 
  	parseFloat(this.estadisticas.icmarzo) + 
  	parseFloat(this.estadisticas.icabril) + 
  	parseFloat(this.estadisticas.icmayo) + 
  	parseFloat(this.estadisticas.icjunio) + 
  	parseFloat(this.estadisticas.icjulio) + 
  	parseFloat(this.estadisticas.icagosto) + 
  	parseFloat(this.estadisticas.icseptiembre) + 
  	parseFloat(this.estadisticas.icoctubre) + 
  	parseFloat(this.estadisticas.icnoviembre) + 
  	parseFloat(this.estadisticas.icdiciembre) ;
		return this.estadisticas.ictotal
  }
  this.ingresoAnualid = function(){
  	this.estadisticas.idtotal = 
  	parseFloat(this.estadisticas.idenero) + 
  	parseFloat(this.estadisticas.idfebrero) + 
  	parseFloat(this.estadisticas.idmarzo) + 
  	parseFloat(this.estadisticas.idabril) + 
  	parseFloat(this.estadisticas.idmayo) + 
  	parseFloat(this.estadisticas.idjunio) + 
  	parseFloat(this.estadisticas.idjulio) + 
  	parseFloat(this.estadisticas.idagosto) + 
  	parseFloat(this.estadisticas.idseptiembre) + 
  	parseFloat(this.estadisticas.idoctubre) + 
  	parseFloat(this.estadisticas.idnoviembre) + 
  	parseFloat(this.estadisticas.iddiciembre) ;
		return this.estadisticas.idtotal
  }
  this.ingresoAnualie = function(){
  	this.estadisticas.ietotal = 
  	parseFloat(this.estadisticas.ieenero) + 
  	parseFloat(this.estadisticas.iefebrero) + 
  	parseFloat(this.estadisticas.iemarzo) + 
  	parseFloat(this.estadisticas.ieabril) + 
  	parseFloat(this.estadisticas.iemayo) + 
  	parseFloat(this.estadisticas.iejunio) + 
  	parseFloat(this.estadisticas.iejulio) + 
  	parseFloat(this.estadisticas.ieagosto) + 
  	parseFloat(this.estadisticas.ieseptiembre) + 
  	parseFloat(this.estadisticas.ieoctubre) + 
  	parseFloat(this.estadisticas.ienoviembre) + 
  	parseFloat(this.estadisticas.iediciembre) ;
		return this.estadisticas.ietotal
  }
  this.ingresoAnualif = function(){
  	this.estadisticas.iftotal = 
  	parseFloat(this.estadisticas.ifenero) + 
  	parseFloat(this.estadisticas.iffebrero) + 
  	parseFloat(this.estadisticas.ifmarzo) + 
  	parseFloat(this.estadisticas.ifabril) + 
  	parseFloat(this.estadisticas.ifmayo) + 
  	parseFloat(this.estadisticas.ifjunio) + 
  	parseFloat(this.estadisticas.ifjulio) + 
  	parseFloat(this.estadisticas.ifagosto) + 
  	parseFloat(this.estadisticas.ifseptiembre) + 
  	parseFloat(this.estadisticas.ifoctubre) + 
  	parseFloat(this.estadisticas.ifnoviembre) + 
  	parseFloat(this.estadisticas.ifdiciembre) ;
		return this.estadisticas.iftotal
  }
  this.ingresoAnualig = function(){
  	this.estadisticas.igtotal = 
  	parseFloat(this.estadisticas.igenero) + 
  	parseFloat(this.estadisticas.igfebrero) + 
  	parseFloat(this.estadisticas.igmarzo) + 
  	parseFloat(this.estadisticas.igabril) + 
  	parseFloat(this.estadisticas.igmayo) + 
  	parseFloat(this.estadisticas.igjunio) + 
  	parseFloat(this.estadisticas.igjulio) + 
  	parseFloat(this.estadisticas.igagosto) + 
  	parseFloat(this.estadisticas.igseptiembre) + 
  	parseFloat(this.estadisticas.igoctubre) + 
  	parseFloat(this.estadisticas.ignoviembre) + 
  	parseFloat(this.estadisticas.igdiciembre) ;
		return this.estadisticas.igtotal
  }
  this.ingresoAnualih = function(){
  	this.estadisticas.ihtotal = 
  	parseFloat(this.estadisticas.ihenero) + 
  	parseFloat(this.estadisticas.ihfebrero) + 
  	parseFloat(this.estadisticas.ihmarzo) + 
  	parseFloat(this.estadisticas.ihabril) + 
  	parseFloat(this.estadisticas.ihmayo) + 
  	parseFloat(this.estadisticas.ihjunio) + 
  	parseFloat(this.estadisticas.ihjulio) + 
  	parseFloat(this.estadisticas.ihagosto) + 
  	parseFloat(this.estadisticas.ihseptiembre) + 
  	parseFloat(this.estadisticas.ihoctubre) + 
  	parseFloat(this.estadisticas.ihnoviembre) + 
  	parseFloat(this.estadisticas.ihdiciembre) ;
		return this.estadisticas.ihtotal
  }

  // Mensual
  
  this.ingresoMensualienero = function(){
  	this.estadisticas.itenero = 
  	parseFloat(this.estadisticas.iaenero) + 
  	parseFloat(this.estadisticas.ibenero) + 
  	parseFloat(this.estadisticas.icenero) + 
  	parseFloat(this.estadisticas.idenero) + 
  	parseFloat(this.estadisticas.ieenero) + 
  	parseFloat(this.estadisticas.ifenero) + 
  	parseFloat(this.estadisticas.igenero) + 
  	parseFloat(this.estadisticas.ihenero);
		return this.estadisticas.itenero
  }
  this.ingresoMensualifebrero = function(){
  	this.estadisticas.itfebrero = 
  	parseFloat(this.estadisticas.iafebrero) + 
  	parseFloat(this.estadisticas.ibfebrero) + 
  	parseFloat(this.estadisticas.icfebrero) + 
  	parseFloat(this.estadisticas.idfebrero) + 
  	parseFloat(this.estadisticas.iefebrero) + 
  	parseFloat(this.estadisticas.iffebrero) + 
  	parseFloat(this.estadisticas.igfebrero) + 
  	parseFloat(this.estadisticas.ihfebrero);
		return this.estadisticas.itfebrero
  }
  this.ingresoMensualimarzo = function(){
  	this.estadisticas.itmarzo = 
  	parseFloat(this.estadisticas.iamarzo) + 
  	parseFloat(this.estadisticas.ibmarzo) + 
  	parseFloat(this.estadisticas.icmarzo) + 
  	parseFloat(this.estadisticas.idmarzo) + 
  	parseFloat(this.estadisticas.iemarzo) + 
  	parseFloat(this.estadisticas.ifmarzo) + 
  	parseFloat(this.estadisticas.igmarzo) + 
  	parseFloat(this.estadisticas.ihmarzo);
		return this.estadisticas.itmarzo
  }
  this.ingresoMensualiabril = function(){
  	this.estadisticas.itabril = 
  	parseFloat(this.estadisticas.iaabril) + 
  	parseFloat(this.estadisticas.ibabril) + 
  	parseFloat(this.estadisticas.icabril) + 
  	parseFloat(this.estadisticas.idabril) + 
  	parseFloat(this.estadisticas.ieabril) + 
  	parseFloat(this.estadisticas.ifabril) + 
  	parseFloat(this.estadisticas.igabril) + 
  	parseFloat(this.estadisticas.ihabril);
		return this.estadisticas.itabril
  }
  this.ingresoMensualimayo = function(){
  	this.estadisticas.itmayo = 
  	parseFloat(this.estadisticas.iamayo) + 
  	parseFloat(this.estadisticas.ibmayo) + 
  	parseFloat(this.estadisticas.icmayo) + 
  	parseFloat(this.estadisticas.idmayo) + 
  	parseFloat(this.estadisticas.iemayo) + 
  	parseFloat(this.estadisticas.ifmayo) + 
  	parseFloat(this.estadisticas.igmayo) + 
  	parseFloat(this.estadisticas.ihmayo);
		return this.estadisticas.itmayo
  }
  this.ingresoMensualijunio = function(){
  	this.estadisticas.itjunio = 
  	parseFloat(this.estadisticas.iajunio) + 
  	parseFloat(this.estadisticas.ibjunio) + 
  	parseFloat(this.estadisticas.icjunio) + 
  	parseFloat(this.estadisticas.idjunio) + 
  	parseFloat(this.estadisticas.iejunio) + 
  	parseFloat(this.estadisticas.ifjunio) + 
  	parseFloat(this.estadisticas.igjunio) + 
  	parseFloat(this.estadisticas.ihjunio);
		return this.estadisticas.itjunio
  }
  this.ingresoMensualijulio = function(){
  	this.estadisticas.itjulio = 
  	parseFloat(this.estadisticas.iajulio) + 
  	parseFloat(this.estadisticas.ibjulio) + 
  	parseFloat(this.estadisticas.icjulio) + 
  	parseFloat(this.estadisticas.idjulio) + 
  	parseFloat(this.estadisticas.iejulio) + 
  	parseFloat(this.estadisticas.ifjulio) + 
  	parseFloat(this.estadisticas.igjulio) + 
  	parseFloat(this.estadisticas.ihjulio);
		return this.estadisticas.itjulio
  }
  this.ingresoMensualiagosto = function(){
  	this.estadisticas.itagosto = 
  	parseFloat(this.estadisticas.iaagosto) + 
  	parseFloat(this.estadisticas.ibagosto) + 
  	parseFloat(this.estadisticas.icagosto) + 
  	parseFloat(this.estadisticas.idagosto) + 
  	parseFloat(this.estadisticas.ieagosto) + 
  	parseFloat(this.estadisticas.ifagosto) + 
  	parseFloat(this.estadisticas.igagosto) + 
  	parseFloat(this.estadisticas.ihagosto);
		return this.estadisticas.itagosto
  }
  this.ingresoMensualiseptiembre = function(){
  	this.estadisticas.itseptiembre = 
  	parseFloat(this.estadisticas.iaseptiembre) + 
  	parseFloat(this.estadisticas.ibseptiembre) + 
  	parseFloat(this.estadisticas.icseptiembre) + 
  	parseFloat(this.estadisticas.idseptiembre) + 
  	parseFloat(this.estadisticas.ieseptiembre) + 
  	parseFloat(this.estadisticas.ifseptiembre) + 
  	parseFloat(this.estadisticas.igseptiembre) + 
  	parseFloat(this.estadisticas.ihseptiembre);
		return this.estadisticas.itseptiembre
  }
  this.ingresoMensualioctubre = function(){
  	this.estadisticas.itoctubre = 
  	parseFloat(this.estadisticas.iaoctubre) + 
  	parseFloat(this.estadisticas.iboctubre) + 
  	parseFloat(this.estadisticas.icoctubre) + 
  	parseFloat(this.estadisticas.idoctubre) + 
  	parseFloat(this.estadisticas.ieoctubre) + 
  	parseFloat(this.estadisticas.ifoctubre) + 
  	parseFloat(this.estadisticas.igoctubre) + 
  	parseFloat(this.estadisticas.ihoctubre);
		return this.estadisticas.itoctubre
  }
  this.ingresoMensualinoviembre = function(){
  	this.estadisticas.itnoviembre = 
  	parseFloat(this.estadisticas.ianoviembre) + 
  	parseFloat(this.estadisticas.ibnoviembre) + 
  	parseFloat(this.estadisticas.icnoviembre) + 
  	parseFloat(this.estadisticas.idnoviembre) + 
  	parseFloat(this.estadisticas.ienoviembre) + 
  	parseFloat(this.estadisticas.ifnoviembre) + 
  	parseFloat(this.estadisticas.ignoviembre) + 
  	parseFloat(this.estadisticas.ihnoviembre);
		return this.estadisticas.itnoviembre
  }
  this.ingresoMensualidiciembre = function(){
  	this.estadisticas.itdiciembre = 
  	parseFloat(this.estadisticas.iadiciembre) + 
  	parseFloat(this.estadisticas.ibdiciembre) + 
  	parseFloat(this.estadisticas.icdiciembre) + 
  	parseFloat(this.estadisticas.iddiciembre) + 
  	parseFloat(this.estadisticas.iediciembre) + 
  	parseFloat(this.estadisticas.ifdiciembre) + 
  	parseFloat(this.estadisticas.igdiciembre) + 
  	parseFloat(this.estadisticas.ihdiciembre);
		return this.estadisticas.itdiciembre
  }
  this.sumaTotalingresos = function(){
  	this.estadisticas.ittotal = 
  	parseFloat(this.estadisticas.iatotal) + 
  	parseFloat(this.estadisticas.ibtotal) + 
  	parseFloat(this.estadisticas.ictotal) + 
  	parseFloat(this.estadisticas.idtotal) + 
  	parseFloat(this.estadisticas.ietotal) + 
  	parseFloat(this.estadisticas.iftotal) + 
  	parseFloat(this.estadisticas.igtotal) + 
  	parseFloat(this.estadisticas.ihtotal);
		return this.estadisticas.ittotal
  }

// Funciones para las tablas de Gastos de Campo

  this.gastoCampoAnualgca = function(){
  	this.estadisticas.gcatotal = 
  	parseFloat(this.estadisticas.gcaenero) + 
  	parseFloat(this.estadisticas.gcafebrero) + 
  	parseFloat(this.estadisticas.gcamarzo) + 
  	parseFloat(this.estadisticas.gcaabril) + 
  	parseFloat(this.estadisticas.gcamayo) + 
  	parseFloat(this.estadisticas.gcajunio) + 
  	parseFloat(this.estadisticas.gcajulio) + 
  	parseFloat(this.estadisticas.gcaagosto) + 
  	parseFloat(this.estadisticas.gcaseptiembre) + 
  	parseFloat(this.estadisticas.gcaoctubre) + 
  	parseFloat(this.estadisticas.gcanoviembre) + 
  	parseFloat(this.estadisticas.gcadiciembre) ;
		return this.estadisticas.gcatotal
  }
  this.gastoCampoAnualgcb = function(){
  	this.estadisticas.gcbtotal = 
  	parseFloat(this.estadisticas.gcbenero) + 
  	parseFloat(this.estadisticas.gcbfebrero) + 
  	parseFloat(this.estadisticas.gcbmarzo) + 
  	parseFloat(this.estadisticas.gcbabril) + 
  	parseFloat(this.estadisticas.gcbmayo) + 
  	parseFloat(this.estadisticas.gcbjunio) + 
  	parseFloat(this.estadisticas.gcbjulio) + 
  	parseFloat(this.estadisticas.gcbagosto) + 
  	parseFloat(this.estadisticas.gcbseptiembre) + 
  	parseFloat(this.estadisticas.gcboctubre) + 
  	parseFloat(this.estadisticas.gcbnoviembre) + 
  	parseFloat(this.estadisticas.gcbdiciembre) ;
		return this.estadisticas.gcbtotal
  }
  this.gastoCampoAnualgcc = function(){
  	this.estadisticas.gcctotal = 
  	parseFloat(this.estadisticas.gccenero) + 
  	parseFloat(this.estadisticas.gccfebrero) + 
  	parseFloat(this.estadisticas.gccmarzo) + 
  	parseFloat(this.estadisticas.gccabril) + 
  	parseFloat(this.estadisticas.gccmayo) + 
  	parseFloat(this.estadisticas.gccjunio) + 
  	parseFloat(this.estadisticas.gccjulio) + 
  	parseFloat(this.estadisticas.gccagosto) + 
  	parseFloat(this.estadisticas.gccseptiembre) + 
  	parseFloat(this.estadisticas.gccoctubre) + 
  	parseFloat(this.estadisticas.gccnoviembre) + 
  	parseFloat(this.estadisticas.gccdiciembre) ;
		return this.estadisticas.gcctotal
  }
  this.gastoCampoAnualgcd = function(){
  	this.estadisticas.gcdtotal = 
  	parseFloat(this.estadisticas.gcdenero) + 
  	parseFloat(this.estadisticas.gcdfebrero) + 
  	parseFloat(this.estadisticas.gcdmarzo) + 
  	parseFloat(this.estadisticas.gcdabril) + 
  	parseFloat(this.estadisticas.gcdmayo) + 
  	parseFloat(this.estadisticas.gcdjunio) + 
  	parseFloat(this.estadisticas.gcdjulio) + 
  	parseFloat(this.estadisticas.gcdagosto) + 
  	parseFloat(this.estadisticas.gcdseptiembre) + 
  	parseFloat(this.estadisticas.gcdoctubre) + 
  	parseFloat(this.estadisticas.gcdnoviembre) + 
  	parseFloat(this.estadisticas.gcddiciembre) ;
		return this.estadisticas.gcdtotal
  }
  this.gastoCampoAnualgce = function(){
  	this.estadisticas.gcetotal = 
  	parseFloat(this.estadisticas.gceenero) + 
  	parseFloat(this.estadisticas.gcefebrero) + 
  	parseFloat(this.estadisticas.gcemarzo) + 
  	parseFloat(this.estadisticas.gceabril) + 
  	parseFloat(this.estadisticas.gcemayo) + 
  	parseFloat(this.estadisticas.gcejunio) + 
  	parseFloat(this.estadisticas.gcejulio) + 
  	parseFloat(this.estadisticas.gceagosto) + 
  	parseFloat(this.estadisticas.gceseptiembre) + 
  	parseFloat(this.estadisticas.gceoctubre) + 
  	parseFloat(this.estadisticas.gcenoviembre) + 
  	parseFloat(this.estadisticas.gcediciembre) ;
		return this.estadisticas.gcetotal
  }
  this.gastoCampoAnualgcf = function(){
  	this.estadisticas.gcftotal = 
  	parseFloat(this.estadisticas.gcfenero) + 
  	parseFloat(this.estadisticas.gcffebrero) + 
  	parseFloat(this.estadisticas.gcfmarzo) + 
  	parseFloat(this.estadisticas.gcfabril) + 
  	parseFloat(this.estadisticas.gcfmayo) + 
  	parseFloat(this.estadisticas.gcfjunio) + 
  	parseFloat(this.estadisticas.gcfjulio) + 
  	parseFloat(this.estadisticas.gcfagosto) + 
  	parseFloat(this.estadisticas.gcfseptiembre) + 
  	parseFloat(this.estadisticas.gcfoctubre) + 
  	parseFloat(this.estadisticas.gcfnoviembre) + 
  	parseFloat(this.estadisticas.gcfdiciembre) ;
		return this.estadisticas.gcftotal
  }
  this.gastoCampoAnualgcg = function(){
  	this.estadisticas.gcgtotal = 
  	parseFloat(this.estadisticas.gcgenero) + 
  	parseFloat(this.estadisticas.gcgfebrero) + 
  	parseFloat(this.estadisticas.gcgmarzo) + 
  	parseFloat(this.estadisticas.gcgabril) + 
  	parseFloat(this.estadisticas.gcgmayo) + 
  	parseFloat(this.estadisticas.gcgjunio) + 
  	parseFloat(this.estadisticas.gcgjulio) + 
  	parseFloat(this.estadisticas.gcgagosto) + 
  	parseFloat(this.estadisticas.gcgseptiembre) + 
  	parseFloat(this.estadisticas.gcgoctubre) + 
  	parseFloat(this.estadisticas.gcgnoviembre) + 
  	parseFloat(this.estadisticas.gcgdiciembre) ;
		return this.estadisticas.gcgtotal
  }
  this.gastoCampoAnualgch = function(){
  	this.estadisticas.gchtotal = 
  	parseFloat(this.estadisticas.gchenero) + 
  	parseFloat(this.estadisticas.gchfebrero) + 
  	parseFloat(this.estadisticas.gchmarzo) + 
  	parseFloat(this.estadisticas.gchabril) + 
  	parseFloat(this.estadisticas.gchmayo) + 
  	parseFloat(this.estadisticas.gchjunio) + 
  	parseFloat(this.estadisticas.gchjulio) + 
  	parseFloat(this.estadisticas.gchagosto) + 
  	parseFloat(this.estadisticas.gchseptiembre) + 
  	parseFloat(this.estadisticas.gchoctubre) + 
  	parseFloat(this.estadisticas.gchnoviembre) + 
  	parseFloat(this.estadisticas.gchdiciembre) ;
		return this.estadisticas.gchtotal
  }

  // Mensual
  
  this.gastoCampogcenero = function(){
  	this.estadisticas.gctenero = 
  	parseFloat(this.estadisticas.gcaenero) + 
  	parseFloat(this.estadisticas.gcbenero) + 
  	parseFloat(this.estadisticas.gccenero) + 
  	parseFloat(this.estadisticas.gcdenero) + 
  	parseFloat(this.estadisticas.gceenero) + 
  	parseFloat(this.estadisticas.gcfenero) + 
  	parseFloat(this.estadisticas.gcgenero) + 
  	parseFloat(this.estadisticas.gchenero);
		return this.estadisticas.gctenero
  }
  this.gastoCampogcfebrero = function(){
  	this.estadisticas.gctfebrero = 
  	parseFloat(this.estadisticas.gcafebrero) + 
  	parseFloat(this.estadisticas.gcbfebrero) + 
  	parseFloat(this.estadisticas.gccfebrero) + 
  	parseFloat(this.estadisticas.gcdfebrero) + 
  	parseFloat(this.estadisticas.gcefebrero) + 
  	parseFloat(this.estadisticas.gcffebrero) + 
  	parseFloat(this.estadisticas.gcgfebrero) + 
  	parseFloat(this.estadisticas.gchfebrero);
		return this.estadisticas.gctfebrero
  }
  this.gastoCampogcmarzo = function(){
  	this.estadisticas.gctmarzo = 
  	parseFloat(this.estadisticas.gcamarzo) + 
  	parseFloat(this.estadisticas.gcbmarzo) + 
  	parseFloat(this.estadisticas.gccmarzo) + 
  	parseFloat(this.estadisticas.gcdmarzo) + 
  	parseFloat(this.estadisticas.gcemarzo) + 
  	parseFloat(this.estadisticas.gcfmarzo) + 
  	parseFloat(this.estadisticas.gcgmarzo) + 
  	parseFloat(this.estadisticas.gchmarzo);
		return this.estadisticas.gctmarzo
  }
  this.gastoCampogcabril = function(){
  	this.estadisticas.gctabril = 
  	parseFloat(this.estadisticas.gcaabril) + 
  	parseFloat(this.estadisticas.gcbabril) + 
  	parseFloat(this.estadisticas.gccabril) + 
  	parseFloat(this.estadisticas.gcdabril) + 
  	parseFloat(this.estadisticas.gceabril) + 
  	parseFloat(this.estadisticas.gcfabril) + 
  	parseFloat(this.estadisticas.gcgabril) + 
  	parseFloat(this.estadisticas.gchabril);
		return this.estadisticas.gctabril
  }
  this.gastoCampogcmayo = function(){
  	this.estadisticas.gctmayo = 
  	parseFloat(this.estadisticas.gcamayo) + 
  	parseFloat(this.estadisticas.gcbmayo) + 
  	parseFloat(this.estadisticas.gccmayo) + 
  	parseFloat(this.estadisticas.gcdmayo) + 
  	parseFloat(this.estadisticas.gcemayo) + 
  	parseFloat(this.estadisticas.gcfmayo) + 
  	parseFloat(this.estadisticas.gcgmayo) + 
  	parseFloat(this.estadisticas.gchmayo);
		return this.estadisticas.gctmayo
  }
  this.gastoCampogcjunio = function(){
  	this.estadisticas.gctjunio = 
  	parseFloat(this.estadisticas.gcajunio) + 
  	parseFloat(this.estadisticas.gcbjunio) + 
  	parseFloat(this.estadisticas.gccjunio) + 
  	parseFloat(this.estadisticas.gcdjunio) + 
  	parseFloat(this.estadisticas.gcejunio) + 
  	parseFloat(this.estadisticas.gcfjunio) + 
  	parseFloat(this.estadisticas.gcgjunio) + 
  	parseFloat(this.estadisticas.gchjunio);
		return this.estadisticas.gctjunio
  }
  this.gastoCampogcjulio = function(){
  	this.estadisticas.gctjulio = 
  	parseFloat(this.estadisticas.gcajulio) + 
  	parseFloat(this.estadisticas.gcbjulio) + 
  	parseFloat(this.estadisticas.gccjulio) + 
  	parseFloat(this.estadisticas.gcdjulio) + 
  	parseFloat(this.estadisticas.gcejulio) + 
  	parseFloat(this.estadisticas.gcfjulio) + 
  	parseFloat(this.estadisticas.gcgjulio) + 
  	parseFloat(this.estadisticas.gchjulio);
		return this.estadisticas.gctjulio
  }
  this.gastoCampogcagosto = function(){
  	this.estadisticas.gctagosto = 
  	parseFloat(this.estadisticas.gcaagosto) + 
  	parseFloat(this.estadisticas.gcbagosto) + 
  	parseFloat(this.estadisticas.gccagosto) + 
  	parseFloat(this.estadisticas.gcdagosto) + 
  	parseFloat(this.estadisticas.gceagosto) + 
  	parseFloat(this.estadisticas.gcfagosto) + 
  	parseFloat(this.estadisticas.gcgagosto) + 
  	parseFloat(this.estadisticas.gchagosto);
		return this.estadisticas.gctagosto
  }
  this.gastoCampogcseptiembre = function(){
  	this.estadisticas.gctseptiembre = 
  	parseFloat(this.estadisticas.gcaseptiembre) + 
  	parseFloat(this.estadisticas.gcbseptiembre) + 
  	parseFloat(this.estadisticas.gccseptiembre) + 
  	parseFloat(this.estadisticas.gcdseptiembre) + 
  	parseFloat(this.estadisticas.gceseptiembre) + 
  	parseFloat(this.estadisticas.gcfseptiembre) + 
  	parseFloat(this.estadisticas.gcgseptiembre) + 
  	parseFloat(this.estadisticas.gchseptiembre);
		return this.estadisticas.gctseptiembre
  }
  this.gastoCampogcoctubre = function(){
  	this.estadisticas.gctoctubre = 
  	parseFloat(this.estadisticas.gcaoctubre) + 
  	parseFloat(this.estadisticas.gcboctubre) + 
  	parseFloat(this.estadisticas.gccoctubre) + 
  	parseFloat(this.estadisticas.gcdoctubre) + 
  	parseFloat(this.estadisticas.gceoctubre) + 
  	parseFloat(this.estadisticas.gcfoctubre) + 
  	parseFloat(this.estadisticas.gcgoctubre) + 
  	parseFloat(this.estadisticas.gchoctubre);
		return this.estadisticas.gctoctubre
  }
  this.gastoCampogcnoviembre = function(){
  	this.estadisticas.gctnoviembre = 
  	parseFloat(this.estadisticas.gcanoviembre) + 
  	parseFloat(this.estadisticas.gcbnoviembre) + 
  	parseFloat(this.estadisticas.gccnoviembre) + 
  	parseFloat(this.estadisticas.gcdnoviembre) + 
  	parseFloat(this.estadisticas.gcenoviembre) + 
  	parseFloat(this.estadisticas.gcfnoviembre) + 
  	parseFloat(this.estadisticas.gcgnoviembre) + 
  	parseFloat(this.estadisticas.gchnoviembre);
		return this.estadisticas.gctnoviembre
  }
  this.gastoCampogcdiciembre = function(){
  	this.estadisticas.gctdiciembre = 
  	parseFloat(this.estadisticas.gcadiciembre) + 
  	parseFloat(this.estadisticas.gcbdiciembre) + 
  	parseFloat(this.estadisticas.gccdiciembre) + 
  	parseFloat(this.estadisticas.gcddiciembre) + 
  	parseFloat(this.estadisticas.gcediciembre) + 
  	parseFloat(this.estadisticas.gcfdiciembre) + 
  	parseFloat(this.estadisticas.gcgdiciembre) + 
  	parseFloat(this.estadisticas.gchdiciembre);
		return this.estadisticas.gctdiciembre
  }
  this.gastoCampogct = function(){
  	this.estadisticas.gcttotal = 
  	parseFloat(this.estadisticas.gcatotal) + 
  	parseFloat(this.estadisticas.gcbtotal) + 
  	parseFloat(this.estadisticas.gcctotal) + 
  	parseFloat(this.estadisticas.gcdtotal) + 
  	parseFloat(this.estadisticas.gcetotal) + 
  	parseFloat(this.estadisticas.gcftotal) + 
  	parseFloat(this.estadisticas.gcgtotal) + 
  	parseFloat(this.estadisticas.gchtotal);
		return this.estadisticas.gcttotal
  }
  
//   Tabla de Gasto Indirecto
  
	this.gastoIndirectogienero=function(){
	  this.estadisticas.gienero = 
	  ((parseFloat(this.estadisticas.tenero) + 
	  parseFloat(this.estadisticas.gctenero)) /
	  parseFloat(this.estadisticas.itenero)) * 100;
	  return this.estadisticas.gienero;
	}
	this.gastoIndirectogifebrero=function(){
	  this.estadisticas.gifebrero = 
	  ((parseFloat(this.estadisticas.tfebrero) + 
	  parseFloat(this.estadisticas.gctfebrero)) /
	  parseFloat(this.estadisticas.itfebrero)) * 100;
	  return this.estadisticas.gifebrero;
	}
	this.gastoIndirectogimarzo=function(){
	  this.estadisticas.gimarzo = 
	  ((parseFloat(this.estadisticas.tmarzo) + 
	  parseFloat(this.estadisticas.gctmarzo)) /
	  parseFloat(this.estadisticas.itmarzo)) * 100;
	  return this.estadisticas.gimarzo;
	}
	this.gastoIndirectogiabril=function(){
	  this.estadisticas.giabril = 
	  ((parseFloat(this.estadisticas.tabril) + 
	  parseFloat(this.estadisticas.gctabril)) /
	  parseFloat(this.estadisticas.itabril)) * 100;
	  return this.estadisticas.giabril;
	}
	this.gastoIndirectogimayo=function(){
	  this.estadisticas.gimayo = 
	  ((parseFloat(this.estadisticas.tmayo) + 
	  parseFloat(this.estadisticas.gctmayo)) /
	  parseFloat(this.estadisticas.itmayo)) * 100;
	  return this.estadisticas.gimayo;
	}
	this.gastoIndirectogijunio=function(){
	  this.estadisticas.gijunio = 
	  ((parseFloat(this.estadisticas.tjunio) + 
	  parseFloat(this.estadisticas.gctjunio)) /
	  parseFloat(this.estadisticas.itjunio)) * 100;
	  return this.estadisticas.gijunio;
	}
	this.gastoIndirectogijulio=function(){
	  this.estadisticas.gijulio = 
	  ((parseFloat(this.estadisticas.tjulio) + 
	  parseFloat(this.estadisticas.gctjulio)) /
	  parseFloat(this.estadisticas.itjulio)) * 100;
	  return this.estadisticas.gijulio;
	}
	this.gastoIndirectogiagosto=function(){
	  this.estadisticas.giagosto = 
	  ((parseFloat(this.estadisticas.tagosto) + 
	  parseFloat(this.estadisticas.gctagosto)) /
	  parseFloat(this.estadisticas.itagosto)) * 100;
	  return this.estadisticas.giagosto;
	}
	this.gastoIndirectogiseptiembre=function(){
	  this.estadisticas.giseptiembre = 
	  ((parseFloat(this.estadisticas.tseptiembre) + 
	  parseFloat(this.estadisticas.gctseptiembre)) /
	  parseFloat(this.estadisticas.itseptiembre)) * 100;
	  return this.estadisticas.giseptiembre;
	}
	this.gastoIndirectogioctubre=function(){
	  this.estadisticas.gioctubre = 
	  ((parseFloat(this.estadisticas.toctubre) + 
	  parseFloat(this.estadisticas.gctoctubre)) /
	  parseFloat(this.estadisticas.itoctubre)) * 100;
	  return this.estadisticas.gioctubre;
	}
	this.gastoIndirectoginoviembre=function(){
	  this.estadisticas.ginoviembre = 
	  ((parseFloat(this.estadisticas.tnoviembre) + 
	  parseFloat(this.estadisticas.gctnoviembre)) /
	  parseFloat(this.estadisticas.itnoviembre)) * 100;
	  return this.estadisticas.ginoviembre;
	}
	this.gastoIndirectogidiciembre=function(){
	  this.estadisticas.gidiciembre = 
	  ((parseFloat(this.estadisticas.tdiciembre) + 
	  parseFloat(this.estadisticas.gctdiciembre)) /
	  parseFloat(this.estadisticas.itdiciembre)) * 100;
	  return this.estadisticas.gidiciembre;
	}
	
//   Tabla de Gasto Indirecto Anual
	
	this.gastoIndirectoAnualgianuales=function(){
	  this.estadisticas.gianuales = 
	  ((parseFloat(this.estadisticas.tgfgv) + 
	  parseFloat(this.estadisticas.gcttotal)) /
	  parseFloat(this.estadisticas.ittotal)) * 100;
	  return this.estadisticas.gianuales;
	}

//   Tabla de Gasto Indirecto Por Obra
	this.gastoIndirectoAnualgia=function(){
	  this.estadisticas.aindirectos = 
	  ((parseFloat(this.estadisticas.eatotal) + 
	  parseFloat(this.estadisticas.gcatotal)) /
	  parseFloat(this.estadisticas.iatotal)) * 100;
	  return this.estadisticas.aindirectos;
	}
	this.gastoIndirectoAnualgib=function(){
	  this.estadisticas.bindirectos = 
	  ((parseFloat(this.estadisticas.ebtotal) + 
	  parseFloat(this.estadisticas.gcbtotal)) /
	  parseFloat(this.estadisticas.ibtotal)) * 100;
	  return this.estadisticas.bindirectos;
	}
	this.gastoIndirectoAnualgic=function(){
	  this.estadisticas.cindirectos = 
	  ((parseFloat(this.estadisticas.ectotal) + 
	  parseFloat(this.estadisticas.gcctotal)) /
	  parseFloat(this.estadisticas.ictotal)) * 100;
	  return this.estadisticas.cindirectos;
	}
	this.gastoIndirectoAnualgid=function(){
	  this.estadisticas.dindirectos = 
	  ((parseFloat(this.estadisticas.edtotal) + 
	  parseFloat(this.estadisticas.gcdtotal)) /
	  parseFloat(this.estadisticas.idtotal)) * 100;
	  return this.estadisticas.dindirectos;
	}
	this.gastoIndirectoAnualgie=function(){
	  this.estadisticas.eindirectos = 
	  ((parseFloat(this.estadisticas.eetotal) + 
	  parseFloat(this.estadisticas.gcetotal)) /
	  parseFloat(this.estadisticas.ietotal)) * 100;
	  return this.estadisticas.eindirectos;
	}
	this.gastoIndirectoAnualgif=function(){
	  this.estadisticas.findirectos = 
	  ((parseFloat(this.estadisticas.eftotal) + 
	  parseFloat(this.estadisticas.gcftotal)) /
	  parseFloat(this.estadisticas.iftotal)) * 100;
	  return this.estadisticas.findirectos;
	}
	this.gastoIndirectoAnualgig=function(){
	  this.estadisticas.gindirectos = 
	  ((parseFloat(this.estadisticas.egtotal) + 
	  parseFloat(this.estadisticas.gcgtotal)) /
	  parseFloat(this.estadisticas.igtotal)) * 100;
	  return this.estadisticas.gindirectos;
	}
	this.gastoIndirectoAnualgih=function(){
	  this.estadisticas.hindirectos = 
	  ((parseFloat(this.estadisticas.ehtotal) + 
	  parseFloat(this.estadisticas.gchtotal)) /
	  parseFloat(this.estadisticas.ihtotal)) * 100;
	  return this.estadisticas.hindirectos;
	}

//   Tabla Escondida Obra a

	this.escondidaaenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.eaenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.iaenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.eaenero;
		}else{
				this.estadisticas.eaenero = 0;
		}
	}
	this.escondidaafebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.eafebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.iafebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.eafebrero;
		}else{
				this.estadisticas.eafebrero = 0;
		}
	}
	this.escondidaamarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.eamarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.iamarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.eamarzo;
		}else{
				this.estadisticas.eamarzo = 0;
		}
	}
	this.escondidaaabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.eaabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.iaabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.eaabril;
		}else{
				this.estadisticas.eaabril = 0;
		}
	}
	this.escondidaamayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.eamayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.iamayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.eamayo;
		}else{
			this.estadisticas.eamayo = 0;
		}
	}
	this.escondidaajunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.eajunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.iajunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.eajunio;
		}else{
				this.estadisticas.eajunio = 0;
		}
	}
	this.escondidaajulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.eajulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.iajulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.eajulio;
		}else{
				this.estadisticas.eajulio = 0;
		}
	}
	this.escondidaaagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.eaagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.iaagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.eaagosto;
		}else{
				this.estadisticas.eaagosto = 0;
		}
	}
	this.escondidaaseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.easeptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.iaseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.easeptiembre;
		}else{
				this.estadisticas.easeptiembre = 0;
		}
	}
	this.escondidaaoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.eaoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.iaoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.eaoctubre;
		}else{
				this.estadisticas.eaoctubre = 0;
		}
	}
	this.escondidaanoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.eanoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.ianoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.eanoviembre;
		}else{
				this.estadisticas.eanoviembre = 0;
		}
	}
	this.escondidaadiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.eadiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.iadiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.eadiciembre;
		}else{
				this.estadisticas.eadiciembre = 0;
		}
	}
	this.escondidaatotal=function(){
	  this.estadisticas.eatotal = 
	  parseFloat(this.estadisticas.eaenero) +
	  parseFloat(this.estadisticas.eafebrero) +
	  parseFloat(this.estadisticas.eamarzo) +
	  parseFloat(this.estadisticas.eaabril) +
	  parseFloat(this.estadisticas.eamayo) +
	  parseFloat(this.estadisticas.eajunio) +
		parseFloat(this.estadisticas.eajulio) +
	  parseFloat(this.estadisticas.eaagosto) +
	  parseFloat(this.estadisticas.easeptiembre) +
	  parseFloat(this.estadisticas.eaoctubre) +
	  parseFloat(this.estadisticas.eanoviembre) +
	  parseFloat(this.estadisticas.eadiciembre) ;
	  return this.estadisticas.eatotal;
	}
//   Tabla Escondida Obra b

	this.escondidabenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.ebenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.ibenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.ebenero;
		}else{
				this.estadisticas.ebenero = 0;
		}
	}
	this.escondidabfebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.ebfebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.ibfebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.ebfebrero;
		}else{
				this.estadisticas.ebfebrero = 0;
		}
	}
	this.escondidabmarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.ebmarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.ibmarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.ebmarzo;
		}else{
				this.estadisticas.ebmarzo = 0;
		}
	}
	this.escondidababril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.ebabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.ibabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.ebabril;
		}else{
				this.estadisticas.ebabril = 0;
		}
	}
	this.escondidabmayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.ebmayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.ibmayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.ebmayo;
		}else{
				this.estadisticas.ebmayo = 0;
		}
	}
	this.escondidabjunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.ebjunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.ibjunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.ebjunio;
		}else{
				this.estadisticas.ebjunio = 0;
		}
	}
	this.escondidabjulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.ebjulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.ibjulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.ebjulio;
		}else{
				this.estadisticas.ebjulio = 0;
		}
	}
	this.escondidabagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.ebagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.ibagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.ebagosto;
		}else{
				this.estadisticas.ebagosto = 0;
		}
	}
	this.escondidabseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.ebseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.ibseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.ebseptiembre;
		}else{
				this.estadisticas.ebseptiembre = 0;
		}
	}
	this.escondidaboctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.eboctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.iboctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.eboctubre;
		}else{
				this.estadisticas.eboctubre = 0;
		}
	}
	this.escondidabnoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.ebnoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.ibnoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.ebnoviembre;
		}else{
				this.estadisticas.ebnoviembre = 0;
		}
	}
	this.escondidabdiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.ebdiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.ibdiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.ebdiciembre;
		}else{
				this.estadisticas.ebdiciembre = 0;
		}
	}
	this.escondidabtotal=function(){
	  this.estadisticas.ebtotal = 
	  parseFloat(this.estadisticas.ebenero) +
	  parseFloat(this.estadisticas.ebfebrero) +
	  parseFloat(this.estadisticas.ebmarzo) +
	  parseFloat(this.estadisticas.ebabril) +
	  parseFloat(this.estadisticas.ebmayo) +
	  parseFloat(this.estadisticas.ebjunio) +
		parseFloat(this.estadisticas.ebjulio) +
	  parseFloat(this.estadisticas.ebagosto) +
	  parseFloat(this.estadisticas.ebseptiembre) +
	  parseFloat(this.estadisticas.eboctubre) +
	  parseFloat(this.estadisticas.ebnoviembre) +
	  parseFloat(this.estadisticas.ebdiciembre) ;
	  return this.estadisticas.ebtotal;
	}
	//   Tabla Escondida Obra c

	this.escondidacenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.ecenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.icenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.ecenero;
		}else{
				this.estadisticas.ecenero = 0;
		}
	}
	this.escondidacfebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.ecfebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.icfebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.ecfebrero;
		}else{
				this.estadisticas.ecfebrero = 0;
		}
	}
	this.escondidacmarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.ecmarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.icmarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.ecmarzo;
		}else{
				this.estadisticas.ecmarzo = 0;
		}
	}
	this.escondidacabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.ecabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.icabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.ecabril;
		}else{
				this.estadisticas.ecabril = 0;
		}
	}
	this.escondidacmayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.ecmayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.icmayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.ecmayo;
		}else{
				this.estadisticas.ecmayo = 0;
		}
	}
	this.escondidacjunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.ecjunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.icjunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.ecjunio;
		}else{
				this.estadisticas.ecjunio = 0;
		}
	}
	this.escondidacjulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.ecjulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.icjulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.ecjulio;
		}else{
				this.estadisticas.ecjulio = 0;
		}
	}
	this.escondidacagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.ecagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.icagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.ecagosto;
		}else{
				this.estadisticas.ecagosto = 0;
		}
	}
	this.escondidacseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.ecseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.icseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.ecseptiembre;
		}else{
				this.estadisticas.ecseptiembre = 0;
		}
	}
	this.escondidacoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.ecoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.icoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.ecoctubre;
		}else{
				this.estadisticas.ecoctubre = 0;
		}
	}
	this.escondidacnoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.ecnoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.icnoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.ecnoviembre;
		}else{
				this.estadisticas.ecnoviembre = 0;
		}
	}
	this.escondidacdiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.ecdiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.icdiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.ecdiciembre;
		}else{
				this.estadisticas.ecdiciembre = 0;
		}
	}
	this.escondidactotal=function(){
	  this.estadisticas.ectotal = 
	  parseFloat(this.estadisticas.ecenero) +
	  parseFloat(this.estadisticas.ecfebrero) +
	  parseFloat(this.estadisticas.ecmarzo) +
	  parseFloat(this.estadisticas.ecabril) +
	  parseFloat(this.estadisticas.ecmayo) +
	  parseFloat(this.estadisticas.ecjunio) +
		parseFloat(this.estadisticas.ecjulio) +
	  parseFloat(this.estadisticas.ecagosto) +
	  parseFloat(this.estadisticas.ecseptiembre) +
	  parseFloat(this.estadisticas.ecoctubre) +
	  parseFloat(this.estadisticas.ecnoviembre) +
	  parseFloat(this.estadisticas.ecdiciembre) ;
	  return this.estadisticas.ectotal;
	}
//   Tabla Escondida Obra d

	this.escondidadenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.edenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.idenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.edenero;
		}else{
				this.estadisticas.edenero = 0;
		}
	}
	this.escondidadfebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.edfebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.idfebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.edfebrero;
		}else{
				this.estadisticas.edfebrero = 0;
		}
	}
	this.escondidadmarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.edmarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.idmarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.edmarzo;
		}else{
				this.estadisticas.edmarzo = 0;
		}
	}
	this.escondidadabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.edabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.idabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.edabril;
		}else{
				this.estadisticas.edabril = 0;
		}
	}
	this.escondidadmayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.edmayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.idmayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.edmayo;
		}else{
				this.estadisticas.edmayo = 0;
		}
	}
	this.escondidadjunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.edjunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.idjunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.edjunio;
		}else{
				this.estadisticas.edjunio = 0;
		}
	}
	this.escondidadjulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.edjulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.idjulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.edjulio;
		}else{
				this.estadisticas.edjulio = 0;
		}
	}
	this.escondidadagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.edagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.idagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.edagosto;
		}else{
				this.estadisticas.edagosto = 0;
		}
	}
	this.escondidadseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.edseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.idseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.edseptiembre;
		}else{
				this.estadisticas.edseptiembre = 0;
		}
	}
	this.escondidadoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.edoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.idoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.edoctubre;
		}else{
				this.estadisticas.edoctubre = 0;
		}
	}
	this.escondidadnoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.ednoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.idnoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.ednoviembre;
		}else{
				this.estadisticas.ednoviembre = 0;
		}
	}
	this.escondidaddiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.eddiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.iddiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
				return this.estadisticas.eddiciembre;
		}else{
				this.estadisticas.eddiciembre = 0;
		}
	}
	this.escondidadtotal=function(){
	  this.estadisticas.edtotal = 
	  parseFloat(this.estadisticas.edenero) +
	  parseFloat(this.estadisticas.edfebrero) +
	  parseFloat(this.estadisticas.edmarzo) +
	  parseFloat(this.estadisticas.edabril) +
	  parseFloat(this.estadisticas.edmayo) +
	  parseFloat(this.estadisticas.edjunio) +
		parseFloat(this.estadisticas.edjulio) +
	  parseFloat(this.estadisticas.edagosto) +
	  parseFloat(this.estadisticas.edseptiembre) +
	  parseFloat(this.estadisticas.edoctubre) +
	  parseFloat(this.estadisticas.ednoviembre) +
	  parseFloat(this.estadisticas.eddiciembre) ;
	  return this.estadisticas.edtotal;
	}
//   Tabla Escondida Obra e

	this.escondidaeenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.eeenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.ieenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.eeenero;
		}else{
				this.estadisticas.eeenero = 0;
		}
	}
	this.escondidaefebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.eefebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.iefebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.eefebrero;
		}else{
				this.estadisticas.eefebrero = 0;
		}
	}
	this.escondidaemarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.eemarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.iemarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.eemarzo;
		}else{
				this.estadisticas.eemarzo = 0;
		}
	}
	this.escondidaeabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.eeabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.ieabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.eeabril;
		}else{
				this.estadisticas.eeabril = 0;
		}
	}
	this.escondidaemayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.eemayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.iemayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.eemayo;
		}else{
				this.estadisticas.eemayo = 0;
		}
	}
	this.escondidaejunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.eejunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.iejunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
				return this.estadisticas.eejunio;
		}else{
				this.estadisticas.eejunio = 0;
		}
	}
	this.escondidaejulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.eejulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.iejulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.eejulio;
		}else{
				this.estadisticas.eejulio = 0;
		}
	}
	this.escondidaeagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.eeagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.ieagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.eeagosto;
		}else{
				this.estadisticas.eeagosto = 0;
		}
	}
	this.escondidaeseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.eeseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.ieseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.eeseptiembre;
		}else{
				this.estadisticas.eeseptiembre = 0;
		}
	}
	this.escondidaeoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.eeoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.ieoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.eeoctubre;
		}else{
				this.estadisticas.eeoctubre = 0;
		}
	}
	this.escondidaenoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.eenoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.ienoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.eenoviembre;
		}else{
				this.estadisticas.eenoviembre = 0;
		}
	}
	this.escondidaediciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.eediciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.iediciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.eediciembre;
		}else{
				this.estadisticas.eediciembre = 0;
		}
	}
	this.escondidaetotal=function(){
	  this.estadisticas.eetotal = 
	  parseFloat(this.estadisticas.eeenero) +
	  parseFloat(this.estadisticas.eefebrero) +
	  parseFloat(this.estadisticas.eemarzo) +
	  parseFloat(this.estadisticas.eeabril) +
	  parseFloat(this.estadisticas.eemayo) +
	  parseFloat(this.estadisticas.eejunio) +
		parseFloat(this.estadisticas.eejulio) +
	  parseFloat(this.estadisticas.eeagosto) +
	  parseFloat(this.estadisticas.eeseptiembre) +
	  parseFloat(this.estadisticas.eeoctubre) +
	  parseFloat(this.estadisticas.eenoviembre) +
	  parseFloat(this.estadisticas.eediciembre) ;
	  return this.estadisticas.eetotal;
	}
//   Tabla Escondida Obra f

	this.escondidafenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.efenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.ifenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.efenero;
		}else{
				this.estadisticas.efenero = 0;
		}
	}
	this.escondidaffebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.effebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.iffebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.effebrero;
		}else{
				this.estadisticas.effebrero = 0;
		}
	}
	this.escondidafmarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.efmarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.ifmarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.efmarzo;
		}else{
				this.estadisticas.efmarzo = 0;
		}
	}
	this.escondidafabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.efabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.ifabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.efabril;
		}else{
				this.estadisticas.efabril = 0;
		}
	}
	this.escondidafmayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.efmayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.ifmayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.efmayo;
		}else{
				this.estadisticas.efmayo = 0;
		}
	}
	this.escondidafjunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.efjunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.ifjunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.efjunio;
		}else{
				this.estadisticas.efjunio = 0;
		}
	}
	this.escondidafjulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.efjulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.ifjulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.efjulio;
		}else{
				this.estadisticas.efjulio = 0;
		}
	}
	this.escondidafagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.efagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.ifagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.efagosto;
		}else{
				this.estadisticas.efagosto = 0;
		}
	}
	this.escondidafseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.efseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.ifseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.efseptiembre;
		}else{
				this.estadisticas.efseptiembre = 0;
		}
	}
	this.escondidafoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.efoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.ifoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.efoctubre;
		}else{
				this.estadisticas.efoctubre = 0;
		}
	}
	this.escondidafnoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.efnoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.ifnoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.efnoviembre;
		}else{
				this.estadisticas.efnoviembre = 0;
		}
	}
	this.escondidafdiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.efdiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.ifdiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.efdiciembre;
		}else{
				this.estadisticas.efdiciembre = 0;
		}
	}
	this.escondidaftotal=function(){
	  this.estadisticas.eftotal = 
	  parseFloat(this.estadisticas.efenero) +
	  parseFloat(this.estadisticas.effebrero) +
	  parseFloat(this.estadisticas.efmarzo) +
	  parseFloat(this.estadisticas.efabril) +
	  parseFloat(this.estadisticas.efmayo) +
	  parseFloat(this.estadisticas.efjunio) +
		parseFloat(this.estadisticas.efjulio) +
	  parseFloat(this.estadisticas.efagosto) +
	  parseFloat(this.estadisticas.efseptiembre) +
	  parseFloat(this.estadisticas.efoctubre) +
	  parseFloat(this.estadisticas.efnoviembre) +
	  parseFloat(this.estadisticas.efdiciembre) ;
	  return this.estadisticas.eftotal;
	}
//   Tabla Escondida Obra g

	this.escondidagenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.egenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.igenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.egenero;
		}else{
				this.estadisticas.egenero = 0;
		}
	}
	this.escondidagfebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.egfebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.igfebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.egfebrero;
		}else{
				this.estadisticas.egfebrero = 0;
		}
	}
	this.escondidagmarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.egmarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.igmarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.egmarzo;
		}else{
				this.estadisticas.egmarzo = 0;
		}
	}
	this.escondidagabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.egabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.igabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.egabril;
		}else{
				this.estadisticas.egabril = 0;
		}
	}
	this.escondidagmayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.egmayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.igmayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.egmayo;
		}else{
				this.estadisticas.egmayo = 0;
		}
	}
	this.escondidagjunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.egjunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.igjunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.egjunio;
		}else{
				this.estadisticas.egjunio = 0;
		}
	}
	this.escondidagjulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.egjulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.igjulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.egjulio;
		}else{
				this.estadisticas.egjulio = 0;
		}
	}
	this.escondidagagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.egagosto = 
			  (parseFloat(this.estadisticas.tagosto)) *
			  (parseFloat(this.estadisticas.igagosto) /
			  parseFloat(this.estadisticas.itagosto)) ;
			  return this.estadisticas.egagosto;
		}else{
				this.estadisticas.egagosto = 0;
		}
	}
	this.escondidagseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.egseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.igseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.egseptiembre;
		}else{
				this.estadisticas.egseptiembre = 0;
		}
	}
	this.escondidagoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.egoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.igoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.egoctubre;
		}else{
				this.estadisticas.egoctubre = 0;
		}
	}
	this.escondidagnoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.egnoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.ignoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.egnoviembre;
		}else{
				this.estadisticas.egnoviembre = 0;
		}
	}
	this.escondidagdiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.egdiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.igdiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.egdiciembre;
		}else{
				this.estadisticas.egdiciembre = 0;
		}
	}
	this.escondidagtotal=function(){
	  this.estadisticas.egtotal = 
	  parseFloat(this.estadisticas.egenero) +
	  parseFloat(this.estadisticas.egfebrero) +
	  parseFloat(this.estadisticas.egmarzo) +
	  parseFloat(this.estadisticas.egabril) +
	  parseFloat(this.estadisticas.egmayo) +
	  parseFloat(this.estadisticas.egjunio) +
		parseFloat(this.estadisticas.egjulio) +
	  parseFloat(this.estadisticas.egagosto) +
	  parseFloat(this.estadisticas.egseptiembre) +
	  parseFloat(this.estadisticas.egoctubre) +
	  parseFloat(this.estadisticas.egnoviembre) +
	  parseFloat(this.estadisticas.egdiciembre) ;
	  return this.estadisticas.egtotal;
	}
//   Tabla Escondida Obra h

	this.escondidahenero=function(){
		if(parseFloat(this.estadisticas.itenero) > 0){
				this.estadisticas.ehenero = 
			  (parseFloat(this.estadisticas.tenero)) *
			  (parseFloat(this.estadisticas.ihenero) /
			  parseFloat(this.estadisticas.itenero)) ;
			  return this.estadisticas.ehenero;
		}else{
				this.estadisticas.ehenero = 0;
		}
	}
	this.escondidahfebrero=function(){
		if(parseFloat(this.estadisticas.itfebrero) > 0){
				this.estadisticas.ehfebrero = 
			  (parseFloat(this.estadisticas.tfebrero)) *
			  (parseFloat(this.estadisticas.ihfebrero) /
			  parseFloat(this.estadisticas.itfebrero)) ;
			  return this.estadisticas.ehfebrero;
		}else{
				this.estadisticas.ehfebrero = 0;
		}
	}
	this.escondidahmarzo=function(){
		if(parseFloat(this.estadisticas.itmarzo) > 0){
				this.estadisticas.ehmarzo = 
			  (parseFloat(this.estadisticas.tmarzo)) *
			  (parseFloat(this.estadisticas.ihmarzo) /
			  parseFloat(this.estadisticas.itmarzo)) ;
			  return this.estadisticas.ehmarzo;
		}else{
				this.estadisticas.ehmarzo = 0;
		}
	}
	this.escondidahabril=function(){
		if(parseFloat(this.estadisticas.itabril) > 0){
				this.estadisticas.ehabril = 
			  (parseFloat(this.estadisticas.tabril)) *
			  (parseFloat(this.estadisticas.ihabril) /
			  parseFloat(this.estadisticas.itabril)) ;
			  return this.estadisticas.ehabril;
		}else{
				this.estadisticas.ehabril = 0;
		}
	}
	this.escondidahmayo=function(){
		if(parseFloat(this.estadisticas.itmayo) > 0){
				this.estadisticas.ehmayo = 
			  (parseFloat(this.estadisticas.tmayo)) *
			  (parseFloat(this.estadisticas.ihmayo) /
			  parseFloat(this.estadisticas.itmayo)) ;
			  return this.estadisticas.ehmayo;
		}else{
				this.estadisticas.ehmayo = 0;
		}
	}
	this.escondidahjunio=function(){
		if(parseFloat(this.estadisticas.itjunio) > 0){
				this.estadisticas.ehjunio = 
			  (parseFloat(this.estadisticas.tjunio)) *
			  (parseFloat(this.estadisticas.ihjunio) /
			  parseFloat(this.estadisticas.itjunio)) ;
			  return this.estadisticas.ehjunio;
		}else{
				this.estadisticas.ehjunio = 0;
		}
	}
	this.escondidahjulio=function(){
		if(parseFloat(this.estadisticas.itjulio) > 0){
				this.estadisticas.ehjulio = 
			  (parseFloat(this.estadisticas.tjulio)) *
			  (parseFloat(this.estadisticas.ihjulio) /
			  parseFloat(this.estadisticas.itjulio)) ;
			  return this.estadisticas.ehjulio;
		}else{
				this.estadisticas.ehjulio = 0;
		}
	}
	this.escondidahagosto=function(){
		if(parseFloat(this.estadisticas.itagosto) > 0){
				this.estadisticas.ehagosto = 
				(parseFloat(this.estadisticas.tagosto)) *
				(parseFloat(this.estadisticas.ihagosto) /
				parseFloat(this.estadisticas.itagosto)) ;
				return this.estadisticas.ehagosto;
		}else{
				this.estadisticas.ehagosto = 0;
		}
	}
	this.escondidahseptiembre=function(){
		if(parseFloat(this.estadisticas.itseptiembre) > 0){
				this.estadisticas.ehseptiembre = 
			  (parseFloat(this.estadisticas.tseptiembre)) *
			  (parseFloat(this.estadisticas.ihseptiembre) /
			  parseFloat(this.estadisticas.itseptiembre)) ;
			  return this.estadisticas.ehseptiembre;
		}else{
				this.estadisticas.ehseptiembre = 0;
		}
	}
	this.escondidahoctubre=function(){
		if(parseFloat(this.estadisticas.itoctubre) > 0){
				this.estadisticas.ehoctubre = 
			  (parseFloat(this.estadisticas.toctubre)) *
			  (parseFloat(this.estadisticas.ihoctubre) /
			  parseFloat(this.estadisticas.itoctubre)) ;
			  return this.estadisticas.ehoctubre;
		}else{
				this.estadisticas.ehoctubre = 0;
		}
	}
	this.escondidahnoviembre=function(){
		if(parseFloat(this.estadisticas.itnoviembre) > 0){
				this.estadisticas.ehnoviembre = 
			  (parseFloat(this.estadisticas.tnoviembre)) *
			  (parseFloat(this.estadisticas.ihnoviembre) /
			  parseFloat(this.estadisticas.itnoviembre)) ;
			  return this.estadisticas.ehnoviembre;
		}else{
				this.estadisticas.ehnoviembre = 0;
		}
	}
	this.escondidahdiciembre=function(){
		if(parseFloat(this.estadisticas.itdiciembre) > 0){
				this.estadisticas.ehdiciembre = 
			  (parseFloat(this.estadisticas.tdiciembre)) *
			  (parseFloat(this.estadisticas.ihdiciembre) /
			  parseFloat(this.estadisticas.itdiciembre)) ;
			  return this.estadisticas.ehdiciembre;
		}else{
				this.estadisticas.ehdiciembre = 0;
		}
	}
	this.escondidahtotal=function(){
	  this.estadisticas.ehtotal = 
	  parseFloat(this.estadisticas.ehenero) +
	  parseFloat(this.estadisticas.ehfebrero) +
	  parseFloat(this.estadisticas.ehmarzo) +
	  parseFloat(this.estadisticas.ehabril) +
	  parseFloat(this.estadisticas.ehmayo) +
	  parseFloat(this.estadisticas.ehjunio) +
		parseFloat(this.estadisticas.ehjulio) +
	  parseFloat(this.estadisticas.ehagosto) +
	  parseFloat(this.estadisticas.ehseptiembre) +
	  parseFloat(this.estadisticas.ehoctubre) +
	  parseFloat(this.estadisticas.ehnoviembre) +
	  parseFloat(this.estadisticas.ehdiciembre) ;
	  return this.estadisticas.ehtotal;
	}

};