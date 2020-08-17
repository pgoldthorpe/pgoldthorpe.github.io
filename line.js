// http://bl.ocks.org/mforando/57e32915606a46ae18eeb58a3e1ea0e2
// http://bl.ocks.org/d3indepth/b6d4845973089bc1012dec1674d3aff8



svg = d3.select('body').append('svg')
  .attr('width', 600)
  .attr('height', 400)
  .style('border','solid')

line = d3.line()
  .x((d)=>Math.random() * d * 1.5)
  .y((d)=>Math.random() * d)
  .curve(d3.curveCatmullRom)

data = [10,30,60,90,120,150,180,210,240,270,300,330,360,390]

svg.selectAll('path').data([data])
  .join(
    enter => enter.append('path')
      .attr('d', (d) => line(d)),
    update => update.attr('d', (d) => line(d)),
    exit => exit.remove()
  )