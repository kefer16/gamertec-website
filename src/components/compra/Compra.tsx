import { CompraStyled } from "./styles/CompraStyles";
import { useCallback, useContext, useEffect, useState } from "react";
import { GamertecSesionContext } from "../sesion/Sesion.component";
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
      const srvCompraEstado = new CompraEstadoService();

      await srvCompraEstado
         .listarTodos()
         .then((resp: CompraEstadoListaTodos[]) => {
            setArrayCompraEstado([...resp]);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `Surgió un error al obtener estados de compra: ${error.message}`,
            });
         });
   }, [mostrarNotificacion]);

   const funObtenerCompras = useCallback(
      async (usuario_id: number) => {
         const srvCompra = new CompraService();

         srvCompra
            .listarTodos(usuario_id)
            .then((resp: ICompraCard[]) => {
               setArrayCompra(resp);
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
      listarTodosCompraEstado();
      obtenerSesion();

      funObtenerCompras(sesionGamertec.usuario.usuario_id);
   }, [
      sesionGamertec,
      obtenerSesion,
      funObtenerCompras,
      listarTodosCompraEstado,
   ]);

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
