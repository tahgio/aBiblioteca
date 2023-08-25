import {
  ApplicationRef,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
} from '@angular/core';
import { ToastComponent } from 'src/app/elements/toast/toast.component';
import { ToastTypes } from '../../types/Unions';

const MESSAGE_ICONS = {
  success: 'heroCheckCircle' as const,
  info: 'heroInformationCircle' as const,
  warning: 'heroExclamationTriangle' as const,
  error: 'heroExclamationCircle' as const,
};
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private toastRef!: ComponentRef<ToastComponent> | null;

  constructor(private appRef: ApplicationRef) {}

  /*
   * Show Toast without a timeout to disappear
   */
  public persistToast(type: ToastTypes, message: string) {
    // Create Toast
    this.createToast(type, message);
  }
  /*
   * Show Toast for 3 seconds
   */
  public showToast(type: ToastTypes, message: string) {
    // Create Toast
    this.createToast(type, message);
    // Hide Toast
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  /*
   * Method for hiding Toast
   */
  public hideToast() {
    if (this.toastRef) {
      this.toastRef.instance.animation = 'animate-fadeOut';
      setTimeout(() => {
        if (this.toastRef) {
          this.appRef.detachView(this.toastRef.hostView);
          this.toastRef.destroy();
        }
        this.toastRef = null;
      }, 500);
    }
  }

  /*
   * PRIVATE METHODS
   */
  private createToast(type: ToastTypes, message: string) {
    // If there's a toast already destroy it
    if (this.toastRef) {
      this.appRef.detachView(this.toastRef.hostView);
      this.toastRef.destroy();
    }
    //Create element
    const toastElement = document.createElement('app-toast');
    //Get its reference
    const toastRef = this.appRef.bootstrap(
      ToastComponent,
      toastElement
    ) as ComponentRef<ToastComponent>;
    //Inject inputs
    toastRef.instance.message = message;
    toastRef.instance.type = type;
    toastRef.instance.icon = MESSAGE_ICONS[type];
    toastRef.instance.animation = 'animate-fadeIn';
    //Save Ref
    this.toastRef = toastRef;
    this.appRef.attachView(toastRef.hostView);
    const domElem = (toastRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    //Append Child
    document.body.appendChild(domElem);
  }
}
