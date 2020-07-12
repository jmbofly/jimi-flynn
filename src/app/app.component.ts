import { Component, OnInit } from '@angular/core';
import { gsap, TimelineMax } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { Draggable } from "gsap/Draggable";
import { EaselPlugin } from "gsap/EaselPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as $ from 'jquery';
import * as d3 from "d3";
import * as Aos from 'aos';
gsap.registerPlugin(CSSRulePlugin, Draggable, EaselPlugin, MotionPathPlugin, TextPlugin, ScrollToPlugin, ScrollTrigger);


@Component({
  selector: 'jf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //TODO: Fix responsive sidenav
  title = 'Jimi Flynn | Developer | Designer | Problem Solver';
  showMenu = false;
  constructor() {
  }

  ngOnInit() {
    Aos.init({
      useClassNames: true
    });
    
    
    
    this.loading();
  }

  private loading() {
    const loader = $('#loader .clip-text');
    const tl = new TimelineMax();
    tl.set(loader, { backgroundPositionX: '-100vw' })
      .to(loader, 4, {
      ease: 'power3.inOut',
      backgroundPositionX: '0',
      onComplete: () => {
        tl.to('#loader', 1, {
          ease: 'power3.inOut(1,0)',
          top: '100vh',
        })
          // .to(loader, .25, { opacity: 0 })
          .to('.hero-title', .5, { ease: 'expo', opacity: 1, marginTop: 0 }, '-=.5')
          .to('#first-name-dots', 1.25, { ease: 'power3.inOut', translateY: '-22px' })
          .to('#last-name > .letters > *',.75, { ease: 'power3.inOut', stagger: .25, translateX: 0, opacity: 1})
          .to('.hero-subtitle', .5, { ease: 'expo', scale: 1, opacity: 1 })
          .to('#portrait > *', .25, {
            ease: 'power3.inOut',
            stagger: .1,
            fill: 'rgba(13, 11, 15, 0.1)',
            strokeDashoffset: 0,
          })
          // .to('.scroll-down-text', 1, {opacity: 1})
          .to($('.scroller-toggle-wrapper'), .35, { right: '1.5rem', opacity: 1 })
      }
    });
  }

  
  toggleMenu() {
    this.showMenu = !this.showMenu;
    const tl = new TimelineMax();
    tl.fromTo('#sidenav-wrapper', {
      transform: this.showMenu ? 'translateX(-100vw)': 'translateX(0)'
    },
      {
        duration: .75,
        ease: 'power3.inOut(1,0)',
        transform: this.showMenu ? 'translateX(0)' : 'translateX(100vw)'
      })
  }

  scrollTo(id: string) {
    return new TimelineMax().to(window, { scrollTo: { y: id, offsetY: 70 } });
  }
}

