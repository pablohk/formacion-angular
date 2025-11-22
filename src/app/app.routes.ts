import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'formulario-simple',
    loadComponent: () => import('./views/formulario-simple/formulario-simple.component').then(m => m.FormularioSimpleComponent)
  },
  {
    path: 'formulario-complejo',
    loadComponent: () => import('./views/formulario-complejo/formulario-complejo.component').then(m => m.FormularioComplejoComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

