/**

classe para criar os botões de navegação 

[arg1] String _label 	  - Label do botão.
[arg2] String _actionType - Tipo da função a ser executada no evento clique.

**/

function Button(_label, _actionType, _class)
{	Div.call(this, "button", _class ? _class : "Button DarkColor DarkColorHover"); //Extends DIV

	this.label 		= _label;
	this.actionType = _actionType;

	var _that = this;

	/**

	- create (construtor)

	Crio uma nova div, insiro o label dentro dessa nova div e a insiro dentro desse button;
	Executo um timer para executar a função addListener;

	**/

	this.create = function()
	{

		new Div("label", "Label BigFont").writeInnerAndAppendOnDiv(this.label, this);

		window.setTimeout(function(){ _that.addListener(); }, 1);
	} 

	/**

	- addListener 

	Adiciona o listener do evento especifico do objeto.

	Pega o objeto jQuery e adiciona o evento click de acordo com o tipo de método do botão;
	Tipos:
		goNextSection  - avança uma sessão
		goBackSection  - volta uma sessão
		goNextDataFile - chama outro objeto Data
		saveTextArea   - salva os textos das opções e avança uma sessão

	**/

	this.addListener = function()
	{	

		var _navigator = main.getNavigator();
		var _document = _navigator.document;
		var _partial = main.getPartial();

		switch(_that.actionType){

			case "reset":  			this.addClick( main.restart.bind(main) ); 					break;
			case "goNextDataFile":  this.addClick( main.callContentFile.bind(main) ); 			break;
			case "editResult":  	this.addClick( _document.editSection.bind(_document) );  	break;
			case "convertToPDF":  	this.addClick( _document.convertToPDF.bind(_document) );	break;
			case "convertToDOC":  	this.addClick( _document.convertToDOC.bind(_document) );	break;
			case "exportExcel":  	this.addClick( _partial.convertToExcel.bind(_partial) ); 	break;
			case "goNextSection":   this.addClick( _navigator.goNextSection.bind(_navigator) ); break;
			case "goBackSection":   this.addClick( _navigator.goPrevSection.bind(_navigator) ); break;
			case "saveTextArea":  

			this.addClick(function(){ 
					main.getNavigator().currentSection.setOptionSelected();
					main.getNavigator().goNextSection(); 
				}.bind(main));

			break;

		}

	}

	/*

	-

	*/

	this.addClick = function(_function)
	{

		this.getjQueryObject().click(_function);

	}

	//
	//
	//

	this.create();

}