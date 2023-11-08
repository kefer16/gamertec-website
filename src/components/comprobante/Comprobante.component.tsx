import { ComprobanteStyled } from "./styles/Comprobante.styled";
import { useContext, useEffect, useState } from "react";
import { CarritoService } from "../../services/carrito.service";
import { CarritoUsuarioProps } from "../../interfaces/carrito.interface";
import {
   convertirFechaSQL,
   convertirFechaVisual,
   convertirFormatoMoneda,
   crearFechaISO,
   fechaActualISO,
} from "../../utils/funciones.utils";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { PedidoService } from "../../services/pedido.service";

import { RespuestaEntity } from "../../entities/respuesta.entity";

import {
   IPedidoCabeceraInterface,
   RespuestaPedidoPreferencia,
} from "../../interfaces/pedido.interface";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { SesionGamertec } from "../../interfaces/sesion.interface";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY || "");

export const Comprobante = () => {
   const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
   const [preferenciaId, setPreferenciaId] = useState<string>("");
   const [arrayCarrito, setArrayCarrito] = useState<CarritoUsuarioProps[]>([]);

   const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
   const [precioTotal, setPrecioTotal] = useState<number>(0);
   const [precioEnvio, setPrecioEnvio] = useState<number>(0);

   const [visible, setVisible] = useState<boolean>(false);

   useEffect(() => {
      obtenerSesion();
      obtenerDatosCarrito(sesionGamertec);
   }, [obtenerSesion, sesionGamertec]);

   const obtenerDatosCarrito = async (sesion: SesionGamertec) => {
      await CarritoService.listarCaracteristicas(
         sesion.usuario.usuario_id
      ).then((array) => {
         setArrayCarrito([...array]);
         const precioSubTotal: number = array.reduce(
            (suma, item) => suma + item.cls_modelo.precio * item.cantidad,
            0
         );
         setPrecioSubTotal(precioSubTotal);
         const precioEnvio = 0;
         setPrecioEnvio(precioEnvio);
         const precioTotal: number = precioSubTotal + precioEnvio;
         setPrecioTotal(precioTotal);
      });
   };

   const generarPreferenciaYRegistrarPedido = () => {
      if (!preferenciaId) {
         funcionRegistrarPedido(sesionGamertec.usuario.usuario_id);
      }
      setVisible(true);
   };

   const funcionRegistrarPedido = async (usuarioId: number) => {
      let preferencia_id = "";
      const pedServ: PedidoService = new PedidoService();

      await pedServ
         .crearPreferencia(usuarioId)
         .then((resp: RespuestaEntity<RespuestaPedidoPreferencia>) => {
            if (resp.data) {
               preferencia_id = resp.data.id;

               setPreferenciaId(preferencia_id);
            }
         })
         .catch((error: any) => {});

      const data: IPedidoCabeceraInterface = {
         distrito_id: 10102,
         usuario_id: usuarioId,
         preferencia_id: preferencia_id,
         fecha_registro: convertirFechaSQL(fechaActualISO().toISOString()),
      };

      await pedServ.registrar(data).catch((error: Error) => {});
   };

   const footerContent = (
      <>
         {preferenciaId && (
            <Wallet
               locale="es-PE"
               initialization={{
                  preferenceId: preferenciaId,
                  redirectMode: "self",
               }}
            />
         )}
      </>
   );

   return (
      <>
         <ContainerBodyStyled>
            <ComprobanteStyled className="boleta">
               <div className="titulo">
                  <h2>Previsualización Voucher</h2>
                  <hr />
               </div>
               <div className="tabla">
                  <div className="logo-boleta">
                     <img src="" alt="" />
                  </div>
                  <div className="formulario">
                     <div className="form-dividido">
                        <InputText
                           value={`${sesionGamertec.usuario.nombre} ${sesionGamertec.usuario.apellido}`}
                           type="text"
                           autoComplete="none"
                           disabled
                        />

                        <InputText
                           value={convertirFechaVisual(crearFechaISO())}
                           type="text"
                           autoComplete="none"
                           disabled
                        />
                     </div>
                     <div className="form-dividido">
                        <InputText
                           value={sesionGamertec.usuario.direccion}
                           type="text"
                           autoComplete="none"
                           disabled
                        />

                        <InputText
                           value={sesionGamertec.usuario.telefono}
                           type="text"
                           autoComplete="none"
                           disabled
                        />
                     </div>
                  </div>
                  <table>
                     <thead>
                        <th>CANTIDAD</th>
                        <th>FOTO</th>
                        <th>DESCRIPCIÓN</th>

                        <th>PRECIO UNITARIO</th>
                        <th>VALOR DE VENTA</th>
                     </thead>
                     <tbody id="productos-comprar">
                        {arrayCarrito.map((carrito: CarritoUsuarioProps) => {
                           return (
                              <tr key={carrito.carrito_id}>
                                 <td>{carrito.cantidad}</td>
                                 <td>
                                    <img
                                       src={carrito.cls_modelo.foto}
                                       alt={carrito.cls_modelo.nombre}
                                    />
                                 </td>

                                 <td>{`${carrito.cls_modelo.cls_marca.nombre}, ${carrito.cls_modelo.descripcion}, (SN: )`}</td>
                                 <td>
                                    {convertirFormatoMoneda(
                                       carrito.cls_modelo.precio
                                    )}
                                 </td>
                                 <td>
                                    {convertirFormatoMoneda(
                                       carrito.cls_modelo.precio *
                                          carrito.cantidad
                                    )}
                                 </td>
                              </tr>
                           );
                        })}

                        <tr>
                           <td colSpan={3}></td>
                           <td>SUBTOTAL</td>
                           <td id="subtotal">
                              {convertirFormatoMoneda(precioSubTotal)}
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={3}></td>
                           <td>COSTO ENVIO</td>
                           <td id="envio">
                              {convertirFormatoMoneda(precioEnvio)}
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={3}></td>
                           <td>TOTAL</td>
                           <td className="total">
                              {convertirFormatoMoneda(precioTotal)}
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               <Button
                  label="Generar enlace de Compra"
                  style={{ width: "100%" }}
                  onClick={generarPreferenciaYRegistrarPedido}
               />
               <Dialog
                  header="Generación Enlace"
                  visible={visible}
                  style={{ width: "500px" }}
                  onHide={() => setVisible(false)}
                  footer={footerContent}
               >
                  Estas a un paso de acreditar tu compra
               </Dialog>
            </ComprobanteStyled>
         </ContainerBodyStyled>
      </>
   );
};
