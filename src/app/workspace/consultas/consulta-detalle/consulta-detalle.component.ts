import { Component, Inject } from '@angular/core';
import { ConsultaService } from '../../../core/services/consulta.service';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Consulta } from '../../../core/models/consulta';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AbogadoService } from '../../../core/services/abogado.service';
import { Abogado } from '../../../core/models/abogado';

@Component({
  selector: 'app-consulta-detalle',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './consulta-detalle.component.html',
  styleUrl: './consulta-detalle.component.css',
})
export class ConsultaDetalleComponent {
  abogadosDisponibles: Abogado[] = [];
  selectedAbogadoId: number | null = null;
  consulta?: Consulta;

  constructor(
    private consultaService: ConsultaService,
    private abogadoService: AbogadoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ConsultaDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) {}

  ngOnInit() {
    this.consultaService.findById(this.data.id).subscribe(consulta => {
      this.consulta = consulta;
    })

    this.loadAbogadosDisponibles();
  }

  loadAbogadosDisponibles() {
    this.abogadoService.findAbogadosDisponibles().subscribe(abogados => {
      this.abogadosDisponibles = abogados;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  asignarAbogado() {
    if (this.selectedAbogadoId !== null) {
      this.consultaService.asignarAbogado(this.consulta?.id, this.selectedAbogadoId).subscribe(
        (response) => {
          this.snackBar.open('Abogado asignado correctamente', 'Cerrar', {
            duration: 4000,
          });
          this.dialogRef.close(); // Cierra el diálogo con la respuesta
        },
        (error) => {
          this.snackBar.open(`${error.error.message}`, 'Cerrar', {
            duration: 6000,
          });
          console.error('Error al asignar el abogado', error);
        }
      );
    } else {
      this.snackBar.open('Seleccione un abogado', 'Cerrar', {
        duration: 4000,
      });
    }
  }
}
