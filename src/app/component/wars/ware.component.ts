import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

export class Product {
  new: boolean;
  number: number;
  id: number;
  price: number;
  name: string;
  image: string;
  popularity: number;
  fakeId?: string;
  fakeDeskId?: number;
}

@Component({
  selector: 'app-ware',
  templateUrl: './ware.component.html',
  styleUrls: ['./ware.component.css']
})
export class WareComponent implements OnInit {
  public numb: number;
  @Input() product: Product;
  active: boolean = false;
  @Output() add = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  constructor() {
    this.numb = Math.random();
  }

  getColor() {
    return this.numb > 0.5 ? 'red' : 'green';
  }

  ngOnInit() {
    if (this.product.number > 0) {
      this.active = true;
    }
  }

  onAddPopularity() {
    this.product.popularity++;
  }

  onAddCard() {
    this.product.number++;
    this.active = true;
    this.add.emit(this.product);
  }

  onRemoveCard() {
    if (this.product.number !== 0) {
      this.product.number--;
    }
    if (this.product.number === 0) {
      this.active = false;
    }
    this.remove.emit(this.product);
  }
}
