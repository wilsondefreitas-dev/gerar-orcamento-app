/**

classe para criar Section. Estende Div.

[arg] Array _structureContainer - Label da opção onde o textArea é inserido.
			sendo [0] - atributos da seção / [1] - opções da seção

**/

function Section(_structureContainer)
{	Div.call(this, "section", "Section", "section"); //Extends DIV

	this.attributesData = _structureContainer[0];
	this.optionsData 	= _structureContainer[1];

	var _that = this;
	this.navigationButtons  = new Object();
	this.optionsContainer 	= new Array();
	this.optionSelected 	= new Array();
	this.typeInput			= new String();
	this.container 			= new Div("container", "Container");
	this.opennedAlert		= null;

	// this.sbPrePronto		= false;

	/**

	- create (construtor)

	Insiro o topo na seção;
	Insiro as opções na seção;
	Insiro os botões de navegação na seção;
	Insiro o objeto Div container na seção;

	**/

	this.create = function()
	{	

		this.typeInput = this.attributesData.typeInput;
		
		this.appendQuestion();
		this.appendOptions();
		this.appendButtons();
		this.appendOnInnerContent( this.container );

	} 

	/**

	- appendQuestion 

	Insere um novo objeto Question dentro da seção;

	**/

	this.appendQuestion = function()
	{

		this.container.appendOnInnerContent( new Question( this.attributesData ) );

	}

	/**

	- appendOptions 

	Insere as opções dentro do container da seção.

	Faço um laço for até o número total de opções;
		Agrego um novo objeto Option na Array optionsContainer;
		Insiro essa nova opção no container dessa seção;

	**/

	this.appendOptions = function()
	{

		for(var w in this.optionsData) {

			this.optionsContainer.push( new Option( this.optionsData[w], this.typeInput /*this.attributesData.typeInput*/ ) );
			this.container.appendOnInnerContent( this.optionsContainer[w] );

		}

	}

	/**

	- appendButtons 

	Insere os botões de navegação na seção.

	Seto o objeto goBack como um novo objeto Button com a label voltar e para executar o método goBackSection;
	Seto o objeto goOn como um  novo objeto Button;

	Insiro o botão goBak no container da seção;
	Insiro o botão goOn no container da seção;

	**/

	this.appendButtons = function()
	{

		this.navigationButtons.goBack = new Button("Etapa anterior", "goBackSection");
		this.navigationButtons.goOn = new Button(this.attributesData.button.name, this.attributesData.button.action)

		this.container.appendOnInnerContent( this.navigationButtons.goBack );
		this.container.appendOnInnerContent( this.navigationButtons.goOn );

	}

	/**
	
	- getNavigationButtons

	Retorna o objeto navigationButtons;

	**/

	this.getNavigationButtons = function()
	{

		return this.navigationButtons;

	}

	/**
	
	- setOptionSelected

	Seto a opção selecionada pelo usuário conforme o tipo da lista.

	[arg] Object _selected - objeto Array com os dados da opção selecionada.

	De acordo com o tipo do objeto da opção, seto a Array optionSelected;

	**/

	this.setOptionSelected = function(_selected)
	{
		
		if(_selected) {
			
			var newArray = [_selected.data.value, _selected.subOptionSelected, _selected.getEffort(), _selected.data.label];

			// this.sbPrePronto = (_selected.data.label == "SB Pré Pronto") ? true : false;
			// if(_selected.data.label == "SB Pré Pronto") this.sbPrePronto = true;
			//console.log(_selected);

			if(_selected.effortPrice) main.calculate.setEffortPriceObject(_selected.effortPrice);

		}

		switch(this.attributesData.typeInput){

			case "TextArea": this.getTextAreaValues(); 				break;
			case "Radio": 	 this.optionSelected = newArray;        break;
			case "Checkbox": this.setMultiOptionSelected(newArray, _selected); break;

		}

		if(main.curDataFile != "data/hub.xml") main.navigator.sendUserChoices();

	}

	/**
	
	- setMultiOptionSelected

	Seta optionSelected com a seleção de multi opções.

	[arg] Array _selected - objeto Array com os dados da opção selecionada.

	Faço um loop for dentro da optionsSelected;
		Se a nova opção selecionada já estiver na array, a removo e finalizo o método;

	Caso passe pelo loop, insiro a nova opção selecionada na optionSelected;

	**/

	this.setMultiOptionSelected = function(_selected, _optionSelectedObj)
	{
		var optIsChecked = _optionSelectedObj.input.getjQueryObject().is(':checked');

		for(var w = 0; w < this.optionSelected.length; w++){

			if(this.optionSelected[w][0] == _selected[0]){

				this.optionSelected.splice(w, 1);

			}

		}

		if(optIsChecked) this.optionSelected.push(_selected);

	}

	/**
	
	- getTextAreaValues

	Seta optionSelected com o valor de todos os textAreas da seção.
	
	Reseto optionSelected;
	Faço um loop for dentro da optionsContainer;
		Insiro todos os valores em optionSelected;

	**/

	this.getTextAreaValues = function()
	{

		this.optionSelected = new Array();

		for(var w = 0; w < this.optionsContainer.length; w++){

			if( this.optionsContainer[w].input.value.length > 0 && this.optionsContainer[w].input.value[1] != "" ) this.optionSelected.push( this.optionsContainer[w].input.value );

		}

	}

	/**
	
	- changeTop

	**/

	this.changeTop = function()
	{

		//this.getjQueryObject().css("top", ( main.isMobile ) ? "16px" : "60px");

		if(main.isMobile){

			this.getjQueryObject().css("top", "145px");
			if( $(".BottomBar .ShowDocButton")[0] ) this.getjQueryObject().css("top", "102px");

		}else{

			this.getjQueryObject().css("top", "60px");

		}

	}


	//
	//
	//

	this.create();

}