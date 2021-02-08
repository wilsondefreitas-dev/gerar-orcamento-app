/**

classe para criar uma Opção

[arg1] Objeto _data - Dados da opção.

**/

function Option(_data, _inputType)
{	Div.call(this, "option", "Option LightColor LightColorHover"); //Extends DIV

	this.data 		= _data;
	this.inputType  = _inputType;

	var _that 				= this;
	this.alert 				= null;
	this.effortPrice		= null;
	this.input 				= new Object();
	this.value 				= new Array();
	this.subOptionSelected  = new Array();

	/**

	- create (construtor)

	De acordo com o tipo do input da opção, insiro conteúdo no Option;
	Se tiver subOptions, as adiciono;
	Seto value como value da opção;

	**/

	this.create = function()
	{	

		switch(this.inputType){

			case "TextArea":

				this.appendDescription();
				this.appendInput(); 

			break;

			default:

				this.appendInput(); 
				this.appendDescription();

			break;

		}
		
		if(this.data.subOptions.length > 0) this.appendSubOptions();

		if(_data.effortPrice) this.effortPrice = _data.effortPrice;
		
		this.setValue(_data.value);	
	} 

	/**

	- appendInput 

	Seta e insere o Input dentro da opção de acordo com o tipo.

	**/

	this.appendInput = function()
	{

		switch(this.inputType){

			case "TextArea":

				this.input = new TextArea(this.data.label);
				new Div("textContainer", "TextContainer").writeInnerAndAppendOnDiv(this.input, this);

			break;

			default:

				this.input = new Input( this.inputType, _that.selectIt );
				new Div("inputContainer", "InputContainer").writeInnerAndAppendOnDiv(this.input, this);

			break;

		}

	}

	/**

	- appendDescription 

	Crio as div com o titulo e descrição da opção e as insiro nela.

	Se não for textArea, adiciono o atributo for ao input;

	**/

	this.appendDescription = function()
	{
		
		var newLabel 		= new Div("label", "Label MediumFont", "p").appendOnInnerContent(this.data.label);
		var newDescription  = new Div("description", "Description SmallFont").appendOnInnerContent(this.data.description);
		var newOptionLabel  = new Div("optionLabel", "OptionLabel", "label");
		
		if(this.inputType != "TextArea") newOptionLabel.setAttribute("for", this.input.id);

		newOptionLabel.writeInnerAndAppendOnDiv( newLabel.getScript() + newDescription.getScript(), this);

	}

	/**

	- appendSubOptions 

	Insiro a subOption na opção.

	Cria uma array e insere todas as subOpções nela;
	Seta o alert como um novo objeto Alert passando a nova array como parametro;
	Insiro o alert dentro dessa Opção;

	**/

	this.appendSubOptions = function()
	{

		var newSubOptions = new Array();
		for(w in this.data.subOptions)	newSubOptions.push(new SubOption(this.data.subOptions[w], newSubOptions.length));

		this.alert = new Alert(newSubOptions);
		this.appendOnInnerContent(this.alert);

		this.subOptionSelected  = new Array(newSubOptions.length);

	}

	/**

	- selectIt 

	Método executado quando o usuário seleciona a opção.

	Altero a visibilidade dos Alerts;
	Salvo a opção selecionada;
	Libero o botão avançar da sessão;

	**/

	this.selectIt = function()
	{

		_that.toggleAlertVisibility();
		_that.saveOptionSelected();

		var parentSection = _that.getParentDiv().getParentDiv();
		parentSection.getNavigationButtons().goOn.enable(true);

	}

	/**

	- toggleAlertVisibility 

	Mostro o alert da opção e escondo outros se necessário.

	Se tiver algum alert visivel e o tipo da seção for radio, escondo o alert aberto;
	Se existir um alert;
		Se o input estiver selecionado;
			Mostro o alert;
			Seto opennedAlert como esse alert;
		Caso contrário;
			Escondo o Alert;

	**/

	this.toggleAlertVisibility = function()
	{	

		var thisSection = _that.getParentDiv().getParentDiv();

		if(thisSection.opennedAlert != null && _that.getInputType() == "Radio" && thisSection.opennedAlert != _that.alert ) thisSection.opennedAlert.close();

		if(_that.alert){

			if(_that.input.getjQueryObject().is(':checked')){

				_that.alert.open();
				thisSection.opennedAlert = _that.alert;

			}else{

				_that.alert.close();

			}

		}

	}

	/**

	- setSubOptionValue 

	Seto um index especifico da Array subOptionValue

	[arg1] String _subOptionValue - valor da opção selecionada
	[arg2] Number _index - index no subOptionValue da opção selecionada

	**/

	this.setSubOptionSelected = function(_subOptionValue, _index)
	{
		
		this.subOptionSelected[_index] = _subOptionValue;
		

	}

	/**

	- saveOptionSelected 

	Salvo a opção selecionada e o valor das subopções na seção.

	**/

	this.saveOptionSelected = function()
	{	

		var parentSection = _that.getParentDiv().getParentDiv();
		parentSection.setOptionSelected( this );

	}

	/**

	- setValue 

	Seto value.

	[arg] String _value - valor da opção selecionada

	**/

	this.setValue = function(_value)
	{

		this.value = _value;

	}

	/**
	
	- getInputType

	Retorna o tipo dos inputs;

	**/

	this.getInputType = function()
	{

		return this.input.type;

	}

	/**
	
	
	- getEffort
	

	**/

	this.getEffort = function()
	{
		
		if(this.data.effort) {
			
			if(this.data.price) this.data.effort.price = this.data.price;
			if(this.data.days) this.data.effort.days = this.data.days;

			return this.data.effort;
		
		}else if(this.subOptionSelected.length > 0){

			return this.getSubOptionsEfforts(this.subOptionSelected);

		}

		if(this.data.price){
			
			return {price: this.data.price};

		}

		if(this.data.days){
			
			return {days: this.data.days};

		}

	}

	/**
	
	
	- getEffort
	

	**/

	this.getSubOptionsEfforts = function(_subOptionsArray)
	{

		var subOptionsEfforts = new Object();

		for(var w = 0; w < _subOptionsArray.length; w++) {

			if(_subOptionsArray[w].price){

				if(!subOptionsEfforts.price) subOptionsEfforts.price = new Number();

				subOptionsEfforts.price += _subOptionsArray[w].price;

			}

			for(var z in _subOptionsArray[w].effort ) {

				if(!subOptionsEfforts[z]) subOptionsEfforts[z] = new Number();

				subOptionsEfforts[z] += _subOptionsArray[w].effort[z];

			}

			// console.log(_subOptionsArray[w].days);
			if(_subOptionsArray[w].days){

				if(!subOptionsEfforts.days) subOptionsEfforts.days = new Number();

				subOptionsEfforts.days += _subOptionsArray[w].days;

			}
			

		};

		return subOptionsEfforts;

	} 


	//
	//
	//

	this.create();

}