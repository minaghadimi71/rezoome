import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import {LoginComponent} from "./component/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegisterComponent} from "./component/register/register.component";
import {AuthInterceptorService} from "./services/auth-interceptor.service";
import {AuthGuard} from "./guards/auth.guard";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import { NavbarComponent } from './component/navbar/navbar.component';
import {HelperService} from "./services/helper.service";
import {PlaceDirective} from "./directive/place-holder.directive";
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ToastComponent } from './shared/toast/toast.component';
import {PassValidatorDirective} from "./validators/match.validator";
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { LockPageComponent } from './shared/lock-page/lock-page.component';
import {FilterPipe} from "./pipes/filter.pipe";
import {QuizService} from "./services/quiz.service";
import { AddQuizComponent } from './component/add-quiz/add-quiz.component';
import {ColorDirectiveDirective} from "./directive/color-directive.directive";
import {ModalComponent} from "./shared/modale/modal.component";
import {FormCandeactivateGuard} from "./services/form-candeactivate-guard.service";
import {ModalModule} from "ngx-bootstrap";
import {DynamicPaginatorComponent} from "./shared/dynamic-paginator/dynamic-paginator";
import {PaginationService} from "./shared/dynamic-paginator/painationService";
import {CustomNumberValidatorDirective} from "./directive/custom-number-validator.directive";
import {DragAndDropModule} from "angular-draggable-droppable";
import {DropDownService} from "./services/drop-down.service";
import {ShoppingComponent} from "./component/shopping/shopping.component";
import {TemplateComponent} from "./component/tempelete/template.component";
import {WareComponent} from "./component/wars/ware.component";
import {WarsComponent} from "./component/wars/all-wars/wars.component";
import {WarsService} from "./services/wars.service";
import {PaymentComponent} from "./component/wars/payment/payment.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    PlaceDirective,
    ChangePasswordComponent,
    LoadingComponent,
    ToastComponent,
    PassValidatorDirective,
    ResetPasswordComponent,
    LockPageComponent,
    FilterPipe,
    AddQuizComponent,
    ColorDirectiveDirective,
    ModalComponent,
    DynamicPaginatorComponent,
    CustomNumberValidatorDirective,
    ShoppingComponent,
    TemplateComponent,
    WareComponent,
    WarsComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragAndDropModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    HelperService,
    QuizService,
    FormCandeactivateGuard,
    PaginationService,
    DropDownService,
    WarsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
   ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChangePasswordComponent,
    LockPageComponent,
    ModalComponent,
  ]
})
export class AppModule { }
