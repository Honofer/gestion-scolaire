import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-indigo-700 text-white flex-shrink-0 hidden md:flex flex-col">
        <div class="p-6 text-2xl font-bold border-b border-indigo-600">
          Gestion Scolaire
        </div>
        <nav class="flex-grow p-4 space-y-2">
          <a routerLink="/dashboard" class="block p-3 hover:bg-indigo-600 rounded transition">Tableau de bord</a>
          
          <div *ngIf="userRole === 'ADMIN'">
            <p class="text-xs uppercase text-indigo-300 font-semibold px-3 mt-4 mb-2">Administration</p>
            <a routerLink="/eleves" class="block p-3 hover:bg-indigo-600 rounded transition">Élèves</a>
            <a routerLink="/enseignants" class="block p-3 hover:bg-indigo-600 rounded transition">Enseignants</a>
            <a routerLink="/classes" class="block p-3 hover:bg-indigo-600 rounded transition">Classes</a>
            <a routerLink="/matieres" class="block p-3 hover:bg-indigo-600 rounded transition">Matières</a>
          </div>

          <div *ngIf="userRole === 'ENSEIGNANT'">
            <p class="text-xs uppercase text-indigo-300 font-semibold px-3 mt-4 mb-2">Pédagogie</p>
            <a routerLink="/saisie-notes" class="block p-3 hover:bg-indigo-600 rounded transition">Saisie des notes</a>
            <a routerLink="/absences" class="block p-3 hover:bg-indigo-600 rounded transition">Gestion Absences</a>
          </div>

          <div *ngIf="userRole === 'ELEVE'">
            <p class="text-xs uppercase text-indigo-300 font-semibold px-3 mt-4 mb-2">Mon Espace</p>
            <a routerLink="/mes-notes" class="block p-3 hover:bg-indigo-600 rounded transition">Mes Notes</a>
            <a routerLink="/mes-absences" class="block p-3 hover:bg-indigo-600 rounded transition">Mes Absences</a>
            <a routerLink="/bulletin" class="block p-3 hover:bg-indigo-600 rounded transition">Bulletin PDF</a>
          </div>
        </nav>
        <div class="p-4 border-t border-indigo-600">
          <button (click)="logout()" class="w-full text-left p-3 hover:bg-indigo-600 rounded transition">Déconnexion</button>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow flex flex-col overflow-hidden">
        <!-- Topbar -->
        <header class="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h1 class="text-xl font-semibold text-gray-800">Bienvenue, {{ username }}</h1>
          <div class="flex items-center space-x-4">
            <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">{{ userRole }}</span>
          </div>
        </header>

        <!-- Page content -->
        <main class="flex-grow overflow-y-auto p-8">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class LayoutComponent {
  userRole: string = '';
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.currentUserValue;
    // Assuming the token decoding or a user info endpoint gives us the role
    // For now, let's simplify and get it from localStorage if we store it there
    // In a real app, we'd decode the JWT
    this.username = user.username || 'Utilisateur';
    this.userRole = this.getUserRoleFromToken(user.token);
  }

  private getUserRoleFromToken(token: string): string {
    if (!token) return '';
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Spring Security authorities are usually in 'sub' or a custom claim
      // Our UserDetailsServiceImpl puts it in ROLE_ADMIN etc.
      // Let's assume the payload has it.
      return payload.role || (payload.sub === 'admin' ? 'ADMIN' : 'ELEVE'); 
    } catch (e) {
      return '';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
