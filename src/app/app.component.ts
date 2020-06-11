import { Component } from '@angular/core';

@Component({
  selector: 'jf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'jimi-flynn';
  showMenu = false;

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}

