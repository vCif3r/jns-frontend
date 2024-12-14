import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
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
import { AuthService } from '../../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { AbogadoService } from '../../../core/services/abogado.service';

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
    MatIconModule
  ],
  templateUrl: './new-abogado.component.html',
  styleUrl: './new-abogado.component.css',
})
export class NewAbogadoComponent {
  especialidades: Especialidad[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Laboral', viewValue: 'Laboral' },
    { value: 'Penal', viewValue: 'Penal' },
  ];

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  countries: any[] = [];
  abogadoForm: FormGroup;

  constructor(
    private countryService: PaisService,
    private abogadoService: AbogadoService,
    private dialogRef: MatDialogRef<NewAbogadoComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.abogadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      genero: [null, [Validators.required]],
      pais: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  onSubmit(): void {
    if (this.abogadoForm.valid) {
      // Llamamos al servicio para registrar el abogado
      console.log(this.abogadoForm.value)
      this.abogadoService.registerAbogado(this.abogadoForm.value).subscribe(
        (response) => {
          // Mostrar mensaje de éxito
          this.snackBar.open('Abogado registrado con éxito', 'Cerrar', {
            duration: 3000,
          });

          // Cerrar el modal después de éxito
          this.dialogRef.close();
        },
        (error) => {
          // Mostrar mensaje de error
          this.snackBar.open('Error al registrar abogado', 'Cerrar', {
            duration: 3000,
          });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
