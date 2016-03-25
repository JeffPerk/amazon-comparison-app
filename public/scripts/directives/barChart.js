(function() {
  angular.module('compareApp')

  .directive('barChart', [function() {
    return {
      scope: {
        data: '='
      },
      link: function(scope, elem, attrs) {

        scope.$watch("data", function(n, o) {
          if (o !== n) {
            updateChart();
          }
        });

        var margin = {
            top: 20,
            right: 20,
            bottom: 100,
            left: 50
          },
          width = 960 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

        var x0 = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
          .range([height, 0]);

        var color = d3.scale.ordinal()
          .range(["rgba(100, 100, 100, .05)", "#8a89a6", "#7b6888", "#6b486b"]);

        var xAxis = d3.svg.axis()
          .scale(x0)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(d3.format(".2s"));

        var svg = d3.select(elem[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function updateChart() {
          var data = scope.data;
          if (data) {
            var titleNames = d3.keys(data[0]).filter(function(key) {
              return key !== "title";
            });

            data.forEach(function(d) {
              d.price = titleNames.map(function(name) {
                return {
                  name: name,
                  value: +d[name]
                };
              });
            });
            x0.domain(data.map(function(d) {
              return d.title;
            }));
            x1.domain(titleNames).rangeRoundBands([0, x0.rangeBand()]);

            y.domain([0, d3.max(data, function(d) {
              return d3.max(d.price, function(d) {
                return d.value;
              });
            }) * 1.07]);

            exitAll(item);

            // updateXAxis();
            drawXAxis(titleNames, data);

            // updateYAxis();
            drawYAxis();

            var item = svg.selectAll(".item")
              .data(data)
              .enter().append("g")
              .attr("class", "state")
              .attr("transform", function(d) {
                return "translate(" + x0(d.title) + ",0)";
              });

            drawBars(item);
            updateBars(item);

            var legend = svg.selectAll(".legend")
              .data(titleNames.slice().reverse())
              .enter().append("g")
              .attr("class", "legend")
              .attr("transform", function(d, i) {
                return "translate(0," + i * 20 + ")";
              });

            // updateLegend(legend);
            drawLegend(legend);
          } else {
            return "error";
          }


          function exitAll(item) {
            if(item) {
              item.selectAll(".item").exit().remove();
              item.selectAll("text").exit().remove();
            }
          }

          function drawXAxis() {
            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll("text")
              .call(wrap, x0.rangeBand());
          }

          function drawYAxis() {
            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Pricing");

          }

          function updateBars(item) {
            console.log(item);
            item
              .attr("y", function(d) {
                return y(d.value);
              })
              .attr("height", function(d) {
                return height - y(d.value);
              })

          }

          // var newArray =[48, 21, 23, 98, 12, 10, 78, 55, 62, 39];
          //
          // d3.select("body")
          //   .selectAll('div')
          //   .data(newArray)
          //   .enter()
          //   .append("div")
          //   .style("height", function(d, i) {
          //     return 0;
          //   });
          //
          //   function drawBars(item) {
          //     d3.select("body")
          //     .selectAll("div")
          //     .data(item.price)
          //     .transition()
          //     .duration(1500)
          //     .style("width", x1.rangeBand())
          //     .attr("x", function(d) {
          //       return x1(d.name);
          //     })
          //     .attr("y", function(d) {
          //       return y(d.value);
          //     })
          //     .style("height", function(d) {
          //       return height - y(d.value);
          //     })
          //     .style("fill", function(d) {
          //       return color(d.name);
          //     });
          //   }

          function drawBars(item) {
            item.selectAll("rect")
              .data(function(d) {
                return d.price;
              })
              .enter().append("rect")
              .attr("width", x1.rangeBand())
              .attr("x", function(d) {
                return x1(d.name);
              })
              .attr("y", function(d) {
                return y(d.value);
              })
              .attr("height", function(d) {
                return height - y(d.value);
              })
              .style("fill", function(d) {
                return color(d.name);
              });
          }

          function drawLegend() {
            legend.append("rect")
              .attr("x", width - 18)
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", color);

            legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9)
              .attr("dy", ".35em")
              .style("text-anchor", "end")
              .text(function(d) {
                return d;
              });
          }

          function wrap(text, width) {
            text.each(function() {
              var text = d3.select(this),
                words = text.text().split(/\s+/).reverse(),
                word,
                line = [],
                lineNumber = 0,
                lineHeight = 1.1, // ems
                y = text.attr("y"),
                dy = parseFloat(text.attr("dy")),
                tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
              while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
              }
            });


          }

        }
      }
    };
  }]);
})();
