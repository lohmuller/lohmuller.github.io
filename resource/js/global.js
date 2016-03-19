

$(document).ready( function(){
	 $("body").removeClass("loader");
	 $("body").addClass("show-page-inicial");
	//alert("carregou!");
	ianText("Olá",0);
	
	$("[href='#sobre']").on("click", function(){
		$("body").removeClass("show-page-inicial");
		$("body").addClass("show-page-sobre");
	});	
	
	
	$("[href='#']").on("click", function(){
		$("body").addClass("show-page-inicial");
		$("body").removeClass("show-page-sobre");
	});
	
});

/**
Insere texto no balão de mensagem do personagem
**/
function ianText(text,time){	
	$(".bubble").text(text);
	//	$(".bubble").textillate({ in: { effect: 'rollIn' } });
	}
	
