
function changeYear(year) {
    $("#year").slider('value',year);
    $( ".amount1" ).val($( "#year" ).slider("value"));
    
}

var tempYear;
var pressPlay = function() {
    tempYear = $("#year").slider('value');
    console.log("pressing play");
    myTimer = setInterval(function() {
        console.log('waiting 5..')
        tempYear = tempYear + 1
        changeYear(tempYear);
        if(tempYear > 2014) {
            pressPause()
        }
    }, 3000);
    console.log('done')
    console.log(tempYear)
    
    };
$( ".amount1" ).val($( "#year" ).slider("value"));

var pressPause = function() {
    console.log("pressing pause");
    clearInterval (myTimer);
}
/*
$(document).ready(function() {
	//d3.csv('data/WeeklyAveragesBySensor.csv',function(error, allData){
    console.log(allData);
    var xScale, yScale, currentData, sensors, altitudes, summaryMonths, minYr, maxYr,minMonth,maxMonth,minDay,maxDay;
    currentData = allData;
    
    var CurrSensor = 'Blewett Pass'
    minYr = 1990
    maxYr = 2006
    minMonth = 1
    maxMonth = 12
    // minDay = 1
    // maxDay = 20

    var margin = {
        left:80,
        bottom:80,
        top:50,
        right:50
    }

    var svg = d3.select('#vis')
                .append('svg')
                .attr('height',600)
                .attr('width',800)

    var height = 600 - margin.bottom - margin.top;
    var width = 800 - margin.left - margin.right;

    var Rects = svg.append('g')
                    .attr('transform','translate(' + margin.left + ',' + margin.top + ')')
                    .attr('height', height)
                    .attr('width', width)

    var xAxisLabel = svg.append('g')
                                    .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
                                    .attr('class', 'axis');
    var yAxisLabel = svg.append('g')
                                    .attr('class', 'axis')
                                    .attr('transform', 'translate(' + (margin.left+10) + ',' + (margin.top) + ')');

    // Place axis text - to fill in depending on filtered data
    var xAxisText = svg.append('text')
                                    .attr('transform', 'translate(' + (margin.left + width/2 - 100) + ',' + (height + margin.top + 80) + ')')
                                    .attr('class', 'title');
    var yAxisText = svg.append('text')
                                    .attr('transform', 'translate(' + (margin.left - 55) + ',' + (margin.top + height - 100) + ') rotate(-90)')
                                    .attr('class', 'title');

    var setScales = function(data, type, value, log) {
        if(type == 'cat'){
            var domain = data.map(function(d) {return d[value]});
            return d3.scale.ordinal().rangeBands([0,width],.2).domain(domain)
        }
        else
        {
            var min = d3.min(data, function(d){return +d[value]})
            var max = d3.max(data, function(d){return +d[value]})
            if(log == 1){
                return d3.scale.log().range([height,0]).domain([min, max])
            } else {
                return d3.scale.linear().range([height,0]).domain([min, max])
            }
        }
    }

    //set axes from scales
    var setAxes = function(xScale, yScale){
        var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
        var yAxis = d3.svg.axis().scale(yScale).orient('left');

        xAxisLabel.transition().duration(1500).call(xAxis)
                                        .selectAll("text")
                                            .attr("transform", function(d) {
                                                return "" 
                                            });
        yAxisLabel.transition().duration(1500).call(yAxis)
        xAxisText.text('Month of Year')
        yAxisText.text('Cumulative Snowfall')

    }

    $("#year").on('change', function DRGfunction() {
        // Get DRG value
        console.log('year change detected')
    });

    var draw = function(data, xval, yval){
        xScale = setScales(data, 'cat', xval, 0)
        yScale = setScales(data, 'reg', yval, 0)

        // Set up user input
        //setSliders();
        
        // Set axes
        setAxes(xScale,yScale)

        //binding
        var bars = Rects.selectAll('rect').data(data);

        //visualization
        bars.enter().append('rect')
            .attr('x', function(d) {return xScale(d[xval])})
            .attr('y', height)
            .attr('height', 0)
            .attr('width', xScale.rangeBand());

        bars.exit().remove();

        bars.transition()
            .duration(1500)
            .delay(500)
            .attr('x', function(d) {return xScale(d[xval])})
            .attr('y', function(d) { return yScale(d[yval])})
            .attr('height', function(d) {return height-yScale(d[yval])})
            .attr('width', xScale.rangeBand());
    }

    var filterData = function() {
        currentData = allData.filter(function(d){
            return (d['Month'] >= minMonth && d['Month'] <= maxMonth && d['Year'] >= minYr && d['Year'] <= maxYr)
        })
    }

// d3.csv('data/latlng.csv', function(data){
// 		data.forEach(function(d) {
// 			d.Altitude = +d.Altitude
// 			d.FName = d.FullName
// 			d.SnowWaterEquiv = +d.SnowWaterEquiv
// 			d.PrecipitationAccum = +d.PrecipitationAcum
// 		});
// 		return data
// });

d3.csv('data/MonthlyAverages.csv', function(data){
        data.forEach(function(d) {
            d.Altitude = +d.Altitude
            d.SensorName = d.SensorName
            d.SnowWaterEquiv = +d.SnowWaterEquiv
            d.PrecipitationAccum = +d.PrecipitationAcum
        });
        currentData = data.filter(function(d){
            return d.SensorName == CurrSensor
        })
        console.log(currentData)
        filterData()
        draw(currentData, 'Month', 'Snow Water Equivalent (in)')
        console.log("done")
});
	//});
});
*/