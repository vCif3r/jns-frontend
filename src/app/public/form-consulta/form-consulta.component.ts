import { Component } from '@angular/core';
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
import { Servicio } from '../../core/models/servicio';
import { ServicioService } from '../../core/services/servicio.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ConsultaService } from '../../core/services/consulta.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { AreaLegal } from '../../core/models/area-legal';
import { AreaLegalService } from '../../core/services/area-legal.service';

@Component({
  selector: 'app-form-consulta',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatIconModule,
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
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './form-consulta.component.html',
  styleUrl: './form-consulta.component.css'
})
export class FormConsultaComponent {
  value?: Date;
  consultaForm: FormGroup;
  minDate: any
  area?: AreaLegal;
  serviciosDisponibles : Servicio[] = []

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private areaService: AreaLegalService,
    private servicioService: ServicioService,
    private consultaService: ConsultaService,
    private snackbar: MatSnackBar
  ) {
    this.consultaForm = new FormGroup({
      fechaHora: new FormControl(null, Validators.required),
      servicio: new FormControl(null, Validators.required),
      detalles: new FormControl('', Validators.required),
      nombreCompleto: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      hechos: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    const idArea = this.route.snapshot.paramMap.get('id')!;

    if (idArea) {
      this.areaService.findById(idArea).subscribe(
        (data) => {
          if (!data) {  
            this.router.navigate(['/']);  // Redirigir si no se encuentra el servicio
          } else {
            this.area = data;  // Asignar el servicio recibido
          }
        },
        (error) => {
          console.log('Error al cargar el servicio');
      })

      this.servicioService.findAllPublicadosByArea(idArea).subscribe((data)=>{
        this.serviciosDisponibles = data
      })
    }

    let today = new Date();
    today.setDate(today.getDate() + 1); // Establecer al día siguiente
    this.minDate = today.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:mm
  }


  onSubmit(): void {
    if (this.consultaForm.valid) {
      console.log(this.consultaForm.value);

      const formValue = { ...this.consultaForm.value };
      if (formValue.fecha) {
        const fecha = new Date(formValue.fecha);
        formValue.fecha = fecha.toISOString().split('T')[0];
      }

      this.consultaService.save(formValue).subscribe((data) => {
        console.log('Consulta guardada');
        this.router.navigate(['/']);
        this.snackbar.open('Consulta guardada', 'Cerrar', {
          duration: 5000
        });
      },
        (error: any) => {
          console.log('Error al guardar la consulta');
          this.snackbar.open('Error al guardar la consulta', 'Cerrar', {
            duration: 5000
          });
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
