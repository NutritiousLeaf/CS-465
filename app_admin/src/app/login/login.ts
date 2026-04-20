import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  public credentials: User = {
    name: '',
    email: ''
  };

  public password: string = '';
  public formError: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  public onLoginSubmit(): void {
    if (!this.credentials.email || !this.password) {
      this.formError = 'All fields are required, please try again';
      return;
    }

    this.formError = '';
    this.authenticationService.login(this.credentials, this.password);
    this.router.navigateByUrl('/');
  }
}
