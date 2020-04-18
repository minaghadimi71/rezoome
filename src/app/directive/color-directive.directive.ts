import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirectiveDirective implements OnInit{
  @Input('appColor') color;
  constructor(public el: ElementRef) {
  }
  ngOnInit(): void {
    this.el.nativeElement.style.color = this.color;
  }
  @HostListener("blur") onBlur() {
    this.el.nativeElement.style.color = this.color;
  }

}
