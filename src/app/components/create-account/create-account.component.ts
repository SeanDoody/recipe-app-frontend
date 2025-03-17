import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Subject, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

interface CreateAccountForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

interface CreateAccountAttempt {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-create-account',
  imports: [
    MatButton,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent {
  private authService = inject(AuthService);

  // To-Do
  // add password validator/apply to sign-in too
  // add length restrictions to all fields
  public createAccountForm = new FormGroup<CreateAccountForm>({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  private showPassword = signal(false);

  public togglePasswordVisibility(): void {
    this.showPassword.update((showPassword) => !showPassword);
  }

  public passwordIcon = computed(() =>
    this.showPassword() ? 'visibility' : 'visibility_off',
  );

  public passwordInputType = computed(() =>
    this.showPassword() ? 'text' : 'password',
  );

  public onCreateAccountFormSubmit(): void {
    if (this.createAccountForm.valid) {
      const firstName = this.createAccountForm.controls.firstName.value;
      const lastName = this.createAccountForm.controls.lastName.value;
      const email = this.createAccountForm.controls.email.value;
      const password = this.createAccountForm.controls.password.value;
      this.createAccount$.next({ firstName, lastName, email, password });
    }
  }

  private createAccount$ = new Subject<CreateAccountAttempt>();

  private createAccountResult$ = this.createAccount$.pipe(
    switchMap((attempt) =>
      this.authService.createAccount(
        attempt.firstName,
        attempt.lastName,
        attempt.email,
        attempt.password,
      ),
    ),
  );

  public createAccountResult = toSignal(this.createAccountResult$);
}
