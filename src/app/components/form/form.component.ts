import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Contact } from '../contact/contact';
import { ContatosService } from '../../services/contatos.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  formulario!: FormGroup;

  contatos: Contact[] = [];

  mostrarModal = false;

  constructor(private contatoService: ContatosService, private contactService: ContatosService) {

  }
  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl(''),
      telefone: new FormControl('')
    });
  }

  cadastrarUsuario() {
    const contato: Contact = {
      id: this.gerarId(),
      name: this.formulario.value.nome,
      phone: this.formulario.value.telefone
    };
  
    this.contatoService.criarContato(contato).subscribe(() => {
      this.formulario.reset();
      this.fecharModal();
    });
  }
  
  gerarId(): string {
    return crypto.randomUUID();
  }

  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
    this.formulario.reset();
  }

}

