import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../core/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  _authService = inject(AuthService);
  _profileService = inject(ProfileService);
  _route = inject(ActivatedRoute);

  editMode: boolean = false;
  isUserAuthenticated: boolean = false;
  profile?: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {
    // Inicializar el formulario con valores vacíos o predeterminados
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      pais: ['', Validators.required],
      genero: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Verificar si el usuario está autenticado
    if (this._authService.getID() == this._route.snapshot.params['id']) {
      this.isUserAuthenticated = true;
    }

    // Obtener los datos del perfil al inicializar el componente
    this._profileService.getProfileUser(this._route.snapshot.params['id']).subscribe(
      (data) => {
        this.profile = data;

        // Una vez que se obtiene el perfil, actualizamos los valores del formulario
        this.form.patchValue({
          nombre: this.profile.nombre,
          apellido: this.profile.apellido,
          pais: this.profile.pais,
          genero: this.profile.genero,
          direccion: this.profile.direccion
        });
      },
      (error) => {
        this.snackbar.open('Error loading profile', 'Close', { duration: 5000 });
      }
    );

    // Suscribirse a los cambios del perfil para reflejar la actualización en tiempo real
    this._profileService.profile$.subscribe((updatedProfile) => {
      if (updatedProfile) {
        // Si el perfil ha cambiado, actualizamos los datos
        this.profile = updatedProfile;
        // También podemos actualizar el formulario con los nuevos datos si es necesario
        this.form.patchValue({
          nombre: this.profile.nombre,
          apellido: this.profile.apellido,
          pais: this.profile.pais,
          genero: this.profile.genero,
          direccion: this.profile.direccion
        });
      }
    });
  }

  setEditMode() {
    this.editMode = true;
  }

  cancelEditMode() {
    this.editMode = false;
  }

  submit() {
    if (this.form.valid) {
      this._profileService.updateUser(this._authService.getID(), this.form.value).subscribe(
        (response) => {
          this.snackbar.open('Actualizado correctamente', 'Close', { duration: 5000 });
          this.editMode = false;
        },
        (error) => {
          this.snackbar.open('Error updating profile', 'Close', { duration: 5000 });
        }
      );
    }
  }
}