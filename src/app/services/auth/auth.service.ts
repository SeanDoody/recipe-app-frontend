import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AuthResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    return of({
      success: true,
      message: `Email: ${email} Password: ${password}`,
    });
  }

  public createAccount(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Observable<AuthResponse> {
    return of({
      success: true,
      message: `First Name: ${firstName} Last Name: ${lastName} Email: ${email} Password: ${password}`,
    });
  }
}
