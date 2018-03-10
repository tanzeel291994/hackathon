import {Component, Input} from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  templateUrl:'./modal-basic.html',
  styleUrls:['./modal.css']
})
export class NgbdModalContent {
  @Input() profile;

  constructor(public activeModal: NgbActiveModal) {}
}
