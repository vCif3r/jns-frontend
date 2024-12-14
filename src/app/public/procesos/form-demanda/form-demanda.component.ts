import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

interface TipoDemanda {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-demanda',
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
    CommonModule
  ],
  templateUrl: './form-demanda.component.html',
  styleUrl: './form-demanda.component.css',
})
export class FormDemandaComponent {
  tipo_demandas: TipoDemanda[] = [
    { value: 'Civil', viewValue: 'Demanda Civil' },
    { value: 'Laboral', viewValue: 'Demanda Laboral' },
    { value: 'Familiar', viewValue: 'Demanda Familiar' },
    { value: 'Comercial', viewValue: 'Demanda Comercial' },
    { value: 'Otro', viewValue: 'otros' },
  ];


  value?: Date;
  demandForm: FormGroup;

  constructor() {
    this.demandForm = new FormGroup({
      fecha: new FormControl(null, Validators.required),
      hora: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      descripcion: new FormControl('', Validators.required),
      demandante: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      lugarCita: new FormControl('', Validators.required),
      descripcionHechos: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.demandForm.valid) {
      console.log(this.demandForm.value);
      // Aquí puedes procesar el formulario
    } else {
      console.log('Formulario no válido');
    }
  }
}
