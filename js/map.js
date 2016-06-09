//references for info box http://leafletjs.com/examples/choropleth.html
console.log('this is danieldev')

var stations = [];
var stationsData = [];
var allData = [];
var currentStation;
var coefs = [
  {
    "Alpine Meadows": 0.0679820367591,
    "Blewett Pass": -0.0314336002476,
    "Bumping Ridge": 0.807246604096,
    "Bunchgrass Meadow": 1.17349534961,
    "Burnt Mountain": 0.103925553852,
    "Corral Pass": 0.00272825414429,
    "Cougar Mountain": 0.0498430202561,
    "Dungeness": -0.071799518424,
    "Elbow Lake": -0.0654249316049,
    "Fish Lake": -0.0159348577276,
    "Green Lake": 0.396216120418,
    "Grouse Camp": 0.0644034608643,
    "Hart's Pass": -0.037341688748,
    "Huckleberry": 0.0501175558505,
    "June Lake": 0.221363808488,
    "Lone Pine": 0.16342287825,
    "Lost Horse": 0.0312107709239,
    "Lyman Lake": -0.218048383003,
    "Meadows Pass": 0.176018617186,
    "Morse Lake": 0.264646334172,
    "Moses Mountain": -0.0298119155019,
    "Mount Crag": 0.161019298463,
    "Mount Gardner": 0.0000452592366492,
    "Mowich": 0.00284297522954,
    "Olallie Meadows": 0.136874637983,
    "Paradise": 0.118255061738,
    "Park Creek Ridge": -0.0616629893438,
    "Pigtail Peak": 0.0942398468177,
    "Pope Ridge": -0.0197238836706,
    "Potato Hill": -0.109491108967,
    "Quartz Peak": -0.109491108967,
    "Rex River": 0.17677536898,
    "Salmon Meadows": 0.0100080913726,
    "Sasse Ridge": 0.0152690645356,
    "Sheep Canyon": -0.524630352584,
    "Skookum Creek": 0.236174280479,
    "Spencer Meadow": -0.137753391997,
    "Spirit Lake": 0.0479380183668,
    "Stampede Pass": -0.194031924728,
    "Surprise Lakes": 0.0692148241447,
    "Swamp Creek": 0.197656853442,
    "Thunder Basin": -0.0478076711617,
    "Tinkham Creek": 0.0285006700444,
    "Touchet": -0.0391618034355,
    "Trough": 0.0531769290953,
    "Upper Wheeler": 0.0119709221454,
    "Waterhole": 0.421157732012,
    "Wells Creek": 0.117237788951,
    "White Pass ES": 0.044909180386
  }
]
//returns the year value on the slider
function getYear() {
    //console.log($("#year").slider("value"));
    return $("#year").slider("value");
}

//returns the box that is clicked (either temperature or precipitation)
function getDataType() {
    // console.log($("#temp1").is(':checked'));
    // console.log($("#precip1").is(':checked'));
    if($("#temp1").is(':checked')) {
        console.log('temperature')
        return 'Air Temperature Average (degF)'  
    } else {
        console.log('precipitation')        
        return 'Snow Water Equivalent (in)'  
    }
}


$(function() {
    //getYear()
    
    // Create a new leaflet map in the "container2" div
    //console.log('test')
    var map = L.map('container2', {scrollWheelZoom: false})
        .setView([47.27, -121.34], 7)  
    
    // var created = false;
    
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
    d3.csv("data/MonthlySensorAverages.csv", function(error, avgData) {   
        allData = avgData;             
        //plots coordinates
        latlng.map(function(d) {
          if(coefs[0][d.name] != null) {
            //console.log(d.name)
            //console.log(coefs[0][d.name])
            var coef = coefs[0][d.name]
            
            //circles and their attributes
            var circle = new L.CircleMarker([d.Latitude, d.Longitude], 10000).addTo(map)
                .setStyle({fillColor: getColor(coef)})
                .setStyle({opacity: .5})
                .setStyle({fillOpacity: .8})
                .setStyle({color: 'white'})
                .setStyle({popupAnchor : [25,25]});
                
            circle.bindPopup('<strong>' + d.name + '</strong>' + '<br>' + 'Elevation: ' + d.Elevation + '<br>'+ 'Latitude: ' + d.Latitude + '<br>' + 'Longitude: ' + d.Longitude + '<br>' + '&Delta; Snowfall/Year: ' + Math.round(coef*100)/100);
            //hover over function that saves all data regarding the sensor as var snow
            var snow = [];
            
            //changes station when clicked
            circle.on('click', function() {
                $('html,body').animate({
                    scrollTop: $("#yearText").offset().top},'slow');
                station = d.name;
                currentStation = station;
                stations.push(station)
                
                barColor = getColor(coefs[0][station]); //changes color of bars
                console.log(avgData);
                bar(avgData, station);
                document.getElementById("barTitle").innerHTML = station; //changes title    
            });
          }else {
              console.log(d.name + 'DID NOT HAVE A CORRESPONDING VALUE')
          }
        });
    });
    
    //creates legend in bottom right corner
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend');
            
        div.innerHTML += '&Delta; Snowfall/Year (inch): <br>'
        
        //legend code
        div.innerHTML +=
                '<i style="background:' + getColor(-1.0) + '"></i> ' +
                'less than -.5'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(-0.5) + '"></i> ' +
                'between -.5 and -.3'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(-0.3) + '"></i> ' +
                'between -.3 and -.1'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(-0.1) + '"></i> ' +
                'between -.1 and 0'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(0.09) + '"></i> ' +
                'between 0 and .1'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(0.29) + '"></i> ' +
                'between .1 and .3'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(0.5) + '"></i> ' +
                'between .3 and .5'+ '<br>';
        div.innerHTML +=
                '<i style="background:' + getColor(1.0) + '"></i> ' +
                'greater than .5'+ '<br>';
        return div;
    };
    legend.addTo(map);
    
    //number distribution for heatmap

});

function getColor(d) {
    if(d == null){return 'brown'}
    
            //blues colors
    return  d > 0.5  ? '#000066' :
            d >= 0.3  ? '#0000ff' :
            d >= 0.1  ? '#0066ff' :                
            d >= 0.0 ? '#99ccff' :
            //red colors
            d >= -0.1  ? '#ff6666' :
            d >= -0.3 ? '#cc0000' :
            d >= -0.5 ? '#800000' :
            d < -0.5 ? '#4d0000':
                        '';
}

$(function() {
    $( "#year" ).slider({
    range: false,
    min: 2000,
    max: 2015,
    value:  2012,
    slide: function( event, ui ) {
        $( ".amount1" ).val(ui.value);
        console.log((ui.value));
    },
    change: function(event, ui) {
        if(created) {
            redrawGraph();
        }
    }
    });
    $( ".amount1" ).val($( "#year" ).slider("value"));
    
    
});

function redrawGraph() {
    console.log(allData);
    bar(allData, currentStation);
}
    // latlng.map(function(d) {
            
    // {
    //     $('html,body').animate({
    //         scrollTop: $("#yearText").offset().top},'slow');
    //     station = d.name;
    //     stations.push(station)
    //     console.log(stations)
    //     snow = allData.filter(function(e){
    //         return (e['SensorName'] == d.name && e['Year'] == getYear());
    //     })
    //     console.log("result of getYear");
    //     console.log(getYear())
    //     var orgSnow = []; 
    //     for(var i = 1; i < 13; i++) {
    //         var obj = snow.filter(function (obj) {
    //             return obj['Month'] === i + '';
    //         })[0];
    //         orgSnow.push(obj);
    //     }
        
    //     stationsData.push(orgSnow);
    //     console.log(stationsData);
    //     console.log(orgSnow);
    //     var currYear = getYear();
    //     console.log(currYear)
    //     getDataType();
        
    //     //changes sensor name
    //     document.getElementById("sensor").innerHTML = d.name;
    //     //adds data to a random p tag
    //     document.getElementById("precip").innerHTML = JSON.stringify(orgSnow);
        
        
    //     barColor = getColor(coefs[0][station]); //changes color of bars
        
    //     if(orgSnow[0] != undefined) {
    //         $("#error").html(""); //deletes any error message
    //         //creates first chart

    //         //removes previous graph elements
    //         $("#vis").html("");
    //         console.log(orgSnow);
    //         console.log(stationsData);
    //         bar(orgSnow);
    //         document.getElementById("barTitle").innerHTML = station; //changes title    
    //     } else {
    //         console.log('station does not have data for this date')
    //         document.getElementById("error").innerHTML = 'Error: There is no data for this year';
    //         $("#vis").html(""); //deletes graph
    //         $("#barTitle").html(""); //deletes title
    //     }
//}})}



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




// loop through our density intervals and generate a label with a colored square for each interval
        // for (var i = 0; i < grades.length; i++) {
        //     div.innerHTML +=
        //         '<i style="background:' + getColor(grades[i]) + '"></i> ' +
        //         grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
        // }

//   function changeColors() {
        //       circle.setStyle({fillColor: getColor(Math.random())});
        //   }
         
        //  function test() {
        //    setTimeout(function(){
        //      changeColors();
        //    }, 3000);   
        //  } 
         
        //  test()

       
          
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
          
          
          
        //   circle.on('mouseout', function (e) {
        //     this.closePopup();
        //   });
        
        
        //var marker = new L.marker([d.Latitude, d.Longitude], 1, {color:'blue', opacity:.5});
          //marker.addTo(map);
          
        //   var icon1 = L.icon({ 
        //     iconSize:     [38, 95], // size of the icon
        //     shadowSize:   [50, 64], // size of the shadow
        //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        //     shadowAnchor: [4, 62],  // the same for the shadow
        //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        //    });
        
        
                    // circle.on('mouseover', function () {
            //     //if(clicked) {
            //         this.openPopup();
            //     //}
            //     station = d.name;
            //     snow = avgData.filter(function(e){
            //         return (e['SensorName'] == d.name);
		    //     })
            //     console.log(d.name)
            //     console.log(snow)
            //     console.log(coefs[0][d.name])
            //     //changes sensor name
            //     document.getElementById("sensor").innerHTML = station;
            //     //adds data to a random p tag
            //     document.getElementById("precip").innerHTML = JSON.stringify(snow);
            //     this.openPopup();
            // });