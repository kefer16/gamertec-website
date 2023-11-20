import { useCallback, useContext, useEffect, useState } from "react";
import { CardPedido } from "../../controls/CardPedido";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { PedidoService } from "../../../services/pedido.service";

import { PedidoCabeceraUsuarioProsp } from "../../../interfaces/pedido.interface";
import { CardPedidoDetalleProps } from "../../../interfaces/card_pedido.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

export const Pedido = () => {
   const { sesionGamertec, obtenerSesion, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );

   const [arrayPedidoCabecera, setArrayPedidoCabecera] = useState<
      PedidoCabeceraUsuarioProsp[]
   >([]);

   const funObtenerPedido = useCallback(
      async (usuario_id: number) => {
         const srvPedido = new PedidoService();

         await srvPedido
            .listarPedidoUsuario(usuario_id)
            .then((resp: PedidoCabeceraUsuarioProsp[]) => {
               setArrayPedidoCabecera(resp);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: error.message,
               });
            });
      },
      [mostrarNotificacion]
   );

   useEffect(() => {
      obtenerSesion();
      funObtenerPedido(sesionGamertec.usuario.usuario_id);
   }, [sesionGamertec, obtenerSesion, funObtenerPedido]);

   return (
      <ContainerBodyStyled className="grid gap-3">
         {arrayPedidoCabecera.map((item: PedidoCabeceraUsuarioProsp) => {
            let sumaCantidad = 0;
            let sumaPrecio = 0;

            const arrayImagenes: string[][] = [];
            item.lst_pedido_detalle.forEach(
               (element: CardPedidoDetalleProps) => {
                  sumaCantidad = sumaCantidad + element.cantidad;
                  sumaPrecio = sumaPrecio + element.precio;
                  if (element.cls_modelo !== undefined) {
                     arrayImagenes.push([
                        element.cls_modelo.foto,
                        element.cls_modelo.nombre,
                     ]);
                  }
               }
            );

            return (
               <CardPedido
                  key={item.pedido_cabecera_id}
                  id={item.pedido_cabecera_id}
                  link="/admin/order/detail"
                  codigo={item.codigo}
                  estado=""
                  fechaRegistro={item.fecha_registro}
                  cantidadTotal={sumaCantidad}
                  precioTotal={sumaPrecio}
                  arrayImagenes={arrayImagenes}
               />
            );
         })}
      </ContainerBodyStyled>
   );
};
