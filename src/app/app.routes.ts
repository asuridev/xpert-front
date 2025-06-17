import { Routes } from '@angular/router';
import ViewOne from './pages/view-one.page';
import ViewTwo from './pages/view-two.page';
import ViewThree from './pages/view-three.page ';
import ViewFour from './pages/view-four.page ';
import ViewFive from './pages/view-five.page';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  {path:'', loadComponent: ()=> ViewOne},
  {path:'one', loadComponent: ()=> ViewOne},
  {path:'two', loadComponent: ()=> ViewTwo},
  {path:'three', loadComponent: ()=> ViewThree},
  {path:'four', loadComponent: ()=> ViewFour},
  {path:'five', canActivate:[loginGuard()], loadComponent: ()=> ViewFive},
];
