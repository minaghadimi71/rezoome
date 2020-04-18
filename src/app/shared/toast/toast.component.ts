import { Component, OnInit } from '@angular/core';
import {HelperService} from "../../services/helper.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  header: string = '';
  body: string = '';
  color: string = '';
  class: boolean = true;
  constructor(private helperService: HelperService) {
    this.helperService.onToast().subscribe(res => {
      if (res) {
        this.header = res.head;
        this.body = res.body;
        this.color = res.color;
        this.class = res.class;
        document.getElementById('toast').classList.add('show');
      } else {
        document.getElementById('toast').classList.remove('show');
      }
    });
  }
}

