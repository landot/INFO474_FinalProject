$(function() {
    // Create a new leaflet map in the "container2" div
    //console.log('test')
    var map = L.map('container2')
        .setView([47.27, -121.34], 7)
        //._layersMaxZoom=8
        //.options.maxZoom = 8;
    
    
    
    
    // function onEachFeature(feature, layer) {
    //     layer.on({
    //         mouseover: highlightFeature,
    //         mouseout: resetHighlight,
    //         click: zoomToFeature
    //     });
    // }

    // geojson = L.geoJson(latlng, {
    //     style: style,
    //     onEachFeature: onEachFeature
    // }).addTo(map);
    
    
    // //hover over
    // function highlightFeature(e) {
    //     var layer = e.name;

    //     layer.setStyle({
    //         weight: 5,
    //         color: '#666',
    //         dashArray: '',
    //         fillOpacity: 0.7
    //     });

    //     if (!L.Browser.ie && !L.Browser.opera) {
    //         layer.bringToFront();
    //     }
    // }
    
    // //zoom to click
    // function zoomToFeature(e) {
    //     map.fitBounds(e.name.getBounds());
    // }
    
    // Create an OpenStreetMap tile layer variable using their url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',{ minZoom: 7, maxZoom: 13})
    
    // Add the layer to your map
    layer.addTo(map)

    /* Initialize the SVG layer */
    
    /* We simply pick up the SVG from the map object */
    var svg = d3.select("#map").select("svg"),
        g = svg.append("g");

    


    var latlng = [{
            'name': 'Alpine Meadows',
            'Elevation': 3500,
            'Latitude': 47.78,
            'Longitude': -121.7
        },

        {
            'name': 'Beaver Pass',
            'Elevation': 3630,
            'Latitude': 48.88,
            'Longitude': -121.26
        },

        {
            'name': 'Blewett Pass',
            'Elevation': 4240,
            'Latitude': 47.35,
            'Longitude': -120.68
        },

        {
            'name': 'Brown Top',
            'Elevation': 5830,
            'Latitude': 48.93,
            'Longitude': -121.2
        },

        {
            'name': 'Buckinghorse',
            'Elevation': 4870,
            'Latitude': 47.71,
            'Longitude': -123.46
        },

        {
            'name': 'Bumping Ridge',
            'Elevation': 4610,
            'Latitude': 46.81,
            'Longitude': -121.33
        },

        {
            'name': 'Bunchgrass Mdw',
            'Elevation': 5000,
            'Latitude': 48.69,
            'Longitude': -117.18
        },

        {
            'name': 'Burnt Mountain',
            'Elevation': 4170,
            'Latitude': 47.04,
            'Longitude': -121.94
        },

        {
            'name': 'Calamity',
            'Elevation': 2500,
            'Latitude': 45.9,
            'Longitude': -122.22
        },

        {
            'name': 'Cayuse Pass',
            'Elevation': 5240,
            'Latitude': 46.87,
            'Longitude': -121.53
        },

        {
            'name': 'Corral Pass',
            'Elevation': 5800,
            'Latitude': 47.02,
            'Longitude': -121.46
        },

        {
            'name': 'Cougar Mountain',
            'Elevation': 3200,
            'Latitude': 47.28,
            'Longitude': -121.67
        },

        {
            'name': 'Dungeness',
            'Elevation': 4010,
            'Latitude': 47.87,
            'Longitude': -123.08
        },

        {
            'name': 'Easy Pass',
            'Elevation': 5270,
            'Latitude': 48.86,
            'Longitude': -121.44
        },

        {
            'name': 'Elbow Lake',
            'Elevation': 3040,
            'Latitude': 48.69,
            'Longitude': -121.91
        },

        {
            'name': 'Fish Lake',
            'Elevation': 3430,
            'Latitude': 47.54,
            'Longitude': -121.09
        },

        {
            'name': 'Gold Axe Camp',
            'Elevation': 5360,
            'Latitude': 48.95,
            'Longitude': -118.99
        },

        {
            'name': 'Gold Mountain',
            'Elevation': 4390,
            'Latitude': 48.19,
            'Longitude': -118.46
        },

        {
            'name': 'Green Lake',
            'Elevation': 5920,
            'Latitude': 46.55,
            'Longitude': -121.17
        },

        {
            'name': 'Grouse Camp',
            'Elevation': 5390,
            'Latitude': 47.28,
            'Longitude': -120.49
        },

        {
            'name': 'Harts Pass',
            'Elevation': 6490,
            'Latitude': 48.72,
            'Longitude': -120.66
        },

        {
            'name': 'Hozomeen Camp',
            'Elevation': 1690,
            'Latitude': 48.98,
            'Longitude': -121.08
        },

        {
            'name': 'Huckleberry Creek',
            'Elevation': 2250,
            'Latitude': 47.07,
            'Longitude': -121.59
        },

        {
            'name': 'Indian Rock',
            'Elevation': 5360,
            'Latitude': 45.99,
            'Longitude': -120.81
        },

        {
            'name': 'June Lake',
            'Elevation': 3440,
            'Latitude': 46.15,
            'Longitude': -122.15
        },

        {
            'name': 'Lone Pine',
            'Elevation': 3930,
            'Latitude': 46.27,
            'Longitude': -121.96
        },

        {
            'name': 'Lost Horse',
            'Elevation': 5120,
            'Latitude': 46.36,
            'Longitude': -121.08
        },

        {
            'name': 'Lyman Lake',
            'Elevation': 5980,
            'Latitude': 48.2,
            'Longitude': -120.92
        },

        {
            'name': 'Lynn Lake',
            'Elevation': 3900,
            'Latitude': 47.2,
            'Longitude': -121.78
        },

        {
            'name': 'Marten Ridge',
            'Elevation': 3520,
            'Latitude': 48.76,
            'Longitude': -121.7
        },

        {
            'name': 'Meadows Pass',
            'Elevation': 3230,
            'Latitude': 47.28,
            'Longitude': -121.47
        },

        {
            'name': 'MF Nooksack',
            'Elevation': 4970,
            'Latitude': 48.82,
            'Longitude': -121.93
        },

        {
            'name': 'Mount Crag',
            'Elevation': 3960,
            'Latitude': 47.76,
            'Longitude': -123.03
        },

        {
            'name': 'Morse Lake',
            'Elevation': 5410,
            'Latitude': 46.91,
            'Longitude': -121.48
        },

        {
            'name': 'Moses Mtn',
            'Elevation': 5010,
            'Latitude': 48.36,
            'Longitude': -119.08
        },

        {
            'name': 'Mount Gardner',
            'Elevation': 2920,
            'Latitude': 47.36,
            'Longitude': -121.57
        },

        {
            'name': 'Mowich',
            'Elevation': 3160,
            'Latitude': 46.93,
            'Longitude': -121.95
        },

        {
            'name': 'Muckamuch',
            'Elevation': 4470,
            'Latitude': 48.59,
            'Longitude': -119.87
        },

        {
            'name': 'Olallie Meadows',
            'Elevation': 4030,
            'Latitude': 47.37,
            'Longitude': -121.44
        },

        {
            'name': 'Paradise',
            'Elevation': 5130,
            'Latitude': 46.78,
            'Longitude': -121.75
        },

        {
            'name': 'Park Creek Ridge',
            'Elevation': 4600,
            'Latitude': 48.44,
            'Longitude': -120.92
        },

        {
            'name': 'Pepper Creek',
            'Elevation': 2140,
            'Latitude': 46.1,
            'Longitude': -121.96
        },

        {
            'name': 'Pigtail Peak',
            'Elevation': 5800,
            'Latitude': 46.62,
            'Longitude': -121.39
        },

        {
            'name': 'Pinto Rock',
            'Elevation': 4440,
            'Latitude': 46.32,
            'Longitude': -121.94
        },

        {
            'name': 'Pope Ridge',
            'Elevation': 3590,
            'Latitude': 47.99,
            'Longitude': -120.57
        },

        {
            'name': 'Potato Hill',
            'Elevation': 4510,
            'Latitude': 46.35,
            'Longitude': -121.51
        },

        {
            'name': 'Quartz Peak',
            'Elevation': 4700,
            'Latitude': 47.88,
            'Longitude': -117.09
        },

        {
            'name': 'Rainy Pass',
            'Elevation': 4890,
            'Latitude': 48.52,
            'Longitude': -120.74
        },

        {
            'name': 'Rex River',
            'Elevation': 3810,
            'Latitude': 47.3,
            'Longitude': -121.6
        },

        {
            'name': 'Salmon Meadows',
            'Elevation': 4460,
            'Latitude': 48.66,
            'Longitude': -119.84
        },

        {
            'name': 'Sasse Ridge',
            'Elevation': 4340,
            'Latitude': 47.38,
            'Longitude': -121.06
        },

        {
            'name': 'Satus Pass',
            'Elevation': 3960,
            'Latitude': 45.99,
            'Longitude': -120.68
        },

        {
            'name': 'Sawmill Ridge',
            'Elevation': 4640,
            'Latitude': 47.16,
            'Longitude': -121.42
        },

        {
            'name': 'Sentinel Butte',
            'Elevation': 4680,
            'Latitude': 48.86,
            'Longitude': -118.4
        },

        {
            'name': 'Sheep Canyon',
            'Elevation': 3990,
            'Latitude': 46.19,
            'Longitude': -122.25
        },

        {
            'name': 'Skate Creek',
            'Elevation': 3770,
            'Latitude': 46.64,
            'Longitude': -121.83
        },

        {
            'name': 'Skookum Creek',
            'Elevation': 3310,
            'Latitude': 47.68,
            'Longitude': -121.61
        },

        {
            'name': 'Sourdough Gulch',
            'Elevation': 4000,
            'Latitude': 46.24,
            'Longitude': -117.39
        },

        {
            'name': 'Spencer Meadow',
            'Elevation': 3400,
            'Latitude': 46.18,
            'Longitude': -121.93
        },

        {
            'name': 'Spirit Lake',
            'Elevation': 3520,
            'Latitude': 46.26,
            'Longitude': -122.18
        },

        {
            'name': 'Spruce Springs',
            'Elevation': 5700,
            'Latitude': 46.18,
            'Longitude': -117.54
        },

        {
            'name': 'Stampede Pass',
            'Elevation': 3850,
            'Latitude': 47.27,
            'Longitude': -121.34
        },

        {
            'name': 'Stevens Pass',
            'Elevation': 3950,
            'Latitude': 47.75,
            'Longitude': -121.09
        },

        {
            'name': 'Surprise Lakes',
            'Elevation': 4290,
            'Latitude': 46.09,
            'Longitude': -121.76
        },

        {
            'name': 'Swamp Creek',
            'Elevation': 3930,
            'Latitude': 48.57,
            'Longitude': -120.78
        },

        {
            'name': 'Swift Creek',
            'Elevation': 4440,
            'Latitude': 46.16,
            'Longitude': -122.18
        },

        {
            'name': 'Thunder Basin',
            'Elevation': 4320,
            'Latitude': 48.53,
            'Longitude': -120.99
        },

        {
            'name': 'Tinkham Creek',
            'Elevation': 2990,
            'Latitude': 47.33,
            'Longitude': -121.47
        },

        {
            'name': 'Touchet',
            'Elevation': 5530,
            'Latitude': 46.12,
            'Longitude': -117.85
        },

        {
            'name': 'Trinity',
            'Elevation': 2930,
            'Latitude': 48.07,
            'Longitude': -120.85
        },

        {
            'name': 'Trough',
            'Elevation': 5480,
            'Latitude': 47.23,
            'Longitude': -120.29
        },

        {
            'name': 'Upper Wheeler',
            'Elevation': 4330,
            'Latitude': 47.29,
            'Longitude': -120.37
        },

        {
            'name': 'Waterhole',
            'Elevation': 5010,
            'Latitude': 47.94,
            'Longitude': -123.43
        },

        {
            'name': 'Wells Creek',
            'Elevation': 4030,
            'Latitude': 48.87,
            'Longitude': -121.79
        },

        {
            'name': 'White Pass E.S.',
            'Elevation': 4440,
            'Latitude': 46.64,
            'Longitude': -121.38
        },
    ];

    latlng.forEach(function(d) {
        d.Coord = new L.LatLng(d.Latitude, d.Longitude);
    });

    //console.log(latlng);
    
    
    var point = g.selectAll("circle")
        .data(latlng)
        .enter().append("circle")
        .style("stroke", "black")
        .style("opacity", .6)
        .style("fill", "red")
        .attr("r", 10);

    map.on("viewreset", update);
    update();

    function update() {
        point.attr("transform",
            function(d) {
                return "translate(" +
                    map.latLngToLayerPoint(d.LatLng).x + "," +
                    map.latLngToLayerPoint(d.LatLng).y + ")";
            }
        )
    }
    
    d3.csv("data/MonthlyAverages.csv", function(error, avgData) {
        //console.log(avgData)
        
        latlng.map(function(d) {
          //console.log(d.name)
          //var marker = new L.marker([d.Latitude, d.Longitude], 1, {color:'blue', opacity:.5});
          //marker.iconSize = [1000, 1000];
          //marker.addTo(map);
          
          
          var circle = new L.circle([d.Latitude, d.Longitude], 10000, {color:getColor(Math.random()), opacity:.7}).addTo(map);
          
          /*
          var name = d.name          
          
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
          
          //console.log(d.name + snow)
          circle.bindPopup('<strong>' + d.name + '</strong>' + '<br>' + 'Elevation: ' + d.Elevation + '<br>'+ 'Latitude: ' + d.Latitude + '<br>' + 'Longitude: ' + d.Longitude + '<br>')
        });
    
    
    
    });
    
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0.2, 0.4, 0.6, 0.8, 1.0],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i]) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);
    
    
    
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




//   $.ajax({
//       url:'https://data.seattle.gov/resource/7ais-f98f.json?year=2015&$limit=500',
//       type: "get",
//       success:function(dat) {
//          data = dat
//          // Loop through your data array and create a new circle for each element in your data array
//         data.map(function(d){
//            var circle = new L.marker([d.latitude, d.longitude], 200, {color:'red', opacity:.5}).addTo(map)

//            // Get the text that you want here
//            var text =  d.offense_type

//            // Bind the text to your circle
//            circle.bindPopup(text)
//         })
//       },
//      dataType:"json"
//   })