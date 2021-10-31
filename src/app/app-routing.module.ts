import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SuperheroeDetalleComponent } from './superheroe-detalle/superheroe-detalle.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [

  {path:"login", component:LoginComponent},
  {path:"home", component:HomeComponent, canActivate:[AuthGuard]},
  {path:"superheroe/:id", component:SuperheroeDetalleComponent, canActivate:[AuthGuard]},
  {path:"**", redirectTo:"login", pathMatch:"full"}

];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 