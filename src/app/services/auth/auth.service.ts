import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface SignInResponse {
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
  ): Observable<SignInResponse> {
    return of({
      success: true,
      message: `Email: ${email} Password: ${password}`,
    });
  }
}
