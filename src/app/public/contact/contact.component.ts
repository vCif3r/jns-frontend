import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ContactoService } from '../../core/services/contacto.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  imports: [MatIconModule, ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactoService = inject(ContactoService);
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tema: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit(){
    if(this.form.valid){
      this.contactoService.crearContacto(this.form.value).subscribe(
        res => {
          this.snackbar.open('Contacto enviado con éxito.', 'Cerrar', { duration: 3000 });
          this.form.reset();
        },
        err => {
          this.snackbar.open('Hubo un error al enviar el contacto.', 'Cerrar', { duration: 3000 });
        }
      )
      
    } else {
      this.snackbar.open('Por favor, llena todos los campos correctamente.', 'Cerrar', { duration: 3000 });
    }
  }
}
