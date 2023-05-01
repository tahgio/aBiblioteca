import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, Injector, } from '@angular/core';
import { ToastComponent } from 'src/app/elements/toast/toast.component';
import { ToastTypes } from '../../types/Unions';

const MESSAGE_ICONS = {
  success: "heroCheckCircle" as const,
  info: "heroInformationCircle" as const,
  warning: "heroExclamationTriangle" as const,
  error: "heroExclamationCircle" as const,
}
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private toastRef!: ComponentRef<ToastComponent>;

  constructor(
    private appRef: ApplicationRef,
) {

 }



  showToast(type: ToastTypes, message: string) {
    const toastElement = document.createElement('app-toast')
    const toastRef = this.appRef.bootstrap(ToastComponent, toastElement) as ComponentRef<ToastComponent>;
    toastRef.instance.message = message
    toastRef.instance.type = type
    toastRef.instance.icon = MESSAGE_ICONS[type]
    toastRef.instance.animation = "animate-fadeIn"
    this.toastRef = toastRef
    this.appRef.attachView(toastRef.hostView);
    const domElem = (toastRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
    setTimeout(() => {
      this.hideToast()
    }, 3000);
  }

  hideToast() {
    if (this.toastRef) {
      this.toastRef.instance.animation = "animate-fadeOut"
      setTimeout(() => {
        this.appRef.detachView(this.toastRef.hostView);
        this.toastRef.destroy();
      }, 500)
      // document.body.removeChild(this.toastRef.location.nativeElement);
    }
  }


}
