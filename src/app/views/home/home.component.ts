import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/core/animation.service';
import { DATA } from 'src/app/data/data';
import { rgb } from 'd3';
import { transition } from '@angular/animations';
import { CssSelector } from '@angular/compiler';
import { GraphService } from 'src/app/core/graph.service';
@Component({
  selector: 'jf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  attributs: any;
  canvas: any;
  context: any;

  constructor(private animation: AnimationService, private graph: GraphService) { }

  private random(min, max): number {
    return min + Math.random() * (max - min)
  };
  private between(min, max, percent) {
    return max - (max - min) * (1 - percent)
  };


  ngOnInit(): void {
    this.animateTitle();
    this.animateDecal();
    this.splash(this.animation.D3);
  }

  animateTitle() {
    const tl = this.animation.timeline();
    tl.to('.hero-subtitle', {
      duration: 3,
      height: '125px',
      ease: 'elastic',
      text: {
        delimiter: ' ',
        value: 'designer'
      }
    }).to('.hero-subtitle ', {
      height: 0,
      duration: .5,
    }).to('.hero-subtitle', {
      duration: 3,
      height: '125px',
      ease: 'elastic',
      text: {
        delimiter: ' ',
        value: 'developer'
      }
    })
      .to('.hero-subtitle ', {
        height: 0,
        duration: .5,
      })
      .to('.hero-subtitle', {
        duration: 3,
        height: '125px',
        ease: 'elastic',
        text: {
          delimiter: ' ',
          value: 'problem solver'
        }
      })
  }

  animateDecal() {
    const tl = this.animation.timeline();
    tl.to('div.decal', {
      // top: '-16px',
      scale: .5,
      yoyo: true,
      scrollTrigger: {
        trigger: '#fourth',
        start: 'top 70px',
        pin: '.decal',
        scrub: true
      }
    })
  }
  

  splash(el = this.animation.D3) {
      const $ = (s: string, o = document): Element => o.querySelector(s),
      container = $('.balls-wrapper'),
      numNodes = 1500,
      width = container.parentElement.offsetWidth / 3,
        height = container.parentElement.offsetHeight / 3,
      links = DATA.links.map(d => Object.create(d)),
      nodes = DATA.nodes.map(d => Object.create(d)),
     node_nums: any = el.range(numNodes).map(function (d, idx) {
      return [Math.random() * 100, idx]
    }),
    scale = 1.7,
    center = [width / 2 - 200, height / 2 - 200],
    rescale = isNaN(nodes[0].x),
    svg = el.select('.balls-wrapper').append('svg:svg').attr("viewBox", `${[0, 0, width, height]}`),
    simulation = el
    .forceSimulation(nodes)
      .alphaDecay(.03)
      .velocityDecay(.35)
      // .force('layout', el.forceRadial((d, i, data) => {
      //   return this.between(i, d.vx, .93)
      // }))
    .force('link', el.forceLink(links).id((d: any) => d.id))
      .force('center', el.forceCenter(width / 2, height / 2))
      .force('charge', el.forceManyBody().strength(-60))
      .force("x", el.forceX())
      .force("y", el.forceY())
      .on("tick", tick),
        link = svg.append("g")
          .attr("stroke", 'rgba(0,0,0,.3')
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", 1),
    node = svg
      .selectAll("circle")
      .enter()
      .data(nodes)
      .join("circle")
      .attr("r", 2)
      .attr('fill', (d: any) => {
        const scale = el.scaleOrdinal(el.schemeCategory10);
        return scale(d.group);
      }).call(drag(simulation)),
      // .attr('fill', (e: any, i) => {
      //   const rando = parseInt(this.animation.utils.random(0, 500).toFixed())
      //   return (rando > 200) ? `rgba(47,56,59, 0.${rando * 200})` : rando > 300 ? `rgba(255,255,255,0.${rando})`: `rgba(210,75,71, 0.${rando * 10})`;
      // }),
      config = {
        container,
        width,
        height,
        nodes,
        links,
        scale,
        center,
        rescale,
        svg,
        node,
        simulation,
        tick
    },
    graph = this.graph.createGraph(this.animation.D3, config);
      

    // differ application of the forces
    // setTimeout(() => {
    //   simulation.restart();
    //   node.transition().attr("r", (d: any) => d.r);
    // }, 2500);

    // once the arrangement is initialized, scale and translate it
    if (rescale) {
      for (const node of nodes) {
        node.x = node.x * scale + center[0];
        node.y = node.y * scale + center[1];
        
      }
    }

    // Create Event Handlers for mouse
    function handleMouseOver(a, b) {  // Add interactivity
      // Use D3 to select element, change color and size
      el.select(this).style('fill', `rgba(210,75,71, 0.${a.index})`);
      const change = () => simulation.force('layout', el.forceManyBody().strength(a.index)).force('collide', el.forceRadial(-150 / a.index));
      setTimeout(change, 0)
    }

    function handleMouseOut(a, b) {
      // Use D3 to select element, change color back to normal
      el.select(this).style('fill', '#fff');

      simulation.force('layout', el.forceManyBody().strength(-a.index)).force('collide', el.forceRadial(-150 / -a.index))

    }
    function drag(sim) {

      function dragstarted(d) {
        if (!el.event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = el.event.x;
        d.fy = el.event.y;
      }

      function dragended(d) {
        if (!el.event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return el.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }
    function tick() {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      // node.insert('line').attr('d', (d: any) => line(node_nums))
    }
    
  }

}
