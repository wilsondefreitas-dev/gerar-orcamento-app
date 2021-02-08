/**

classe para criar um navegador, responsável pela navegação no sistema.

**/

function Navigator(){

	var _that                 = this;
	this.navigationButtons    = new Object();
	this.currentSection       = new Object();
	this.currentSectionNumber = new Number();
	this.totalSections 		  = new Number();
	this.document 			  = new Object();

	/**

	- setCurrentSection 

	Seto a seção atual e os botões de navegação;

	[arg] Section _section - seção atual na tela

	**/

	this.setCurrentSection = function(_section)
	{

		this.currentSection = _section;
		this.navigationButtons = _section.getNavigationButtons();

	}

	/**

	- updateSection 

	Atualizo a seção que esta no dom

	Se tiver alguma criada;
		Removo a seção atual;
	Caso contrário;
		Adiciono uma nova seção;

	**/

	this.updateSection = function()
	{			

		if(this.currentSection.hide){

			this.removeCurrentSection();

		}else{

			this.appendNewSection();

		}
		
	}

	/**

	- appendNewSection 

	Adiciona uma nova seção no DOM.

	**/

	this.appendNewSection = function()
	{	

		if(main.partial) main.partial.showProgressBar();

		this.configureNewSection();
		this.currentSection.show(); 

	}

	/**

	- removeCurrentSection 

	Remove a seção do DOM;

	Esconde a seção e passa uma função como callback que,
		Remove o objeto da seção do DOM;
		Adiciona a nova seção;

	**/

	this.removeCurrentSection = function() 
	{

		this.currentSection.hide(function(){

			window.scrollTo(0, 0);
			_that.appendNewSection();
			//_that.sendUserChoices();

		});	

	}

	/**

	- configureNewSection 

	Configura a Section.

	Seta currentSection como a nova seção;
	Atualiza o enable dos botões de navegação;

	**/

	this.configureNewSection = function()
	{
		this.setCurrentSection( this.getCurrentSection() );
		this.updateNavigationButtonsEnable();

		if(main.partial) main.partial.updateProgressBar();

		if(main.curDataFile != "data/hub.xml") this.getCurrentSection().changeTop();

	}

	/**

	- getCurrentSection 

	Retorna a seção a ser inserida.

	Se já existir;
		Retorna a seção salva;
	Caso contrário;
		Cria uma nova seção e insere na tag body;

	retorna a seção;

	**/

	this.getCurrentSection = function()
	{

		var _sectionToSet;

		if(this.getCurrentSectionSaved()) {

			_sectionToSet = this.getCurrentSectionSaved();

		}else{

			var _currentSectionArray = this.structureContainer[ this.currentSectionNumber ];
			_sectionToSet = new Section( _currentSectionArray ).appendOnDiv( $("body") );
			this.registerSectionDiv( _sectionToSet );

		}
		
		return _sectionToSet;

	}

	/**

	- getCurrentSectionSaved 

	Verifica se a seção já esta salva.

	Se já existir;
		Retorna a seção salva;
	Caso contrário;
		retorna false;

	**/

	this.getCurrentSectionSaved = function()
	{

		var _currentSectionArray = this.structureContainer[ this.currentSectionNumber ];

		if(_currentSectionArray[2]){

			return _currentSectionArray[2];

		}else{

			return false;

		}

	}

	/**

	- registerSectionDiv 

	Insere a div na array da seção;

	**/

	this.registerSectionDiv = function(_sectionDiv)
	{

		this.structureContainer[ this.currentSectionNumber ].push(_sectionDiv);
		// console.log(this.structureContainer[3]);

	}

	/**

	- goNextSection 

	Avança para a próxima seção;

	Somo 1 na currentSectionNumber;
	Atualizo a seção;

	**/


	this.goNextSection = function()
	{

		if(this.currentSectionNumber >= this.totalSections - 1){

			if( !main.calculate.isOptionSelectedEmpty() ){
				
				// main.partial.allowDocButton();
				this.showDoc();

				this.currentSection.hide();

			}

		}else{

			this.goToSection(++this.currentSectionNumber);
			//this.sendUserChoices();

		}

	}

	/**

	- goPrevSection 

	Volto para a seção anterior.

	Subtraio 1 na currentSectionNumber;
	Atualizo a seção;

	**/

	this.goPrevSection = function()
	{

		this.goToSection(--this.currentSectionNumber);
		//this.sendUserChoices();

	}

	/**
	
	- goToSection 

	**/

	this.goToSection = function(_sectionNumber)
	{
		main.partial.appendShowDocButton();

		this.currentSectionNumber = _sectionNumber;
		this.updateSection();

	}

	/**

	- updateNavigationButtonsEnable 

	Atualizo os botões de navegação.

	**/

	this.updateNavigationButtonsEnable = function()
	{

		if(this.currentSectionNumber == 0) {
			this.navigationButtons.goBack.getjQueryObject().css("display", "none");
			this.navigationButtons.goOn.getjQueryObject().css("width", "100%");
		}
		
	}

	/**

	- setStructureContainer 

	[arg] Objeto _structureContainer - Objeto contendo a estrutura da seção

	Seto o structureContainer com o argumento recebido;
	Seto o totalSections como o total de index na structureContainer;

	**/

	this.setStructureContainer = function(_structureContainer)
	{

		this.structureContainer = _structureContainer;
		this.totalSections = this.structureContainer.length; 

	}

	/**

	- sendUserChoices

	**/

	this.sendUserChoices = function(){

		main.calculate.resetChoicesObject();

		for(var w = 0; w < this.structureContainer.length; w++){

			if(this.structureContainer[w][2]){

				var newObject 			 = new Object();
				newObject.name 			 = this.structureContainer[w][2].attributesData.name;
				newObject.type 			 = this.structureContainer[w][2].attributesData.typeInput;
				newObject.optionSelected = this.structureContainer[w][2].optionSelected;

				main.calculate.pushChoicesObject( newObject	); 

			}

		}

		if(this.currentSection.typeInput != "TextArea") main.calculate.refreshEffortObject();

	}

	/**

	- showDoc

	**/

	this.showDoc = function()
	{

		//this.currentSection.setOptionSelected();
		this.document = new Document( main.calculate.getChoicesObject() );
		this.currentSection.hide();

		window.scrollTo(0, 0);

	}

}