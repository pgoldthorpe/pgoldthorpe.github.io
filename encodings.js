function createMatrix(rows, cols) {
  return new Array(rows).fill(0).map(() => new Array(cols).fill(0));
}

var data = createMatrix(8,8);

var width = 600,
  height = 600
  radius = 20;
  spacing = 30;

var svg = d3.select('body').append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g')
  .attr('transform', 'translate('+[0, spacing]+')');

var row = svg.selectAll('.row').data(data)
.join(
  enter => enter.append('g')
  .attr('transform', (d,i) => 'translate(' + [spacing/2, i * spacing - 3*spacing/4] + ')')
  )
  
row.selectAll('rect')
  .data(function(d, i) { return data[i]; })
  .join(enter => enter.append('rect')
    .attr('x', (d,i) => i * spacing - spacing/4)
    .attr('width', radius)
    .attr('height', radius)
    .attr('rx', 0)
    .attr('fill','black')
  )

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
  fun = window["d3"][d3.select('select').property('value')]
  d3.select(d3.selectAll('rect')._groups[0][index1]).transition("fill").duration(tt).ease(fun).attr('fill','black') // .transition().duration(12000).ease(d3.easeLinear)
  // d3.select(d3.selectAll('rect')._groups[0][index2]).transition("move").duration(tt).ease(fun).attr('y', yval + spacing/4).attr('x', xval + spacing/4)
  d3.select(d3.selectAll('rect')._groups[0][index2]).transition("move").duration(tt).ease(fun).attr('y', yval + Math.sin(rand)*spacing/4).attr('x', xval + Math.cos(rand)*spacing/4)
  d3.select(d3.selectAll('rect')._groups[0][index3]).transition("shape").duration(tt).ease(fun).attr('rx', 15)
  d3.select(d3.selectAll('rect')._groups[0][index4]).transition("shape").duration(tt).ease(fun).attr('rx', 0)
  d3.select(d3.selectAll('rect')._groups[0][index5]).transition("fill").duration(tt).ease(fun).attr('fill', 'red')
}

function dbl() {
  update();update();update();update();update();update();update();update();update();update();
  update();update();update();update();update();update();update();update();update();update();
}