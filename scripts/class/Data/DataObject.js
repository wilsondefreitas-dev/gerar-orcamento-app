/**

classe para criar um objeto com os dados do XML.

[arg1] String   _fileURL  - Label do botão.
[arg2] Function _callBack - Tipo da função a ser executada no evento clique.

**/

function DataObject(_fileURL, _callBack){

	this.fileURL  = _fileURL;
	this.callBack = _callBack || function(){};

	var _that = this;
	this.content 		= new Array();
	this.modelEffortObj = new Object();

	/**

	- create (construtor)

	Pega o xml indicado.
	Se sucesso:
		Executa a função de conversão para objeto com ele.
		Executa a função _callBack;

	**/

	this.create = function()
	{

		$.ajax({
			type: "GET",
			url: _that.fileURL,
			dataType: "xml",

			success: function(_xml){

				_that.convertXML2Obj(_xml);
				_that.callBack();

			}

		});

	} 

	/**

	- convertXML2Obj 

	Transforma o objeto recebido do XML em objeto JS;

	[arg] Objeto _xml - Conteúdo do XML.
	
	//
	
	**/

	this.convertXML2Obj = function(_xml)
	{

		// Sesssão

		$(_xml).find('section').each(function( index ) {

			var nodeSection 		= $(_xml).find('section')[index];
			var nodeQuestion 		= $(nodeSection).find('question')[0];
			var nodeButton 			= $(nodeSection).find('button')[0];
			var nodeOptions 		= $(nodeSection).find('options')[0];

			var curSection = _that.getNewSection();
			var cs = curSection[0];

			cs.name		 		= $(nodeSection).attr('id'); 
			cs.question 		= $(nodeQuestion).attr('question');
			cs.description 		= $(nodeQuestion).attr('description');
			cs.typeInput		= $(nodeQuestion).attr('typeInput');

			cs.button 		  = new Object();
			cs.button.name 	  = $(nodeButton).attr('name');
			cs.button.action  = $(nodeButton).attr('action');
			cs.button.enable  = $(nodeButton).attr('enable');

			// Options

			$(nodeOptions).find('option').each(function( optionIndex ) {

				var	nodeOption 				= $(nodeOptions).find('option')[optionIndex];
				var nodeSubOptions			= $(nodeOption).find('suboptions')[0];

				curSection[1].push(new Object());
				var op = curSection[1][optionIndex];

				//op.value 		= $(nodeOption).attr("value");
				op.value 		= $(nodeOption).find("value").text();
				op.label 		= $(nodeOption).attr("label");
				op.description 	= $(nodeOption).attr("description");

				if( $(nodeOption).find("price")[0] ){

					var priceNode = $(nodeOption).find("price")[0];
					op.price      = parseInt( $(priceNode).attr("price") );

				}

				if( $(nodeOption).find("effortPrice")[0] ){

					op.effortPrice  = _that.getEffortObject($(nodeOption).find("effortPrice")[0].attributes);

				}

				if( $(nodeOption).find("effort")[0] ) {

					op.effort = _that.getEffortObject($(nodeOption).find("effort")[0].attributes);

				}

				if( $(nodeOption).find("days")[0] ){

					var daysNode = $(nodeOption).find("days")[0];
					op.days = parseInt( $(daysNode).attr("days") );

				}

				op.subOptions 	= new Array();

				// Suboptions

				$(nodeSubOptions).find('suboption').each(function( subIndex ) {

					var	nodeSubOption = $(nodeSubOptions).find('suboption')[subIndex];

					op.subOptions.push(new Object());
					var so = op.subOptions[subIndex];

					so.type 	= $(nodeSubOption).attr('type');
					so.label 	= $(nodeSubOption).attr('label');
					so.choices  = new Array();

					$(nodeSubOption).find('choice').each(function( subChoicesIndex ) {

						var	nodeSubOptionChoice = $(nodeSubOption).find('choice')[subChoicesIndex];
						var soc = so;

						soc.choices.push(new Object());
						soc.choices[subChoicesIndex].label = $(nodeSubOptionChoice).attr('label');
						if($(nodeSubOptionChoice).attr('value') != undefined) soc.choices[subChoicesIndex].value = $(nodeSubOptionChoice).attr('value');

						// console.log(soc.choices[subChoicesIndex].value);

						if( $(nodeSubOptionChoice).find("subprice")[0] ){

							var priceNode 						= $(nodeSubOptionChoice).find("subprice")[0];
							soc.choices[subChoicesIndex].price  = parseInt( $(priceNode).attr("price") );

						}

						if( $(nodeSubOptionChoice).find("subeffort")[0] ) {

							soc.choices[subChoicesIndex].effort = _that.getEffortObject( $(nodeSubOptionChoice).find("subeffort")[0].attributes );

						}
						
						if( $(nodeSubOptionChoice).find("subdays")[0] ){

							var daysNode                      = $(nodeSubOptionChoice).find("subdays")[0];
							soc.choices[subChoicesIndex].days = parseInt( $(daysNode).attr("days") );

						}

					});

				});

			})

		});

	}

	/**
	
	- getContent

	Retorna content;
	
	**/

	this.getContent = function(){

		return this.content;

	}

	/**
	
	- getNewSection

	Retorna umma array com 2 indíces.
	[0] com os atributos / [1] com as opções;
	
	**/


	this.getNewSection = function()
	{

		var dc = _that.content;

		dc.push(new Array());
		dc[dc.length-1].push(new Object());
		dc[dc.length-1].push(new Array());

		return dc[dc.length-1];

	}

	/**
	
	- getEffortObject

	Retorna um objeto com os atributos do effort.
	
	**/

	this.getEffortObject = function(_nodeOptionAttributes)
	{

		var _newObject = new Object();

		_obj = _nodeOptionAttributes;

		for(var w = 0; w < _obj.length; w++){

			_newObject[_obj[w].name] = parseInt( _obj[w].value );

			this.modelEffortObj.price = 0;

			if(this.modelEffortObj[_obj[w].name] == null) this.modelEffortObj[_obj[w].name] = 0;

		} 

		return _newObject;

	}


	//
	//
	//

	this.create();
	
};