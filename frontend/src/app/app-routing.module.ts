import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderComponent } from './modules/header/header.component';
import { LaunchingPageComponent } from './modules/launching-page/launching-page.component';
import { ViewDetailsComponent } from './modules/view-details/view-details.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';


const routes: Routes = [
  {path:'', component:LaunchingPageComponent},
  {path:'signin', component:SignInComponent},
  {path:'signup', component:SignUpComponent},
  {path:'viewdetails', component:ViewDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LaunchingPageComponent,SignInComponent,SignUpComponent]
