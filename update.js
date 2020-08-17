svg = d3.select('body').append('svg')
    .attr('height', 400)
    .attr('width', 600)
    .style('border','solid')
    .style('border-width', 0.5)

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
      .style('fill','steelblue')
      // .on('mouseover', function () {d3.select(this).transition().attr('r', 10)}) //works
      // .on('mouseover', () => {d3.select(this).transition().attr('r', 10)}) //doesn't work
      .on('mouseover', mouseover)
      .on('mouseleave', mouseleave),
    update => update.transition(1000)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)
      .attr('r', (d) => d.r),
    exit => exit.transition(1000)
      .attr('r', 0)
      .remove()
  )
  function mouseover() {d3.select(this).transition().attr('r', 10)}
  function mouseleave() {d3.select(this).transition().attr('r', 5)}
}