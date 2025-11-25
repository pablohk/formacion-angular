import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'datos-padre-hijo',
    loadComponent: () =>
      import('./views/datos-padre-hijo/datos-padre-hijo.component').then(
        (m) => m.DatosPadreHijoComponent
      ),
  },
  {
    path: 'formulario-simple',
    loadComponent: () =>
      import('./views/formulario-simple/formulario-simple.component').then(
        (m) => m.FormularioSimpleComponent
      ),
  },
  {
    path: 'formulario-complejo',
    loadComponent: () =>
      import('./views/formulario-complejo/formulario-complejo.component').then(
        (m) => m.FormularioComplejoComponent
      ),
  },
  {
    path: 'patrones-diseno',
    loadComponent: () =>
      import('./views/patrones-diseno/patrones-diseno.component').then(
        (m) => m.PatronesDisenoComponent
      ),
  },
  {
    path: 'gestor-estado',
    loadComponent: () =>
      import('./views/gestor-estado/gestor-estado.component').then(
        (m) => m.GestorEstadoComponent
      ),
  },
  {
    path: 'pipes-examples',
    loadComponent: () =>
      import('./views/pipes-examples/pipes-examples.component').then(
        (m) => m.PipesExamplesComponent
      ),
  },
  {
    path: 'referencias',
    loadComponent: () =>
      import('./views/referencias/referencias.component').then(
        (m) => m.ReferenciasComponent
      ),
  },
  {
    path: 'validacion-runtime',
    loadComponent: () =>
      import('./views/validacion-runtime/validacion-runtime.component').then(
        (m) => m.ValidacionRuntimeComponent
      ),
  },
  {
    path: 'reactividad-rxjs',
    loadComponent: () =>
      import('./views/reactividad-rxjs/reactividad-rxjs.component').then(
        (m) => m.ReactividadRxjsComponent
      ),
  },
   {
    path: 'carga-diferida',
    loadComponent: () =>
      import('./views/carga-diferida/carga-diferida.component').then(
        (m) => m.CargaDiferidaComponent
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
