import {Component,OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  title: string = '';
  message: string = '';
  yesButton: string = '';
  noButton: string = '';
  subject: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
  }

  saveChanges() {
    this.bsModalRef.hide();
    this.subject.next(true);
  }

  fade() {
    this.bsModalRef.hide();
    this.subject.next(false);
  }

}
