import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenService} from '../../service/tokenService';
import {AuthService} from '../../service/authService';
import {Router} from '@angular/router';
import {Login} from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogged = false;
  isLoginFail = false;
  loginUsuario: Login;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  msg: string;
  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }
  onLogin() {
    // @ts-ignore
    this.loginUsuario = new Login(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
              this.isLogged = true;
              this.isLoginFail = false;
              this.tokenService.setToken(data.token);
              this.tokenService.setUserName(data.nombreUsuario);
              this.tokenService.setAuthorities(data.authorities);
              this.roles = data.authorities;
              this.router.navigate(['/dashboard']);
      },
      err => {
          this.isLoginFail = true;
          this.isLogged = false;
          if (err.error.message === 'no autorizado') {
            this.msg = 'Usuario o contraseña incorrectas';
          } else {
            this.msg = err.error.message;
          }
      }
    );
  }
  ngOnDestroy() {
  }

}
