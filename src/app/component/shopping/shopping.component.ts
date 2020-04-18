import {Component} from '@angular/core';
import * as _ from 'lodash';
import {DropDownService} from "../../services/drop-down.service";

export class DragItems {
  name: string;
  column?: number;
  row?: number;
  id: number;
  trackId?: number;
}

@Component({
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent {
  dragItems: DragItems[] = [];
  shop: DragItems;
  column: number;
  row: number;
  items1: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  tracks = [{trackId: 1}, {trackId: 2}, {trackId: 3}];

  dragEnd($event, shop) {
    this.shop = shop;
    console.log(this.shop);
  }

  dropsell($event, item, track) {
    this.shop.trackId = track;
    if (item === 1 || item % 4 === 1) {
      this.shop.column = 1;
    } else if (item === 2 || item % 4 === 2) {
      this.shop.column = 2;
    } else if (item === 3 || item % 4 === 3) {
      this.shop.column = 3;
    } else if (item % 4 === 0) {
      this.shop.column = 4;
    }
    if (item / 4 <= 1) {
      this.shop.row = 1;
    } else if (item / 4 <= 2) {
      this.shop.row = 2;
    } else if (item / 4 <= 3) {
      this.shop.row = 3;
    } else if (item / 4 <= 4) {
      this.shop.row = 4;
    } else if (item / 4 <= 5) {
      this.shop.row = 5;
    } else if (item / 4 <= 6) {
      this.shop.row = 6;
    }
    const tmpDrag = _.find(this.dragItems, (drag) => drag.id === this.shop.id);
    const index: number = this.dragItems.indexOf(tmpDrag);
    this.dragItems.splice(index, 1);
    this.dragItems.push(this.shop);
    this.dropDownService.saveDragItems(this.dragItems).subscribe( res => {
    });
  }

  calculateLeft(shopping) {
    if (!shopping.trackId) {
      return (((shopping.column - 1) * 120) + 35) + 'px';
    } else {
      return ((((shopping.column - 1) * 120) + 35) + (570 * (shopping.trackId - 1))) + 'px';
    }
  }

  calculateTop(shopping) {
    return (((shopping.row - 1) * 90) + 25) + 'px';
  }

  constructor(public dropDownService: DropDownService) {
    this.dropDownService.getDragItems().subscribe(
      response => {
        console.log(response);
        response.forEach( res => {
          this.dragItems.push(res);
        });
      }
    );
  }

  dragEnter(item) {
    console.log(item, 'mina');
  }
}
