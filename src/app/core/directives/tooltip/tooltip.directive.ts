import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { Nullable, assureNever } from '../../types/Methods';
import { TooltipComponent } from 'src/app/elements/tooltip/tooltip.component';
import { Colors } from '../../types/Unions';

@Directive({
  selector: '[tooltip]',
})
export class TooltipDirective {
  // Init
  @Input()
  tooltip!: string;
  @Input()
  color: Colors = 'secondary';
  @Input()
  border: boolean = false;
  @Input()
  position: 'top' | 'bottom' = 'top';
  componentRef!: Nullable<ComponentRef<TooltipComponent>>;
  domElem!: HTMLElement;

  constructor(private elementRef: ElementRef, private appRef: ApplicationRef) {}

  /*
   * Mouse Enter Method
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.create();
  }

  /*
   * Mouse Leave Method
   */
  @HostListener('mouseleave') onMouseLeave() {
    if (this.componentRef) {
      // Add fadeout animation before dettaching component
      this.componentRef.instance.animation = ' animate-fadeOut ';
      // Timeout so component will be destroyed after animation
      setTimeout(() => {
        // Guard in case there is already a tooltip
        if (this.componentRef) {
          this.appRef.detachView(this.componentRef.hostView);
          this.componentRef.destroy();
        }
        this.componentRef = null;
      }, 500);
    }
  }

  /*
   * PRIVATE METHODS
   */
  private create() {
    // Create component
    const element = document.createElement('app-tooltip');
    // Get its reference
    const compRef = this.appRef.bootstrap(
      TooltipComponent,
      element
    ) as ComponentRef<TooltipComponent>;
    // Setup Inputs and position
    this.setupTooltip(compRef);
    // Save and atttach ref
    this.componentRef = compRef;
    const hostView = compRef.hostView;
    this.appRef.attachView(hostView);
    const domElem = (hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    this.domElem = domElem;
    //Append Child
    document.body.appendChild(this.domElem);
  }

  private setupTooltip(compRef: ComponentRef<TooltipComponent>) {
    // Inject inputs
    compRef.instance.text = this.tooltip;
    compRef.instance.border = this.border;
    compRef.instance.color = this.color;
    compRef.instance.animation = ' animate-fadeIn ';
    // Get element bounding
    const rect =
      this.elementRef.nativeElement.getBoundingClientRect() as DOMRect;
    this.setupPosition(compRef, rect);
  }

  private setupPosition(
    compRef: ComponentRef<TooltipComponent>,
    rect: DOMRect
  ) {
    const { left, right, bottom, top, width } = rect;
    // Setup Position according to input
    const horizontalDiff = right - left;
    const verticalDiff = bottom - top;
    const offset = 40;
    switch (this.position) {
      case 'bottom':
        compRef.instance.top = bottom + offset;
        compRef.instance.left = horizontalDiff / 2 + left;
        break;
      case 'top':
        compRef.instance.top = top - offset;
        compRef.instance.left = horizontalDiff / 2 + left;
        break;

      default:
        assureNever(this.position);
    }
  }
}
