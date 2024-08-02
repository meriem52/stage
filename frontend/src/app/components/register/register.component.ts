
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
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
    private registerService: RegisterService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onRegister() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.registerService.register(username, password).subscribe({
        next: (response) => {
          this.messageService.add({severity: 'success', summary: 'Registration Successful', detail: 'You can now log in'});
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.messageService.add({severity: 'error', summary: 'Registration Failed', detail: 'Please try again'});
        }
      });
    }
  }
}
