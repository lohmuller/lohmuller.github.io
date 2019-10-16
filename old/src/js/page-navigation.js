

$(window).on('load', function() {
    var target = window.location.hash;
    if (target[0] == "#" || target[0] == "") {
        target = target.replace("#", "");
        $("body").addClass("show-page-" + target);
    } else {
        $("body").addClass("show-page-inicial");
    }

    //@TODO deixar dinâmico
    $("[href='#sobre']").on("click", function () {
        setPage(this, "sobre");
    });
    $("[href='#projetos']").on("click", function () {
        setPage(this, "projetos");
    });
    $("[href='#contato']").on("click", function () {
        setPage(this, "contato");
    });
    $("[href='#']").on("click", function () {
        setPage(this, "inicial");
    });
});
	
	


function setPage(obj, target) {
	var config = {}
	
	var origem = $("body").attr("class");
	origem = origem.substr(10);
	console.log(origem);
    console.log(target);

	if(origem != 'inicial'){
		$("body").removeClass("show-page-inicial");
		$("body").removeClass("show-page-sobre");
		$("body").removeClass("show-page-projetos");
		$("body").removeClass("show-page-contato");
		$(".active").removeClass("active");
		$(obj).parents("li").addClass("active");
		$("body").addClass("show-page-"+target);
        /*console.log(target == 'inicial');
        console.log( origem !== 'inicial');
        if(target == 'inicial' && origem !== 'inicial') {
            console.log("eae");
            setPage(obj, 'inicial');
        }*/
	}
	
	if(target == 'inicial'){
			$("body").removeClass("show-page-inicial");
			$("body").removeClass("show-page-sobre");
			$("body").removeClass("show-page-projetos");
			$("body").removeClass("show-page-contato");
			$(".active").removeClass("active");
			$(obj).parents("li").addClass("active");
			$("body").addClass("show-page-"+target);
		config = {
			"left": "0px",
			"opacity": 1
		}
	} else {
		config = {
			"left": "-80px",
			"opacity": -10
		}
	}
	
     $('#cenario').animate(config, 600,	 function(){
			$("body").removeClass("show-page-inicial");
			$("body").removeClass("show-page-sobre");
			$("body").removeClass("show-page-projetos");
			$("body").removeClass("show-page-contato");
			$(".active").removeClass("active");
			$(obj).parents("li").addClass("active");
			$("body").addClass("show-page-"+target);
    });

}



/*$.getJSON("/projetos/projetos.json", function(data){
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
});*/


console.log("%cHey! Obrigado pelo interesse de estar aqui :D!", "color: blue; font-size:15px;");
	
