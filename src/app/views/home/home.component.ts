import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AnimationService } from 'src/app/core/animation.service';
import { DATA } from 'src/app/data/data';
import { GraphService } from 'src/app/core/graph.service';
import { style } from '@angular/animations';
@Component({
  selector: 'jf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  active = 1;

  constructor(public animation: AnimationService, private graph: GraphService) { }

  private random(min, max): number {
    return min + Math.random() * (max - min)
  };
  private between(min, max, percent) {
    return max - (max - min) * (1 - percent)
  };

  // Initialize scroll navigation
  // TODO: Disable window scrolling
  private scrollerInit() {
    let config: any = {
      scrollEnable: false,
      wheelEvent: {type: 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel', event: 0},
      timeLine: [],
      scrollCount: 0,
      windowHeight: $(window).height(),
      init: this.animation.GSAP.to(window, { duration: 1, scrollTo: { y: 0, offsetY: 70 } }),
      anim: (el, vars: { duration, scrollTo }) => this.animation.GSAP.to(el, vars),
      sections: ['section1', 'section2', 'section3', 'section4'].map(name => ({name, anchor: $(`#${name}`)})),
    };
    $(window).on('touchmove', function (e) { config.scrollEnabled = 0 ?  e.preventDefault(): 0 });
    // $(window).off('mousewheel');
    window.addEventListener(config.wheelEvent.type, e => handleWheelEvent(e), { passive: false });
    const handleWheelEvent = (e: Event | any) => {
      e.preventDefault();
      config.wheelEvent.event = e;
      const wait = new Date(e.timeStamp).getSeconds() < new Date(config.timeLine[config.timeLine.length]).getSeconds() + 5;
      const { timeStamp, deltaY } = e;
      config.timeLine.push(timeStamp);
      ++config.scrollCount;

      if (!config.scrollEnabled && !wait) {
        if (config.scrollCount > 5) {
          if (deltaY > 0) {
            console.log('scrolling down', config)
            this.scrollToNext(this.animation.GSAP, true, true)
          } else {
            console.log('scrolling up', config)
            this.scrollToNext(this.animation.GSAP, true, false)
          }
          config.scrollCount = 0;
        }
        
      } 
    }
  }


  ngOnInit(): void {
    // this.animateTitle();
    this.animateDecal();
    this.wiredLayout(this.animation.D3);
    this.scrollerInit();
  }

  // Animate hero title
  // TODO: @jmbofly Fix title animation
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
      duration: 3,
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
        duration: 3,
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

    // Animate logo decal
    // TODO: Finish
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


  // TODO: @jmbofly Clean up
  // TODO: Add links line breaks
  // Layout graph
  wiredLayout(el = this.animation.D3) {
    let focused = true;
    const colors = el.scaleOrdinal(el.schemeSet3);
    const setColors = (d = '') => colors(d);
    const $ = (s: string, o = document): Element => o.querySelector(s),
      container = $('.balls-wrapper'),
      numNodes = 1500,
      width = container.parentElement.offsetWidth,
      height = container.parentElement.offsetHeight,
      links = DATA.links.map(d => Object.create(d)),
      nodes = DATA.nodes.map(d => Object.create(d)),
      scale = 1.7,
      center = [width / 2 - 200, height / 2 - 200],
      rescale = isNaN(nodes[0].x),
      svg = el.select('.balls-wrapper').append('svg:svg').attr("viewBox", `${[0, 0, width, height]}`),
      simulation = el
        .forceSimulation()
        .nodes(nodes)
        .alphaDecay(.0001)
        .velocityDecay(.601055)
        .force('layout', el.forceRadial(100))
        .force('link', el.forceLink(links).distance(10).id((d: any) => d.id))
        .force('center', el.forceCenter(width / 1.8, height / 2))
        .force('charge', el.forceManyBody().strength((d, i) => -10 * i))
        .force('collide', el.forceCollide().radius((d: any) => d.size).strength(-10))
        .force("x", el.forceX(500).strength(.1))
        .force("y", el.forceY(500).strength(.1))
        .on("tick", tick),
      link = svg.append("g")
      .selectAll("line")
      .data(links)
        .join("line")
        .attr("stroke-opacity", .7)
        .attr('class', 'line')
        .attr("stroke-width", 1),
      node = svg
        .selectAll("circle")
        .enter()
        .data(nodes)
        .join("circle")
        .attr("r", 5)
        .attr('fill', (d: any) => setColors())
        .call(drag(simulation));
    const x = el.range(width);
    const y = el.range(height);

    svg.append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .selectAll("stop")
      .data((d: any) => [
        { offset: "0%", color: 'rgba(32, 235, 19, .7)' },
        { offset: "25%", color: 'rgba(210,71,75, .7)' },
        { offset: "50%", color: 'rgba(32, 235, 19, .7)' },
        { offset: "75%", color: 'rgba(210,71,75, 0.75)' },
        { offset: "100%", color: 'rgba(32, 235, 19, 0.7)' }
      ])
      .enter().append("stop")
      .attr("offset", (d: any) => { return d.offset; })
      .attr("stop-color", (d: any) => { return d.color; });

    // Add the valueline path.
    svg.append("path")
      .attr("class", "line");

    window.addEventListener('focus', (e) => { focused = true })
    window.addEventListener('blur', (e) => { focused = false })


    // once the arrangement is initialized, scale and translate it
    if (rescale) {
      for (const node of nodes) {
        node.x = node.x * scale + center[0];
        node.y = node.y * scale + center[1];
      }
    }

    function drag(sim, isNode?) {

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
      if (!focused) return;
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);


      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y)
    }

    function breakLines(node, breakAt) {

    }

  }
// Scroll to next section according to element id
  scrollToNext(gsap: GSAP, scrolled = false, goinDown?: boolean) {
    $('#sidenav-wrapper').removeClass('open');
    $('.navbarToggler').removeClass('active');
    const tl = gsap.timeline({ease: 'expo'});
    if (scrolled) {
      if (goinDown) {
        if (this.active > 3) {
          tl.to(window, { duration: 1, scrollTo: { y: '#section1', offsetY: 70 } });
          this.active = 1;
          return;
        }
        tl.to(window, { duration: 1, scrollTo: { y: "#section" + (this.active + 1), offsetY: 70 } });
        this.active += 1;
      } else if (!goinDown && this.active > 1) {
        tl.to(window, { duration: 1, scrollTo: { y: "#section" + (this.active - 1), offsetY: 70 } });
        this.active -= 1;
      } else {
        tl.to(window, { duration: 1, scrollTo: { y: '#section1', offsetY: 70 } });
        this.active = 1;
        return;
      }

    } else {
      if (this.active > 3) {
        tl.to(window, { duration: 1, scrollTo: { y: '#section1', offsetY: 70 } });
        this.active = 1;
        return;
      }
      tl.to(window, { duration: 1, scrollTo: { y: "#section" + (this.active + 1), offsetY: 70 } });
      this.active += 1;
    }
  }

}

