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

@Component({
  selector: 'app-card-consulta',
  imports: [CommonModule, MatIconModule, MatButtonModule],
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

}
