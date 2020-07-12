import { Component, OnInit } from '@angular/core';
import { gsap, TimelineMax } from "gsap";
import * as $ from 'jquery';
// import { data as blocks } from '../../data/blocks';

import ForceGraph3D from '3d-force-graph';


import { DATA } from 'src/app/data/data';
import { PROJECTS_DATA, Project } from 'src/app/data/projects';
import { linkRadial } from 'd3';

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
  list = DATA.nodes.filter((d, i) => i < 6);
  projects: Project[] = PROJECTS_DATA;
  Graph: any;
  gData: any = null;
  layouts: any;
  disableCamera = false;

  constructor() { }

  // Initialize scroll navigation
  private initScroller() {
    const eventType = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    gsap.to(window, 1, { scrollTo: { y: 0, offsetY: 70 } })
    window.addEventListener('touchmove', function (e) {
      e.preventDefault();
    }, { passive: false });
    window.addEventListener(eventType, e => { e.preventDefault() }, { passive: false });
  }

  ngOnInit(): void {
    this.initScroller();
    this.initGraph();
  }


  // animateSVG(targets: string | string[], vars?: any, duration?: number) {
  //   const master = new TimelineMax({ paused: true, reversed: true });
  //   if (typeof targets === 'string') {
  //     master.to(targets, duration, vars);
  //   } else {
  //     targets.map((target, idx, targets) => {
  //       master.to(target, vars[idx]);
  //     })
  //   }
  //   return master;
  // }

  generateData(multiplier: number = 1000) {
    let rando1 = Math.ceil(Math.random() * multiplier) * 2;
    let rando2 = rando1 / 2;
    let randoms = {
      nodes: [...Array(rando1).keys()].map(i => ({ id: i })),
      links: [...Array(rando2).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id - 1)),
          color: id % 2
        }))
    }
    this.Graph
      .graphData(randoms)
      .nodeRelSize(2.5)
      .linkOpacity(.5)
      .nodeAutoColorBy('id')
      .linkAutoColorBy('source')
      .linkDirectionalParticles("value")
      .linkDirectionalParticleSpeed((d: any) => d.value * 0.001);
  }

  orbit(paused = true, dist = 500, interval = 10) {
    if (paused || this.disableCamera) return;
    const distance = dist;
    // camera orbit
    let angle = 0;
      setInterval(() => {
        this.Graph.cameraPosition({
          x: distance * Math.sin(angle),
          z: distance * Math.cos(angle)
        });
        angle += Math.PI / 1000;
      }, interval);
  }

  // TODO: @jmbofly Clean up
  // TODO: Add links line breaks
  // TODO: Generate additional links
  // Layout graph
  initGraph() {
    const elem = document.getElementById('graph-wrapper');
    this.Graph = ForceGraph3D()(elem);
    this.orbit(false, 2000, 10);
    this.generateData(100);
  }

  toggleCameraControl() {
    this.disableCamera = !this.disableCamera
  }

  initHero() {
    const tl = new TimelineMax();
    tl.to('.hero-title', 1, { ease: 'expo', delay: 5, opacity: 1, marginTop: 0 })
      .to('.hero-subtitle', 1.25, { ease: 'expo', scale: 1, opacity: 1 }, '>1')
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
    const tl = new TimelineMax({ ease: 'power3.inOut(.5,1)' });
    const anchor = this.sections[this.active - 1].anchor;
    this.scroll(tl, anchor);
  }

}

