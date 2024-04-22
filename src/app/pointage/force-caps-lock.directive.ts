import { Directive, HostListener, ElementRef } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appCheckCapsLock]'
})
export class CheckCapsLockDirective {
  constructor(
    private el: ElementRef,
    private globalService: GlobalService,
    private toastrService: ToastrService
  ) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    this.checkCapsLock(event);
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    this.checkCapsLock(event);
  }

  private checkCapsLock(event: KeyboardEvent): void {
    const isCapsLockOn = event.getModifierState && event.getModifierState('CapsLock');
    const toasts = this.toastrService['toasts'];
    const areToastsOpen = toasts && Object.keys(toasts).length > 0;
    //const areToastsOpen = toastContainer?.toasts.length > 0
    console.log(areToastsOpen);

    /*if(!isCapsLockOn && !areToastsOpen)
      this.globalService.toastShow(`Veuillez activer la touche ${"Caps Lock"}`, 'Attention: la touche "Caps Lock" n\'est pas activée ! ', "error")*/
  }
}
