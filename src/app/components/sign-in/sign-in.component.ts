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
import { MatIcon } from '@angular/material/icon';
import {
  MatFormField,
  MatInput,
  MatLabel,
  MatSuffix,
} from '@angular/material/input';
import { Subject, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

interface SignInAttempt {
  email: string;
  password: string;
}

interface SignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
})
export class SignInComponent {
  private authService = inject(AuthService);

  public signInForm = new FormGroup<SignInForm>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
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

  public onSignInFormSubmit(): void {
    if (this.signInForm.valid) {
      const email = this.signInForm.controls.email.value;
      const password = this.signInForm.controls.password.value;
      this.signIn$.next({ email: email, password: password });
    }
  }

  private signIn$ = new Subject<SignInAttempt>();

  private signInResult$ = this.signIn$.pipe(
    switchMap((signInAttempt) =>
      this.authService.signInWithEmailAndPassword(
        signInAttempt.email,
        signInAttempt.password,
      ),
    ),
  );

  public signInResult = toSignal(this.signInResult$);
}
