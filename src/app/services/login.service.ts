import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../models/ilogin';
import { TokenServiceService } from './token-service.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private readonly account_url=`${environment.baseurl}/Account`;
  constructor(private readonly http:HttpClient , private token_servic:TokenServiceService) { }
  login(data:Ilogin){
    return this.http.post(`${this.account_url}/login`,data);
  }
  register(data:any){
  return this.http.post(`${this.account_url}/register`,data);
  }
  settoken(token:string){
    this.token_servic.settoken(token);
  }
  logout(){
    this.token_servic.cleartoken();
  }
  isAuthenticated(): boolean {
    return this.token_servic.gettoken() !== null;
  }
}
