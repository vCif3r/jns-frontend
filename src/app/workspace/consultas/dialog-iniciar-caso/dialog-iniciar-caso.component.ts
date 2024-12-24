import { Component, Inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConsultaService } from '../../../core/services/consulta.service';
import { CasoService } from '../../../core/services/caso.service';
import { Consulta } from '../../../core/models/consulta';

@Component({
  selector: 'app-dialog-iniciar-caso',
  imports: [MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    MatSnackBarModule],
  templateUrl: './dialog-iniciar-caso.component.html',
  styleUrl: './dialog-iniciar-caso.component.css'
})
export class DialogIniciarCasoComponent implements OnInit {

  consulta?: Consulta;

  constructor(
    private casoService: CasoService,
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogIniciarCasoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any }
  ) { }

  ngOnInit(): void {
    this.getConsulta();
  }

  getConsulta() {
    this.consultaService.findById(this.data.id).subscribe(data => {
      this.consulta = data;
    })
  }

  iniciarCaso(idConsulta: number) {
    const data = {
      consulta: idConsulta,
    }
    this.casoService.save(data).subscribe((res) => {
      console.log(res);
      this.snackBar.open('Caso iniciado', 'Cerrar', {
        duration: 5000
      });
      this.dialogRef.close(true);
    },
      (error) => {
        this.snackBar.open('Error al iniciar el caso', 'Cerrar', {
          duration: 5000
        });
      }
    )
  }

}
