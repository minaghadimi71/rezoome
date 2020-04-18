import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationService} from './painationService';

export class PageData {
  page: string;
  perPage: string;
  sort?: string;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './dynamic-paginator.html',
  styleUrls: ['./dynamic-paginator.scss']
})
export class DynamicPaginatorComponent implements OnInit {
  @Input() pageNumbers: number[];
  @Input() sort: string;
  allData: number;
  perPages: number;
  page: number = 1;
  items: number[] = [];
  @Output() data = new EventEmitter<PageData>();

  constructor(private paginationService: PaginationService) {
    this.paginationService.allPage.subscribe(res => {
      this.allData = res;
      const itemsL = this.allData / this.perPages;
      this.items = [];
      for (let i = 1; i < itemsL + 1; i++) {
        this.items.push(i);
      }
    });
  }

  ngOnInit(): void {
    this.perPages = this.pageNumbers[0];
    this.getData();
  }

  getData() {
    this.data.emit({page: this.page + '', perPage: this.perPages + '', sort: (this.sort ? this.sort : '')});
  }

  changePage(item?: number, sortBy: string = 'created') {
    if (item < 1 || item > this.items.length) {
      return;
    }
    if (item) {
      this.page = item;
    } else {
      this.page = 1;
      const itemsL = this.allData / this.perPages;
      this.items = [];
      for (let i = 1; i < itemsL + 1; i++) {
        this.items.push(i);
      }
    }
    this.getData();
  }

  getActiveClass(item) {
    if (item === this.page) {
      return true;
    }
    return false;
  }

  disableButton(sItem: string) {
    if (sItem === 'next') {
      if (this.page > this.items.length - 1) {
        return true;
      }
      return false;
    } else {
      if (this.page < 2) {
        return true;
      }
      return false;
    }
  }
}
