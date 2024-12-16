import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MenuUserComponent } from '../../../workspace/components/menu-user/menu-user.component';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule,
    MenuUserComponent
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() isHandset$?: Observable<boolean>;

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

}
