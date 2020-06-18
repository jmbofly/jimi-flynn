import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/core/animation.service';
import { DATA } from 'src/app/data/data';
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
  scrollerLocations: string[];
  active = 1;

  constructor(public animation: AnimationService, private graph: GraphService) { }

  private random(min, max): number {
    return min + Math.random() * (max - min)
  };
  private between(min, max, percent) {
    return max - (max - min) * (1 - percent)
  };
  private scrollerInit() {
    const d3 = this.animation.D3;
    const $ = (s: string, o = document): Element => o.querySelector(s);
    this.animation.GSAP.to(window, { duration: 1, scrollTo: { y: 0, offsetY: 70 } });
  }


  ngOnInit(): void {
    this.animateTitle();
    this.animateDecal();
    this.wiredLayout(this.animation.D3);
    this.scrollerInit()
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


  wiredLayout(el = this.animation.D3) {
    const colors = el.scaleOrdinal(el.schemePaired);
    const setColors = (d) => colors(d);
    const $ = (s: string, o = document): Element => o.querySelector(s),
      container = $('.balls-wrapper'),
      numNodes = 1500,
      width = container.parentElement.offsetWidth * .8,
      height = container.parentElement.offsetHeight * .8,
      links = DATA.links.map(d => Object.create(d)),
      nodes = DATA.nodes.map(d => Object.create(d)),
      scale = 1.7,
      center = [width / 2 - 200, height / 2 - 200],
      rescale = isNaN(nodes[0].x),
      svg = el.select('.balls-wrapper').append('svg:svg').attr("viewBox", `${[0, 0, width, height]}`),
      simulation = el
        .forceSimulation(nodes)
        .alphaDecay(.003)
        .velocityDecay(.55)
        .force('layout', el.forceRadial((d, i, data) => {
          return this.random(0, this.between(-i, d.x, 5))
        }))
        .force('link', el.forceLink(links).id((d: any) => d.id))
        .force('center', el.forceCenter(width / 2, height / 2))
        .force('charge', el.forceManyBody().strength(-150))
        .force("x", el.forceX().strength(.090))
        .force("y", el.forceY().strength(.090))
        .on("tick", tick),
      link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke", (d: any) => setColors(d.group))
        .attr("stroke-opacity", .7)
        .attr('class', 'line')
        .attr("stroke-width", 1),
      node = svg
        .selectAll("circle")
        .enter()
        .data(nodes)
        .join("circle")
        .attr("r", 2)
        .attr('fill', (d: any) => setColors(d.group))
        .call(drag(simulation));
    const x = el.range(width);
    const y = el.range(height);

    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .selectAll("stop")
      .data((d: any) => [
        { offset: "0%", color: 'rgba(32, 235, 19, .7)' },
        { offset: "100%", color: 'rgba(210,71,75, 0.75)' }
      ])
      .enter().append("stop")
      .attr("offset", (d: any) => { return d.offset; })
      .attr("stop-color", (d: any) => { return d.color; });

    // Add the valueline path.
    svg.append("path")
      .attr("class", "line");


    // once the arrangement is initialized, scale and translate it
    if (rescale) {
      for (const node of nodes) {
        node.x = node.x * scale + center[0];
        node.y = node.y * scale + center[1];

      }
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
    }

    function breakLines(node, breakAt) {

    }

  }

  scrollToNext(gsap: GSAP) {
    const tl = gsap.timeline();
    console.log(this.active)
    if (this.active > 3) {
      tl.to(window, { duration: 1, scrollTo: { y: '#section1', offsetY: 70 } });
      this.active = 1;
      return;
    }
    tl.to(window, { duration: 1, scrollTo: { y: "#section" + (this.active + 1), offsetY: 70 } });
    this.active += 1;
  }

}

