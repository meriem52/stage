/*

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  userFields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter username',
        required: true,
        minLength: 3,
        maxLength: 30
      },
      validation: {
        messages: {
          required: 'Username is required.',
          minlength: 'Username must be at least 3 characters long.',
          maxlength: 'Username cannot exceed 30 characters.'
        }
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
        minLength: 6
      },
      validation: {
        messages: {
          required: 'Password is required.',
          minlength: 'Password must be at least 6 characters long.'
        }
      }
    }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  /*
    login() {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        this.authService.login(username, password).subscribe({
          next: (response) => {
            console.log('Login successful', response);
            this.router.navigate(['/home']); // Redirection vers la page d'accueil
          },
          error: (error) => {
            console.error('Login failed', error);
            this.errorMessage = 'Invalid username or password';
          }
        });
      }
    }
  }
  */
/*
  login() {
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful', response); // Ajout du log
          this.router.navigate(['/home']); // Redirection vers la page d'accueil
        },
        error: (error) => {
          console.error('Login failed', error); // Ajout du log
          this.errorMessage = 'Invalid username or password';
        }
      });
    }
  }
}
*/


/*
  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']); // Redirection vers la page d'accueil
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password';
        }
      });
    }
  }*/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';

  userFields: FormlyFieldConfig[] = [
    {
      key: 'username',
      type: 'input',
      templateOptions: {
        label: 'Username',
        placeholder: 'Enter username',
        required: true,
        minLength: 3,
        maxLength: 30
      },
      validation: {
        messages: {
          required: 'Username is required.',
          minlength: 'Username must be at least 3 characters long.',
          maxlength: 'Username cannot exceed 30 characters.'
        }
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        required: true,
        minLength: 6
      },
      validation: {
        messages: {
          required: 'Password is required.',
          minlength: 'Password must be at least 6 characters long.'
        }
      }
    }
  ];

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.LoginService.login(username, password).subscribe({
        next: (response) => {
          this.LoginService.isLoggedIn().subscribe(isLoggedIn => {
            if (isLoggedIn) {
              this.router.navigate(['/home']);
            } else {
              this.errorMessage = 'Login failed. Please try again.';
            }
          });
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Login Failed', detail: 'Invalid username or password'});
        }
      });
    }
  }
}
