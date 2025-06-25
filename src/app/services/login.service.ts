import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ilogin } from '../models/ilogin';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 private readonly api_url="https://booklending-api-raghda-test.jahezteam.com/api/Account/login";
  constructor(private readonly http:HttpClient , private token_servic:TokenServiceService) { }
  login(data:Ilogin){
    return this.http.post(this.api_url,data);
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
  register(data:any){
    const register_url = 'https://booklending-api-raghda-test.jahezteam.com/api/Account/register';
    return this.http.post(register_url,data);
  }
}
