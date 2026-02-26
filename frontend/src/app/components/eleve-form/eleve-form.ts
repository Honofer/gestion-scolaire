import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EleveService } from '../../services/eleve';
import { ClasseService } from '../../services/classe';

@Component({
  selector: 'app-eleve-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ isEdit ? 'Modifier' : 'Nouvel' }} Élève</h2>
      
      <form (submit)="onSubmit()" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
            <input type="text" name="username" [(ngModel)]="eleve.username" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
            <input type="text" name="matricule" [(ngModel)]="eleve.matricule" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date de Naissance</label>
            <input type="date" name="dateNaissance" [(ngModel)]="eleve.dateNaissance" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Classe</label>
            <select name="classe" [(ngModel)]="eleve.classe" required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
              <option [ngValue]="null">Sélectionner une classe</option>
              <option *ngFor="let c of classes" [ngValue]="c">{{ c.nom }}</option>
            </select>
          </div>
        </div>

        <div *ngIf="!isEdit">
          <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe par défaut</label>
          <input type="password" name="password" [(ngModel)]="eleve.password" required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
        </div>

        <div class="flex justify-end space-x-4 pt-4">
          <button type="button" routerLink="/eleves"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
            Annuler
          </button>
          <button type="submit"
            class="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium">
            {{ isEdit ? 'Enregistrer' : 'Inscrire' }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: []
})
export class EleveFormComponent implements OnInit {
  eleve: any = {
    username: '',
    matricule: '',
    dateNaissance: '',
    classe: null,
    password: ''
  };
  classes: any[] = [];
  isEdit = false;
  id: number | null = null;

  constructor(
    private eleveService: EleveService,
    private classeService: ClasseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.classeService.getAll().subscribe(data => this.classes = data);
    
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.eleveService.getById(this.id).subscribe(data => {
        this.eleve = data;
        // Format date for input type="date"
        if (this.eleve.dateNaissance) {
          this.eleve.dateNaissance = new Date(this.eleve.dateNaissance).toISOString().split('T')[0];
        }
      });
    }
  }

  onSubmit() {
    if (this.isEdit && this.id) {
      this.eleveService.update(this.id, this.eleve).subscribe(() => {
        this.router.navigate(['/eleves']);
      });
    } else {
      this.eleveService.create(this.eleve).subscribe(() => {
        this.router.navigate(['/eleves']);
      });
    }
  }
}
