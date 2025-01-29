import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  FormBuilder, 
  FormsModule, 
  ReactiveFormsModule, 
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../../../shared/src/lib/models/user.model';
import { AuthServicePortail } from '../../services/auth/auth.service';
import { Credentials } from '@shared';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
	private formBuilder = inject(FormBuilder);
  private authService = inject(AuthServicePortail);
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  private loginSubscription: Subscription | null = null;

  loginFormGroup = this.formBuilder.group({
		'email': ['', [Validators.required, Validators.email]],
		'password': ['', [Validators.required, Validators.minLength(6)]]
	});
	
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
  
  login() {
    this.loginSubscription = this.authService.login(
      this.loginFormGroup.value as Credentials
    ).subscribe( {
      next: (result: User | null | undefined) => {
        this.redirect();
      },
      error: () => {
        this.invalidCredentials = true;
        alert('Invalid credentials');
      }
    });
	}

  ngOnDestroy() {
    this.loginSubscription?.unsubscribe();
  }
}
