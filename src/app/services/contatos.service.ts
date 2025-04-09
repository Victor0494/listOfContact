import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../components/contact/contact';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private readonly API = 'http://localhost:3000/contatos';

  private contatosSubject = new BehaviorSubject<Contact[]>([]);
  contatos$ = this.contatosSubject.asObservable(); 

  constructor(private http: HttpClient) { }

  obterContatos(): void {
    this.http.get<Contact[]>(this.API).subscribe(contatos => {
      this.contatosSubject.next(contatos);
    });
  }

  criarContato(contato: Contact): Observable<Contact> {
    return new Observable(observer => {
      this.http.post<Contact>(this.API, contato).subscribe(novoContato => {
        this.obterContatos();
        observer.next(novoContato);
        observer.complete();
      });
    });
  }

  excluirContato(id: String): Observable<Contact> {
    const url = `${this.API}/${id}`;
    return new Observable(observer => {
      this.http.delete<Contact>(url).subscribe(contatoExcluido => {
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
