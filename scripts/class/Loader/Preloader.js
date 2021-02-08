
/**

classe responsável pelo controle do preloader.

**/


Preloader.animate = new Animate();

function Preloader()
{
		
	var _that = this;
	this.div = new Div("Preloader", "Preloader");

	/**

	- create (construtor)

	Crio a div do Preloader.

	**/

	this.create = function()
	{

		var animationDiv = new Div("lds-circle", "lds-circle");
		var containerDiv = new Div("PreloaderContainer", "PreloaderContainer").appendOnInnerContent(animationDiv);

		this.div.appendOnInnerContent(containerDiv);

	}

	/**

	- show 

	Mostro o preloader;

	**/

	this.show = function()
	{

		this.div.appendOnDiv( $("body") );

	}

	/**

	- hide

	Escondo o preloader;

	**/

	this.hide = function()
	{

		window.setTimeout( function() { 

			Preloader.animate.fadeOut(_that.div, 

				function(){ 
					_that.div.getjQueryObject().remove(); 

				}
			)

		}, 600);

	}

	//
	//
	//
	this.create();

}