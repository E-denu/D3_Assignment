
var h = 900;
var w = 1000;

var svg = d3.select(".mapping_area")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

var reload_button = document.querySelector('#reload');
/*console.log(reload_button);*/
reload_button.addEventListener('click', function() {
   location.reload();
})

var project = d3.geoNaturalEarth1()
            .translate([w/2, h/1.5])
            .scale(4300)
            .center([-5, 53]);

/* Drawing the map */
var map_path = d3.geoPath()
            .projection(project);

d3.json('https://yamu.pro/gb.json', function(error, data) {
            svg.selectAll(".country")
            .data(data.features)
            .enter()
            .append("path")
            .attr("class","country")
            .attr("d",map_path)
            });

/* Town Locations*/
d3.json('http://34.78.46.186/Circles/Towns/20', function(error, data) {
            svg.selectAll('.towns')
            .data(data)
            .enter()
            .append('svg')
            .attr("class","towns")

            .attr("x",function(d){
               console.log(d);
               var coords = project([d.lng, d.lat])
               return coords[0];
            })

            .attr("y",function(d){
               var coords = project([d.lng, d.lat])
               return coords[1]
            })


//Town Pointers
svg.selectAll('.pointers')
            .data(data)
            .enter()
            .append('circle')
            .attr('class','pointers')

            .attr("cx",function(d){
               console.log(d);
               var params = project([d.lng, d.lat, d.Population])
               return params[0];
            })

            .attr("cy",function(d){
               var params = project([d.lng, d.lat, d.Population])
               return params[1]
            })
            .attr('r', function(d) {
               console.log(d);
               return d.Population/16000;
            })
            .append('title')
            .attr("dy", "0em")
            .text(function(d){return ['Town: ' + d.Town + '\nCounty: '+ d.County + '\nPopulation: ' + d.Population]});


  
//Town Names
svg.selectAll('.town_names')
            .data(data)
            .enter()
            .append('text')
            .attr('class','town_names')

            .attr("x",function(d){
               console.log(d);
               var params = project([d.lng, d.lat, d.Town])
               return params[0];
            })

            .attr("y",function(d){
               var params = project([d.lng, d.lat,d.Town])
               return params[1]
            })

            .text(function(d){
               var params = project([d.lng, d.lat,d.Town])
               console.log(d.Town);
               return d.Town;
            })

            .attr('dx','-14')
            .attr('dy','12')

});