import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { catchError, first, Observable, of, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../../../shared/src/lib/models/user.model';
import { AuthService, CredentialsSignin, CredentialsSignup } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
	private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  private subscriptions: Subscription = new Subscription();

  signinFormGroup = this.formBuilder.group({
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]]
	});

  signupFormGroup = this.formBuilder.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    phone: [''],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required, Validators.minLength(6)]],
	});

  authBoolean = signal<boolean>(true);
  invalidCredentials = false;
  redirectUrl = signal<string | undefined>(undefined);

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params => {
      if (params['redirect']) {
        this.redirectUrl.set(params['redirect']);
      }
    });
  }

  redirect() {
    if (this.redirectUrl()) {
      window.location.href = this.redirectUrl() as string;
    }else {
      this.router.navigate(['portail']);
    }
  }

  signin() {
    this.subscriptions.add(this.authService.signin(
      this.signinFormGroup.value as CredentialsSignin
    ).subscribe( {
      next: (result: User | null | undefined) => {
        this.redirect();
      },
      error: () => {
        this.invalidCredentials = true;
      }
    }))
	}

  signup() {
    this.subscriptions.add(this.authService.signup(
      this.signupFormGroup.value as CredentialsSignup
    ).subscribe({
      next: (result: User | null | undefined) => {
        this.redirect();
      },
      error: () => {
        this.invalidCredentials = true;
        alert('Invalid credentials');
      }
    }))
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
