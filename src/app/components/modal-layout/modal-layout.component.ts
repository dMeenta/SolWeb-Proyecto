import { Component } from '@angular/core';
import { modalContentSignal } from '../../shared/ui/signals/showModal.signal';

@Component({
  selector: 'app-modal-layout',
  imports: [],
  templateUrl: './modal-layout.component.html',
  styleUrl: './modal-layout.component.css',
})
export class ModalLayoutComponent {
  close() {
    modalContentSignal.set(null);
  }
}
