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
  title = 'jimi-flynn';
  showMenu = false;
  loaderText = '';
  isLoading: boolean = false;
  constructor() {
  }

  ngOnInit() {
    Aos.init({
      useClassNames: true
    });
    
    
    
    this.loading();
  }

  private loading() {
    
    const text = 'LOADING...';
    const loader = $('#loader .clip-text');
    const tl = gsap.timeline();
    tl.set(loader, { backgroundPositionX: '-150vw' });
    this.isLoading = true;
    tl.to(loader, {
      delay: 1.25,
      backgroundPositionX: '0',
      duration: 5,
      ease: 'circ',
      onComplete: () => {
        tl.to('#loader', {
          duration: .75,
          ease: 'sine',
          top: '100vh',
          onComplete: (self) => {
            tl.to($('.scroller-toggle-wrapper'), .75, { opacity: 1 });
            tl.to($('#loader'), .25, { display: 'none' }, '>1');
          }
        }, '+=1');
        this.isLoading = false;
      }
    });
  }

  
  toggleMenu() {
    this.showMenu = !this.showMenu;
    const tl = gsap.timeline();
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
    gsap.to(window, { scrollTo: { y: id, offsetY: 70 } });
  }
}

