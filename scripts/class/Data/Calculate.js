
/**

classe responsável pelo controle do preloader.

**/


Calculate.animate = new Animate();

function Calculate()
{
		
	var _that = this;

	this.choicesObject  		 = new Array();
	this.effortObject   		 = new Object();
	this.effortPriceObject  	 = new Object();

	this.cost 					 = new Number();
	this.supplierExpenses 		 = new Number();
	this.totalCost 				 = new Number();
	this.totalCostWithTax 		 = new Number();
	this.productTotalPrice 		 = new Number();
	this.profit 				 = new Number();
	this.percentProfit 			 = new Number();

	this.deadline                = new Number();

	this.productSize 			 = new Number(1);

	this.multiplier 			 = new Number(3);

	/**

	- setProductSize

	**/

	this.setProductSize = function( _optSelected )
	{

		var type = _optSelected[1][0].label;
		var _string = _optSelected[1][1].label

		if(type == "Curso" || type == "Curso de Sistema"){

			this.typeCurseSize(_string);

		} else if(type == "Pool de horas"){

			this.typePool();

		} else {

			this.typeVideoSize(_string);

		}

	}

	this.typeCurseSize = function(_string)
	{

		switch( _string ){

			case '00h05': this.productSize = [0.75, 0.75]; break;
			case '00h10': this.productSize = [0.8,  0.8]; break;
			case '00h15': this.productSize = [0.85, 0.85]; break;
			case '00h20': this.productSize = [0.9,  0.9]; break;
			case '00h25': this.productSize = [0.95, 0.95]; break;
			case '00h30': this.productSize = [1,    1]; break;
			case '01h00': this.productSize = [1.3,  2]; break;
			case '01h30': this.productSize = [1.6,  3]; break;
			case '02h00': this.productSize = [1.9,  4]; break;
			case '02h30': this.productSize = [2.2,  5]; break;
			case '03h00': this.productSize = [2.5,  6]; break;

		}

	}

	this.typeVideoSize = function(_string)
	{

		switch( _string ){

			case '00h05': this.productSize = [1,   1]; break;
			case '00h10': this.productSize = [1.3, 2]; break;
			case '00h15': this.productSize = [1.6, 3]; break;
			case '00h20': this.productSize = [1.9, 4]; break;
			case '00h25': this.productSize = [2.2, 5]; break;
			case '00h30': this.productSize = [2.5, 6]; break;
			case '01h00': this.productSize = [2.8, 7]; break;
			case '01h30': this.productSize = [3.1, 8]; break;
			case '02h00': this.productSize = [3.4, 9]; break;
			case '02h30': this.productSize = [3.7, 10]; break;
			case '03h00': this.productSize = [4.0, 11]; break;

		}

	}

	this.typePool = function()
	{

		this.productSize = [1, 1];

	}

	/**

	- setMultiplier

	**/

	this.setMultiplier = function(_string)
	{
		
		this.multiplier = parseFloat( _string );
		
		this.refreshEffortObject();

	}

	
	/**

	- pushChoicesObject

	**/

	this.pushChoicesObject = function(_object)
	{
		
		this.choicesObject.push(_object);

	}

	/**

	- getChoicesObject

	**/

	this.getChoicesObject = function()
	{

		return this.choicesObject;

	}

	/**

	- resetChoicesObject

	**/

	this.resetChoicesObject = function(_object)
	{

		this.choicesObject = new Array();

	}

	/**

	- refreshEffortObject

	**/

	this.refreshEffortObject = function()
	{	

		this.resetEffortObject();

		for( var w in this.getChoicesObject()){

			// console.log( this.getChoicesObject()[w] );

			switch( this.getChoicesObject()[w].type ) {

				case "Radio": 	 this.refreshEffortObjectRadio( this.getChoicesObject()[w].optionSelected ); 	break;
				case "Checkbox": this.refreshEffortObjectCheckbox( this.getChoicesObject()[w].optionSelected );	break;

			}

		}

		this.setProductTotalPrice();

		main.partial.refresh();

	}

	/**

	- refreshEffortObjectCheckbox

	**/

	this.refreshEffortObjectCheckbox = function(_optionSelected)
	{
		
		for( var z in  _optionSelected ) {

			for( var x in _optionSelected[z][2] ) {
				
				if(x == "price"){

					this.effortObject.price += _optionSelected[z][2].price;

				}else if(x == "days"){

					this.effortObject.days += _optionSelected[z][2].days;

				}else{
					
					this.effortObject[x] += _optionSelected[z][2][x];

				}

			}
		
		}

	}

	/**

	- refreshEffortObjectRadio

	**/

	this.refreshEffortObjectRadio = function(_optionSelected)
	{	

		for( var x in _optionSelected[2] ){

			if(x == "price"){

				this.effortObject.price = _optionSelected[2].price;

			}else if(x == "days"){

				this.effortObject.days = _optionSelected[2].days;

			}else{
					
				this.effortObject[x] += _optionSelected[2][x];

			}

		}

	}

	/**

	- resetEffortObject

	**/

	this.resetEffortObject = function()
	{

		for( var x in main.dataObject.modelEffortObj ) this.effortObject[x] = 0;
		this.effortObject.price = 0;
		this.effortObject.days = 0;	

	}

	/**

	- setEffortPriceObject

	**/

	this.setEffortPriceObject = function(_effortPriceObject)
	{
		
		this.effortPriceObject = _effortPriceObject;

	}

	/**

	- setproductTotalPrice

	**/

	this.setProductTotalPrice = function()
	{

		var value = new Number();
		var cost = new Number();
		var deadline = new Number();

		for( var x in this.effortObject ) {

			if(x == "price"){

				value += this.effortObject.price;

			}if(x == "days"){
				
				deadline += this.effortObject.days;

			}else{

				if( this.effortPriceObject[x] != undefined ){

					cost += ( this.effortObject[x] * this.effortPriceObject[x] );
					value += ( this.effortObject[x] * this.effortPriceObject[x] ) * this.multiplier;

				}

			}

		}

		this.deadline = deadline; //dias
		
		this.cost = cost * this.productSize[0]; //custo

		this.supplierExpenses = this.effortObject.price * this.productSize[1]; //custo dos fornecedores

		this.totalCost = this.cost * this.multiplier; //custo total

		this.totalCostWithTax = parseFloat( ( this.totalCost / main.tax ).toFixed(2) ); //custo total com taxas

		this.productTotalPrice =  parseFloat( ( ( this.totalCost / main.tax ) + this.supplierExpenses ).toFixed(2) ); //custo total do produto

		this.profit = parseFloat( ( ( ( this.totalCost / main.tax ) + this.supplierExpenses ) - this.supplierExpenses - ( this.cost / main.tax ) ).toFixed(2) ); //lucro

		this.percentProfit = parseInt( ( this.profit / this.productTotalPrice ) * 100 ); //rentabilidade

		if( isNaN(this.percentProfit) ) this.percentProfit = 0;

	}

	/**

	- isOptionSelectedEmpty

	**/

	this.isOptionSelectedEmpty = function()
	{

		var optionSelectedLength = this.choicesObject.length;

		for(var w in this.choicesObject) if(this.choicesObject[w].optionSelected.length == 0) optionSelectedLength -= 1;

		if(optionSelectedLength == 0){
		
			alert("Nenhuma opção selecionada.");
			return true;

		}

	}

}