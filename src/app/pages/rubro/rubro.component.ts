import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';
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
  productosService = inject(ProductosService);
  categoriaService = inject(CategoriasService);
  ac = inject(ActivatedRoute);
  productos:Producto[] = [];

  ngOnInit(): void {
    this.ac.params.subscribe(params => {
      if(params['id']){
        this.categoriaService.getByid(parseInt(params['id']))
        .then(categoria =>{
          if(categoria) {
            this.productos = categoria.productos;
            this.headerService.titulo.set(categoria.nombre);
          }})
      }
    })
    
  }
}
