import { Component } from '@angular/core';
const NAV_SIZE = 272;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'aBiblioteca';
  navSize = NAV_SIZE;

  toggleSize(isNavOpen: boolean) {
    this.navSize = isNavOpen ? NAV_SIZE : 0;
  }
}
