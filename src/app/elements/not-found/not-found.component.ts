import { Component, Input } from '@angular/core';

@Component({
  selector: 'not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  @Input()
  message!: string;
  @Input()
  full: boolean = true;
}
