import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/app/core/animation.service';
import * as Aos from 'aos';

@Component({
  selector: 'jf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  //TODO: Fix responsive sidenav
  title = 'jimi-flynn';
  showMenu = false;
  constructor(public animation: AnimationService) {
  }

  ngOnInit() {
    Aos.init({useClassNames: true})
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
    const tl = this.animation.GSAP.timeline();
    tl.fromTo('#sidenav-wrapper', {
      transform: this.showMenu ? 'translateX(-100vw)': 'translateX(0)'
    },
      {
        duration: .75,
        ease: 'power3.inOut',
        transform: this.showMenu ? 'translateX(0)' : 'translateX(100vw)'
      })
  }

  scrollTo(id: string) {
    this.animation.GSAP.to(window, { scrollTo: { y: id, offsetY: 70 } });
  }
}

