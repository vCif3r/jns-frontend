import { AuthService } from './core/services/auth.service';
import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    this.authService.logout();
  }
}
