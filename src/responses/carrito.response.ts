export interface CarritoResponse {
   carrito_id: number;
   cantidad: number;
   precio_total: number;
   despues: boolean;
   pedido: boolean;
   fecha_registro: string;
   activo: boolean;
   fk_usuario: number;
   fk_modelo: number;
}
