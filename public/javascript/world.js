


var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);


      


var svg = d3.select(".map")
    .append("svg")
    // .style("cursor", "move");


    var x = window.matchMedia("(max-width: 480px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction)
    function myFunction(x) {
        if (x.matches) { // If media query matches
          svg.attr("viewBox", "-220 -10 900 630")
          .attr("preserveAspectRatio", "xMinYMin");
        } else {
            svg.attr("viewBox", "310 100 1000 580")
            .attr("preserveAspectRatio", "xMinYMin");
        }
      }


    // svg.attr("viewBox", "310 100 1000 580")
    // .attr("preserveAspectRatio", "xMinYMin");

// var zoom = d3.zoom()
//     .on("zoom", function () {
//         var transform = d3.zoomTransform(this);
//         map.attr("transform", transform);
//     });

// svg.call(zoom);

var map = svg.append("g")
    .attr("class", "map");

d3.queue()
    .defer(d3.json, "json/50m.json")
    .defer(d3.json, "https://corona.lmao.ninja/v2/countries")
    .await(function (error, world, data) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            drawMap(world, data);
        }
    });

function drawMap(world, data) {
    // geoMercator projection
    var projection = d3.geoMercator() //d3.geoOrthographic()
        .scale(130)
        .translate([width / 2, height / 1.5]);

    // geoPath projection
    var path = d3.geoPath().projection(projection);

    //colors for population metrics
    var color = d3.scaleThreshold()
        .domain([50, 100, 500, 1000, 5000, 10000, 50000, 100000, 500000])
        .range(["#bfd8ff", "#deebf7", "#c6dbef", "9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"]);

    var features = topojson.feature(world, world.objects.countries).features;
    var populationById = {};
	
	
	
	
	
	
	var tooltip = d3.select(".map")
  .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .text("I'm a circle!");
	
	var tooltip2 = d3.select(".map")
  .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .html("");
	
		 var mousemove = function(d) {
    tooltip2
	  .html("<p style='margin-bottom: 3px;font-weight: 1000;'>"+d.properties.name+"</p><p style='margin-bottom: 2px;'>"+"Confirmed : <b>"+d.details.cases+
			"</b></p><p style='margin-bottom: 2px;'>Active : <b>"+d.details.active+
			"</b></p><p style='margin-bottom: 2px;'>Recovered : <b>"+d.details.recovered+ 
			"</b></p><p style='margin-bottom: 2px;'>Deaths : <b>"+ d.details.deaths)
			 
      .style("left", (d3.mouse(this)[0]-230) + "px")
      .style("top", (d3.mouse(this)[1]-150) + "px")
  }
	
	
	
	
	
	
	
	
	
	
    data.forEach(function (d) {
        populationById[d.country] = {
            cases: d.cases,
            active: d.active,
            recovered: d.recovered,
			deaths: d.deaths
        }
    });
    features.forEach(function (d) {
        d.details = populationById[d.properties.name] ? populationById[d.properties.name] : {};
    });
	// d3.select('.map').append('div').attr('id', 'tooltip').attr('style', 'position: absolute; opacity: 0;');
	//  d3.select('.map').append('svg').attr('width', 300).attr('height', 300);
    map.append("g")
        .selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("name", function (d) {
            return d.properties.name;
        })
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", path)
        .style("fill", function (d) {
            return d.details && d.details.cases ? color(d.details.cases) : 0;
        })
		// .append("title")
		// 	.text(d.properties.name)
        .on('mouseover', function (d) {
		
			// d3.select('#tooltip').transition().duration(200).style('opacity', 1).text(d.properties.name);
            d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("cursor", "pointer");

            d3.select(".country")
                .text(d.properties.name);

            d3.select(".cases")
                .text(d.details && d.details.cases && "Confirmed " + d.details.cases || "");

            d3.select(".active")
                .text(d.details && d.details.active && "Active " + d.details.active || "");
		
		 	d3.select(".recovered")
                .text(d.details && d.details.recovered && "Active " + d.details.recovered|| "");
		
		 	d3.select(".death")
                .text(d.details && d.details.deaths && "Active " + d.details.deaths || "");

            // d3.select('.details')
            //     .style('visibility', "visible")
			
			return tooltip2.style("visibility", "visible");
        })
        .on('mouseout', function (d) {

            d3.select(this)
                .style("stroke", null)
                .style("stroke-width", 0.25);

            // d3.select('.details')
            //     .style('visibility', "hidden");
		
			return tooltip2.style("visibility", "hidden");
        })
	
	
	
		.on('mousemove', mousemove);
	
	
	
	
	
	
	
	
	
}