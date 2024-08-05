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
  displayErrorDialog: boolean = false; // Control the visibility of the error dialog
  displaySuccessDialog: boolean = false;
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
    private loginService: LoginService,
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
      this.loginService.login(username, password).subscribe({
        next: (response) => {
          this.loginService.isLoggedIn().subscribe(isLoggedIn => {
            if (isLoggedIn) {

              this.router.navigate(['/home']);


            } else {
              this.errorMessage = 'Login failed. Please try again.';
              this.displayErrorDialog = true;
            }
          });
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
          this.displayErrorDialog = true;
        }
      });
    }
  }

  hideDialog() {
    this.displayErrorDialog = false;
  }
}
