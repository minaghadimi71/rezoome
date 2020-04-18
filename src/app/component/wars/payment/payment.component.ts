import {Component, OnInit} from '@angular/core';
import {Product} from '../ware.component';
import {WarsService} from '../../../services/wars.service';
import {HelperService} from "../../../services/helper.service";

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  products: Product[] = [];

  constructor(public warsService: WarsService,
              public helperService: HelperService) {
    this.getProduct();
  }

  ngOnInit(): void {
  }

  getProduct() {
    this.warsService.getWares().subscribe(
      res => {
        this.products = [];
        console.log(res);
        res.forEach(item => {
          if (item.number > 0) {
            this.products.push(item);
          }
        });
      }
    );
  }

  removeProduct(product) {
    product.number = 0;
    this.warsService.putWares(product).subscribe(
      response => {
        this.getProduct();
        this.helperService.showToast('Succeed', 'war is deleted', 'succeed', false);
      });
  }
}
