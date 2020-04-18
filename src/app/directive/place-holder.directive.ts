import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[appPlaceHolder]'
})
export class PlaceDirective {
constructor(public viewContainerRef: ViewContainerRef) {
}
}
