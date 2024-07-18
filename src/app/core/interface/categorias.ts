import { Producto } from "./productos";

export interface Categoria{
    [x: string]: any;
    id: number,
    nombre: string,
    fotoUrl: string,
    productos: Producto[] 
}