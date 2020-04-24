var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var svg = d3.select('.map')
    .append("svg");

    var x = window.matchMedia("(max-width: 480px)")
    myFunction(x) // Call listener function at run time
    x.addListener(myFunction)
    function myFunction(x) {
        if (x.matches) { 
            svg.attr("viewBox", "348 358 70 75")
            // svg.attr("viewbox","50 10 "+width+" "+height)
          .attr("preserveAspectRatio", "xMinYMin");
          
        } else {
            svg.attr("viewBox", "920 413 70 75")
            .attr("preserveAspectRatio", "xMinYMin");
        }
      }

	// svg.attr("viewBox", "920 431 80 50");
    

var map = svg.append("g")
    .attr("class", "map");

d3.queue()
    .defer(d3.json, "json/states.json")
    .defer(d3.json, "https://api.covid19india.org/data.json")
    .await(function (error, states, data) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            drawMap(states, data);
        }
    });

function drawMap(states, data) {
    // geoMercator projection
    var projection = d3.geoMercator() //d3.geoOrthographic()
        .scale(130)
        .translate([width / 2, height / 1.5]);

    // geoPath projection
    var path = d3.geoPath().projection(projection);

    //colors for population metrics
    var color = d3.scaleThreshold()
        // .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
        // .range(["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"]);
	
		.domain([1,30, 90, 150, 200, 500, 800, 1000, 2000, 3000,4000, 5000])
		.range(["#fff5f0", "#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a", "#ef3b2c", "#db181d", "#a50f15","#b82f25","#912c24", "#67000d",'#7d0f0f']);

    var features = topojson.feature(states, states.objects.india).features;
    var populationById = {};

    data.statewise.forEach(function (d) {
        populationById[d.state] = {
			state: d.state,
            total: d.confirmed,
			active: d.active,
            recovered: d.recovered,
            death: d.deaths              //males
        }
    });
    features.forEach(function (d) {
        d.details = populationById[d.properties.name] ? populationById[d.properties.name] : {};
    });

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
            return d.details && d.details.total ? color(d.details.total) : undefined;
        })
        .on('mouseover', function (d) {
            d3.select(this)
                .style("stroke", "black")
                .style("stroke-width", 0.4)
                .style("cursor", "pointer");

            // d3.select(".state")
            //     .text(d.properties.name);
		
		d3.selectAll('.hidden')
                .style('visibility', "visible")
		
		d3.select(".state")
			.style('visibility', "visible")

            d3.select(".cases")
                .text(d.details && d.details.total && "" + d.details.total || "¯\\_(ツ)_/¯");
		
			d3.select(".active")
                .text(d.details && d.details.active && "" + d.details.active || "¯\\_(ツ)_/¯");
		
			 d3.select(".recovered")
                .text(d.details && d.details.recovered && "" + d.details.recovered || "¯\\_(ツ)_/¯");

             d3.select(".deaths")
                .text(d.details && d.details.death && "" + d.details.death || "¯\\_(ツ)_/¯");
		
			 d3.select(".state")
                .text(d.details && d.details.state && "" + d.details.state || "¯\\_(ツ)_/¯");
		

            
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .style("stroke", null)
                .style("stroke-width", null);

            d3.selectAll('.hidden')
                .style('visibility', "hidden");
		
			d3.select(".state")
			.style('visibility', "hidden")
        });
}