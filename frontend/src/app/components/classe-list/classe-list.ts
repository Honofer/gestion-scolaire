import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClasseService } from '../../services/classe';

@Component({
  selector: 'app-classe-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form Column -->
      <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
        <h3 class="text-lg font-bold text-gray-800 mb-4">Ajouter une Classe</h3>
        <form (submit)="onSubmit()" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom de la classe</label>
            <input type="text" name="nom" [(ngModel)]="newClasse.nom" placeholder="ex: 6ème A" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
            <input type="text" name="niveau" [(ngModel)]="newClasse.niveau" placeholder="ex: Collège" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium">
            Ajouter
          </button>
        </form>
      </div>

      <!-- List Column -->
      <div class="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6 border-b border-gray-100">
          <h2 class="text-xl font-bold text-gray-800">Classes Existantes</h2>
        </div>
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th class="px-6 py-4">Nom</th>
              <th class="px-6 py-4">Niveau</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let c of classes" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ c.nom }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ c.niveau }}</td>
              <td class="px-6 py-4 text-right">
                <button (click)="onDelete(c.id)" class="text-red-600 hover:text-red-800 font-medium">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: []
})
export class ClasseListComponent implements OnInit {
  classes: any[] = [];
  newClasse = { nom: '', niveau: '' };

  constructor(private classeService: ClasseService) {}

  ngOnInit() {
    this.loadClasses();
  }

  loadClasses() {
    this.classeService.getAll().subscribe(data => this.classes = data);
  }

  onSubmit() {
    this.classeService.create(this.newClasse).subscribe(() => {
      this.newClasse = { nom: '', niveau: '' };
      this.loadClasses();
    });
  }

  onDelete(id: number) {
    if (confirm('Supprimer cette classe ?')) {
      this.classeService.delete(id).subscribe(() => this.loadClasses());
    }
  }
}
