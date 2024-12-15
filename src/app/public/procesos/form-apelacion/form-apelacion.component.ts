import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { Router } from '@angular/router';
import { ApelacionService } from '../../../core/services/apelacion.service';

interface TipoApelacion {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-apelacion',
  providers: [provideNativeDateAdapter()],
    imports: [
      MatCardModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      MatDatepickerModule,
      MatTimepickerModule,
      MatSelectModule,
      CommonModule,
    ],
  templateUrl: './form-apelacion.component.html',
  styleUrl: './form-apelacion.component.css'
})
export class FormApelacionComponent {
tipo_apelaciones: TipoApelacion[] = [
    { value: 'Civil', viewValue: 'Demanda Civil' },
    { value: 'Laboral', viewValue: 'Demanda Laboral' },
    { value: 'Familiar', viewValue: 'Demanda Familiar' },
    { value: 'Comercial', viewValue: 'Demanda Comercial' },
    { value: 'Otro', viewValue: 'otros' },
  ];

  value?: Date;
  denunciaForm: FormGroup;

  constructor(
    private apelacionService: ApelacionService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.denunciaForm = new FormGroup({
      fecha: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      detalles: new FormControl('', Validators.required),
      demandante: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      lugar: new FormControl('', Validators.required),
      hechos: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.denunciaForm.valid) {
      const formValue = { ...this.denunciaForm.value };
      // Transformar la fecha antes de enviar
      formValue.fecha = this.formatDate(formValue.fecha);

      this.apelacionService.save(this.denunciaForm.value).subscribe(
        (response: any) => {

          this.snackBar.open('Denuncia registrada con éxito', 'Cerrar', {
            duration: 5000,
          });
          this.router.navigate(['/home']);
        },
        (error:any) => {

          this.snackBar.open('Error al registrar la denuncia', 'Cerrar', {
            duration: 5000,
          });
        }
      )
    } else {
      console.log('Formulario no válido');
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Devuelve formato YYYY-MM-DD
  }
}
