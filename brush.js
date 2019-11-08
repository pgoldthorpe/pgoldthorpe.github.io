// http://bl.ocks.org/ludwigschubert/0236fa8594c4b02711b2606a8f95f605

svg = d3.select('body').append('svg')
    .attr('height', 400)
    .attr('width', 600)

brush = d3.brush()
    .extent([[0, 0], [600, 400]])
    // .on('start brush', brushed)
    .on('end', brushended)

xscale = d3.scaleLinear().domain([0, 30]).range([0, 599])
yscale = d3.scaleLinear().domain([0, 20]).range([0, 399])
xaxis = d3.axisBottom().scale(xscale).ticks(30).tickSize(400)
yaxis = d3.axisRight().scale(yscale).ticks(20).tickSize(600)

svg.append('g').call(xaxis)
svg.append('g').call(yaxis)
svg.call(brush)
svg.call(brush.move, [[240,40], [360,240]]) // Initial location of brush

line = d3.line().x((d)=>d).y((d)=>d)
svg.selectAll('path').datum([0, 250])
  .join(
      enter => enter.append('path')
        .attr('d', (d) => line(d)),
      update => update.attr('d', (d) => line(d)),
      exit => exit.remove()
      )

update([
    {'x':30, 'y':50, 'r':5},
    {'x':70, 'y':90, 'r':5},
    {'x':310, 'y':150, 'r':5},
    {'x':330, 'y':310, 'r':5},
    {'x':190, 'y':390, 'r':5},
    {'x':470, 'y':210, 'r':5},
    {'x':530, 'y':50, 'r':5},
])

function update(data) {
    svg.selectAll('circle').data(data)
    .join(
        enter => enter.append('circle')
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', (d) => d.r)
            .style('fill','steelblue'),
        update => update.transition(1000)
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y)
            .attr('r', (d) => d.r),
        exit => exit.remove()
    )
}
function brushended() {
    const selection = d3.event.selection;
    if (!d3.event.sourceEvent || !selection) return;
    d3.select(this).transition().call(brush.move, // [[x0,y0],[x1,y1]]
        [selection[0].map(d=>Math.round(d / 20) * 20),
        selection[1].map(d=>Math.round(d / 20) * 20)]);
}
function brushed() {
    console.log( d3.event.selection );
    // console.log(d3.mouse(this))
  }