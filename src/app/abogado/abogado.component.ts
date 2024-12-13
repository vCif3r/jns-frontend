import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { SidenavComponent } from '../core/components/sidenav/sidenav.component';
import { ToolbarComponent } from '../core/components/toolbar/toolbar.component';

@Component({
  selector: 'app-abogado',
  imports: [
    RouterOutlet,
    MatSidenavModule,
    ToolbarComponent,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    SidenavComponent
  ],
  templateUrl: './abogado.component.html',
  styleUrl: './abogado.component.css'
})
export class AbogadoComponent {
  @ViewChild('sidenav') sidenav?: MatSidenav;

  isHandset$: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );
  }

  toggleSidenav() {
    this.sidenav?.toggle();
  }
}
