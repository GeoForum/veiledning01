(function(){ // wrap


window.app = {}; // namespace
window.log = function(){ // for debugging
  if(typeof console !== 'undefined' && typeof console.log === 'function'){
    console.log(arguments);
  }
};

var createMap = function(){
  // Fortell Leaflet hvor bildene ligger:
  L.Icon.Default.imagePath = 'css/images/';

  // Skap lag fra OSM og Stamen og tilfør til kart:
  var layers = [];
  var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  var watercoler = L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="http://maps.stamen.com">Stamen</a>'
  });
/*  var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.jpg', {
      attribution: '&copy; <a href="http://maps.stamen.com">Stamen</a>'
  });*/
  var posi = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains: 'abcd'
  });
  // Lag et kart og tilføy første lag:
  var map = app.map = L.map('map', {
      center: [63.174193604205094, 16.36962890625] //[59.91235, 10.7357]
    , zoom: 4 
    , layers: [posi]
  })

  // Lag et verktøy som skruer lag av og på, den tilfører også lagene til kartet:
  var baseMaps = {
      "Open Street Map": osm
    , "Vannfarge": watercoler
    , "Positron": posi
  };
  var overlays = {};
  L.control.layers(baseMaps, overlays).addTo(map);

  map.on('click', function(e) { // for debugging
    log("You clicked the map at " + e.latlng); 
  });
};

var addData = function(){

  $.ajax({
      url: "data/trafikkulykker02.nvdb.json"
    , dataType: "json"
  })
  .done(function(data){ 
    // Loop gjennom alle vegobjekter, finn coordinater og legg dem til kartet:
    var vegObr = data.resultater[0].vegObjekter;
    for (var i = 0; i < vegObr.length; i++) {
      var vo = vegObr[i];
      // Vi skal ha tak i wgs84 koorinater og endre dem til geomitri vha wellknown:
      var wkt84 = vo.lokasjon || vo.lokasjon.geometriWgs84 ? vo.lokasjon.geometriWgs84 : false;
      var wkt84Geom = wkt84 ? wellknown.parse(wkt84) : false;
      if(wkt84Geom && wkt84Geom.coordinates){
        // Leaflet vil ha koordinatene i motsatt rekkefølge av det wellknown leverer:
        var latlng = [ wkt84Geom.coordinates[1], wkt84Geom.coordinates[0] ];
        // Lag simpel info om hver ulykke og legg det til marker i kartet 
        // med popup, som tilføyes kartet:
        var poparr = [vo.lokasjon.kommune.navn, vo.lokasjon.fylke.navn, vo.lokasjon.region.navn];
        var m = L.marker(latlng)
          .bindPopup( poparr.join('<br/>') )
          .addTo(app.map);
        // Hvert vegobjekt inneholder en rekke egenskaper som kan vises i separat box:
        var $info = $('#info'), info = '<table>', egarr = vo.egenskaper;
        for (var j = 0; j < egarr.length; j++) {
          var eg = egarr[j], infoarr = [ eg['navn'], eg['verdi']]; 
          info += '<tr><td>' + eg['navn'] + '</td><td>' + eg['verdi'] + '</td></tr>';
        };
        m.nvdbInfoTxt = info + '</table>';
        // Vis info tekst når markørense popup åpnes og slett teksten når den lukkes:
        m.on('popupopen', function(e) {
          $info.html(e.target.nvdbInfoTxt);
        });
      }
    }; // for vegObr

  }); // ajax done

};

window.onload = function(){
  createMap();
  addData();
};


})(); // wrap