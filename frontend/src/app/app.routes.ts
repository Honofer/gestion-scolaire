import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { LayoutComponent } from './components/layout/layout';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home';
import { EleveListComponent } from './components/eleve-list/eleve-list';
import { EleveFormComponent } from './components/eleve-form/eleve-form';
import { ClasseListComponent } from './components/classe-list/classe-list';
import { MatiereListComponent } from './components/matiere-list/matiere-list';
import { NoteSaisieComponent } from './components/note-saisie/note-saisie';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardHomeComponent },
      { path: 'eleves', component: EleveListComponent },
      { path: 'eleves/nouveau', component: EleveFormComponent },
      { path: 'eleves/modifier/:id', component: EleveFormComponent },
      { path: 'classes', component: ClasseListComponent },
      { path: 'matieres', component: MatiereListComponent },
      { path: 'saisie-notes', component: NoteSaisieComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: '/login' }
];
