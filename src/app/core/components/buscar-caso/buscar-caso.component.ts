import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogClose, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CasoService } from '../../services/caso.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Caso } from '../../models/caso';

@Component({
  selector: 'app-buscar-caso',
  imports: [MatFormFieldModule, MatButtonModule, MatDialogContent, MatDialogTitle, MatInputModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, MatStepperModule, CommonModule, MatIconModule,MatDialogClose],
  templateUrl: './buscar-caso.component.html',
  styleUrl: './buscar-caso.component.css'
})
export class BuscarCasoComponent {
  casoEncontrado?: Caso ;
  formulario: FormGroup;
  isCasoEncontrado: boolean = false;

  constructor(
    private casoService: CasoService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {
    this.formulario = this.fb.group({
      email: ['', Validators.required],
      codigo: ['', Validators.required]
    })
  }

  onSubmit(stepper: any) {
    if (this.formulario.valid) {
      this.casoService.getCasoByEmailAndCodigo(this.formulario.value).subscribe((caso) => {
        this.casoEncontrado = caso;
        this.isCasoEncontrado = true; 
        this.snackBar.open('Caso encontrado', 'Cerrar', {
          duration: 7000
        });
        stepper.next();
      },
        (error) => {
          console.error('Error al buscar el caso:', error);
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 7000
          });
        })
    }
  }
}