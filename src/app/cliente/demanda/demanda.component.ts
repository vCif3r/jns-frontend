import { Component, inject, model, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/services/auth.service';
import { DemandaService } from '../../core/services/demanda.service';
import {MatTableModule} from '@angular/material/table';
import { Demanda } from '../../core/models/demanda';
import { DetalleDemandaComponent } from './detalle-demanda/detalle-demanda.component';
import { MatDialog } from '@angular/material/dialog';

interface TipoDemanda {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-demanda',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  templateUrl: './demanda.component.html',
  styleUrl: './demanda.component.css',
})
export class DemandaComponent {
  demandForm: FormGroup;
  demandante: any;

  displayedColumns: string[] = ['codigo', 'titulo', 'acciones'];
 
  dataSource: any[] = [];

  tipo_demandas: TipoDemanda[] = [
    { value: 'Civil', viewValue: 'Demanda Civil' },
    { value: 'Laboral', viewValue: 'Demanda Laboral' },
    { value: 'Familiar', viewValue: 'Demanda Familiar' },
    { value: 'Comercial', viewValue: 'Demanda Comercial' },
    { value: 'Otro', viewValue: 'otros' },
  ];

  constructor(
    private _auth: AuthService,
    private _demandaService: DemandaService,
    private fb: FormBuilder
  ) {
    this.demandForm = this.fb.group({
      tipo: ['', Validators.required],
      titulo: ['', [Validators.required, Validators.minLength(10)]],
      descripcion: ['', [Validators.required, Validators.minLength(50)]],
      // declaration: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.demandante = this._auth.getFullnameUser();
    this._demandaService.findAll().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Error al obtener los datos', error);
      }
    );
  }

  onSubmit() {
    if (this.demandForm.valid) {
      console.log('Formulario enviado', this.demandForm.value);
      this._demandaService.save(this.demandForm.value).subscribe(
        (response:any) => {
          console.log('Demanda enviada correctamente:', response);
          // Redirigir o mostrar mensaje de éxito si es necesario
        },
        (error:any) => {
          console.error('Error al enviar la demanda:', error);
          // Mostrar un mensaje de error o realizar alguna acción en caso de fallo
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(idDemanda: any): void {
    const dialogRef = this.dialog.open(DetalleDemandaComponent, {
      data: { idDemanda: 1 }  // Pasando el id del elemento seleccionado
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

}
