(function() {
  angular.module('compareApp')

  .directive('barChart', [function() {
    return {
      controller: 'barChartController',
      scope: {
        data: '=',
        loginCheck: '='
        // modalData: '='
      },
      link: function(scope, elem, attrs) {

        function removeSvg() {
          d3.select("body").selectAll("svg").remove();
        }

        function getText(html) {
          var text = $(html).text();
          var data = scope.data;
          for (var i = 0; i < data.length; i++) {
            if (data[i].title === text) {
              // element.on("click");
               scope.goToView(data[i]);
              //  scope.modalData = data[i];
            }
          }
        }

        function findImage(str, data) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].title === str) {
              return data[i].thumbImage;
            }
          }
        }

        scope.$watch("loginCheck", function(n, o) {
          if (o !== n) {
            if (scope.loginCheck === false) {
              removeSvg();
            }
          }
        });

        scope.$watch("data", function(n, o) {
          if (o !== n) {
            updateChart();
          }
        });

        var margin = {
            top: 20,
            right: 20,
            bottom: 200,
            left: 40
          },
          width = 900 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

        var formatCurrency = function(d) {
          return "$" + d;
        };
        var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            return "<span style='color:white'>$" +
            d.value +
            "</span>"
          })

        var x0 = d3.scale.ordinal()
          .rangeRoundBands([0, width], 0.1);

        var x1 = d3.scale.ordinal();

        var y = d3.scale.linear()
          .range([height, 0]);

        var color = d3.scale.ordinal()
          .range(["rgba(100,100,100,.5)", "#8a89a6", "#7b6888", "#6b486b"]);

        var xAxis = d3.svg.axis()
          .scale(x0)
          .ticks(0)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .tickFormat(formatCurrency);

        var svg = d3.select(elem[0]).append("svg")
          .attr("class", "chart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        function updateChart() {

          var data = scope.data;
          if (data) {
            var titleNames = d3.keys(data[0]).filter(function(key) {
              return key !== "title" && key !== "thumbImage" && key !== 'largeImage' && key !== 'salesRank';
            });

            data.forEach(function(d) {
              d.price = titleNames.map(function(name) {
                return {
                  name: name,
                  value: +d[name]
                };
              });
            });

            svg.call(tip);

            x0.domain(data.map(function(d) {
              return d.title;
            }));
            x1.domain(titleNames).rangeRoundBands([0, x0.rangeBand()], 0, 1);

            y.domain([0, d3.max(data, function(d) {
              return d3.max(d.price, function(d) {
                return d.value;
              });
            }) * 1.07]);

            svg.selectAll(".x.axis").remove();
            svg.selectAll("text").remove();
            svg.selectAll(".y.axis").remove();

            var insertLinebreaks = function(t, d, width) {
              var el = d3.select(t);
              var p = d3.select(t.parentNode);
              p.append("foreignObject")
                .attr('x', -width / 2)
                .attr("width", width)
                .attr("height", 200)
                .append("xhtml:div")
                .attr("class", "axisLabel")
                .attr('style', 'word-wrap: break-word; text-align:center;')
                .html(d);

              el.remove();
            };

            svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis);

            var labels = d3.select('.x.axis')
              .selectAll('text')
              .each(function(d, i) {
                var image = findImage(d, data);
                var dimensions = x0.rangeBand();
                var title =
                  '<div class="labelThumbnail">' +
                  '<img src="' +
                  image +
                  // '" width="' +
                  // (dimensions - 15) +
                  // '" height="' +
                  // (dimensions - 15) +
                  '" />' +
                  '<p>' + d + '</p>' +
                  '</div>';
                insertLinebreaks(this, title, x0.rangeBand());
              });

            d3.select('.x.axis')
              .selectAll('.axisLabel')
              .on("click", function() {
                getText(this);
              });

            svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)
              .append("text")
              .attr("transform", "rotate(-90)")
              .attr("y", 6)
              .attr("dy", ".71em")
              .style("text-anchor", "end")
              .text("Item Prices");

            var product = svg.selectAll(".product")
              .data(data);

            product.exit().transition("product").duration(2000).remove();

            product.enter().append("g");

            product.attr("class", "product")
              .attr("transform", function(d) {
                return "translate(" + x0(d.title) + ",0)";
              });

            var bar = product.selectAll("rect")
              .data(function(d) {
                return d.price;
              });

            bar.exit().transition("bar").duration(2000).remove();

            bar.enter().append("rect")
              .classed('bar', true)
              .attr("width", x1.rangeBand())
              .attr("y", 0)
              .attr("height", function(d) {
                return height;
              })
              .on('mouseover', tip.show)
              .on('mouseout', tip.hide)
              .style('opacity', 0);

            bar.transition()
              .duration(1000)
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
              })
              .style('opacity', 1);



            var legend = svg.selectAll(".legend")
              .data(titleNames.slice().reverse());

            legend.exit().remove();

            legend.enter().append("g");

            legend.attr("class", "legend")
              .attr("transform", function(d, i) {
                return "translate(0," + i * 20 + ")";
              });

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

          } else {
            return "error";
          }

        }


      }
    };
  }]);


})();
