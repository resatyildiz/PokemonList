function jsonmu(json_metin) {
    if (/^[\],:{}\s]*$/.test(json_metin.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        return true;

    } else {

        return false;

    };
}

function objemi(obje) {
    if (typeof obje === 'object' && obje != null) {
        return true;
    } else {
        return false;
    }
}

function arraymi(dizi) {
    return Array.isArray(dizi);
}


var hazir_html = {};

hazir_html.poke_tane = {};
hazir_html.poke_tane.basbir = "<div class='poke_tane' urlsi='";
hazir_html.poke_tane.basiki = "'>";
hazir_html.poke_tane.dongu = [];
hazir_html.poke_tane.dongu.push("<div class='poke_adi'>");
hazir_html.poke_tane.dongu.push("</div>");
hazir_html.poke_tane.son = "</div>";

hazir_html.cagirilan_poke = {};
hazir_html.cagirilan_poke.baslikbas = "<div class='poke_baslik'>";
hazir_html.cagirilan_poke.baslikson = "</div>";
hazir_html.cagirilan_poke.ozellik = [];
hazir_html.cagirilan_poke.ozellik.push("<div class='poke_ozellik'><div class='poke_ozellik_adi'>");
hazir_html.cagirilan_poke.ozellik.push("</div><div class='poke_ozellik_degeri'>");
hazir_html.cagirilan_poke.ozellik.push("</div></div>");
hazir_html.cagirilan_poke.resimbas = "<img class='poke_resim' src='";
hazir_html.cagirilan_poke.resimson = "'/>";
hazir_html.cagirilan_poke.kapatbuton = "<div class='poke_kapat_buton'>KAPAT</div>";


var sozluk = {};

sozluk.water = "Su";
sozluk.fire = "Ateş";
sozluk.flying = "Uçan";
sozluk.bug = "Böcek";
sozluk.normal = "Normal";
sozluk["grass"] = "Doğa";
sozluk.poison = "Zehirli";

function turkcelestir(turkcelestirilecek){
	if(sozluk[turkcelestirilecek] === undefined){
		return turkcelestirilecek;
	}else{
		return sozluk[turkcelestirilecek];
	}
}

$(document).ready(function(){
	
$.ajax({
	type:"GET",
	data:"",
	url:"https://pokeapi.co/api/v2/pokemon/",
	success:function(cevap){
		if(!objemi(cevap)){ alert("Gelen veri uygun değil sayfayı yenileyin."); return; }
		if(cevap.results === undefined){ alert("İçerik eksik sayfayı yenileyin."); return; }
		if(!arraymi(cevap.results)){ alert("Gelen veri dizi değil sayfayı yenileyin."); return; }
		var sonuclar = cevap.results;
		var donecek_html = "";
		for(var i = 0;i<sonuclar.length;i++){
		donecek_html += hazir_html.poke_tane.basbir+sonuclar[i].url;
		donecek_html += hazir_html.poke_tane.basiki;
		donecek_html += hazir_html.poke_tane.dongu[0];
		donecek_html += sonuclar[i].name;	
		donecek_html += hazir_html.poke_tane.dongu[1];
		donecek_html += hazir_html.poke_tane.son;
		}
		$(".poke_yukle_alan").html(donecek_html);
	},error:function(a,b,c){
		var durumu = a.readyState;
		var durumu_iki = a.status;
		var sebebi = a.statusText;
		alert("hata");
	},
	complete:function(){
		$('#perde').css("display","none");
	}
	,timeout:10000,
	async:true
	
});	
	
	
	$('.pokemon_arama').keyup(function(){
		var aranacak_deger = $(this).val();
		$('.poke_yukle_alan .poke_tane').each(function(){
			if($(this).children(".poke_adi").text().search(new RegExp(aranacak_deger, "i")) < 0){
				$(this).hide();
			}else{
				$(this).show();
			}
			
		});
	});
	

});

$(document).on("click",".poke_tane",function(){
	var urlsi = $(this).attr("urlsi");
	$('#perde').css("display","block");	
	$.ajax({
		type:"GET",
		data:"",
		url:urlsi,
		success:function(cevap){
			if(!objemi(cevap)){ alert("Gelen veri uygun değil sayfayı yenileyin."); return; }
			if(cevap.sprites === undefined){ alert("İçerik eksik sayfayı yenileyin."); return; }
			if(!objemi(cevap.sprites)){ alert("Gelen veri dizi değil sayfayı yenileyin."); return; }
			if(cevap.sprites.front_default === undefined){ alert("Resim eksik sayfayı yenileyin."); return; }
			var poke_html = "";
			poke_html += hazir_html.cagirilan_poke.baslikbas+cevap.name;
			poke_html += hazir_html.cagirilan_poke.baslikson;
			poke_html += hazir_html.cagirilan_poke.resimbas+cevap.sprites.front_default;
			poke_html += hazir_html.cagirilan_poke.resimson;
			poke_html += hazir_html.cagirilan_poke.ozellik[0]+"Kilosu";
			poke_html += hazir_html.cagirilan_poke.ozellik[1]+cevap.weight+" Kg";
			poke_html += hazir_html.cagirilan_poke.ozellik[2];
			poke_html += hazir_html.cagirilan_poke.ozellik[0]+"Boyu";
			poke_html += hazir_html.cagirilan_poke.ozellik[1]+cevap.height+" Mt";
			poke_html += hazir_html.cagirilan_poke.ozellik[2];
			poke_html += hazir_html.cagirilan_poke.ozellik[0]+"Tipleri";
			poke_html += hazir_html.cagirilan_poke.ozellik[1];
			for(var i = 0;i<cevap.types.length;i++){
			poke_html += turkcelestir(cevap.types[i].type.name)+(i==(cevap.types.length-1)?"":", ");		
			}
			poke_html += hazir_html.cagirilan_poke.ozellik[2];
			poke_html += hazir_html.cagirilan_poke.kapatbuton;
			$('.cagirilan_pokemon').html(poke_html);
			$('.cagirilan_pokemon').fadeIn(300);
		},error:function(a,b,c){
			var durumu = a.readyState;
			var durumu_iki = a.status;
			var sebebi = a.statusText;
			alert("hata");
		},
		complete:function(){
			$('#perde').css("display","none");
		}
		,timeout:10000,
		async:true
		
	});	
});

$(document).on("click",".poke_kapat_buton",function(){
	$(this).parent().fadeOut(300);
	
});

$(window).on("load",function(){

	
	
});

