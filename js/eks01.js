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

window.onload = function(){
  createMap();
};

})(); // wrap