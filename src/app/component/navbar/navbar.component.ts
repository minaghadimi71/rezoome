import {Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {PlaceDirective} from "../../directive/place-holder.directive";
import {ChangePasswordComponent} from "../../shared/change-password/change-password.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  toggleDropDown: boolean = false;
  @Input() email: string;
  passwordSubscription: Subscription;
  @ViewChild(PlaceDirective, {static: false}) changePass: PlaceDirective;

  constructor(public authService: AuthService,
              public componentFactoryResolver: ComponentFactoryResolver,
              public route: Router) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  toggle() {
    this.toggleDropDown = !this.toggleDropDown;
  }

  LogOut() {
    this.authService.logOut();
    this.route.navigate(['/login']);
  }
  ChangePassword() {
    this.toggle();
    const hostViewContainerRef = this.changePass.viewContainerRef;
    const factoryPassComponent = this.componentFactoryResolver.resolveComponentFactory(ChangePasswordComponent);
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(factoryPassComponent);
    this.passwordSubscription = componentRef.instance.close.subscribe(
      res => {
        this.passwordSubscription.unsubscribe();
        hostViewContainerRef.clear();

      }
    )
  }
}
