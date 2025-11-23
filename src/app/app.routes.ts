import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'datos-padre-hijo',
    loadComponent: () => import('./views/datos-padre-hijo/datos-padre-hijo.component').then(m => m.DatosPadreHijoComponent)
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
    path: 'referencias',
    loadComponent: () => import('./views/referencias/referencias.component').then(m => m.ReferenciasComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];