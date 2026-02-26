import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 class="text-2xl font-bold text-gray-800">Mon Emploi du Temps du Jour</h2>
        <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 border-l-4 border-indigo-500 bg-indigo-50 rounded-r-lg">
            <p class="text-xs text-indigo-600 font-bold">08:00 - 10:00</p>
            <p class="font-semibold text-gray-800">Mathématiques</p>
            <p class="text-sm text-gray-600">Classe : 3ème A</p>
          </div>
          <div class="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
            <p class="text-xs text-green-600 font-bold">10:15 - 12:15</p>
            <p class="font-semibold text-gray-800">Mathématiques</p>
            <p class="text-sm text-gray-600">Classe : 4ème B</p>
          </div>
          <div class="p-4 border-l-4 border-gray-300 bg-gray-50 rounded-r-lg opacity-60">
            <p class="text-xs text-gray-500 font-bold">15:00 - 17:00</p>
            <p class="font-semibold text-gray-800">Conseil de classe</p>
            <p class="text-sm text-gray-600">Salle des profs</p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Classes Management -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Mes Classes</h3>
          <table class="w-full">
            <thead class="bg-gray-50 text-left text-xs text-gray-500 uppercase">
              <tr>
                <th class="px-4 py-2">Classe</th>
                <th class="px-4 py-2">Effectif</th>
                <th class="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td class="px-4 py-3 text-sm font-medium">3ème A</td>
                <td class="px-4 py-3 text-sm text-gray-600">42 élèves</td>
                <td class="px-4 py-3 text-sm">
                  <button class="text-indigo-600 hover:text-indigo-800 font-medium">Saisir notes</button>
                </td>
              </tr>
              <tr>
                <td class="px-4 py-3 text-sm font-medium">4ème B</td>
                <td class="px-4 py-3 text-sm text-gray-600">38 élèves</td>
                <td class="px-4 py-3 text-sm">
                  <button class="text-indigo-600 hover:text-indigo-800 font-medium">Saisir notes</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pending Tasks -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">Tâches en attente</h3>
          <ul class="space-y-3">
            <li class="flex items-center text-sm text-gray-700 bg-yellow-50 p-3 rounded-lg">
              <span class="mr-3">⚠️</span>
              Finaliser la saisie des notes du 2ème devoir (3ème A)
            </li>
            <li class="flex items-center text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">
              <span class="mr-3">ℹ️</span>
              Marquer les absences de ce matin
            </li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class TeacherDashboardComponent {}
