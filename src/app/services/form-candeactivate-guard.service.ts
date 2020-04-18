import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';

export interface FormCandeactivateComponent {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class FormCandeactivateGuard implements CanDeactivate<FormCandeactivateComponent> {
  canDeactivate(component: FormCandeactivateComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot):
    Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> |
    boolean | UrlTree {
    return component.canDeactivate();
  }

}
