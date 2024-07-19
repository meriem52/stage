import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) { }

  onRegister() {
    this.authService.register(this.username, this.password).subscribe(
      response => {
        console.log('User registered successfully:', response);
      },
      error => {
        console.error('Registration error:', error);
      }
    );
  }
}
