import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [ButtonComponent, FormComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {

}
