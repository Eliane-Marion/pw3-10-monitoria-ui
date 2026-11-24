import { Routes } from '@angular/router';
import { Monitorias } from './pages/monitorias/monitorias.component';
import { FormularioMonitoria } from './pages/formulario-monitoria/formulario-monitoria.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'monitorias',
    pathMatch: 'full'
  },
  {
    path: 'monitorias',
    component: Monitorias
  },
  {
      path: 'monitorias/nova',
      component: FormularioMonitoria
  },
  {
  path: 'monitorias/:id/editar',
  component: FormularioMonitoria
  }
];
