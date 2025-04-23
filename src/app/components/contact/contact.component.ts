import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContatosService } from '../../services/contatos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from "../container/container.component";
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, ContainerComponent, FormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{

  contatos: Contact [] = [];
  editModal = false;
  editContact!: Contact;
  formulario!: FormGroup;

  constructor(private contactService: ContatosService) {

  }
  
  ngOnInit() {
    this.contactService.contatos$.subscribe(listaContatos => {
      this.contatos = listaContatos;
    });

    this.formulario = new FormGroup({
          nome: new FormControl(''),
          telefone: new FormControl('')
        });

    this.contactService.obterContatos();
  }

  excluirContato() {
    this.contactService.excluirContato(this.editContact.id).subscribe();
    this.fecharEditModal();
  }


  editarContato() {
    const contato: Contact = {
      id: this.editContact.id,
      name: this.formulario.value.nome ? this.formulario.value.nome : this.editContact.name,
      phone: this.formulario.value.telefone ? this.formulario.value.telefone : this.editContact.phone
    };
     this.contactService.editarContato(contato).subscribe(() => {
       this.formulario.reset();
       this.fecharEditModal();
     });
  }

  gerarId(): string {
    return crypto.randomUUID();
  }

  abrirEditModal(contact: Contact) {
    this.editContact = contact;
    this.editModal = true;
  }

  fecharEditModal() {
    this.editModal = false;
  }
}
