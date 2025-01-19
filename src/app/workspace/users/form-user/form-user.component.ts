import { Component, Inject, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../core/services/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { User } from '../../../core/models/user';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Role } from '../../../core/models/role';
import { RoleService } from '../../../core/services/role.service';

interface Especialidad {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-user',
  imports: [
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CommonModule,
    MatDialogClose
  ],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css',
})
export class FormUserComponent {
  especialidades: Especialidad[] = [
    { value: 'Derecho Laboral', viewValue: 'Derecho Laboral' },
    { value: 'Penal', viewValue: 'Penal' },
    { value: 'de Familia', viewValue: 'de Familia' },
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Administrativo', viewValue: 'Administrativo' },
    { value: 'Registro de Marca', viewValue: 'Registro de Marca' },
    { value: 'Derecho de consumidores', viewValue: 'Derecho de consumidores' },
    { value: 'Seguros', viewValue: 'Seguros' },
  ];

  roles: Role[] = []
  private roleService = inject(RoleService)

  cargarRoles(){
    this.roleService.findAll().subscribe((data)=>{
      this.roles = data
    })
  }

  ngOnInit():void{
    this.cargarRoles()
  }


  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  isEditMode: boolean;
  private snackBar = inject(MatSnackBar);
  form: FormGroup;
  private userService = inject(UserService);

  constructor(
    private dialogRef: MatDialogRef<FormUserComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { data: any }
  ) {
    if (data && data.data && data.data.id) {
      this.isEditMode = true;
      this.form = this.fb.group({
        nombre: [data.data.nombre || '', Validators.required],
        apellido: [data.data.apellido || '', [Validators.required]],
        cedula: [
          data.data.cedula || '',
          [Validators.required, Validators.minLength(8)],
        ],
        especialidad: [data.data.especialidad || '', []],
        direccion: [data.data.direccion || '', [Validators.required]],
        role: [data.data.role.id || '', [Validators.required]],
      });
    } else {
      this.isEditMode = false;
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        apellido: ['', [Validators.required]],
        cedula: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        especialidad: ['', []],
        direccion: ['', [Validators.required]],
        role: ['', [Validators.required]],
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const userData: User = this.form.value;
    // Si estamos en modo edición
    if (this.isEditMode) {
      this.userService.update(this.data.data.id!, userData).subscribe(
        (data) => {
          this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
            duration: 6000,
          });
          this.dialogRef.close({ success: true });
        },
        (error) => {
          this.snackBar.open('Error al actualizar el usuario', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    } else {
      // Si estamos en modo creación
      this.userService.saveUser(userData).subscribe(
        () => {
          this.snackBar.open('Usuario registrado correctamente', 'Cerrar', {
            duration: 5000,
          });
          this.dialogRef.close({ success: true });
        },
        (error) => {
          this.snackBar.open('Error al registrar el usuario', 'Cerrar', {
            duration: 5000,
          });
        }
      );
    }
  }

  get f() {
    return this.form.controls;
  }
}
