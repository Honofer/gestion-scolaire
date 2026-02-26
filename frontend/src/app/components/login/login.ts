import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-4xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden m-4">
        <!-- Section Image -->
        <div class="hidden md:block md:w-1/2 relative bg-indigo-600">
          <img
            src="https://img.freepik.com/photos-premium/petite-fille-afro-americaine-ecrivant-dans-son-cahier-classe_259150-13768.jpg"
            alt="Enfant qui étudie"
            class="absolute inset-0 w-full h-full object-cover opacity-80"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent flex flex-col justify-end p-12 text-white">
            <h1 class="text-4xl font-bold mb-4">Éduquer pour l'avenir</h1>
            <p class="text-lg opacity-90">Plateforme moderne de gestion scolaire pour un suivi d'excellence.</p>
          </div>
        </div>

        <!-- Section Formulaire -->
        <div class="w-full md:w-1/2 p-8 md:p-12">
          <div class="mb-10 text-center md:text-left">
            <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Bon retour !</h2>
            <p class="text-gray-500">Entrez vos identifiants pour accéder à votre compte</p>
          </div>

          <form class="space-y-6" (submit)="onSubmit()">
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
              <input id="username" name="username" type="text" required [(ngModel)]="username"
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                placeholder="Ex: admin">
            </div>

            <div>
              <div class="flex justify-between items-center mb-1">
                <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
                <a href="#" class="text-xs text-indigo-600 hover:text-indigo-500 font-medium">Mot de passe oublié ?</a>
              </div>
              <input id="password" name="password" type="password" required [(ngModel)]="password"
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm"
                placeholder="••••••••">
            </div>

            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer">
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer">
                Se souvenir de moi
              </label>
            </div>

            <button type="submit"
              class="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors shadow-lg">
              Se connecter
            </button>

            <div *ngIf="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <p class="text-red-700 text-sm font-medium text-center">{{ error }}</p>
            </div>
          </form>

          <div class="mt-8 pt-8 border-t border-gray-100 text-center">
            <p class="text-sm text-gray-600">
              Vous n'avez pas de compte ?
              <a href="#" class="font-bold text-indigo-600 hover:text-indigo-500">Contactez l'administration</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: err => {
          console.error('Erreur de connexion détaillée:', err);
          if (err.status === 0) {
            this.error = 'Le serveur backend est inaccessible.';
          } else {
            this.error = 'Identifiants incorrects';
          }
        }
    });
  }
}
