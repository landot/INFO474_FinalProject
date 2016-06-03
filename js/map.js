//references for info box http://leafletjs.com/examples/choropleth.html




$(function() {
    // Create a new leaflet map in the "container2" div
    //console.log('test')
    var map = L.map('container2', {scrollWheelZoom: false})
        .setView([47.27, -121.34], 7)  
    
    var year = 2000;
    
    //console.log(statesData);
    
    // function onEachFeature(feature, layer) {
    //     layer.on({
    //         mouseover: highlightFeature,
    //         mouseout: resetHighlight,
    //         click: zoomToFeature
    //     });
    // }

    // geojson = L.geoJson(latlng, {
    //     style: getColor,
    //     onEachFeature: onEachFeature
    // }).addTo(map);
    
    
    //hover over
    function highlightFeature(e) {
        var layer = e.target;

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
    
    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }
    
    
    // //zoom to click
    // function zoomToFeature(e) {
    //     map.fitBounds(e.name.getBounds());
    // }
    
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
        //console.log(avgData);
        
        // console.log(avgData.filter(function(d){
		// 	return (d['SensorName'] == 'Elbow Lake');
		// 	}))
        
        
        latlng.map(function(d) {
          //var marker = new L.marker([d.Latitude, d.Longitude], 1, {color:'blue', opacity:.5});
          //marker.addTo(map);
          
        //   var icon1 = L.icon({ 
        //     iconSize:     [38, 95], // size of the icon
        //     shadowSize:   [50, 64], // size of the shadow
        //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        //     shadowAnchor: [4, 62],  // the same for the shadow
        //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        //    });
          
          var circle = new L.CircleMarker([d.Latitude, d.Longitude], 10000).addTo(map)
              .setStyle({fillColor: getColor(Math.random())})
              .setStyle({opacity: .5})
              .setStyle({fillOpacity: .8})
              .setStyle({color: 'white'})
              .setStyle({popupAnchor : [25,25]});
          
          
          function changeColors() {
              circle.setStyle({fillColor: getColor(Math.random())});
          }
         
         function test() {
           setTimeout(function(){
             changeColors();
           }, 3000);   
         } 
         
         test()

       
          
          //changes station when clicked
        //   circle.on('click', function() {
        //      clicked = !clicked;
            //  station = d.name;
            //  console.log(station); 
            //  if(clicked) {
            //     this.openPopup();
            //  }else {
            //     this.closePopup();
            //  }
          //})

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
          circle.on('mouseover', function () {
            station = d.name;
            var snow = avgData.filter(function(e){
                return (e['SensorName'] == d.name);
		    })
            console.log(d.name)
            console.log(snow)
            document.getElementById("sensor").innerHTML = station;
            document.getElementById("precip").innerHTML = JSON.stringify(snow);
            this.openPopup();
          });
        //   circle.on('mouseout', function (e) {
        //     this.closePopup();
        //   });
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
        return  d > .800  ? 'blue' :
                d > .600  ? 'lightblue' :
                d > .400  ? 'yellow' :
                d > .20   ? 'orange' :
                d > .10   ? 'red' :
                            'red';
    }
});