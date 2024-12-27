import { Component, inject } from '@angular/core';
import { CasoService } from '../../../core/services/caso.service';
import { DialogData } from '../../../cliente/demanda/detalle-demanda/detalle-demanda.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Caso } from '../../../core/models/caso';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimeAgoPipe } from '../../../core/pipes/time-ago.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog-caso-detalle',
  imports: [MatButtonModule,
    MatIconModule,
    TimeAgoPipe,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-caso-detalle.component.html',
  styleUrl: './dialog-caso-detalle.component.css'
})
export class DialogCasoDetalleComponent {
  readonly dialogRef = inject(MatDialogRef<DialogCasoDetalleComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  caso?: Caso;

  constructor(
    private casoService: CasoService
  ) { }

  ngOnInit(): void {
    this.casoService.findById(this.data.id).subscribe(caso => {
      this.caso = caso;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
