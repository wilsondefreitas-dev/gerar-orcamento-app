/**

classe 

**/

Partial.animate = new Animate();

function Partial()
{	Div.call(this, "BottomBar", "BottomBar"); //Extends DIV
	
	this.partialContent = new Div( "Partials", "Partials" );
	this.progressContent = new Div("ProgressBg", "ProgressBg");
	this.progressBar = new Div("Progress", "Progress");

	var _that = this;
	this.allowButton = false;
	this.progressOpened = true;
	this.showDocButton = new Object();
		
	/**

	- create (construtor)

	**/

	this.create = function()
	{	

		this.appendOnInnerContent( this.partialContent );
		this.progressContent.writeInnerAndAppendOnDiv(this.progressBar, this);

		this.appendOnDiv( $( "body" ) );

		this.refresh();

	}

	/**

	- refresh

	**/

	this.refresh = function()
	{

		this.partialContent.getjQueryObject().html('');

		if(!main.isMobile) {
			this.updateTitle(); 
			this.updateEfforts(); 
		}
		
		this.updateTotal(); 
		this.updatePorcentProfit(); 
		this.updateMultiplier();
		
		if( $('.Document')[0] == undefined ) this.appendShowDocButton();

	}

	/**

	- updateProgressBar

	**/

	this.updateProgressBar = function()
	{

		var newLabel =  ( main.navigator.currentSectionNumber + 1 ) + " de " + main.navigator.totalSections;
		var newPocentage = ( ( 100 / main.navigator.totalSections ) * ( main.navigator.currentSectionNumber + 1 ) ) + "%"

		this.progressBar.getjQueryObject().html(newLabel);
		this.progressBar.getjQueryObject().animate({ width: newPocentage}, 250 );

	}

	/**

	- updateTitle

	**/

	this.updateTitle = function()
	{

		new Div("PartialsContent", "PartialsContent").writeInnerAndAppendOnDiv("Resumo:", this.partialContent);

	}

	/**

	- updateEfforts

	**/

	this.updateEfforts = function()
	{

		var teamHours = new Number();
		var supplierPrice = new Number();

		var deadline = new Number();

		for(var x in main.calculate.effortObject){	

			(x == "price") ? supplierPrice = main.calculate.effortObject[x] : teamHours += main.calculate.effortObject[x];
			if( x == "days" ) deadline += main.calculate.effortObject[x];

		}

		var partialsItem = new Div("PartialsContent", "PartialsContent");
		new Div("PartialLabel", "PartialLabel").writeInnerAndAppendOnDiv("Equipe: ", partialsItem);
		new Div("PartialValue", "PartialValue").writeInnerAndAppendOnDiv(teamHours + "h", partialsItem);

		partialsItem.appendOnDiv(this.partialContent);

		var partialsItem = new Div("PartialsContent", "PartialsContent");
		new Div("PartialLabel", "PartialLabel").writeInnerAndAppendOnDiv("Fornec.: ", partialsItem);
		new Div("PartialValue", "PartialValue").writeInnerAndAppendOnDiv("R$ " + this.formatValue(supplierPrice), partialsItem);

		if(main.calculate.effortObject[x] > 0 ) partialsItem.appendOnDiv(this.partialContent);

		var partialsItem = new Div("PartialsContent", "PartialsContent");
		new Div("PartialLabel", "PartialLabel").writeInnerAndAppendOnDiv("Prazo: ", partialsItem);
		new Div("PartialValue", "PartialValue").writeInnerAndAppendOnDiv(this.formatValue(deadline) + " dias", partialsItem);

		if(main.calculate.effortObject[x] > 0 ) partialsItem.appendOnDiv(this.partialContent);

	}

	/**

	- updateTotal

	**/

	this.updateTotal = function()
	{

		var partialsItem = new Div("PartialsContent", "PartialsContent");
		var partialLabel = new Div("PartialLabel", "PartialLabel").writeInnerAndAppendOnDiv("Total:", partialsItem);
		var partialValue = new Div("PartialValue", "PartialValue");

		partialsItem.appendOnInnerContent(partialValue);
		partialsItem.appendOnDiv(this.partialContent);

		this.updateAnimation( partialValue, "R$ " + _that.formatValue(main.calculate.productTotalPrice) );

	}
	
	/**

	- updatePorcentProfit

	**/

	this.updatePorcentProfit = function()
	{

		var partialsItem = new Div("PartialsContent", "PartialsContent");
		var partialLabel = new Div("PartialLabel", "PartialLabel").writeInnerAndAppendOnDiv("Rentab.:", partialsItem);
		var partialValue = new Div("PartialValue", "PartialValue");

		partialsItem.appendOnInnerContent(partialValue);
		partialsItem.appendOnDiv(this.partialContent);

		(main.calculate.percentProfit < 50) ? partialLabel.getjQueryObject().css('color', 'red') : partialLabel.getjQueryObject().css('color', 'yellowgreen');

		this.updateAnimation( partialValue, _that.formatValue(main.calculate.percentProfit) + "%" );

	}

	/**

	- updateMultiplier

	**/

	this.updateMultiplier = function()
	{

		var partialsItem = new Div("PartialsContent", "PartialsContent");
		partialsItem.appendOnInnerContent( new Div("PartialLabel", "PartialLabel").appendOnInnerContent('Multip:') ); 

		var input = new Input( 'text' );
		input.setAttribute( 'maxlength', '3' );
		input.setAttribute( 'name', 'multiplier' );
		new Div("PartialValue", "PartialValue").writeInnerAndAppendOnDiv(input, partialsItem);

		partialsItem.appendOnDiv(this.partialContent);

		input.getjQueryObject().change(function(){

			if(this.getjQueryObject().val() == '') this.getjQueryObject().val('1');

			main.calculate.setMultiplier( this.getjQueryObject().val() );

		}.bind(input))

		input.getjQueryObject().css('text-align', 'center');
		input.getjQueryObject().css('width', '40');
		input.getjQueryObject().mask('0.0');
		input.getjQueryObject().val(main.calculate.multiplier);

	}

	/**

	- updateAnimation

	**/

	this.updateAnimation = function(_div, _content, _callback)
	{
		
		_div.appendOnInnerContent(_content);

		_div.getjQueryObject().css("opacity", "0");
		Partial.animate.fadeIn(_div, function(){ if(_callback) _callback() }, 200); 

	}

	/**

	- appendShowDocButton

	**/

	this.appendShowDocButton = function()
	{

		if(this.allowButton) { 

			if(this.showDocButton.getjQueryObject) this.showDocButton.getjQueryObject().remove();

			this.showDocButton = new Div("PartialsContent", "PartialsContent PartialsContentInverted");
			var partialLabel = new Div("PartialLabel", "PartialLabel PartialLabelInverted ShowDocButton").writeInnerAndAppendOnDiv("Ver Orçamento", this.showDocButton );
			
			this.showDocButton.setAttribute("onclick", "main.navigator.showDoc();");
			this.showDocButton.setAttribute("style", "cursor: pointer;");

			this.showDocButton.appendOnDiv(this.partialContent);

			Partial.animate.fadeIn(this.showDocButton);

		}

	}



	//



	//



	// table



	//



	/**

	- getPartialTable

	**/	

	this.getPartialTable = function()
	{	

		var tableDiv = new Div("Table", "Table", "table").setAttribute("style", "font-size: 16px;");
		tableDiv.appendOnInnerContent( this.createNewResultLine( "Recursos", "Preço", "Valor / 1 Hora" , "Horas Consumidas") );

		this.insertTableContent( tableDiv );

		tableDiv.appendOnInnerContent( this.createNewResultLine('Custo', "R$ " + this.formatValue(main.calculate.cost) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Fornecedores', "R$ " + this.formatValue(main.calculate.supplierExpenses) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Multiplicador', this.formatValue(main.calculate.multiplier) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Total Custo', "R$ " + this.formatValue(main.calculate.totalCost) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('+ imposto', "R$ " + this.formatValue(main.calculate.totalCostWithTax) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Total', "R$ " + this.formatValue(main.calculate.productTotalPrice), new String(), this.formatValue(totalHours) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Lucro', "R$ " + this.formatValue(main.calculate.profit) ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Lucro %', this.formatValue(main.calculate.percentProfit) + "%" ) );
		tableDiv.appendOnInnerContent( this.createNewResultLine('Deadline', new String(), new String(), this.formatValue(main.calculate.deadline) + " dias" ) );

		return tableDiv;

	}

	/**

	- getNewTableContent

	**/	

	var totalHours;

	this.insertTableContent = function(_table)
	{

		totalHours = new Number();
		
		for( var i in main.calculate.effortObject ){

			if(i != "price" && i != "days"){

				var effortPriceObj = main.calculate.effortPriceObject[i];
				var effortObj 	   = main.calculate.effortObject[i];

				var newLine = new Div("Tr", "Tr", "tr").setAttribute("style", "border: 1px solid gray;");
				new Div("Td", "Td", "td").writeInnerAndAppendOnDiv(i, newLine);
				new Div("Td", "Td", "td").writeInnerAndAppendOnDiv("R$ " + this.formatValue(effortPriceObj) + ",00", newLine);
				new Div("Td", "Td", "td").writeInnerAndAppendOnDiv(this.formatValue(effortObj), newLine);
				new Div("Td", "Td", "td").writeInnerAndAppendOnDiv("R$ " + this.formatValue(effortObj * effortPriceObj) + ",00", newLine);
				_table.appendOnInnerContent(newLine);

				totalHours += effortObj;

			}

		}

	}


	/**

	- convertToExcel

	**/	

	this.createNewResultLine = function(_name, _total3, _total1, _total2)
	{

		_total1 = _total1 || new String();
		_total2 = _total2 || new String();

		var newLine = new Div("Tr", "Tr", "tr").setAttribute("style", "border: 1px solid gray; background-color: orange; color: white;");
		new Div("Td", "Td", "td").setAttribute("style", "font-weight: bold;").writeInnerAndAppendOnDiv(_name, newLine);
		new Div("Td", "Td", "td").setAttribute("style", "font-weight: bold;").writeInnerAndAppendOnDiv(_total1, newLine);
		new Div("Td", "Td", "td").setAttribute("style", "font-weight: bold;").writeInnerAndAppendOnDiv(_total2, newLine);
		new Div("Td", "Td", "td").setAttribute("style", "font-weight: bold").writeInnerAndAppendOnDiv(_total3, newLine);
		
		return newLine;

	}


	/**

	- convertToExcel

	**/	

	this.convertToExcel = function()
	{	

		var table_html = this.getPartialTable().getScript().replace(/ /g, '%20');

		var a = document.createElement('a');
		var url = 'data:application/msexcel, ' + '<head><meta charset="utf-8"></head><body><table>' + table_html + '</table></body>';
		a.href = url;

		a.download = 'esforco.xls';
		a.click();
		
	}

	/**

	- allowDocButton

	**/

	this.allowDocButton = function()
	{

		this.allowButton = true;

	}

	/**

	- removeShowDocButton

	**/

	this.removeShowDocButton = function()
	{

		if(this.showDocButton.getjQueryObject) {

			if(main.isMobile){

				this.showDocButton.hide(function() {

					_that.showDocButton.getjQueryObject().remove();

				});

			}else{

				this.showDocButton.getjQueryObject().fadeOut(function() {

					_that.showDocButton.getjQueryObject().remove();

				});

			}

		};

	}

	/**

	- hideProgressBar

	**/

	this.hideProgressBar = function()
	{

		//this.progressContent.getjQueryObject().hide();

		if(!_that.progressOpened) return

		if(main.isMobile){

			_that.progressContent.getjQueryObject().hide(function() { _that.progressOpened = false; });

		}else{

			_that.progressContent.getjQueryObject().slideToggle( 50, function() { _that.progressOpened = false; });

		}

	}

	/**

	- showShowDocButton

	**/

	this.showProgressBar = function()
	{

		//this.progressContent.getjQueryObject().show();

		if(_that.progressOpened) return

		if(main.isMobile){

			_that.progressContent.getjQueryObject().show(function() { _that.progressOpened = true; });

		}else{

			_that.progressContent.getjQueryObject().slideToggle( 50, function() { _that.progressOpened = true; });

		}

	}

	
	/**
	
	- formatValue
	 
	**/

	this.formatValue = function(_number)
	{ 
		
		return _number.toLocaleString('pt-BR');

	}

	//
	//
	//

	this.create();

}