import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ModalComponent } from 'src/app/elements/modal/modal.component';
import { Nullable } from '../../types/Methods';

@Directive({
  selector: '[modal]',
})
export class ModalDirective {
  // Init
  @Input()
  modal!: string;
  @Output() onConfirm = new EventEmitter<boolean>();
  componentRef!: Nullable<ComponentRef<ModalComponent>>;
  domElem!: HTMLElement;

  constructor(private elementRef: ElementRef, private appRef: ApplicationRef) {}

  @HostListener('click') onClick() {
    // Create component
    const element = document.createElement('app-modal');
    // Get its reference
    const compRef = this.appRef.bootstrap(
      ModalComponent,
      element
    ) as ComponentRef<ModalComponent>;
    // Save and atttach ref
    this.componentRef = compRef;
    this.componentRef.instance.componentRef = this.componentRef;
    this.componentRef.instance.onConfirm = this.onConfirm;
    this.componentRef.instance.message = this.modal;
    const hostView = this.componentRef.hostView;
    this.appRef.attachView(hostView);
    const domElem = (hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    this.domElem = domElem;
    //Append Child
    document.body.appendChild(this.domElem);
  }

  destroy() {
    console.log('cancel', this.componentRef);
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
    this.componentRef = null;
  }
}
