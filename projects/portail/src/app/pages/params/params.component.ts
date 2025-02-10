import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService, User, NotificationsComponent } from '@shared';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-params',
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
],
  templateUrl: './params.component.html',
  styleUrl: './params.component.scss'
})
export class ParamsComponent {
  activatedRoute = inject(ActivatedRoute);
  urlBack: string = 'http://localhost:4200/';

  authService = inject(AuthService);
  fb = inject(FormBuilder);

  userForm = this.fb.group({
    first_name: [this.authService.user()?.first_name, [Validators.required]],
    last_name: [this.authService.user()?.last_name],
    phone: [this.authService.user()?.phone, [Validators.required, Validators.pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)]],
    email: [this.authService.user()?.email, [Validators.required, Validators.email]],
    password: ['']
  });

  constructor() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.urlBack = params['redirect'];
    });

    this.authService.getUser()
  }

  private snackBar = inject(MatSnackBar);

  onSubmit() {
    if (this.userForm.valid) {
      const user = this.userForm.value as User;

      Object.keys(user).forEach(key => {
        const typedKey = key as keyof typeof user;
        if (["", undefined, null].includes(user[typedKey] as string)) delete user[typedKey];
      });

      this.authService.updateUser(user).subscribe(() => {
        this.userForm.patchValue(this.authService.user() as User)

        this.snackBar.openFromComponent(NotificationsComponent, {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          data: {
            icon: 'check_circle',
            message: 'Votre profil a bien été mis à jour',
          }
        });
      });
    }
  }
}
