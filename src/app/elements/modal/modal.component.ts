import {
  ApplicationRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Nullable } from 'src/app/core/types/Methods';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  // Init
  @Input()
  message!: string;
  @Output() onConfirm = new EventEmitter<boolean>();
  @Input()
  componentRef!: Nullable<ComponentRef<ModalComponent>>;

  @Output() cancel = new EventEmitter<Nullable<ComponentRef<ModalComponent>>>();

  onCancel() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
    this.componentRef = null;
  }

  onConfirmClick() {
    this.onConfirm.emit(true);
    this.onCancel();
  }

  constructor(private appRef: ApplicationRef) {}
}
