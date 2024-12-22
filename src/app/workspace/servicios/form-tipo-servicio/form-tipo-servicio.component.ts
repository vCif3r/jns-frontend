import { Component, Inject, signal, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TipoServicio } from '../../../core/models/tipoServicio';
import { TipoServicioService } from '../../../core/services/tipoServicio.service';
import { ServicioService } from '../../../core/services/servicio.service';
import { Servicio } from '../../../core/models/servicio';

@Component({
  selector: 'app-form-tipo-servicio',
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  templateUrl: './form-tipo-servicio.component.html',
  styleUrl: './form-tipo-servicio.component.css'
})
export class FormTipoServicioComponent implements OnInit {
  isEditMode: boolean;
  tpsvForm: FormGroup;
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  constructor(
    private servicioService: ServicioService,
    private tiposervicioService: TipoServicioService,
    private dialogRef: MatDialogRef<FormTipoServicioComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { tipo: TipoServicio }
  ) {
    if (data && data.tipo && data.tipo.id) {
      this.isEditMode = true;
      console.log(data.tipo);
      this.tpsvForm = this.fb.group({
        id: [data.tipo.id || '', Validators.required],
        nombre: [data.tipo.nombre || '', Validators.required],
        servicio: [data.tipo.servicio || '', Validators.required],
        estado: [data.tipo.estado, Validators.required],
        descripcion: [data.tipo.descripcion || '', Validators.required],
      });
    }else{
      this.isEditMode = false;
      this.tpsvForm = this.fb.group({
        nombre: ['', Validators.required],
        servicio: ['', Validators.required],
        descripcion: ['', Validators.required],
      });
    }
  }

  servicios: Servicio[] = [];
  ngOnInit(){
    this.servicioService.getServicios().subscribe(
      (data) => {
        this.servicios = data;
      }
    );
  }

  onSubmit(){
    if(this.tpsvForm.valid){

      const tiposerviceData: TipoServicio = this.tpsvForm.value;

      if(this.isEditMode){
        this.tiposervicioService.update(this.data.tipo.id!, tiposerviceData).subscribe(
          (data) => {
            this.snackBar.open('actualizado correctamente', 'Cerrar', {
              duration: 5000, // Duración del mensaje en milisegundos
              panelClass: ['success-snackbar'], // Clase para personalizar estilo
            });
            this.dialogRef.close(true); // Cerrar el diálogo al finalizar
          },
          (error) => {
            this.snackBar.open('Error al actualizar', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          }
        )
      }else{
        this.tiposervicioService.save(tiposerviceData).subscribe(
          (data) => {
            this.snackBar.open('Creado correctamente', 'Cerrar', {
              duration: 5000,
              panelClass: ['success-snackbar'],
            });
            this.dialogRef.close(true);
          },
          (error) => {
            this.snackBar.open('Error al crear', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          }
        )
      }
    }else{
      this.snackBar.open('Todos los campos son obligatorios', 'Cerrar', { duration: 3000 });
    }
  }
}
