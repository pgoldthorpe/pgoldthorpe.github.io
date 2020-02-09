function createMatrix(rows, cols) {
  return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

var data = createMatrix(8,8);

var width = 500,
  height = 500
  radius = 40;
  spacing = 60;

var svg = d3.select('body').select('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', 'translate('+[0, spacing]+')');


var row = svg.selectAll('.row').data(data)
.join(
  enter => enter.append('g')
  .attr('transform', (d,i) => 'translate(' + [spacing/2, i * spacing - 3*spacing/4] + ')')
  )


create()

function create() {
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
    .transition("move").duration(1000)
      .attr('x', (d,i) => i * spacing - spacing/4)
      .attr('y', 0)
      .attr('width', radius)
      .attr('height', radius)
      .attr('rx', 0)
      .attr('fill','black')
      .attr('transform','rotate(0)')
    )
  }

function update() {
  tt = +d3.select('input').property('value')
  index1 = Math.floor(Math.random()*data.length * data[0].length);
  index2 = Math.floor(Math.random()*data.length * data[0].length);
  index3 = Math.floor(Math.random()*data.length * data[0].length);
  index4 = Math.floor(Math.random()*data.length * data[0].length);
  index5 = Math.floor(Math.random()*data.length * data[0].length);
  rand = Math.floor(Math.random()*360);
  
  xval = +d3.select(d3.selectAll('rect')._groups[0][index2]).attr('x')
  yval = +d3.select(d3.selectAll('rect')._groups[0][index2]).attr('y')
  fun = window["d3"][d3.select('select').property('value')] //choose the ease
  shift = d3.select('#shift').property('value')
  if (d3.select('#grey').property('checked')) {
    d3.select(d3.selectAll('rect')._groups[0][index1]).transition("fill").duration(tt).ease(fun).attr('fill','lightgrey')}
  if (d3.select('#move').property('checked')) {
    d3.select(d3.selectAll('rect')._groups[0][index2]).transition("move").duration(tt).ease(fun).attr('y', yval + shift*Math.sin(rand)).attr('x', xval + shift*Math.cos(rand))}
  if (d3.select('#shape').property('checked')) {
    d3.select(d3.selectAll('rect')._groups[0][index3]).transition("shape").duration(tt).ease(fun).attr('rx', radius/2)}
  if (d3.select('#red').property('checked')) {
    d3.select(d3.selectAll('rect')._groups[0][index5]).transition("fill").duration(tt).ease(fun).attr('fill', d3.select('#picker').property('value'))}
}

function dbl() {
  update();update();update();update();update();update();update();update();update();update();
  update();update();update();update();update();update();update();update();update();update();
}

function updatetext() {
  d3.select('slidertext').text(d3.select('#shift').property('value'))
}