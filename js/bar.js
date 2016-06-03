var barData;
var barColor = 'black';

function bar(data, xScale, yScale, xval, yval) {
    var currentData, sensors, altitudes, summaryMonths, minYr, maxYr,minMonth,maxMonth,minDay,maxDay;
    currentData = data;
    
    
    var curYear = $( "#year" ).slider( "value")
    var curMonth = $( "#month" ).slider( "value");
    
    console.log(curMonth);
    console.log(curYear);
    
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
    
    var draw = function(data, xval, yval){
        /*xScale = setScales(data, 'cat', xval, 0)
        yScale = setScales(data, 'reg', yval, 0)*/
                                
    // Set axes
    setAxes(xScale,yScale)

    //binding
    var bars = Rects.selectAll('rect').data(data);
    console.log(xScale);
    console.log(yScale);
    //visualization
    bars.enter().append('rect')
        .attr('x', function(d) {return xScale(d[xval])})
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
    
    //set scales
    

    draw(currentData, 'Month', 'Snow Water Equivalent (in)')
}