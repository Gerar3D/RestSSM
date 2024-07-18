import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/interface/categorias';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TarjetaCategoriaComponent, CommonModule, NgFor, RouterLink, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  categorias:Categoria[] = [];
  
  
  ngOnInit(): void {
    this.headerService.titulo.set("Home");
    this.headerService.extendido.set(true);
    this.categoriasService.getAll().then(res => this.categorias = res);
  }
  
  ngOnDestroy(): void {
    this.headerService.extendido.set(false);
  }

}
