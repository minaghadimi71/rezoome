import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {RegisterComponent} from "./component/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {ResetPasswordComponent} from "./component/reset-password/reset-password.component";
import {AddQuizComponent} from "./component/add-quiz/add-quiz.component";
import {FormCandeactivateGuard} from "./services/form-candeactivate-guard.service";
import {ShoppingComponent} from "./component/shopping/shopping.component";
import {TemplateComponent} from "./component/tempelete/template.component";
import {WarsComponent} from "./component/wars/all-wars/wars.component";
import {PaymentComponent} from "./component/wars/payment/payment.component";


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'reset', component: ResetPasswordComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'add-quiz', component: AddQuizComponent,
    canActivate: [AuthGuard],
    canDeactivate: [FormCandeactivateGuard], },
  {path: 'drag-drop', component: ShoppingComponent,
    canActivate: [AuthGuard]},
  {path: 'template', component: TemplateComponent, canActivate: [AuthGuard]},
  {path: 'wars', component: WarsComponent, canActivate: [AuthGuard]},
  {path: 'payment', component: PaymentComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
