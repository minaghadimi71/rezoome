import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {HelperService} from "./services/helper.service";
import {fromEvent, interval, Subscription} from "rxjs";
import {PlaceDirective} from "./directive/place-holder.directive";
import {LockPageComponent} from "./shared/lock-page/lock-page.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'quiz-project';
  user: boolean = false;
  email: string = ''
  loading: boolean = false;
  authSubscription: Subscription;
  intervalParam: Subscription;
  private subscribeLogIn: Subscription;
  private subscribeLogOut: Subscription;
  private events: Subscription[] = [];
  timeOut: number = 10;

  eventObserver;

  @ViewChild(PlaceDirective,
    {static: false}) lockHost: PlaceDirective;

  constructor(private authService: AuthService,
              public helperService: HelperService,
              public componentFactoryResolver: ComponentFactoryResolver) {
    this.helperService.onLoading().subscribe(
      res => {
        this.loading = res;
      }
    )
    const clicks = fromEvent(document, 'click');
    clicks.subscribe(res => {
      this.helperService.hideToast();
    });
    this.lockPageFunction();
  }

  ngOnInit(): void {
    this.authService.handelAutoLogIn();
  }

  lockPageFunction() {
    this.authSubscription = this.authService.user.subscribe(
      res => {
        this.user = !!res;
        if (this.user) {
          this.email = res.email;
          this.intervalParam =
            interval(60000 * this.timeOut).subscribe(res => {
              console.log('show erroe');
              this.showError();
            });
          const clicks = fromEvent(document, 'click');
          const mousemove = fromEvent(document, 'mousemove');
          const keyup = fromEvent(document, 'keyup');
          this.eventObserver = [clicks, mousemove, keyup];
          this.eventObserver.forEach((observer) => {
            this.events.push(observer.subscribe((x) => {
              this.intervalParam.unsubscribe();
              this.intervalParam =
                interval(60000 * this.timeOut).subscribe(res => {
                  console.log('show erroe');
                  this.showError();
                });
            }));
          });
        }
      }
    )
  }
  showError() {
    console.log('daram ejra misham');
    this.intervalParam.unsubscribe();
    this.events.forEach(even => {
      even.unsubscribe();
    });
    const factoryLock =
      this.componentFactoryResolver.resolveComponentFactory(LockPageComponent);
    const hostViewContainerRef =
      this.lockHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef =
      hostViewContainerRef.createComponent(factoryLock);
    this.authService.logOut();
    this.subscribeLogIn =
      componentRef.instance.closeLogin.subscribe(
        () => {
          this.subscribeLogIn.unsubscribe();
          hostViewContainerRef.clear();
          this.eventObserver.forEach((obser) => {
            this.events.push(obser.subscribe((x) => {
              this.intervalParam.unsubscribe();
              this.intervalParam =
                interval(60000 * this.timeOut).subscribe(res => {
                  console.log('show erroe');
                  this.showError();
                });
            }));
          });
        }
      );
    this.subscribeLogOut =
      componentRef.instance.closeLogOut.subscribe(
        () => {
          this.subscribeLogOut.unsubscribe();
          this.subscribeLogIn.unsubscribe();
          hostViewContainerRef.clear();
          this.events.forEach(even => {
            even.unsubscribe();
          });
        }
      );
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.intervalParam.unsubscribe();
    if (this.subscribeLogOut) {
      this.subscribeLogOut.unsubscribe();
    }
    if (this.subscribeLogIn) {
      this.subscribeLogIn.unsubscribe();
    }
    this.events.forEach(even => {
      even.unsubscribe();
    });
  }
}
