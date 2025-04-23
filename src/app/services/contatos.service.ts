import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../components/contact/contact';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private readonly API = 'http://localhost:8080/v1/contact';

  private contatosSubject = new BehaviorSubject<Contact[]>([]);
  contatos$ = this.contatosSubject.asObservable(); 

  constructor(private http: HttpClient) { }

  obterContatos(): void {
    const token = localStorage.getItem('token'); // ou de onde você estiver guardando o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<Contact[]>(this.API, {headers}).subscribe(contatos => {
      this.contatosSubject.next(contatos);
    });
  }

  criarContato(contato: Contact): Observable<Contact> {
    const token = localStorage.getItem('token'); // ou de onde você estiver guardando o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return new Observable(observer => {
      this.http.post<Contact>(this.API, contato, {headers}).subscribe(novoContato => {
        this.obterContatos();
        observer.next(novoContato);
        observer.complete();
      });
    });
  }

  excluirContato(id: String): Observable<Contact> {
    const token = localStorage.getItem('token'); // ou de onde você estiver guardando o token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const url = `${this.API}/${id}`;
    return new Observable(observer => {
      this.http.delete<Contact>(url, {headers}).subscribe(contatoExcluido => {
        this.obterContatos();
        observer.next(contatoExcluido);
        observer.complete();
      });
    });
  }

  editarContato(contato: Contact): Observable<Contact> {
    console.log(contato)
    return new Observable(observer => {
      this.http.put<Contact>(`${this.API}/${contato.id}`, contato).subscribe(novoContato => {
        this.obterContatos();
        observer.next(novoContato);
        observer.complete();
      });
    });
  }
}
