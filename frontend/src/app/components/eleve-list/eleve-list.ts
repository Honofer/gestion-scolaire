import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleveService } from '../../services/eleve';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-eleve-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 class="text-xl font-bold text-gray-800">Liste des Élèves</h2>
        <button routerLink="/eleves/nouveau" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center">
          <span class="mr-2">+</span> Inscrire un élève
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th class="px-6 py-4">Matricule</th>
              <th class="px-6 py-4">Nom Complet</th>
              <th class="px-6 py-4">Classe</th>
              <th class="px-6 py-4">Date Naissance</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let eleve of eleves" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ eleve.matricule }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ eleve.username }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ eleve.classe?.nom || 'Non affecté' }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ eleve.dateNaissance | date:'dd/MM/yyyy' }}</td>
              <td class="px-6 py-4 text-right space-x-3">
                <button [routerLink]="['/eleves/modifier', eleve.id]" class="text-indigo-600 hover:text-indigo-800 font-medium">Modifier</button>
                <button (click)="onDelete(eleve.id)" class="text-red-600 hover:text-red-800 font-medium">Supprimer</button>
              </td>
            </tr>
            <tr *ngIf="eleves.length === 0">
              <td colspan="5" class="px-6 py-10 text-center text-gray-500 italic">
                Aucun élève trouvé.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class EleveListComponent implements OnInit {
  eleves: any[] = [];

  constructor(private eleveService: EleveService) {}

  ngOnInit() {
    this.loadEleves();
  }

  loadEleves() {
    this.eleveService.getAll().subscribe(data => {
      this.eleves = data;
    });
  }

  onDelete(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      this.eleveService.delete(id).subscribe(() => {
        this.loadEleves();
      });
    }
  }
}
