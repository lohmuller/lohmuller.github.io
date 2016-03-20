

$(window).on('load', function() {
	 $("body").removeClass("loader");
	 $("body").addClass("show-page-inicial");
	//alert("carregou!");
	ianText("Olá",0);
	
	$("[href='#sobre']").on("click", function(){
		setPage(this, "sobre");
	});		
	$("[href='#projetos']").on("click", function(){
		setPage(this, "projetos");
	});	
	$("[href='#contato']").on("click", function(){
		setPage(this, "contato");
	});	
	$("[href='#']").on("click", function(){
		setPage(this, "inicial");
	});
	
});

function setPage(obj, target){
	$("body").removeClass("show-page-inicial");
	$("body").removeClass("show-page-sobre");
	$("body").removeClass("show-page-projetos");
	$("body").removeClass("show-page-contato");
	$(".active").removeClass("active");
	$(obj).parents("li").addClass("active");
	$("body").addClass("show-page-"+target);
}


/**
Insere texto no balão de mensagem do personagem
**/
function ianText(text,time){	
	$(".bubble").text(text);
	//	$(".bubble").textillate({ in: { effect: 'rollIn' } });
}


$.getJSON("/projetos/projetos.json", function(data){
	var campoPadrao = $(".projeto-thumb").parent().html();
	$(".projeto-thumb").remove();
	var tempCampo = '';
	$.each(data,function(key,value){
		tempCampo = campoPadrao;
		$.each(value,function(key2,value2){
			tempCampo = tempCampo.replace("{"+key2+"}", value2); 
		});
		$("#pagina-projetos").append(tempCampo);
	});
	

	
});
	
