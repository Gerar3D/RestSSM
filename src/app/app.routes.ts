import { Routes } from '@angular/router';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ArticuloComponent } from './pages/articulo/articulo.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RubroComponent } from './pages/rubro/rubro.component';
import { HomeComponent } from './pages/home/home.component';
import { TabsComponent } from './core/components/tabs/tabs.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "articulo",
        component: ArticuloComponent
    },
    {
        path: "buscar",
        component: BuscarComponent
    },
    {
        path: "carrito",
        component: CarritoComponent
    },
    {
        path: "perfil",
        component: PerfilComponent
    },
    {
        path: "rubro",
        component: RubroComponent
    }
];
