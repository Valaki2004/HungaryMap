import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {path:"map",component:MapComponent},
  {path:"navbar",component:NavbarComponent},
  {path:"settlements",component:SettlementsComponent},
  {path:"comments",component:CommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
