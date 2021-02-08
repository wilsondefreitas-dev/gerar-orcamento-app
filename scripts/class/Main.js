/**

classe de iniciação do aplicativo.

**/

function Main(){

	var _that 		 = this;
	this.partial  	 = null;
	this.dataObject  = new Object();
	this.preloader   = new Preloader();
	this.navigator 	 = new Navigator();
	this.calculate 	 = new Calculate();
	this.curDataFile = "data/hub.xml";

	this.isMobile 	 = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	/**
	 * imposto
	 */
	
	this.tax = 0.875;
	
	/**

	- create (construtor)

	Executa o método que seta o objeto DataObject;

	**/

	this.create = function()
	{

		this.askPassword();		

	}

	/**

	- askPassword 

	**/

	this.askPassword = function()
	{

		/*if( prompt('Senha:') == atob('U291MTIzNDU=') ){
			_that.setDataObject( _that.curDataFile );
		}else{
			this.askPassword();
		}*/

		_that.setDataObject( _that.curDataFile );

		// var request = new XMLHttpRequest();

		// request.onload = function(){ 
			
		// 	// console.log( JSON.parse("[" + this.responseText + "]") );
		// 	console.log( this.responseText );

		// };

		// request.open("get", "scripts/php/get-data.php", true);
		// request.send();

	}


	/**
	
	- setDataObject

	[arg] String _dataFile - url do XML com os dados.
	
	Mostra o preloader;
	Seta e inicia o objeto DataObject passando como callBack o método Init;
		
	**/

	this.setDataObject = function(_dataFile)
	{

		this.preloader.show();
		this.curDataFile = _dataFile;
		this.dataObject = new DataObject(_dataFile, function() { _that.init() } );

	}

	/**

	- init
	Método que inicia a UX do aplicativo.

	Responsavel por setar a primeira estrutura do objeto Navigator;
	e apresentar a primeira lista de seleção;
	Quando executado, esconde o preloader;

	**/

	this.init = function()
	{
		if(this.partial == null && this.curDataFile != "data/hub.xml") this.partial = new Partial();

		this.navigator.setStructureContainer( _that.dataObject.getContent() );
		this.navigator.updateSection();
		this.preloader.hide();

	}

	/**
	
	- getNavigator

	Retorna o objeto Navigator;

	**/

	this.getNavigator = function()
	{

		return this.navigator;

	}

	/**
	
	- getPartial

	Retorna o objeto Partial;

	**/

	this.getPartial = function()
	{

		return this.partial;

	}

	/**
	
	- restart

	Da um refresh no sistema;

	**/

	this.restart = function()
	{

	   if( confirm( "Tem certeza que deseja apagar esse orçamento?" ) ) {

	   		window.location.reload(false);

	   	}

	}

	/*

	- callContentFile

	*/

	this.callContentFile = function()
	{

		var optionSelected = this.getNavigator().getCurrentSection().optionSelected;

		if(optionSelected.length > 0){

			// if( optionSelected[1][1] ) this.calculate.setProductSize( optionSelected[1][1].label );

			if( optionSelected[1][1] ) this.calculate.setProductSize( optionSelected );
			
			this.setDataObject("data/" + optionSelected[0] + "/" + (optionSelected[1][0].label.toLowerCase()) + ".xml");
		
		}else{

			alert("Selecione uma opção para continuar.");

		}

	}

	//
	//
	//

	this.create();

}