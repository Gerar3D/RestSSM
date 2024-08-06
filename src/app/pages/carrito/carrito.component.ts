import { Component, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { Producto } from '../../core/interface/productos';
import { ProductosService } from '../../core/services/productos.service';
import { PerfilService } from '../../core/services/perfil.service';
import { NUMERO_WHATSAPP } from '../../core/components/constantes/telefono';
import { encode } from 'punycode';
import { Router, RouterModule } from '@angular/router';


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
  perfilService = inject(PerfilService);
  router = inject(Router);

  productosCarrito:WritableSignal<Producto[]> = signal([]);

  subtotal = 0;
  envio = 100;
  total = 0;
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.buscarInformacion().then(() =>{
      this.calcularInformacion();
    });
  }

  async buscarInformacion(){
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const itemCarrito = this.cartService.carrito[i];
      const res = await this.productoService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.set([...this.productosCarrito(),res]);
    }
  }

  eliminarProducto(idProducto:number){
    this.cartService.eliminarProducto(idProducto);
  }

  calcularInformacion(){
    this.subtotal=0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal += this.productosCarrito()[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total= this.subtotal + this.envio;
  }

  cambiarCantidadProducto(id:number, cantidad:number){
    this.cartService.modificarCantidadProducto(id,cantidad)
    this.calcularInformacion()
  }

  async enviarMensaje(){
    let pedido = ""
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const producto = await this.productoService.getById(this.cartService.carrito[i].idProducto)
      pedido += `* ${this.cartService.carrito[i].cantidad} x ${producto?.nombre}
    ` 
    }
    const mensaje = `
    Hola! Soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido:
    ${pedido}
    Si te quieres comunicar conmibo hacerlo al N° del que te hablo o al N° ${this.perfilService.perfil()?.telefono}
    La dirección de envío es : ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}
    Muchas gracias.
    `
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURI(mensaje)}`
    window.open(link,"_blak");
    this.dialog.nativeElement.showModal();
  }

  finalizarPedio(){
    this.cartService.vaciar();
    this.dialog.nativeElement.close();
    this.router.navigate(['/']);
  }

  editarPedido(){
    this.dialog.nativeElement.close();
  }

}
