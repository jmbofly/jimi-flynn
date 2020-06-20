import { Component } from '@angular/core';
import { AnimationService } from 'src/app/core/animation.service';

@Component({
  selector: 'jf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jimi-flynn';
  showMenu = false;
  constructor(public animation: AnimationService) {
    animation.GSAP.set('#sidenav-wrapper', {duration: 2,ease: 'elastic'})
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  scrollTo(id: string) {
    this.animation.GSAP.to(window, { scrollTo: { y: id, offsetY: 70 } });
    this.showMenu = false;
  }
}

