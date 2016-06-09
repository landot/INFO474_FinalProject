var barData;
var barColor;
var created = false;

function bar(data1, station) {
   
    
    var xScale, yScale, currentData, sensors, altitudes, summaryMonths, minYr, maxYr,minMonth,maxMonth,minDay,maxDay;
    
    barColor = getColor(coefs[0][station]);
   
    var snow = data1.filter(function(e){
        if(e != undefined) {
            return (e['SensorName'] == station && e['Year'] == getYear());
        }
    })
    console.log(getYear())
    var orgSnow = []; 
    for(var i = 1; i < 13; i++) {
        var obj = snow.filter(function (obj) {
            return obj['Month'] === i + '';
        })[0];
        orgSnow.push(obj);
    }
    
    if(orgSnow[0] != undefined) {
        $("#error").html(""); //deletes any error message
        //creates first chart
        if(created == false) {
            created = true;
        //creates subsequent charts
        }else {
            //removes previous graph elements
            $("#vis").html("");
        }
        currentData = orgSnow;
        minYr = 1990
        maxYr = 2006
        yr = 2000
        minMonth = 1
        maxMonth = 12
        
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

        var xAxisText = svg.append('text')
                                        .attr('transform', 'translate(' + (margin.left + width/2 - 100) + ',' + (height + margin.top + 80) + ')')
                                        .attr('class', 'title');
        var yAxisText = svg.append('text')
                                        .attr('transform', 'translate(' + (margin.left - 55) + ',' + (margin.top + height - 100) + ') rotate(-90)')
                                        .attr('class', 'title');

        var setScales = function(data, type, value, log) {
            if(type == 'cat'){
                console.log(data);
                var domain = data.map(function(d) {
                    console.log(d)
                    if(d == undefined) {
                        console.log('number does not exist');
                        return 0;
                    }
                    return d[value]
                });
                return d3.scale.ordinal().rangeBands([0,width],.2).domain(domain)
            }
            else {
                var min = d3.min(data, function(d){
                    if(d == undefined) {
                        console.log('number does not exist');
                        return 0;
                    }
                    return +d[value]
                })
                var max = d3.max(data, function(d){
                    if(d == undefined) {
                        console.log('number does not exist');
                        return 0;
                    }
                    return +d[value]
                })
                if(log == 1){
                    return d3.scale.log().range([height,0]).domain([min, max])
                } else {
                    return d3.scale.linear().range([height,0]).domain([min, max])
                }
            }
        }
        
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
            yAxisText.text(function(){
                var feat = getDataType();
                if(feat == 'Air Temperature Average (degF)') {
                    return 'Average Temperature'
                }else {
                    return 'Average Snowfall (in)'
                }
            })

        }

        
        var draw = function(data, xval, yval){
            console.log('drawing now yo');
            xScale = setScales(data, 'cat', xval, 0)
            yScale = setScales(data, 'reg', yval, 0)
                                    
        // Set axes
        setAxes(xScale,yScale)

        //binding
        var bars = Rects.selectAll('rect').data(data);

        //visualization
        bars.enter().append('rect')
            .attr('x', function(d) {
                if(d == null) {
                    return 0
                }
                return xScale(d[xval])
            })
            .attr('y', height)
            .attr('height', 0)
            .attr("fill", barColor)
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
        draw(currentData, 'Month', getDataType())
    }else {
        console.log('station does not have data for this date')
        document.getElementById("error").innerHTML = 'Error: There is no data for this year';
        $("#vis").html(""); //deletes graph
        $("#barTitle").html(""); //deletes title
    }
}   
