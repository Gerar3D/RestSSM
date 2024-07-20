import { CommonModule } from '@angular/common';
import { Component, Output, signal, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contador-cantidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contador-cantidad.component.html',
  styleUrl: './contador-cantidad.component.scss'
})
export class ContadorCantidadComponent {

  numero = signal(1);
  @Output() cantidadCambiada = new EventEmitter<number>();

  actualizarNumero(diferencia:number){
    this.numero.set(Math.max(this.numero()+diferencia,1));
    this.cantidadCambiada.emit(this.numero());
  }

}
