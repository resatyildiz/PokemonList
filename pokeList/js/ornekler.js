// "use strict";
var soket_genel_obje = null;

function Sirala() {
  this.uzunluk = 0;
}

Sirala.prototype.ekle = function (eleman) {
  var nokta = {eleman: eleman};
  if (this.sonuncu) {
    this.sonuncu = this.sonuncu.sonraki = nokta;
  } else {
    this.sonuncu = this.ilki = nokta;
  }
  this.uzunluk++;
};

Sirala.prototype.cikar = function () {
  var nokta = this.ilki;
  if (nokta) {
    this.ilki = nokta.sonraki;
    if (!(--this.uzunluk)) {
      this.sonuncu = undefined;
    }
    return nokta.eleman;
  }
};

Sirala.prototype.arrayla = function (baslangic, son) {
  baslangic = typeof baslangic === 'undefined' ? 0 : baslangic;
  son = typeof son === 'undefined' ? Infinity : son;

  var cikti = [];

  var i = 0;
  for (var nokta = this.ilki; nokta; nokta = nokta.sonraki) {
    if (--son < 0) {
      break;
    } else if (++i > baslangic) {
      cikti.ekle(nokta.eleman);
    }
  }
  return cikti;
}

var sira = new Sirala();




var sistem_kilitli = false;


function js_yukle(adres) {
    JS_dosya = document.createElement("script");
    JS_dosya.type = "application/javascript";
    JS_dosya.src = adres;
    document.getElementsByTagName('head')[0].appendChild(JS_dosya);
    delete JS_dosya;
}

function attr_varmi(dom_obje, attrsi) {
    if (typeof $(dom_obje).attr(attrsi) !== typeof undefined && $(dom_obje).attr(attrsi) !== false) {
        return true;
    } else {
        return false;
    }
}

function arraymi(dizi) {
    return Array.isArray(dizi);
}

function objemi(obje) {
    if (typeof obje === 'object' && obje != null) {
        return true;
    } else {
        return false;
    }
}

function jsonmu(json_metin) {
    if (/^[\],:{}\s]*$/.test(json_metin.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

        return true;

    } else {

        return false;

    };
}

function dongu(fonk, bekle, tekrar) {
    var donen = function(b, t) {
        return function() {
            if (typeof t === "undefined" || t-- > 0) {
                setTimeout(donen, b);
                try {
                    fonk.call(null);
                } catch (e) {
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(bekle, tekrar);

    setTimeout(donen, bekle);
};


var animasyonhizi = 300;

function kukisil(isim) {
    document.cookie = isim + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function kukikoy(isim, deger, gun) {
    var zaman = new Date();
    zaman.setDate(zaman.getDate() + gun);
    document.cookie = isim + "=" + deger + "; expires=" + zaman + "; path=/";
}

function kukicek(isim) {
    var adi = isim + "=";
    var cevrilen_kuki = decodeURIComponent(document.cookie);
    var kuki_array = cevrilen_kuki.split(';');
    for (var i = 0; i < kuki_array.length; i++) {
        var kursor = kuki_array[i];
        while (kursor.charAt(0) == ' ') {
            kursor = kursor.substring(1);
        }
        if (kursor.indexOf(adi) == 0) {
            return kursor.substring(adi.length, kursor.length);
        }
    }
    return false;
}

function soket_uyari_kapat() {
    sistem_kilitli = false;
    $('#perde').fadeOut(animasyonhizi);
    $('#uyari').hide();
    $('#uyari').html('');
}

function soket_uyari_ver(veri) {
    sistem_kilitli = true;
    $('#uyari').html("<p>" + veri + "</p>");
    $('#perde').fadeIn(animasyonhizi);
    $('#uyari').fadeIn(animasyonhizi);
}

function uyari_kapat() {
    if (!sistem_kilitli) {
        $('#perde').fadeOut(animasyonhizi);
        $('#uyari').hide();
        $('#uyari').html('');
    }
}



function bekle(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
    }
}



function hata(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p><button class='olumsuzbuton'>Tamam</button>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        $('.olumsuzbuton').click(function() {
            $('#perde').fadeOut(animasyonhizi);
            $('#uyari').hide();
            $('#uyari').html('');
        });
    }
}

function olumlu(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p><button class='olumlubuton'>Tamam</button>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        $('.olumlubuton').click(function() {
            $('#perde').fadeOut(animasyonhizi);
            $('#uyari').hide();
            $('#uyari').html('');
        });
    }
}

function onay(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p><button class='olumlubuton'>Evet</button><button class='olumsuzbuton'>Hayir</button>");
        $("#perde").fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        var bekle = $.Deferred();
        $('.olumlubuton').click(function() {
            $("#perde").fadeOut(animasyonhizi);;
            $('#uyari').hide();
            $('#uyari').html('');
            bekle.resolve(true);
        });

        $('.olumsuzbuton').click(function() {
            $("#perde").fadeOut(animasyonhizi);
            $('#uyari').hide();
            $('#uyari').html('');
            bekle.resolve(false);
        });

        return bekle.promise();
    }
}

function onay_tamam(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p><button class='olumlubuton'>Evet</button>");
        $("#perde").fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        var bekle = $.Deferred();
        $('.olumlubuton').click(function() {
            $("#perde").fadeOut(animasyonhizi);;
            $('#uyari').hide();
            $('#uyari').html('');
            bekle.resolve(true);
        });

        return bekle.promise();
    }
}


function otomatik_yenile(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        setTimeout(function() {
            location.reload();
        }, 2000);
    }
}

function otomatik_geridon(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        setTimeout(function() {
            window.history.back();
        }, 2000);
    }
}

function onayli_yenile(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p><button class='olumlubuton'>Tamam</button>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        $('.olumsuzbuton').click(function() {
            location.reload();
        });
    }
}


function onayli_geridon(veri) {
    if (!sistem_kilitli) {
        $('#uyari').html("<p>" + veri + "</p><button class='olumlubuton'>Tamam</button>");
        $('#perde').fadeIn(animasyonhizi);
        $('#uyari').fadeIn(animasyonhizi);
        $('.olumlubuton').click(function() {
            window.history.back();
        });
    }
}

function geri_don() {
    if (!sistem_kilitli) {
        window.history.back();
    }

}

$(document).ready(function() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('body').css("overflow", "visible");
    }

});

function zaman_ver() {
    return window.performance && window.performance.now && window.performance.timing && window.performance.timing.navigationStart ? window.performance.now() + window.performance.timing.navigationStart : Date.now();
}


$(document).ready(function() {

    $(document).on('mousewheel', function(e) {

        e.preventDefault();
        if (e.originalEvent.wheelDelta / 120 > 0) {
            $(document).scrollTop($(document).scrollTop() - e.originalEvent.wheelDelta / 3);

        } else {

            $(document).scrollTop($(document).scrollTop() - e.originalEvent.wheelDelta / 3);
        }

    });



});

var arayuz_operasyon = false;

if ("WebSocket" in window === false || "Worker" in window === false) {
    alert("Sisteminiz CUBS'a bağlanmak için yeterli değil.");
} else {
    js_yukle("/kodcuk/kullanici.js");
}