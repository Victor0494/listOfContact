import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginInfoRequest } from '../../components/login/loginInfoRequest';
import { loginInfoResponse } from '../../components/login/loginInfoResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:8080/login'

  constructor(private http: HttpClient) { }


  login(data: loginInfoRequest): Observable<HttpResponse<loginInfoResponse>> {
    return this.http.post<loginInfoResponse>(this.API, data, {observe: 'response' as const});
  }
}
