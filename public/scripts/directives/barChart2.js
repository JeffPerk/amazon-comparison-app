angular.module('compareApp')
  .directive('barChart2', function() {
    return  {
      scope: {
        data: "="
      },
      link: function(scope, elem, attr) {
          var dataArray = [20,30,40,50];
          var width = 400;
          var height = 400;

          var heigthScale = d3.scale.linear()
            .domain([0, 50])
            .range([0, height]);

          var canvas = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

          var color = d3.scale.linear()
            .domain([0, 50])
            .range(["red", "blue"]);

          var bars = canvas.selectAll("rect")
            .data(dataArray)
            .enter()
              .append("rect")
              .attr("width", 50)
              .attr("height", function(d) { return heigthScale(d); })
              .attr("fill", function(d) { return color(d); })
              .attr("x", function(d, i) { return i * 30; });
      }
    };
  });
