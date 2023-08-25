import { Directive, HostListener, Input } from '@angular/core';
import { ToastTypes } from '../../types/Unions';
import { MessageService } from '../../services/message/message.service';

@Directive({
  selector: '[appHoverInfo]',
})
export class HoverInfoDirective {
  // Inputs
  @Input() appHoverInfo = '';
  @Input() msgType: ToastTypes = 'info';
  @Input() disableAppHover = false;

  constructor(private msg: MessageService) {}

  // Create a Toast on hover
  @HostListener('mouseenter') onMouseEnter() {
    if (!this.disableAppHover) {
      this.msg.persistToast(this.msgType, this.appHoverInfo);
    }
  }

  // Destroy the Toast when hover is out
  @HostListener('mouseleave') onMouseLeave() {
    if (!this.disableAppHover) {
      this.msg.hideToast();
    }
  }
}
