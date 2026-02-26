import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard';
import { TeacherDashboardComponent } from '../teacher-dashboard/teacher-dashboard';
import { StudentDashboardComponent } from '../student-dashboard/student-dashboard';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, AdminDashboardComponent, TeacherDashboardComponent, StudentDashboardComponent],
  template: `
    <div [ngSwitch]="userRole">
      <app-admin-dashboard *ngSwitchCase="'ADMIN'"></app-admin-dashboard>
      <app-teacher-dashboard *ngSwitchCase="'ENSEIGNANT'"></app-teacher-dashboard>
      <app-student-dashboard *ngSwitchCase="'ELEVE'"></app-student-dashboard>
      <div *ngSwitchDefault class="p-8 text-center text-gray-500">
        Chargement de votre espace...
      </div>
    </div>
  `,
  styles: []
})
export class DashboardHomeComponent {
  userRole: string = '';

  constructor(private authService: AuthService) {
    const user = this.authService.currentUserValue;
    this.userRole = this.getUserRoleFromToken(user.token);
  }

  private getUserRoleFromToken(token: string): string {
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || (payload.sub === 'admin' ? 'ADMIN' : 'ELEVE');
    } catch (e) {
      return '';
    }
  }
}
