// http://jsfiddle.net/8hkrozum/1/
// https://github.com/d3/d3-drag

// Create the SVG
var svg = d3.select("body").append("svg")
  .attr("width", 700)
  .attr("height", 400)
  .on("click", click);

// Add a background
svg.append("rect")
  .attr("width", 700)
  .attr("height", 400)
  .style("stroke", "#999999")
  .style("fill", "#F6F6F6")

d3.select('body').append('input')
.attr('type','range')
.attr('min', 5)
.attr('max', 30)

// Define drag beavior
var drag = d3.drag()
    .on("drag", dragmove);

function click(){
  // Ignore the click event if it was suppressed
  if (d3.event.defaultPrevented) return;

  // Extract the click location\    
  var point = d3.mouse(this);
  var p = {x: point[0], y: point[1] };

  // Append a new point
  svg.append("circle")
    .attr("transform", "translate(" + p.x + "," + p.y + ")")
    .attr("r", +d3.select('input').property('value'))
    .attr("class", "dot")
    .style("cursor", "pointer")
    .call(drag);
}

function dragmove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr("transform", "translate(" + Math.min(x,700-d3.select(this).attr('r')) + "," + Math.min(y,400-d3.select(this).attr('r')) + ")");
}