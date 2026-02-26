import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-8">
      <!-- Welcome Section -->
      <div class="bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 rounded-2xl text-white shadow-lg">
        <h2 class="text-3xl font-bold">Bonjour, Koffi !</h2>
        <p class="mt-2 opacity-90 text-indigo-100">Tu es actuellement en 3ème A. Voici un aperçu de tes performances.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Overview Stats -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p class="text-gray-500 text-sm font-medium">Moyenne Générale</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">14.25 / 20</p>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div class="bg-indigo-600 h-2 rounded-full" style="width: 71%"></div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p class="text-gray-500 text-sm font-medium">Rang dans la classe</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">5ème / 42</p>
          <p class="text-green-500 text-xs mt-2">Dans le top 15%</p>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p class="text-gray-500 text-sm font-medium">Absences ce mois</p>
          <p class="text-3xl font-bold text-gray-900 mt-2">2</p>
          <p class="text-gray-400 text-xs mt-2">Toutes justifiées</p>
        </div>
      </div>

      <!-- Recent Grades Table -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-800">Dernières Notes Saisies</h3>
          <button class="text-sm text-indigo-600 font-medium hover:underline">Voir tout</button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-xs text-gray-500 uppercase border-b border-gray-100">
                <th class="pb-3 px-4">Matière</th>
                <th class="pb-3 px-4">Type</th>
                <th class="pb-3 px-4">Date</th>
                <th class="pb-3 px-4 text-right">Note</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr>
                <td class="py-4 px-4 font-medium text-gray-900">Français</td>
                <td class="py-4 px-4 text-gray-600">Devoir 2</td>
                <td class="py-4 px-4 text-gray-500 text-sm">24/02/2026</td>
                <td class="py-4 px-4 text-right font-bold text-indigo-600">15.5</td>
              </tr>
              <tr>
                <td class="py-4 px-4 font-medium text-gray-900">Physique-Chimie</td>
                <td class="py-4 px-4 text-gray-600">Interrogation</td>
                <td class="py-4 px-4 text-gray-500 text-sm">22/02/2026</td>
                <td class="py-4 px-4 text-right font-bold text-green-600">18.0</td>
              </tr>
              <tr>
                <td class="py-4 px-4 font-medium text-gray-900">Histoire-Géo</td>
                <td class="py-4 px-4 text-gray-600">Devoir 1</td>
                <td class="py-4 px-4 text-gray-500 text-sm">18/02/2026</td>
                <td class="py-4 px-4 text-right font-bold text-orange-600">12.0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class StudentDashboardComponent {}
