import { ComprobanteStyled } from "../../comprobante/styles/Comprobante.styled";
import { useContext, useEffect, useState } from "react";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { PedidoService } from "../../../services/pedido.service";
import { Button } from "primereact/button";
import {
   IPedidoCabeceraListarUno,
   IPedidoDetalleListarUno,
} from "../../../interfaces/pedido.interface";
import { convertirFormatoMoneda } from "../../../utils/funciones.utils";
import { SeriesRegistro } from "./PedidoDetalleRegistro.component";
import { IMultiSelectProps } from "../../controls/primeUI/MultiSelectPrimeUI";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ProductoService } from "../../../services/producto.service";
import { ProductoSerieResponse } from "../../../responses/producto.response";
import { InputText } from "primereact/inputtext";

interface Props {
   pedido_id: number;
}

export const PedidoDetalle = ({ pedido_id }: Props) => {
   const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
   const [direccion, setDireccion] = useState<string>("");
   const [telefono, setTelefono] = useState<string>("");
   const [pedidoDetalleId, setPedidoDetalleId] = useState<number>(0);
   const [opciones, setOpciones] = useState<IMultiSelectProps[]>([]);

   const [subTotal, setSubTotal] = useState<number>(0);
   const [costoEnvio, setCostoEnvio] = useState<number>(0);
   const [total, setTotal] = useState<number>(0);

   const [lstPedidoDetalle, setPedidoDetalle] = useState<
      IPedidoDetalleListarUno[]
   >([]);

   const [modal, setModal] = useState<boolean>(false);

   const funcionCerrarModal = () => {
      setModal(false);
   };

   const funcionAbrirModal = async (pedidoDetalleId: number) => {
      const srvProducto = new ProductoService();
      let array: IMultiSelectProps[] = [];
      await srvProducto
         .obtenerSeries(pedidoDetalleId, 1)
         .then((resp: ProductoSerieResponse[]) => {
            array = resp.map((item) => ({
               name: item.numero_serie,
               selected: item.checked,
               code: String(item.producto_id),
            }));
         });
      setOpciones(array);
      setModal(true);
      setPedidoDetalleId(pedidoDetalleId);
   };

   const completarPedido = async () => {};

   useEffect(() => {
      const obtenerDatos = async () => {
         const pedido: PedidoService = new PedidoService();
         obtenerSesion();
         pedido.listarUno(pedido_id).then((resp: IPedidoCabeceraListarUno) => {
            setDireccion(resp.direccion);
            setTelefono(resp.telefono);
            setSubTotal(resp.sub_total);
            setCostoEnvio(resp.costo_envio);
            setTotal(resp.total);
            setPedidoDetalle(resp.lst_pedido_detalle);
         });
      };
      obtenerDatos();
   }, [obtenerSesion, pedido_id]);
   return (
      <>
         <ContainerBodyStyled>
            <ComprobanteStyled className="boleta">
               <div className="titulo">
                  <h2>Pedido Pendiente</h2>
                  <hr />
               </div>
               <div className="tabla">
                  <div className="logo-boleta">
                     <img src="" alt="" />
                  </div>
                  <div className="formulario">
                     <div className="form-dividido">
                        <InputText
                           style={{ marginBottom: "20px" }}
                           disabled
                           required
                           placeholder="Cliente"
                           value={`${sesionGamertec.usuario.nombre} ${sesionGamertec.usuario.apellido}`}
                        />

                        <InputText
                           style={{ marginBottom: "20px" }}
                           disabled
                           required
                           placeholder="Fecha"
                           value={""}
                        />
                     </div>
                     <div className="form-dividido">
                        <InputText
                           style={{ marginBottom: "20px" }}
                           disabled
                           required
                           placeholder="Direccion"
                           value={direccion}
                        />
                        <InputText
                           style={{ marginBottom: "20px" }}
                           disabled
                           required
                           placeholder="Telefono"
                           value={telefono}
                        />
                     </div>
                  </div>
                  <table>
                     <thead>
                        <th>CANTIDAD</th>
                        <th>FOTO</th>
                        <th>DESCRIPCIÓN</th>
                        <th>SERIES</th>
                        <th>PRECIO UNITARIO</th>
                        <th>VALOR DE VENTA</th>
                     </thead>
                     <tbody id="productos-comprar">
                        {lstPedidoDetalle.map(
                           (item: IPedidoDetalleListarUno) => {
                              return (
                                 <tr key={`PED-DET-${item.item}`}>
                                    <td>{item.cantidad}</td>
                                    <td>
                                       <img
                                          src={item.cls_modelo.foto}
                                          alt={item.cls_modelo.nombre}
                                       />
                                    </td>

                                    <td>{`${item.cls_modelo.nombre}`}</td>
                                    <td>
                                       <Button
                                          label="Agregar"
                                          onClick={() =>
                                             funcionAbrirModal(
                                                item.pedido_detalle_id
                                             )
                                          }
                                       />
                                    </td>
                                    <td>
                                       {convertirFormatoMoneda(item.precio)}
                                    </td>
                                    <td>
                                       {convertirFormatoMoneda(item.total)}
                                    </td>
                                 </tr>
                              );
                           }
                        )}

                        <tr>
                           <td colSpan={4}></td>
                           <td>SUBTOTAL</td>
                           <td id="subtotal">
                              {convertirFormatoMoneda(subTotal)}
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={4}></td>
                           <td>COSTO ENVIO</td>
                           <td id="envio">
                              {convertirFormatoMoneda(costoEnvio)}
                           </td>
                        </tr>
                        <tr>
                           <td colSpan={4}></td>
                           <td>TOTAL</td>
                           <td className="total">
                              {convertirFormatoMoneda(total)}
                           </td>
                        </tr>
                     </tbody>
                  </table>
                  <Button
                     style={{ marginBottom: "20px" }}
                     label="Completar Pedido"
                     onClick={completarPedido}
                  />
               </div>
            </ComprobanteStyled>
            <SeriesRegistro
               compraDetalleId={pedidoDetalleId}
               opciones={opciones}
               maximoOpciones={1}
               estadoModal={modal}
               funcionCerrarModal={funcionCerrarModal}
               disableButton={false}
            />
         </ContainerBodyStyled>
      </>
   );
};
