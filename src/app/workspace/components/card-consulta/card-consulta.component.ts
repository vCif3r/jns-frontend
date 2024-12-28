import { Component, inject, Input } from '@angular/core';
import { Consulta } from '../../../core/models/consulta';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConsultaDetalleComponent } from '../../consultas/consulta-detalle/consulta-detalle.component';
import { AuthService } from '../../../core/services/auth.service';
import { ConsultaService } from '../../../core/services/consulta.service';
import { DialogCancelarConsultaComponent } from '../../consultas/dialog-cancelar-consulta/dialog-cancelar-consulta.component';
import { DialogRechazarConsultaComponent } from '../../consultas/dialog-rechazar-consulta/dialog-rechazar-consulta.component';
import { DialogIniciarCasoComponent } from '../../consultas/dialog-iniciar-caso/dialog-iniciar-caso.component';
import { MatMenuModule } from '@angular/material/menu';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';

@Component({
  selector: 'app-card-consulta',
  imports: [TimeAgoPipe, MatIconModule, MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './card-consulta.component.html',
  styleUrl: './card-consulta.component.css'
})
export class CardConsultaComponent {
  @Input() consulta?: Consulta;
  readonly dialog = inject(MatDialog);
  role:any;

  constructor(
    private authService: AuthService,
    private consultaService: ConsultaService
  ) { }

  ngOnInit(): void {
    this.role = this.authService.getRole();
  }

  openDialog(id: any): void {
    this.dialog.open(ConsultaDetalleComponent, {
      data: { id: id }
    });
  }
  
  openDialogRechazar(id: any):void{
    this.dialog.open(DialogRechazarConsultaComponent, {
      data: { id: id }
    });
  }

  openDialogCancelar(id: any):void{
    this.dialog.open(DialogCancelarConsultaComponent, {
      data: { id: id }
    });
  }

  openDialogIniciarCaso(id: any):void{
    this.dialog.open(DialogIniciarCasoComponent, {
      data: { id: id }
    });
  }

  isToday(fecha: any | null): boolean {
    if (!fecha) return false;

    const today = new Date();
    const consultaDate = new Date(fecha);

    // Compara solo el día, mes y año
    return today.toDateString() === consultaDate.toDateString();
  }

  isDateBeforeToday(fecha: any | null): boolean {
    if (!fecha) return false;

    const today = new Date();
    const consultaDate = new Date(fecha);

    // Compara solo el día, mes y año, sin considerar la hora
    today.setHours(0, 0, 0, 0);
    consultaDate.setHours(0, 0, 0, 0);

    // Compara si la fecha de la consulta es anterior a hoy
    return consultaDate < today;
  }
}
