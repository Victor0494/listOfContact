import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { loginInfoRequest } from './loginInfoRequest';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  errorMessage: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {

  }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(''),
      password: new FormControl('')

    });
  }

  login() {
    const loginRequest: loginInfoRequest = {
      userName: this.loginForm.value.userName,
      password: this.loginForm.value.password
    }
    this.errorMessage = null;
    this.loginService.login(loginRequest).subscribe({
      next: (response) => {
        const token: string = response.body?.accessToken ?? '';
        localStorage.setItem('token', token);
        if (response.status === 200) {
          this.router.navigateByUrl('/contact');
        }
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Usuário ou senha inválidos';
          console.log(this.errorMessage);
        } else {
          this.errorMessage = 'Erro ao tentar fazer login. Tente novamente mais tarde.';
        }
      }
    });
  }
}
