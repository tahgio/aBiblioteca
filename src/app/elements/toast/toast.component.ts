import { Component, Input} from '@angular/core';
import { ToastIcons, ToastTypes } from '../../core/types/Unions';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
})
export class ToastComponent{
  @Input() type!: ToastTypes;
  @Input() icon!: ToastIcons;
  @Input() message!: string;
  @Input() animation!: string;
  
}
