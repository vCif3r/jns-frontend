import { Component, Inject, OnInit, signal } from '@angular/core';
import { ClienteService } from '../../../core/services/cliente.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Cliente } from '../../../core/models/cliente';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { PaisService } from '../../../core/services/pais.service';

@Component({
  selector: 'app-form-cliente',
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
    MatRadioModule,
  ],
  templateUrl: './form-cliente.component.html',
  styleUrl: './form-cliente.component.css',
})
export class FormClienteComponent implements OnInit {
  countries: any[] = [];

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  isEditMode: boolean;
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FormClienteComponent>,
    private countryService: PaisService,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente }
  ) {
    if (data && data.cliente && data.cliente.id) {
      this.isEditMode = true; // Modo edición
      this.clienteForm = this.fb.group({
        nombre: [data.cliente.nombre || '', Validators.required],
        apellido: [data.cliente.apellido || '', [Validators.required]],
        cedula: [data.cliente.cedula || '', [Validators.required]],
        genero: [data.cliente.genero || '', [Validators.required]],
        tipo_cliente: [data.cliente.tipo_cliente || '', Validators.required],
        estado_civil: [data.cliente.estado_civil || '', Validators.required],
        direccion: [data.cliente.direccion || '', [Validators.required]],
        telefono: [data.cliente.telefono || '', [Validators.required]],
        pais: [data.cliente.pais || '', [Validators.required]],
      });
    } else {
      this.isEditMode = false; // Modo creación
      this.clienteForm = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        cedula: ['', Validators.required],
        genero: ['', Validators.required],
        tipo_cliente: ['', Validators.required],
        estado_civil: ['', Validators.required],
        direccion: ['', Validators.required],
        telefono: ['', Validators.required],
        pais: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }
  }

  onSubmit(): void {
    if (this.clienteForm.invalid) {
      return;
    }

    const clienteData: Cliente = this.clienteForm.value;
    console.log('data: ', clienteData);
    // Si estamos en modo edición
    if (this.isEditMode) {
      this.clienteService
        .updateCliente(this.data.cliente.id!, clienteData)
        .subscribe(
          (data) => {
            console.log('data devuelta: ', data);
            this.snackBar.open('Cliente actualizado correctamente', 'Cerrar', {
              duration: 6000, // Duración del mensaje en milisegundos
              panelClass: ['success-snackbar'], // Clase para personalizar estilo
            });
            this.dialogRef.close(true); // Cerrar el diálogo al finalizar
          },
          (error) => {
            this.snackBar.open('Error al actualizar el cliente', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar'],
            });
          }
        );
    } else {
      // Si estamos en modo creación
      this.clienteService.registerCliente(clienteData).subscribe(
        () => {
          this.snackBar.open('Cliente registrado correctamente', 'Cerrar', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
          this.dialogRef.close(true); // Cerrar el diálogo al finalizar
        },
        (error) => {
          this.snackBar.open('Error al registrar el cliente', 'Cerrar', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        }
      );
    }
  }
}
