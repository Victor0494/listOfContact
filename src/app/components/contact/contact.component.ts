import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContatosService } from '../../services/contatos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  contatos: Contact [] = [];

  constructor(private contactService: ContatosService) {

  }
  
  ngOnInit() {
    this.contactService.contatos$.subscribe(listaContatos => {
      this.contatos = listaContatos;
    });

    this.contactService.obterContatos();
  }

  excluirContato(id: String) {
    this.contactService.excluirContato(id).subscribe();
  }
}
