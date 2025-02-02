import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  {path:"map",component:MapComponent},
  {path:"navbar",component:NavbarComponent},

  {path:"settlements",component:SettlementsComponent},
  {path:"comments",component:CommentsComponent},
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: '', redirectTo: '/map', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
