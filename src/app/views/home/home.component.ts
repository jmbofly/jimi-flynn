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
    // this.animateBalls();
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
  animateBalls() {
    const $ = (s, o = document) => o.querySelector(s);
    const container = $('.balls-wrapper');
    const count = 20;
    const random = (min, max) => min + Math.random() * (max - min);
    const between = (min, max, percent) => max - (max - min) * (1 - percent);
    
    for (let i = 0; i < count - 1; i++) {
      const ball: Element = document.createElement('div');
      ball.classList.add('ball');
      container.appendChild(ball);
    }
    this.animation.utils.toArray('.ball').forEach((ball: Element, idx) => {
      this.animation.GSAP.set(ball, { repeat: -1, duration: 60});
      const tl = this.animation.timeline();
      tl.fromTo(ball, {
         x: this.animation.utils.random(0, container.clientWidth),
         y: this.animation.utils.random(0, container.clientHeight),
         width: `5px`,
        height: `5px`,
        yoyo: true,
      }, {
        duration: 100,
          scrub: (a) => {
          console.log(a)
          return (document.body.scrollTop > 0) ? 1 : 0;
        },
         ease: 'elastic',
         repeat: -1,
         yoyo: true,
             x: this.animation.utils.random(0, container.clientWidth),
             y: this.animation.utils.random(0, container.clientHeight),
           })
         })
  }

  splash(el = this.animation.D3) {
      const $ = (s: string, o = document): Element => o.querySelector(s),
      container = $('.balls-wrapper'),
      numNodes = 1500,
      width = container.parentElement.offsetWidth * .75 / 2,
        height = container.parentElement.offsetHeight * .75 / 2,
      links = DATA.links.map(d => Object.create(d)),
      nodes = DATA.nodes.map(d => Object.create(d)),
     node_nums: any = el.range(numNodes).map(function (d, idx) {
      return [Math.random() * 100, idx]
    }),
    scale = 1.7,
    center = [width / 2, height / 2],
    rescale = isNaN(nodes[0].x),
    svg = el.select('.balls-wrapper').append('svg:svg').attr("viewBox", `${[0, 0, width, height]}`),
    node = svg
      .selectAll("circle")
      .data([...nodes, ...links, nodes])
      .enter()
      .append("circle")
      .attr('padding', '50px')
      .attr('width', 15)
      .attr('height', 15)
      .attr("r", 1.5)
      .attr('fill', '#ffffffe0'),
      // .attr('fill', (e: any, i) => {
      //   const rando = parseInt(this.animation.utils.random(0, 500).toFixed())
      //   return (rando > 200) ? `rgba(47,56,59, 0.${rando * 200})` : rando > 300 ? `rgba(255,255,255,0.${rando})`: `rgba(210,75,71, 0.${rando * 10})`;
      // }),
    simulation = el
    .forceSimulation(nodes)
      .alphaDecay(0)
      .velocityDecay(.9)
      .force('layout', el.forceRadial((d, i, data) => {
        return this.between(400, 500, 1)
      }))
    .force('link', el.forceLink(links).strength(.5).id((d: any) => d.id))
      .force('center', el.forceCenter(width / 2, height / 2))
      .force('charge', el.forceManyBody().strength(-120))
      .on("tick", tick),
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
    function tick() {
      // const line = el.line();
      
      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y).on('mouseover', handleMouseOver).on('click', handleMouseOut)
      // node.insert('line').attr('d', (d: any) => line(node_nums))
    }
    
  }

}
