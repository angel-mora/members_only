// Pop-up function for ajax geojson markers query   
function popUp(f, l) {
    var out = [];
    if (f.properties) {
        for (key in f.properties) {
            out.push("<strong>" + key + ": " + "</strong>" + f.properties[key]);
        } //here we can modify the pop-up appearence
        l.bindPopup(out.join("<br />"));
    }
}

// Event Listener
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 3,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    entidadesSucursales.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

// Choroplet layers chunk
function getColorSucursales(d) {
    var mapScale = chroma.scale(['#FFEDA0', '#800026'])
      .classes([0,200,500,1000,1500]);
    return mapScale(d)
}

function getColorAtmsSucursal(d) {
    var mapScale = chroma.scale(['#FFEDA0', '#800026'])
      .classes([0,200,500,1000,1500,2000,2500]);
    return mapScale(d)
}

function getColorAtmsRemotos(d) {
    var mapScale = chroma.scale(['#FFEDA0', '#800026'])
      .classes([0,200,500,1000,2000,3000]);
    return mapScale(d)
}

// Choroplet style function
function styleSucursales(feature) {
    return {
        fillColor: getColorSucursales(feature.properties.sucursales),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleAtmsSucursal(feature) {
    return {
        fillColor: getColorAtmsSucursal(feature.properties.atms_sucursal),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function styleAtmsRemotos(feature) {
    return {
        fillColor: getColorAtmsRemotos(feature.properties.atms_remotos),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

// Defining icons for .geojson layers
var bankLogo = L.icon({
    iconUrl: 'images/asaltoSucursal.svg',
    iconSize: [30, 30]
});

var atmLogo = L.icon({
    iconUrl: 'images/roboATM.svg',
    iconSize: [30, 30]
});

var chLogo = L.icon({
    iconUrl: 'images/roboCH.svg',
    iconSize: [30, 30]
});

var bank = L.icon({
    iconUrl: 'images/bank.png',
    iconSize: [30, 30]
});

var atmsLogo = L.icon({
    iconUrl: 'images/atm.svg',
    iconSize: [30, 30]
});

// Loading geojson files markers wih popUp feature
var sucursales = new L.GeoJSON.AJAX("js/leaflet/geojson/sucursales.json", {
    pointToLayer: function (geojsonpoint, latlng) {
        return L.marker(latlng, { icon: bank });
    },
    onEachFeature: popUp
});

var atmsSucursal = new L.GeoJSON.AJAX("js/leaflet/geojson/atmsSucursal.json", {
    pointToLayer: function (geojsonpoint, latlng) {
        return L.marker(latlng, { icon: atmsLogo });
    },
    onEachFeature: popUp
});

var atmsRemotos = new L.GeoJSON.AJAX("js/leaflet/geojson/atmsRemotos.json", {
    pointToLayer: function (geojsonpoint, latlng) {
        return L.marker(latlng, { icon: atmsLogo });
    },
    onEachFeature: popUp
});

var entidadesSucursales = L.geoJson(entidadesConteo, {
    style: styleSucursales,
    onEachFeature: onEachFeature
})

var entidadesAtmsSucursal = L.geoJson(entidadesConteo, {
    style: styleAtmsSucursal,
    onEachFeature: function (feature, layer) {
        layer.on('click', function () {
            //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
            layer.bindPopup('<h2>' + feature.properties.entidad + '</h2><p>' + "Número de cajeros en sucursal: " + feature.properties.atms_sucursal + '</p>').openPopup();
        });
    }
});

var entidadesAtmsRemotos = L.geoJson(entidadesConteo, {
    style: styleAtmsRemotos,
    onEachFeature: function (feature, layer) {
        layer.on('click', function () {
            //you bind the popup here, you can acces any property of your Geojson with feature.properties.propertyname
            layer.bindPopup('<h2>' + feature.properties.entidad + '</h2><p>' + "Número de cajeros remotos: " + feature.properties.atms_remotos + '</p>').openPopup();
        });
    }
});

// Adding map layers as variables for baseMaps in layer control
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYW5nZWxtb21hIiwiYSI6ImNrNGJ2YmJibDBobzMzbXM1Z2Rpa3M5MGcifQ.F_de8Hnz18gjwJsWa-efZw';

var sat = L.tileLayer(mbUrl, { id: 'mapbox/satellite-streets-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr }),
    light = L.tileLayer(mbUrl, { id: 'mapbox/light-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr });

//baseMap layer
var baseMaps = {
    "Vista de satélite": sat,
    "Vista simplificada": light
};

// overlayMaps
var overlayMaps = {
    "<b>Mapa coroplético:</b> Sucursales": entidadesSucursales,
    "<b>Mapa coroplético:</b> Cajeros en sucursal": entidadesAtmsSucursal,
    "<b>Mapa coroplético:</b> Cajeros remotos": entidadesAtmsRemotos,
    "Sucursales": sucursales,
    "ATMs remotos": atmsRemotos,
    "ATMs en sucursal": atmsSucursal
};

// Calling leaflet map
var mymap = L.map('mapid', {
    center: [22.78, -102.03],
    zoom: 5,
    layers: [light] // mandatory to call baseMap variables for second time
});

entidadesSucursales.addTo(mymap);

// Custom Control
var info = L.control();

info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Sucursales y Cajeros por entidad</h4>' +  (props ?
        '<b>' + props.entidad + '</b><br />' + props.sucursales + ' sucursales' + '</b><br />' +
        props.atms_sucursal + ' cajeros en sucursal' + '</b><br />' +
        props.atms_remotos + ' cajeros remotos'
        : 'Selecciona una entidad');
};

info.addTo(mymap);

// Add Legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (mymap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,200,500,1000,1500],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColorSucursales(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(mymap);

// aux var to get Marker Cluster Layer Support,
mcg = L.markerClusterGroup.layerSupport( { disableClusteringAtZoom: 15 } ),
    // Add Layer for cluster group
    myLayerGroup = L.layerGroup([
        sucursales,
        // intrusion,
        // ctv,
        atmsRemotos,
        atmsSucursal
    ]);

mcg.addTo(mymap);
mcg.checkIn([
    sucursales,
    atmsRemotos,
    atmsSucursal
]); // <= this is where the magic happens!

// Add marker cluster and layer control to my map
L.control.layers(baseMaps, overlayMaps).addTo(mymap);

//check on this one later mcg.disableClustering(14); 

