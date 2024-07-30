import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { Producto } from '../../core/interface/productos';
import { ProductosService } from '../../core/services/productos.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, NgFor, ContadorCantidadComponent, RouterModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {
  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productoService = inject(ProductosService);

  productosCarrito:Producto[] = [];

  subtotal = 0;
  envio = 100;
  total = 0;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito =>{
      const res = await this.productoService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.push(res);
      this.calcularInformacion();
    })
  }

  eliminarProducto(idProducto:number){
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion(){
    this.subtotal=0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal += this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total= this.subtotal + this.envio;
  }

  cambiarCantidadProducto(id:number, cantidad:number){
    this.cartService.modificarCantidadProducto(id,cantidad)
    this.calcularInformacion()
  }

}
