import { Component, Inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PaisService } from '../../../core/services/pais.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Para mostrar mensajes
import { MatIconModule } from '@angular/material/icon';
import { AbogadoService } from '../../../core/services/abogado.service';
import { Abogado } from '../../../core/models/abogado';
import { CommonModule } from '@angular/common';

interface Especialidad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-abogado',
  providers: [provideNativeDateAdapter()],
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
    CommonModule
  ],
  templateUrl: './form-abogado.component.html',
  styleUrl: './form-abogado.component.css',
})
export class FormAbogadoComponent {
  countries: any[] = [];
  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  isEditMode: boolean;

  especialidades: Especialidad[] = [
    { value: 'Derecho Laboral', viewValue: 'Derecho Laboral' },
    { value: 'Penal', viewValue: 'Penal' },
    { value: 'de Familia', viewValue: 'de Familia' },
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Administrativo', viewValue: 'Administrativo' },
    { value: 'Registro de Marca', viewValue: 'Registro de Marca' },
    { value: 'Derecho de consumidores', viewValue: 'Derecho de consumidores' },
    { value: 'Seguros', viewValue: 'Seguros' },
  ];

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  abogadoForm: FormGroup;

  constructor(
    private countryService: PaisService,
    private abogadoService: AbogadoService,
    private dialogRef: MatDialogRef<FormAbogadoComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { abogado: Abogado }
  ) {
    if (data && data.abogado && data.abogado.id) {
      this.isEditMode = true;
      this.abogadoForm = this.fb.group({
        nombre: [data.abogado.nombre || '', Validators.required],
        apellido: [data.abogado.apellido || '', [Validators.required]],
        cedula: [data.abogado.cedula || '', [Validators.required]],
        especialidad: [data.abogado.especialidad || '', [Validators.required]],
        direccion: [data.abogado.direccion || '', [Validators.required]],
        telefono: [data.abogado.telefono || '', [Validators.required]],
        genero: [data.abogado.genero || null, [Validators.required]],
      });
    } else {
      this.isEditMode = false;
      this.abogadoForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', [Validators.required]],
        cedula: ['', [Validators.required]],
        especialidad: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        direccion: ['', [Validators.required]],
        telefono: ['', [Validators.required]],
        genero: ['', [Validators.required]],
      });
    }
    // end form construction
  }

  onSubmit(): void {
    if (this.abogadoForm.invalid) return;
    
    const abogadoData: Abogado = this.abogadoForm.value;
    // Si estamos en modo edición
    if (this.isEditMode) {
      this.abogadoService
        .updateAbogado(this.data.abogado.id!, abogadoData)
        .subscribe(
          (data) => {
            this.snackBar.open('Abogado actualizado correctamente', 'Cerrar', {
              duration: 6000, // Duración del mensaje en milisegundos
              panelClass: ['success-snackbar'], // Clase para personalizar estilo
            });
            this.dialogRef.close(true); // Cerrar el diálogo al finalizar
          },
          (error) => {
            this.snackBar.open('Error al actualizar el abogado', 'Cerrar', {
              duration: 5000,
            });
          }
        );
    } else {
      // Si estamos en modo creación
      this.abogadoService.registerAbogado(abogadoData).subscribe(
        () => {
          this.snackBar.open('Abogado registrado correctamente', 'Cerrar', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.dialogRef.close(true); // Cerrar el diálogo al finalizar
        },
        (error) => {
          this.snackBar.open('Error al registrar el abogado', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }

  get f() {
    return this.abogadoForm.controls;
  }
}
