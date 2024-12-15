import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DemandaService } from '../../../core/services/demanda.service';
import { Observable, Subject } from 'rxjs';
import { Cliente } from '../../../core/models/cliente';
import { map, startWith, debounceTime, switchMap, catchError, distinctUntilChanged } from 'rxjs/operators';
import { ClienteService } from '../../../core/services/cliente.service';
import { CommonModule } from '@angular/common';
import { Demanda } from '../../../core/models/demanda';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-demanda',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './agregar-demanda.component.html',
  styleUrl: './agregar-demanda.component.css'
})
export class AgregarDemandaComponent {
  demandForm: FormGroup;
  displayedColumns: string[] = ['codigo', 'titulo', 'acciones'];


  constructor(
    private snackbar: MatSnackBar,
    private _demandaService: DemandaService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AgregarDemandaComponent>
  ) {
    this.demandForm = this.fb.group({
      cedula: ['', Validators.required, Validators.minLength(9)],
      tipo: ['', Validators.required],
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      // declaration: [false, Validators.requiredTrue],
    });
  }


  onSubmit() {
    if (this.demandForm.valid) {
      console.log('Formulario enviado', this.demandForm.value);
      const demanda = this.demandForm.value
      const cedula = demanda.cedula
      this._demandaService.saveDemanda(demanda, cedula).subscribe(
        (response: any) => {
          console.log('Demanda enviada correctamente:', response);
          // Redirigir o mostrar mensaje de éxito si es necesario
          this.snackbar.open('Demanda enviada con éxito', 'Cerrar', {
            duration: 5000,
          });
          this.dialogRef.close(); 
          // Limpiar el formulario
          this.demandForm.reset();

          // Redirigir a la lista de demandas
          // this.router.navigate(['/admin/demandas']);

          // O mostrar un mensaje de éxito o redirección
        },
        (error: any) => {
          console.error('Error al enviar la demanda:', error);
          // Mostrar un mensaje de error o realizar alguna acción en caso de fallo
          this.snackbar.open('Error al enviar la demanda', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
