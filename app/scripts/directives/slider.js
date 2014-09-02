(function () {
  'use strict';
  angular.module('frontendApp').directive('sliderChart', function () {
    return {
      restrict: 'EA',
      scope: {
        startDate: '=',
        endDate: '=',
        minDate: '=',
        maxDate: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch('startDate', function(){
          render();
        });

        
        var render = function(){

          // if (!scope.startDate || !scope.endDate) {
          //   return;
          // }
          
          // element.empty();

	  // var margin = {top: 10, right: 10, bottom: 100, left: 40},
	  // margin2 = {top: 430, right: 10, bottom: 20, left: 40},
	  // width = 960 - margin.left - margin.right,
	  // height = 500 - margin.top - margin.bottom,
	  // height2 = 500 - margin2.top - margin2.bottom;

	  // var parseDate = d3.time.format("%b %Y").parse;

	  // var x = d3.time.scale().range([0, width]),
	  // x2 = d3.time.scale().range([0, width]),
	  // y = d3.scale.linear().range([height, 0]),
	  // y2 = d3.scale.linear().range([height2, 0]);

	  // var xAxis = d3.svg.axis().scale(x).orient("bottom"),
	  // xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
	  // yAxis = d3.svg.axis().scale(y).orient("left");

	  // var brush = d3.svg.brush()
	  //   .x(x2)
	  //   .on("brush", brushed);

	  // var count = 0;
	  // var area = d3.svg.area()
	  //   .interpolate("monotone")
	  //   .x(function(d) { return x(d.date); })
	  //   .y0(height)
	  //   .y1(function(d) { return y(d.price); });

	  // var area1 = d3.svg.area()
	  //   .interpolate("monotone")
	  //   .x(function(d) { return x(d.date); })
	  //   .y0(height)
	  //   .y1(function(d) { return y(d.price - 100); });

	  
	  // var area2 = d3.svg.area()
	  //   .interpolate("monotone")
	  //   .x(function(d) { return x2(d.date); })
	  //   .y0(height2)
	  //   .y1(function(d) { return y2(d.price); });

	  // var svg = d3.select("body").append("svg")
	  //   .attr("width", width + margin.left + margin.right)
	  //   .attr("height", height + margin.top + margin.bottom);

	  // svg.append("defs").append("clipPath")
	  //   .attr("id", "clip")
	  //   .append("rect")
	  //   .attr("width", width)
	  //   .attr("height", height);

	  // var focus = svg.append("g")
	  //   .attr("class", "focus")
	  //   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  // var context = svg.append("g")
	  //   .attr("class", "context")
	  //   .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

	  // d3.csv("../../sp500.csv", type, function(error, data) {
	  //   x.domain(d3.extent(data.map(function(d) { return d.date; })));
	  //   y.domain([0, d3.max(data.map(function(d) { return d.price; }))]);
	  //   x2.domain(x.domain());
	  //   y2.domain(y.domain());
	    
	  //   focus.append("path")
	  //     .datum(data)
	  //     .attr("class", "area")
	  //     .attr("d", area);

	  //   focus.append("path")
	  //     .datum(data)
	  //     .attr("class", "area1")
	  //     .attr("d", area1);

	  //   focus.append("g")
	  //     .attr("class", "x axis")
	  //     .attr("transform", "translate(0," + height + ")")
	  //     .call(xAxis);

	  //   focus.append("g")
	  //     .attr("class", "y axis")
	  //     .call(yAxis);

	  //   context.append("path")
	  //     .datum(data)
	  //     .attr("class", "area")
	  //     .attr("d", area2);

	  //   context.append("g")
	  //     .attr("class", "x axis")
	  //     .attr("transform", "translate(0," + height2 + ")")
	  //     .call(xAxis2);

	  //   context.append("g")
	  //     .attr("class", "x brush")
	  //     .call(brush)
	  //     .selectAll("rect")
	  //     .attr("y", -6)
	  //     .attr("height", height2 + 7);

	  
          // d3 code goes
          
          // requesting data

          // brush change handler?
          // var changeHandler = function() {
          //   scope.startDate = newValue;
          // }          
        };
      }
    };
  });
}).call(this);

/*
(function () {
  'use strict';
  angular.module('frontendApp').directive('bubbleChart', function () {
    return {
      restrict: 'EA',
      scope: {
        donations: '=',
        colorMap: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch('donations', function(){
          if (scope.donations && !_(scope.donations).isEmpty()) {
            render();
          }
        });

        var render = function(){
          var width = 1170;
          var height = 800;

          var colorMap = function(d) {
            return scope.colorMap[d.category];
          };

          var bubble = d3.layout.pack()
            .sort(null)
            .size([width, height])
            .padding(1.5);

          var svg = d3.select(element[0]).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'bubble');

          var node = svg.selectAll('.node')
            .data(bubble.nodes(scope.donations)
            .filter(function(d){
              return d.depth > 0;
            }))
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', function(d) {
              return 'translate(' + d.x + ',' + d.y + ')';
            });

          node.append('title')
            .text(function(d) {
              return d.category + ': ' + d.value;
            });

          node.append('circle')
            .attr('r', function(d) { return d.r; })
            .style('fill', colorMap);

          node.append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .text(function(d) { return d.category; });
        };

      }
    };
  });

}).call(this);

*/
