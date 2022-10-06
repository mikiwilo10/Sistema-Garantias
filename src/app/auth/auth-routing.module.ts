import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    //component:LoginComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: '**', redirectTo: 'login' },
      { path: '', redirectTo: 'login' },
      
    ],
    //canActivate:[ValidarTokenGuard],
    //canLoad:[ValidarTokenGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
