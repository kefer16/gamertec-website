export interface ComentarioResponse {
   comentario_id: number;
   valoracion: number;
   usuario: string;
   titulo: string;
   mensaje: string;
   fecha_registro: string;
   activo: boolean;
   fk_usuario: number;
   fk_modelo: number;
}
