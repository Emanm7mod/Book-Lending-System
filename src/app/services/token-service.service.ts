import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {
 private tokensub=new BehaviorSubject<string|null>(this.gettoken());
 token=this.tokensub.asObservable();
  constructor() { }

  
  gettoken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }
  settoken(token: string) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('token', token);
      this.tokensub.next(token);
    }
  }

  cleartoken() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      this.tokensub.next(null);
    }
  }
  
  getTokenClaims() {
    const token = this.gettoken();
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded;
    }
    return null;
  }

  getRole(): string | null {
    const claims = this.getTokenClaims();
    return (
      claims?.[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] || null
    );
  }

  getUserId(): string | null {
    const claims = this.getTokenClaims();
    return (
      claims?.[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ] || null
    );
  }

  getUsername(): string | null {
    const claims = this.getTokenClaims();
    return (
      claims?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
      null
    );
  }
}
