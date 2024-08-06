import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../core/interface/productos';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { CommonModule, NgFor } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { callbackify } from 'util';

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [TarjetaProductoComponent, CommonModule, NgFor, RouterLink],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss'
})
export class RubroComponent {
  headerService = inject(HeaderService);
  categoriaService = inject(CategoriasService);
  ac = inject(ActivatedRoute);
  productos:WritableSignal<Producto[]> = signal([]);

  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.categoriaService.getByid(parseInt(params['id']))
        .then(categoria =>{
          if(categoria) {
            this.productos.set(categoria.productos);
            this.headerService.titulo.set(categoria.nombre);
          }})
      }
    })
    
  }
}
