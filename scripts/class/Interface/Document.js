
/**

classe responsável pelo documento final.

[arg] Objeto _dataObject - Dados usados para criar o documento

**/


Document.animate = new Animate();

function Document(_dataObject)
{	Div.call(this, "Document", "Document"); //Extends DIV
		
	var _that = this;

	this.dataObject = _dataObject;

	this.choicesObject  = new Array();
	this.dataObjectdID = new Number();
	this.currentNewPage = new Object();
	this.currentNewPageContainer = new Object();

	this.pageIndex = new Number();

	this.docContent = new Div("DocContent", "DocContent");
	this.mobileDocContent = new Div("MobileDocContent", "MobileDocContent");

	this.mobileResult = null;

	/**

	- create (construtor)

	**/

	this.create = function()
	{	
		
		main.partial.removeShowDocButton();
		main.partial.hideProgressBar();

		this.appendOnDiv( $( "body" ) );
		this.writeContent();
		this.show();

		this.changeTop();

	}
	

	/**

	- writeContent

	**/

	this.writeContent = function()
	{

		var thisMenu = new Div("DocMenu", "DocMenu DarkColor");

		thisMenu.appendOnInnerContent( new Button( "Salvar em DOC", "convertToDOC", "Button DarkColor DarkColorHover DocMenuButton" ) );
		thisMenu.appendOnInnerContent( new Button( "Exportar Esforço", "exportExcel", "Button DarkColor DarkColorHover DocMenuButton" ) );
		if(!main.isMobile) thisMenu.appendOnInnerContent( new Button( "Editar", "editResult", "Button DarkColor DarkColorHover DocMenuButton" ) );
		thisMenu.appendOnInnerContent( new Button( "Novo Orçamento", "reset", "Button DarkColor DarkColorHover DocMenuButton" ) );

		this.appendOnInnerContent( thisMenu );
		this.appendOnInnerContent( this.docContent );

		if(main.isMobile) {
			
			this.appendOnInnerContent( this.mobileDocContent );
			this.docContent.getjQueryObject().css("display", "none");

		};
		
		this.setNewPage(); 

	}

	/**

	- setNewPage

	**/

	this.setNewPage = function()
	{	

		this.currentNewPage = new Div("Page", "Page");
		this.currentNewPageContainer = new Div("PageContainer", "PageContainer");

		if( this.dataObject[this.dataObjectdID].optionSelected.length > 0) {

			this.setContentOnPage();

		}else{

			this.dataObjectdID += 1;
			this.setContentOnPage();

		}

		this.currentNewPage.appendOnInnerContent(this.currentNewPageContainer);
		
		this.docContent.appendOnInnerContent(this.currentNewPage);
		
	}

	/**

	- setContentOnPage

	**/

	this.setContentOnPage = function()
	{

		var currentNewItemContainer = new Div("ItemContainer", "ItemContainer"); 
		currentNewItemContainer.appendOnInnerContent( "<h2>" + this.dataObject[this.dataObjectdID].name + "</h2>");
		
		switch( this.dataObject[this.dataObjectdID].type ) {

			case "TextArea": this.createTextAreaContent( currentNewItemContainer, this.dataObject[this.dataObjectdID] ); break;
			case "Checkbox": this.createCheckboxContent( currentNewItemContainer, this.dataObject[this.dataObjectdID] ); break;
			case "Radio": 	 this.createRadioContent( currentNewItemContainer, this.dataObject[this.dataObjectdID] ); 	 break;

		}

		new Div("EditAppend", "EditAppend").writeInnerAndAppendOnDiv("Editar", currentNewItemContainer);

		currentNewItemContainer.setAttribute("onclick", "main.navigator.document.editSection(" + this.dataObjectdID + ")");

		this.currentNewPageContainer.appendOnInnerContent( currentNewItemContainer );

		this.dataObjectdID += 1;

		window.setTimeout( function(){ _that.diagram() }, 0 );


	}

	/**


	**/

	this.editSection = function(_sectionID)
	{

		main.navigator.goToSection( (typeof _sectionID == "number") ? _sectionID : (main.navigator.totalSections-1) );

		window.setTimeout( function(){

			_that.getjQueryObject().fadeOut( function(){ 

				main.partial.allowDocButton();
				main.partial.appendShowDocButton();

				_that.remove(); 
				
			} );

		});

	}

	/**

	- createTextAreaContent

	**/

	this.createTextAreaContent = function(_newPage, _dataObject)
	{

		for( var z in  _dataObject.optionSelected ) {

			_newPage.appendOnInnerContent( "<h3>" + _dataObject.optionSelected[z][0] + "</h3>");
			_newPage.appendOnInnerContent( "<p>" + _dataObject.optionSelected[z][1] + "</p>");
		
		}

		var _optionSelected = main.getNavigator().getCurrentSection().optionSelected;
		// console.log(_optionSelected);

		// _newPage.appendOnInnerContent( "<h3>" + "Tempo Estimado" + "</h3>");
		// _newPage.appendOnInnerContent( "<p>" + _dataObject.optionSelected[z][1] + "</p>");		

	}

	/**

	- createRadioContent

	**/

	this.createRadioContent = function(_newPage, _dataObject)
	{

		_newPage.appendOnInnerContent( "<ul>");

		_newPage.appendOnInnerContent( "<li>" + _dataObject.optionSelected[0] + "</li>");

		_newPage.appendOnInnerContent( "<ul>");

		if(_dataObject.optionSelected[1]){

			for( var x = 0; x < _dataObject.optionSelected[1].length; x++ ) {

				_newPage.appendOnInnerContent( "<li>" + _dataObject.optionSelected[1][x].label + "</li>");
		
			}

		}

		_newPage.appendOnInnerContent( "</ul>");

		_newPage.appendOnInnerContent( "</ul>");

	}

	/**

	- createCheckboxContent

	**/

	this.createCheckboxContent = function(_newPage, _dataObject)
	{

		for( var z in  _dataObject.optionSelected ) {

			_newPage.appendOnInnerContent( "<ul>");

			_newPage.appendOnInnerContent( "<li>" + _dataObject.optionSelected[z][0] + "</li>");

			_newPage.appendOnInnerContent( "<ul>");

			for( var x = 0; x < _dataObject.optionSelected[z][1].length; x++ ) {

				if(_dataObject.optionSelected[z][1][x].label != "Selecionar") _newPage.appendOnInnerContent( "<li>" + _dataObject.optionSelected[z][1][x].label + "</li>");

				if(_dataObject.optionSelected[z][1][x].value != undefined ) _newPage.appendOnInnerContent( "<li>" + _dataObject.optionSelected[z][1][x].value + "</li>");
	
			}

			_newPage.appendOnInnerContent( "</ul>");

			_newPage.appendOnInnerContent( "</ul>");

		}

	}

	/**

	- diagram

	**/

	this.diagram = function()
	{

		if( this.currentNewPageContainer.getjQueryObject().height() > this.currentNewPage.getjQueryObject().height() ) {

			this.dataObjectdID -= 1;
			
			lastItemContainer = $( this.currentNewPageContainer.getjQueryObject().children()[ this.currentNewPageContainer.getjQueryObject().children().length - 1 ] );
			lastItemContainer.remove();

			this.setNewPage();

		} else {

			if(this.dataObjectdID < this.dataObject.length) {

				this.setContentOnPage();

			}else{

				//window.setTimeout ( function() { console.log( _that.docContent.getInnerContent() ); console.log(_that.docContent.getjQueryObject().html() ); }, 2000) ;

				if(main.isMobile) this.mobileDocContent.appendOnInnerContent( _that.docContent.getjQueryObject().html() );

			}

		}

	}

	/**

	- setDocContent

	**/	

	this.setDocContent = function()
	{

		html2canvas( $('.DocContent').children()[_that.pageIndex], {

			scale: 2,

			onrendered: function( canvas ) {

				var img = canvas.toDataURL( "image/png", 1.0 );  
				_that.pdf.addImage( img, 'JPEG', 0, 0 );	

				if( _that.pageIndex >= $('.DocContent').children().length - 1 ) {

					main.preloader.hide();
					_that.pdf.save();

				} else {

					_that.pageIndex += 1;	
					_that.pdf.addPage();
					_that.setDocContent( _that.pdf );

				}

			}

        });

	}

	/**

	- convertToPDF 

	**/	


	this.convertToPDF = function()
	{	
		
		main.preloader.show();

        this.pdf = new jsPDF( { unit:'px', format:'a4' } );
        this.setDocContent();

	}

	/**

	- convertToDOC

	**/	

	this.convertToDOC = function()
	{

		/*var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office'" +
							 "xmlns:w='urn:schemas-microsoft-com:office:word'" +
							 "xmlns='http://www.w3.org/TR/REC-html40'>" +
							 "<head><meta charset='utf-8'></head><body>";

		var content = ( $(".DocContent").html().replace(/Editar/g,'') );

		var html = preHtml + content + "</body></html>";
		var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
		var filename = 'orcamento.doc';

		var downloadLink = document.createElement("a");
		downloadLink.href = url;
		downloadLink.download = filename;

		downloadLink.click();

		document.body.appendChild(downloadLink);
		document.body.removeChild(downloadLink);*/

		var content = ( $(".DocContent").html().replace(/Editar/g,'') );

		var a = document.createElement('a');
		var url = 'data:application/msword, '+ '<head><meta charset="utf-8"></head><body>' + encodeURIComponent(content) + '</body>'
		//var url = 'data:application/vnd.ms-word, '+ '<head><meta charset="utf-8"></head><body>' + encodeURIComponent(content) + '</body>'
		a.href = url;

		a.download = 'orcamento.doc';
		a.click();


		//NÃO ESTA PERMITINDO O DOWNLOAD NO IPHONE

	}

	/**
	
	- changeTop

	**/

	this.changeTop = function()
	{

		this.getjQueryObject().css("top", ( main.isMobile ) ? "86px" : "43px");

	}

	//
	//
	//

	this.create();

}