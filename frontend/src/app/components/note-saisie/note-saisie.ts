import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClasseService } from '../../services/classe';
import { MatiereService } from '../../services/matiere';
import { EleveService } from '../../services/eleve';
import { NoteService } from '../../services/note';

@Component({
  selector: 'app-note-saisie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Saisie des Notes</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Classe</label>
            <select [(ngModel)]="selectedClasse" (change)="onClasseChange()"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
              <option [ngValue]="null">Sélectionner une classe</option>
              <option *ngFor="let c of classes" [ngValue]="c">{{ c.nom }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Matière</label>
            <select [(ngModel)]="selectedMatiere"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
              <option [ngValue]="null">Sélectionner une matière</option>
              <option *ngFor="let m of matieres" [ngValue]="m">{{ m.nom }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Type d'évaluation</label>
            <select [(ngModel)]="noteType"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
              <option value="DEVOIR">Devoir</option>
              <option value="COMPOSITION">Composition</option>
              <option value="INTERROGATION">Interrogation</option>
            </select>
          </div>
        </div>
      </div>

      <div *ngIf="selectedClasse && selectedMatiere" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="w-full text-left">
          <thead class="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th class="px-6 py-4">Matricule</th>
              <th class="px-6 py-4">Élève</th>
              <th class="px-6 py-4">Note / 20</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let eleve of filteredEleves" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ eleve.matricule }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ eleve.username }}</td>
              <td class="px-6 py-4">
                <input type="number" [(ngModel)]="notes[eleve.id]" min="0" max="20" step="0.25"
                  class="w-24 px-3 py-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500">
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="p-6 bg-gray-50 flex justify-end">
          <button (click)="onSave()" [disabled]="isSaving"
            class="bg-indigo-600 text-white px-8 py-2 rounded-lg hover:bg-indigo-700 transition font-medium disabled:opacity-50">
            {{ isSaving ? 'Enregistrement...' : 'Enregistrer toutes les notes' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NoteSaisieComponent implements OnInit {
  classes: any[] = [];
  matieres: any[] = [];
  eleves: any[] = [];
  filteredEleves: any[] = [];
  
  selectedClasse: any = null;
  selectedMatiere: any = null;
  noteType: string = 'DEVOIR';
  
  notes: { [key: number]: number } = {};
  isSaving = false;

  constructor(
    private classeService: ClasseService,
    private matiereService: MatiereService,
    private eleveService: EleveService,
    private noteService: NoteService
  ) {}

  ngOnInit() {
    this.classeService.getAll().subscribe(data => this.classes = data);
    this.matiereService.getAll().subscribe(data => this.matieres = data);
    this.eleveService.getAll().subscribe(data => this.eleves = data);
  }

  onClasseChange() {
    if (this.selectedClasse) {
      this.filteredEleves = this.eleves.filter(e => e.classe?.id === this.selectedClasse.id);
      this.notes = {};
      this.filteredEleves.forEach(e => this.notes[e.id] = 0);
    } else {
      this.filteredEleves = [];
    }
  }

  onSave() {
    if (!this.selectedMatiere) {
      alert('Veuillez sélectionner une matière');
      return;
    }

    this.isSaving = true;
    const savePromises = this.filteredEleves.map(eleve => {
      const noteData = {
        valeur: this.notes[eleve.id],
        type: this.noteType,
        eleve: { id: eleve.id },
        matiere: { id: this.selectedMatiere.id }
      };
      return this.noteService.create(noteData).toPromise();
    });

    Promise.all(savePromises)
      .then(() => {
        alert('Toutes les notes ont été enregistrées avec succès');
        this.isSaving = false;
      })
      .catch(err => {
        console.error(err);
        alert('Erreur lors de l\'enregistrement des notes');
        this.isSaving = false;
      });
  }
}
