import {Component, OnInit} from '@angular/core';
import {Product} from '../ware.component';
import {WarsService} from '../../../services/wars.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './wars.component.html',
  styleUrls: ['./wars.component.css']
})
export class WarsComponent implements OnInit {
  products: Product[];
  t: number = 0;
  allPrice: number = 0;

  constructor(private warsService: WarsService,
              public route: Router) {
  }

  ngOnInit() {
    this.onGetProducts();
  }

  onGetProducts() {
    this.warsService.getWares().subscribe(
      res => {
        console.log(res, 'msmdcsecv');
        this.products = res;
        this.products.forEach(product => {
          this.t += product.number;
          this.allPrice += (product.price * product.number);
        });
      }
    );
  }

  onAdded(product: Product) {
    this.t++;
    this.allPrice += product.price;
  }

  onRemoved(product: Product) {
    this.t--;
    this.allPrice -= product.price;
  }

  saveProductSells() {
    const promise = new Promise((resolve, reject) => {
      let i = 0;
      this.products.forEach(product => {
        this.warsService.putWares(product).subscribe(
          res => {
            i = i + 1;
            if (i === this.products.length) {
              resolve(true);
            }
          }
        );
      });
    });
    promise.then(() => {
      this.route.navigate(['./payment']);
    });
  }
}
