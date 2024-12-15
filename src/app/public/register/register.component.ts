import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClienteService } from '../../core/services/cliente.service';
import { PaisService } from '../../core/services/pais.service';

@Component({
  selector: 'app-register',
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  countries: any[] = [];

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private countryService: PaisService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cedula: ['', Validators.required],
      genero: ['', Validators.required],
      tipo_cliente: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      estado_civil: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      pais: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
  }

  register() {
    if (this.registerForm.valid) {
      const formValue = { ...this.registerForm.value };
    // Transformar la fecha antes de enviar
      formValue.fecha_nacimiento = this.formatDate(formValue.fecha_nacimiento);

      this.clienteService.registerCliente(formValue).subscribe(
        (response) => {
          // Mostrar mensaje de éxito
          this.snackBar.open('registrado con éxito', 'Cerrar', {
            duration: 6000,
          });
          this.router.navigate(['/login']);
          
        },
        (error) => {
          // Mostrar mensaje de error
          this.snackBar.open('Error al registrar', 'Cerrar', {
            duration: 6000,
          });
        }
      )
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Devuelve formato YYYY-MM-DD
  }
}

