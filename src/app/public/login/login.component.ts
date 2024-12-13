import { Component, signal } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }


  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private authService: AuthService
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(){

    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      this.authService.login(formValues).subscribe(
        res => {
          localStorage.setItem('token', res.token)
          
          const tokenPayload = this.authService.decodeToken(res.token);
          console.log(tokenPayload.rol);

          // Redirigir al usuario basándose en su rol
          if (tokenPayload.rol === 'Admin') {
            console.log("Admin")
            this.router.navigate(['/admin']);
          } else if (tokenPayload.rol === 'Abogado') {
            console.log("abogado")
            this.router.navigate(['/abogado']);
          } else {
            // Redirigir a una página de error o de inicio si el rol no es reconocido
            this.router.navigate(['/']);
          }
        },
        err => console.log(err)
      )
    }
  }
}
