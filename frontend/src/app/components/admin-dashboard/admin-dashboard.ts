import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatistiqueService } from '../../services/statistique';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Stats Cards -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium">Total Élèves</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats?.totalEleves || 0 }}</div>
        <div class="text-green-500 text-xs mt-2 font-medium">Effectif global</div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium">Total Enseignants</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats?.totalEnseignants || 0 }}</div>
        <div class="text-indigo-500 text-xs mt-2 font-medium">Corps enseignant</div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium">Classes</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">{{ stats?.totalClasses || 0 }}</div>
        <div class="text-gray-400 text-xs mt-2 font-medium">Divisions pédagogiques</div>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="text-gray-500 text-sm font-medium">Taux de Réussite</div>
        <div class="text-3xl font-bold text-gray-900 mt-2">84%</div>
        <div class="text-blue-500 text-xs mt-2 font-medium">Moyenne estimée</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <!-- Pie Chart: Repartition by Level -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Répartition par Niveau</h3>
        <div class="h-64 flex items-center justify-center">
          <canvas baseChart
            [data]="pieChartData"
            [options]="pieChartOptions"
            [type]="pieChartType">
          </canvas>
        </div>
      </div>

      <!-- Bar Chart: Performance by Class -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-6">Moyenne par Classe</h3>
        <div class="h-64 flex items-center justify-center">
          <canvas baseChart
            [data]="barChartData"
            [options]="barChartOptions"
            [type]="barChartType">
          </canvas>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Recent Activity (Simplified) -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Activités Récentes</h3>
        <div class="space-y-4">
          <div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition border-l-4 border-green-500">
            <div class="ml-2">
              <p class="text-sm font-medium text-gray-900">Nouvelle inscription</p>
              <p class="text-xs text-gray-500">Un nouvel élève a été ajouté au système</p>
            </div>
          </div>
          <div class="flex items-center p-3 hover:bg-gray-50 rounded-lg transition border-l-4 border-blue-500">
            <div class="ml-2">
              <p class="text-sm font-medium text-gray-900">Notes enregistrées</p>
              <p class="text-xs text-gray-500">Un professeur a validé un lot de notes</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Actions Rapides</h3>
        <div class="grid grid-cols-2 gap-4">
          <button class="p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition text-sm font-medium">Inscrire un élève</button>
          <button class="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium">Ajouter une classe</button>
          <button class="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition text-sm font-medium">Générer Bulletins</button>
          <button class="p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium">Rapport d'absences</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AdminDashboardComponent implements OnInit {
  stats: any;

  // Pie Chart (Repartition by Level)
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  public pieChartType: ChartType = 'pie';

  // Bar Chart (Performance by Class)
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      y: { min: 0, max: 20 }
    },
    plugins: {
      legend: { display: false }
    }
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Moyenne', backgroundColor: '#6366f1' }]
  };
  public barChartType: ChartType = 'bar';

  constructor(private statService: StatistiqueService) {}

  ngOnInit() {
    this.statService.getStats().subscribe(data => {
      this.stats = data;
      this.updateCharts(data);
    });
  }

  updateCharts(data: any) {
    // Update Pie Chart
    if (data.repartitionNiveau) {
      this.pieChartData = {
        labels: Object.keys(data.repartitionNiveau),
        datasets: [{
          data: Object.values(data.repartitionNiveau) as number[],
          backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        }]
      };
    }

    // Update Bar Chart
    if (data.performanceClasses) {
      this.barChartData = {
        labels: Object.keys(data.performanceClasses),
        datasets: [{
          data: Object.values(data.performanceClasses) as number[],
          label: 'Moyenne',
          backgroundColor: '#6366f1',
          borderRadius: 8
        }]
      };
    }
  }
}
