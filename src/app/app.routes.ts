import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {path:'', loadComponent: ()=> import('./pages/view-one.page') },
  {path:'one', loadComponent: ()=> import('./pages/view-one.page')},
  {path:'two', loadComponent: ()=> import('./pages/view-two.page')},
  {path:'three', loadComponent: ()=> import('./pages/view-three.page ')},
  {path:'four', loadComponent: ()=> import('./pages/view-four.page ')},
  {path:'five', canActivate:[loginGuard()], loadComponent: ()=> import('./pages/view-five.page')},
];
