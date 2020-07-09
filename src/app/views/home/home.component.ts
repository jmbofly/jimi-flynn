import { Component, OnInit } from '@angular/core';
import { gsap, TimelineMax } from "gsap";

import * as $ from 'jquery';
import * as d3 from "d3";


import { DATA } from 'src/app/data/data';
import { PROJECTS_DATA, Project } from 'src/app/data/projects';

@Component({
  selector: 'jf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  active = 1;
  scrollEnabled = false;
  sections = ['section1', 'section2', 'section3', 'section4'].map(name => ({ name, anchor: `#${name}` }))
  // TODO: Create JSON with projects metadata
  list = DATA.nodes.filter((d,i) => i < 6);
  projects: Project[] = PROJECTS_DATA;

  constructor() { }

  // Initialize scroll navigation
  private initScroller() {
    const eventType = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    gsap.to(window, 1, { scrollTo: { y: 0, offsetY: 70 } })
    window.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, { passive: false });
    window.addEventListener(eventType, e => {e.preventDefault()}, { passive: false });
  }

  ngOnInit(): void {
    
    const tl = new TimelineMax();
    tl.to('.hero-title', 1, { ease: 'expo', delay: 7.5, opacity: 1, marginTop: 0 })
      .to('.hero-subtitle', 1.25, {ease: 'elastic', scale: 1, opacity: 1 }, '>1')
    this.initScroller();
    // this.initHeroSection();
    this.initProjectsSection();
  }


  animateSVG(targets: string | string[], vars?: any, duration?: number) {
    const master = new TimelineMax({ paused: true, reversed: true });
    if (typeof targets === 'string') {
      master.to(targets, duration, vars);
    } else {
      targets.map((target, idx, targets) => {
        master.to(target, vars[idx]);
      })
    }
    return master;
  }

  // TODO: @jmbofly Clean up
  // TODO: Add links line breaks
  // TODO: Generate additional links
  // Layout graph
  // initHeroSection() {
  //   let focused = true;
  //   window.addEventListener('focus', (e) => { focused = true })
  //   window.addEventListener('blur', (e) => { focused = false })
  //   const colors = d3.scaleOrdinal(d3.schemeSet3);
  //   const setColors = (d = '') => colors(d);
  //   const $ = (s: string, o = document): Element => o.querySelector(s),
  //     container = $('.graph-wrapper'),
  //     numNodes = 1500,
  //     width = container.parentElement.offsetWidth,
  //     height = container.parentElement.offsetHeight,
  //     links = DATA.links.map(d => Object.create(d)),
  //     nodes = DATA.nodes.map(d => Object.create(d)),
  //     scale = 1.7,
  //     center = [width / 2 - 200, height / 2 - 200],
  //     rescale = isNaN(nodes[0].x),
  //     svg = d3.select('.graph-wrapper').append('svg:svg').attr("viewBox", `${[0, 0, width, height]}`),
  //     link = svg.append("g")
  //       .selectAll("line")
  //       .data(links)
  //       .join("line")
  //       .attr("stroke-opacity", .7)
  //       .attr('class', 'line')
  //       .attr("stroke-width", 1),
  //     node = svg
  //       .selectAll("circle")
  //       .enter()
  //       .data(nodes)
  //       .join("circle")
  //       .attr("r", 1.5)
  //       .attr('fill', (d: any) => setColors());
  //   setTimeout(() => {
  //     const simulation = d3
  //       .forceSimulation()
  //       .nodes(nodes)
  //       .alphaDecay(.0001)
  //       .velocityDecay(.9001055)
  //       .force('layout', d3.forceRadial(100))
  //       .force('link', d3.forceLink(links).distance(10).id((d: any) => d.id))
  //       .force('center', d3.forceCenter(width / 1.8, height / 2))
  //       .force('charge', d3.forceManyBody().strength((d, i) => -10 * i))
  //       .force('collide', d3.forceCollide().radius((d: any) => d.size).strength(-10))
  //       .force("x", d3.forceX(500).strength(.1))
  //       .force("y", d3.forceY(500).strength(.1)).on("tick", tick)
  //     node.call(drag(simulation));
      
  //   }, 5000)
  //   const x = d3.range(width);
  //   const y = d3.range(height);

  //   svg.append("linearGradient")
  //     .attr("id", "line-gradient")
  //     .attr("gradientUnits", "userSpaceOnUse")
  //     .selectAll("stop")
  //     .data((d: any) => [
  //       { offset: "0%", color: '#5fbb460E' },
  //       { offset: "25%", color: 'rgba(210,71,75, .3)' },
  //       { offset: "50%", color: '#5fbb460E' },
  //       { offset: "75%", color: 'rgba(210,71,75, .3)' },
  //       { offset: "100%", color: '#5fbb460E' }
  //     ])
  //     .enter().append("stop")
  //     .attr("offset", (d: any) => { return d.offset; })
  //     .attr("stop-color", (d: any) => { return d.color; });

  //   // Add the valueline path.
  //   svg.append("path")
  //     .attr("class", "line");

  //   // once the arrangement is initialized, scale and translate it
  //   if (rescale) {
  //     for (const node of nodes) {
  //       node.x = node.x * scale + center[0];
  //       node.y = node.y * scale + center[1];
  //     }
  //   }

  //   function drag(sim, isNode?) {

  //     function dragstarted(d) {
  //       if (!d3.event.active) sim.alphaTarget(0.3).restart();
  //       d.fx = d.x;
  //       d.fy = d.y;
  //     }

  //     function dragged(d) {
  //       d.fx = d3.event.x;
  //       d.fy = d3.event.y;
  //     }

  //     function dragended(d) {
  //       if (!d3.event.active) sim.alphaTarget(0);
  //       d.fx = null;
  //       d.fy = null;
  //     }

  //     return d3.drag()
  //       .on("start", dragstarted)
  //       .on("drag", dragged)
  //       .on("end", dragended);
  //   }
  //   function tick() {
  //     if (!focused) return;
  //       link.attr("x1", (d: any) => d.source.x)
  //         .attr("y1", (d: any) => d.source.y)
  //         .attr("x2", (d: any) => d.target.x)
  //         .attr("y2", (d: any) => d.target.y);
  
  
  //       node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)
        
  //   }

  // }

  // Section 2 layout
  initProjectsSection(scrollTop?: number) {
    if (!gsap || scrollTop < $('#section2').scrollTop()) return;
    const projects = this.list.map((item, idx) => ({title: item.id, img: item.group + gsap.utils.random(1, 500)}))
  }

// Scroll to section
  private scroll(tl, y) {
    return tl.to(window, { duration: 1, ease: 'power3.inOut', scrollTo: { y, offsetY: 70 } });

  }
  scrollToNext(dir: 'up' | 'down') {
    if (dir === 'down' && this.active < 4) {
      this.active += 1;
    } else if (dir === 'up' && this.active > 1) {
      this.active -= 1;
    } else return;
    const tl = new TimelineMax({ease: 'power3.inOut(.5,1)'});
    const anchor = this.sections[this.active - 1].anchor;
    this.scroll(tl, anchor);
  }

}

