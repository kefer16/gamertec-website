import { Link } from "react-router-dom";
import { CarritoStyles } from "./styles/CarritoStyles";
import { IconTrash, IconHistoryToggle } from "@tabler/icons-react";
import { useContext, useEffect, useState, useCallback } from "react";

import { formatoMonedaPerunana } from "../../utils/funciones.utils";
import { Button } from "@mui/material";
import { CarritoService } from "../../services/carrito.service";
import { CarritoUsuarioProps } from "../../interfaces/carrito.interface";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";

export const Carrito = () => {
   const { sesionGamertec, mostrarNotificacion, obtenerCantidadCarrito } =
      useContext(GamertecSesionContext);
   const [arrayCarrito, setArrayCarrito] = useState<CarritoUsuarioProps[]>([]);
   const [precioEnvio, setPrecioEnvio] = useState<number>(0);
   const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
   const [precioTotal, setPrecioTotal] = useState<number>(0);

   const calcularTotalOrden = () => {
      const precioSubTotal: number = arrayCarrito.reduce(
         (suma, item) => suma + item.cls_modelo.precio * item.cantidad,
         0
      );
      setPrecioSubTotal(precioSubTotal);
      const precioEnvio = 0;
      setPrecioEnvio(precioEnvio);
      const precioTotal: number = precioSubTotal + precioEnvio;
      setPrecioTotal(precioTotal);
   };

   const obtenerModelosCarrito = useCallback(
      async (usuario_id: number) => {
         await CarritoService.listarCaracteristicas(usuario_id)
            .then((respuesta) => {
               setArrayCarrito(respuesta);
               const precioSubTotal: number = respuesta.reduce(
                  (suma, item) => suma + item.cls_modelo.precio * item.cantidad,
                  0
               );
               setPrecioSubTotal(precioSubTotal);
               const precioEnvio = 0;
               setPrecioEnvio(precioEnvio);
               const precioTotal: number = precioSubTotal + precioEnvio;
               setPrecioTotal(precioTotal);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: `surgió un error: ${error.message}`,
                  pegado: true,
               });
            });
      },
      [mostrarNotificacion]
   );

   const eliminarModeloCarrito = async (
      carrito_id: number,
      usuario_id: number
   ) => {
      const servCarrito = new CarritoService();

      await servCarrito
         .eliminarModeloCarrito(carrito_id, usuario_id)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               titulo: "Éxito",
               detalle: "Se eliminó el producto del carrito",
               pegado: false,
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: `surgió un error: ${error.message}`,
               pegado: true,
            });
         });

      obtenerCantidadCarrito();

      await obtenerModelosCarrito(usuario_id);
   };

   const actualizarCantidadCarrito = async (
      tipo: "disminuir" | "aumentar",
      carrito_id: number,
      cantidad: number,
      usuario_id: number
   ) => {
      if (tipo === "disminuir") {
         cantidad = cantidad - 1;
      }
      if (tipo === "aumentar") {
         cantidad = cantidad + 1;
      }
      const servCarrito = new CarritoService();
      await servCarrito
         .actualizarCantidadCarrito(carrito_id, cantidad, usuario_id)
         .then()
         .catch(() => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: "Surgió un error al actualizar cantidad",
               pegado: true,
            });
         });

      obtenerCantidadCarrito();

      await obtenerModelosCarrito(usuario_id);
   };

   useEffect(() => {
      obtenerModelosCarrito(sesionGamertec.usuario.usuario_id);
   }, [sesionGamertec, obtenerModelosCarrito]);

   return (
      <ContainerBodyStyled>
         <CarritoStyles>
            <div className="titulo">
               <h2>Carrito de Compras</h2>
            </div>

            <div className="contenido">
               <div className="productos">
                  {arrayCarrito.map((item: CarritoUsuarioProps) => {
                     return (
                        <div key={item.carrito_id} className="pro-detalle">
                           <div className="deta-arriba">
                              <div className="foto">
                                 <img src={item.cls_modelo.foto} alt="foto" />
                              </div>
                              <div className="detalles">
                                 <h2>{item.cls_modelo.cls_marca.nombre}</h2>
                                 <Link
                                    to={`/product/description/${item.cls_modelo.modelo_id}`}
                                 >
                                    {item.cls_modelo.descripcion}
                                 </Link>
                                 <p>{item.cls_modelo.nombre}</p>
                              </div>
                              <div className="precio">
                                 <h2>
                                    {formatoMonedaPerunana(
                                       item.cls_modelo.precio
                                    )}
                                 </h2>
                                 <span>Envio a Domicilio</span>
                                 <p className="stock">
                                    {`${item.cls_modelo._count.lst_producto} Un. disponibles `}
                                 </p>
                              </div>
                              <div className="opciones">
                                 <div className="cantidad">
                                    <button
                                       disabled={
                                          item.cantidad === 1 ? true : false
                                       }
                                       className={
                                          item.cantidad === 1
                                             ? "cantidad__button-inactivo"
                                             : "cantidad__button"
                                       }
                                       onClick={() =>
                                          actualizarCantidadCarrito(
                                             "disminuir",
                                             item.carrito_id,
                                             item.cantidad,
                                             sesionGamertec.usuario.usuario_id
                                          )
                                       }
                                    >
                                       -
                                    </button>
                                    <input
                                       className="cantidad__input"
                                       type="number"
                                       value={item.cantidad}
                                       disabled
                                    />
                                    <button
                                       disabled={
                                          item.cantidad >=
                                          item.cls_modelo._count.lst_producto
                                             ? true
                                             : false
                                       }
                                       className={
                                          item.cantidad >=
                                          item.cls_modelo._count.lst_producto
                                             ? "cantidad__button-inactivo"
                                             : "cantidad__button"
                                       }
                                       onClick={() =>
                                          actualizarCantidadCarrito(
                                             "aumentar",
                                             item.carrito_id,
                                             item.cantidad,
                                             sesionGamertec.usuario.usuario_id
                                          )
                                       }
                                    >
                                       +
                                    </button>
                                 </div>
                              </div>
                           </div>

                           <div className="cont-botones">
                              <div className="boton">
                                 <Link to="#">
                                    <IconHistoryToggle size={16} />
                                    Guardar para depués
                                 </Link>
                              </div>
                              <span>|</span>
                              <div
                                 className="boton"
                                 onClick={() =>
                                    eliminarModeloCarrito(
                                       item.carrito_id,
                                       sesionGamertec.usuario.usuario_id
                                    )
                                 }
                              >
                                 <Link to="#" className="eliminar">
                                    <IconTrash size={16} />
                                    Eliminar
                                 </Link>
                              </div>
                           </div>
                        </div>
                     );
                  })}
               </div>

               <div className="carrito_orden">
                  <h1>RESUMEN DE TU ORDEN</h1>
                  <p>
                     Sub-total productos
                     <span>{formatoMonedaPerunana(precioSubTotal)}</span>
                  </p>
                  <p>
                     Envío<span>{formatoMonedaPerunana(precioEnvio)}</span>
                  </p>

                  <p>
                     Total<span>{formatoMonedaPerunana(precioTotal)}</span>
                  </p>

                  <Link to={"/before_purchase/"} style={{ color: "red" }}>
                     Procesar Compra
                  </Link>
                  <Button onClick={calcularTotalOrden}>
                     Volver a calcular
                  </Button>
               </div>
            </div>
         </CarritoStyles>
      </ContainerBodyStyled>
   );
};
