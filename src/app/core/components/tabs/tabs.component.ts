import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  constructor( private router: Router ){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        switch (event.urlAfterRedirects){
          case "/":
            this.seleccionado=[true, false, false, false];
            break
          case "/buscar":
            this.seleccionado=[false, true, false, false];
            break
          case "/carrito":
            this.seleccionado=[false, false, true, false];
            break
          case "/perfil":
            this.seleccionado=[false, false, false, true];
            break
          default:
            this.seleccionado=[false, false, false, false]; 
            break 
        }
      }
    })
  }

  seleccionado = [false,false,false,false];



  navegar(direccion:string){
    //Cambiar de pagina
    this.router.navigate([direccion])

  }

}
