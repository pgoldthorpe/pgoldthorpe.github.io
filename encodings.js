var data = createMatrix(30, 30);
var width = 500, height = 500;

var svg = d3.select('body').select('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', 'translate('+[0, +d3.select('#spac-but').property('value')]+')');
create()

function createMatrix(rows, cols) {
  return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

function create() {
  // Removing the definitions above and dynamically altering the code results in 
  var radius = +d3.select('#rad-but').property('value');
  var spacing = +d3.select('#spac-but').property('value');
  var row = svg.selectAll('.row').data(data)
    .join(
    enter => enter.append('g').attr('class','row')
      .attr('transform', (d,i) => 'translate(' + [spacing/2, i * spacing - 3*spacing/4] + ')'),
    update => update.transition().duration(2000)
      .attr('transform', (d,i) => 'translate(' + [spacing/2, i * spacing - 3*spacing/4] + ')')
  )
  row.selectAll('rect')
    .data(function(d, i) { return data[i]; })
    .join(
    enter => enter.append('rect')
      .attr('x', (d,i) => i * spacing - spacing/4)
      .attr('y', 0)
      .attr('width', radius)
      .attr('height', radius)
      .attr('rx', 0)
      .attr('fill','black')
      .attr('transform','rotate(0)'),
    update => update
    .transition("move").duration(2000)
      .attr('x', (d,i) => i * spacing - spacing/4)
      .attr('y', 0)
      .attr('width', radius)
      .attr('height', radius)
      .attr('rx', 0)
      .attr('fill','black')
      .attr('transform','rotate(0)')
    )
  }

function update(rand=+d3.select('#number').property('value')) {
  var radius = +d3.select('#rad-but').property('value');
  var spacing = +d3.select('#spac-but').property('value');
  tt = +d3.select('input').property('value')
  easetype = window["d3"][d3.select('select').property('value')]
  
  if (d3.select('#grey').property('checked')) {
    randElements = getRandom(d3.selectAll('rect')["_groups"][0], rand)
    d3.selectAll(randElements)
      .transition("fill")
      .duration(tt).ease(easetype).attr('fill','lightgrey')
    }
  
  if (d3.select('#move').property('checked')) {
    randElements = getRandom(d3.selectAll('rect')["_groups"][0], rand)
    shift = d3.select('#shift').property('value')
    d3.selectAll(randElements)
      .data(randElements)
      .transition("move")
      .duration(tt).ease(easetype)
      .attr('x', (d) => d.x.baseVal.value + shift * Math.cos(Math.floor(Math.random()*360)))
      .attr('y', (d) => d.y.baseVal.value + shift * Math.sin(Math.floor(Math.random()*360)))
    }
  
  if (d3.select('#shape').property('checked')) {
    randElements = getRandom(d3.selectAll('rect')["_groups"][0], rand)
    d3.selectAll(randElements)
      .transition("shape")
      .duration(tt).ease(easetype)
      .attr('rx', radius/2)
    }

  if (d3.select('#red').property('checked')) {
    randElements = getRandom(d3.selectAll('rect')["_groups"][0], rand)
    d3.selectAll(randElements)
      .transition("fill")
      .duration(tt).ease(easetype)
      .attr('fill', d3.select('#picker').property('value'))
    }
  }

function updatetext() {
  d3.select('slidertext').text(d3.select('#shift').property('value'))
}

function getRandom(arr, n) {
  var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
  if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}