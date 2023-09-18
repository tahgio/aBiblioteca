import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-sub-cards',
  templateUrl: './sub-cards.component.html',
})
export class SubCardsComponent {
  @ContentChild('children') children!: TemplateRef<any>;
}
