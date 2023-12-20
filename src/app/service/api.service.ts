import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Login} from '../model/user.model';
import { Observable } from "rxjs/index";
import { Register } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public token = localStorage.getItem("token");
  constructor(private http: HttpClient) { }


  //  Register
  public signUp(register: Register): Observable<any> {
    console.log(register);
    return this.http.post('http://localhost:9898/auth/register', register, { responseType: 'text' });
  }

  public login(login: Login):Observable   <any> {
    console.log(login)
    return this.http.post<any>(`http://localhost:9898/auth/token`,login)
  }



}