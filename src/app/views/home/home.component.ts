import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/core/animation.service';
import { DATA } from 'src/app/data/data';
@Component({
  selector: 'jf-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private animation: AnimationService) { }

  ngOnInit(): void {
    this.animateTitle();
    this.animateBalls();
    this.animateDecal();
  }

  animateTitle() {
    const tl = this.animation.timeline();
    tl.to('.hero-subtitle b', {
      delay: 2,
      duration: 2,
      text: {
        speed: 5,
        value: 'developer',
        delimiter: ''
      }
    }).to('.hero-subtitle b', {
      duration: 2,
      text: {
        speed: 1,
        value: 'problem solver',
        delimiter: ''

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
    const count = 200;
    const random = (min, max) => min + Math.random() * (max - min);
    const between = (min, max, percent) => max - (max - min) * (1 - percent);
    
    for (let i = 0; i < count - 1; i++) {
      const ball: Element = document.createElement('div');
      ball.classList.add('ball');
      container.appendChild(ball);
    }
    this.animation.utils.toArray('.ball').forEach((ball: Element, idx) => {
      this.animation.GSAP.set(ball, { repeat: -1 });
      const tl = this.animation.timeline();
      tl.fromTo(ball, {
         x: this.animation.utils.random(window.innerWidth, -container.clientWidth),
         y: this.animation.utils.random(-window.innerHeight, container.clientHeight),
         width: `${(idx * .1)}px`,
        height: `${(idx * .1)}px`,
       }, {
          duration: 30,
         stagger: .1,
             x: this.animation.utils.random(ball.clientLeft / 2, container.clientWidth),
             y: this.animation.utils.random(ball.clientLeft / 2, container.clientHeight),
           })
         })
  }

}
