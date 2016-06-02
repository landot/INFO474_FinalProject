$(function() {
    // Create a new leaflet map in the "container2" div
    //console.log('test')
    var map = L.map('container2')
        .setView([47.27, -121.34], 7)  
    
    //console.log(statesData);
    
    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature
        });
    }

    geojson = L.geoJson(latlng, {
        style: getColor,
        onEachFeature: onEachFeature
    }).addTo(map);
    
    
    //hover over
    function highlightFeature(e) {
        var layer = e.name;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }
    
    //zoom to click
    function zoomToFeature(e) {
        map.fitBounds(e.name.getBounds());
    }
    
    function stateStyle(feature) {
        return {
            weight: 3,
            opacity: 1,
            color:'green',
            dashArray: '5',
            fillOpacity: 0.1
        };
    }
    
    // Create layers for plotting points and adding state lines
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{ minZoom: 7, maxZoom: 13}).addTo(map);
    var states = L.geoJson(statesData, {style: stateStyle}).addTo(map);
    
    //adding leaflet coordinate variable
    latlng.forEach(function(d) {
        d.Coord = new L.LatLng(d.Latitude, d.Longitude);
    });
    
    //current clicked station variable
    var station;

    d3.csv("data/MonthlyAverages.csv", function(error, avgData) {
        latlng.map(function(d) {
          //var marker = new L.marker([d.Latitude, d.Longitude], 1, {color:'blue', opacity:.5});
          //marker.addTo(map);
          
          var circle = new L.circle([d.Latitude, d.Longitude], 10000, {color:getColor(Math.random()), opacity:.7}, function(){console.log(d.name)}).addTo(map);
          
          //changes station when clicked
          circle.on('click', function() {
             station = d.name
             console.log(station); 
          })

          /*
          var snow = avgData.filter(function(dd) {
              var months = [];
              if(dd.SensorName == name) {
                  console.log(dd['Snow Water Equivalent (in)'])
                  var temp = {}
                  temp.month = dd.Month
                  temp.snowfall = dd['Snow Water Equivalent (in)']
                  months.push(temp)
              }
              return months
          });*/
          
          circle.bindPopup('<strong>' + d.name + '</strong>' + '<br>' + 'Elevation: ' + d.Elevation + '<br>'+ 'Latitude: ' + d.Latitude + '<br>' + 'Longitude: ' + d.Longitude + '<br>')
        });
    });
    
    //creates legend in bottom right corner
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0.2, 0.4, 0.6, 0.8, 1.0],
            labels = [];
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                grades[i] + (grades[i] ? '&ndash;' + grades[i] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
    
    //number distribution for heatmap
    function getColor(d) {
        return  d > 1.000 ? 'blue' :
                d > .800  ? 'blue' :
                d > .600  ? 'tan' :
                d > .400  ? 'yellow' :
                d > .20   ? 'orange' :
                d > .10   ? 'red' :
                d > .010   ? 'black' :
                           '#FFEDA0';
    }
});