svg = d3.select('body').append('svg')
  .attr('width', 300)
  .attr('height', 400)
  .style('border-style', 'dotted')

yscale = d3.scaleLinear().domain([30,80]).range([0,400])
yaxis = d3.axisRight().scale(yscale)
svg.append('g').call(yaxis)

xscale = d3.scaleLinear().domain([300,1800]).range([0, 300])
xaxis = d3.axisBottom().scale(xscale)
svg.append('g').call(xaxis)