import { CompraStyled } from "./styles/CompraStyles";
import { useCallback, useContext, useEffect, useState } from "react";

import { GamertecSesionContext } from "../sesion/Sesion.component";
import { RespuestaEntity } from "../../entities/respuesta.entity";

import {
   ICompraCard,
   ICompraDetalleCard,
} from "../../interfaces/compra.interface";
import { CompraService } from "../../services/compra.service";
import { CardPedido } from "../controls/CardPedido";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { CompraEstadoService } from "../../services/compra_estado.service";
import { CompraEstadoListaTodos } from "../../interfaces/compra_estado.interface";

export const Compra = () => {
   const { sesionGamertec, obtenerSesion, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );
   const [arrayCompra, setArrayCompra] = useState<ICompraCard[]>([]);
   const [arrayCompraEstado, setArrayCompraEstado] = useState<
      CompraEstadoListaTodos[]
   >([]);

   const listarTodosCompraEstado = useCallback(async () => {
      const servCompraEstado = new CompraEstadoService();

      await servCompraEstado
         .listarTodos()
         .then((resp: RespuestaEntity<CompraEstadoListaTodos[]>) => {
            if (resp.data) {
               setArrayCompraEstado([...resp.data]);
            }
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `Surgió un error al obtener estados de compra: ${error.message}`,
            });
         });
   }, [mostrarNotificacion]);

   useEffect(() => {
      listarTodosCompraEstado();

      const obtenerData = async () => {
         obtenerSesion();
         const usuarioId = sesionGamertec.usuario.usuario_id;
         const compraServ = new CompraService();

         compraServ
            .listarTodos(usuarioId)
            .then((resp: RespuestaEntity<ICompraCard[]>) => {
               if (resp.data) {
                  setArrayCompra(resp.data);
               }
            })
            .catch((error) => {});
      };

      obtenerData();
   }, [obtenerSesion, sesionGamertec, listarTodosCompraEstado]);

   return (
      <>
         <ContainerBodyStyled>
            <CompraStyled>
               <div className="titulo">
                  <h2>Tus compras</h2>
               </div>
               <div className="contenedor_compras">
                  {arrayCompra.map((item: ICompraCard) => {
                     let sumaCantidad = 0;
                     let sumaPrecio = 0;

                     const arrayImagenes: string[][] = [];
                     item.lst_compra_detalle.forEach(
                        (element: ICompraDetalleCard) => {
                           sumaCantidad = sumaCantidad + element.cantidad;
                           sumaPrecio =
                              sumaPrecio + element.cantidad * element.precio;
                           if (element.cls_modelo !== undefined) {
                              arrayImagenes.push([
                                 element.cls_modelo[0].foto,
                                 element.cls_modelo[0].nombre,
                              ]);
                           }
                        }
                     );

                     return (
                        <CardPedido
                           key={item.compra_cabecera_id}
                           id={item.compra_cabecera_id}
                           link="/buy/detail"
                           codigo={item.codigo}
                           estado={
                              arrayCompraEstado.find(
                                 (compraEstado) =>
                                    compraEstado.compra_estado_id ===
                                    item.fk_compra_estado
                              )?.abreviatura ?? ""
                           }
                           fechaRegistro={item.fecha_registro.toString()}
                           cantidadTotal={sumaCantidad}
                           precioTotal={sumaPrecio}
                           arrayImagenes={arrayImagenes}
                        />
                     );
                  })}
               </div>
            </CompraStyled>
         </ContainerBodyStyled>
      </>
   );
};
