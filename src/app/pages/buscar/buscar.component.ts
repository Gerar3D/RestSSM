import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { text } from 'stream/consumers';
import { Busqueda } from '../../core/interface/busqueda';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interface/productos';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [CommonModule, FormsModule, TarjetaProductoComponent, RouterModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {
  headerService = inject(HeaderService);
  productoService = inject(ProductosService);
  productos:Producto[] = [];

  ngOnInit(): void {
    this.headerService.titulo.set("Buscar");
    this.productoService.getAll().then(res => this.productos = res)
  }

  parametrosBusueda:Busqueda = {
    texto: "",
    aptoCeliaco: false,
    aptoVegano: false, 
  }

  async buscar(){
    this.productos = await this.productoService.buscar(this.parametrosBusueda);
  }

}
