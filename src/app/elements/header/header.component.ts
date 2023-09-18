import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input()
  img!: string;
  @Input()
  imgAlt!: string;
  @Input()
  title!: string;
  @Input()
  subTitle!: string;
}
