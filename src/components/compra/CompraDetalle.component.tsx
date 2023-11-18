import { useContext, useEffect, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { CompraService } from "../../services/compra.service";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import {
   ICompraDetalleTable,
   ICompraTable,
} from "../../interfaces/compra.interface";
import { ComprobanteStyled } from "../comprobante/styles/Comprobante.styled";
import { convertirFormatoMoneda } from "../../utils/funciones.utils";
import { SeriesRegistro } from "../admin/pedido/PedidoDetalleRegistro.component";
import { IMultiSelectProps } from "../controls/primeUI/MultiSelectPrimeUI";
import { ProductoService } from "../../services/producto.service";
import { IProductoSerie } from "../../interfaces/producto.interface";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { CompraEstadoService } from "../../services/compra_estado.service";
import { CompraEstadoListaTodos } from "../../interfaces/compra_estado.interface";
import { CompraEstados } from "../controls/CardPedido";
import { Tag } from "primereact/tag";

interface Props {
   compraCabeceraId: number;
}

export const CompraDetalle = ({ compraCabeceraId }: Props) => {
   const { sesionGamertec, obtenerSesion, mostrarNotificacion, privilegio } =
      useContext(GamertecSesionContext);
   // const [pedido, setPedido] = useState<IPedidoCabeceraListarUno>(
   // 	{} as IPedidoCabeceraListarUno
   // );
   const [direccion, setDireccion] = useState<string>("");
   const [telefono, setTelefono] = useState<string>("");
   const [compraDetalleId, setCompraDetalleId] = useState<number>(0);
   const [compraDetalle, setCompraDetalle] = useState<ICompraDetalleTable[]>(
      []
   );

   const [subTotal, setSubTotal] = useState<number>(0);
   const [costoEnvio, setCostoEnvio] = useState<number>(0);
   const [total, setTotal] = useState<number>(0);

   const [modal, setModal] = useState<boolean>(false);

   const [opciones, setOpciones] = useState<IMultiSelectProps[]>([]);
   const [maximoOpciones, setMaximoOpciones] = useState<number>(0);
   const funcionCerrarModal = () => {
      setModal(false);
   };

   const funcionAbrirModal = async (
      compraDetalleId: number,
      cantidad: number
   ) => {
      const productoServ = new ProductoService();
      let array: IMultiSelectProps[] = [];
      await productoServ
         .obtenerSeries(compraDetalleId, sesionGamertec.usuario.usuario_id)
         .then((resp: IProductoSerie[]) => {
            array = resp.map((item) => ({
               name: item.numero_serie,
               selected: item.checked,
               code: String(item.producto_id),
            }));
         });
      setOpciones(array);
      setModal(true);
      setMaximoOpciones(cantidad);
      setCompraDetalleId(compraDetalleId);
   };

   const obtenerDatos = async (compraCabeceraId: number) => {
      const compraServ = new CompraService();

      compraServ
         .listarUno(compraCabeceraId)
         .then((resp: RespuestaEntity<ICompraTable>) => {
            if (resp.data) {
               setDireccion(resp.data.direccion);
               setTelefono(resp.data.telefono);
               setSubTotal(resp.data.sub_total);
               setCostoEnvio(resp.data.costo_envio);
               setTotal(resp.data.total);
               setCompraDetalle(resp.data.lst_compra_detalle);
               setCompraEstadoSeleccionado({
                  code: resp.data.cls_compra_estado.abreviatura,
                  name: resp.data.cls_compra_estado.nombre,
                  selected: false,
               });
            }
         });
   };

   useEffect(() => {
      obtenerSesion();
      obtenerDatos(compraCabeceraId);
      listarCompraEstados();
   }, [obtenerSesion, compraCabeceraId]);

   const [arrayCompraEstados, setArrayCompraEstados] = useState<
      IMultiSelectProps[]
   >([]);
   const [compraEstadoSeleccionado, setCompraEstadoSeleccionado] =
      useState<IMultiSelectProps | null>(null);

   const listarCompraEstados = async () => {
      const servCompraEstados = new CompraEstadoService();

      await servCompraEstados
         .listarTodos()
         .then((resp: RespuestaEntity<CompraEstadoListaTodos[]>) => {
            if (resp.data) {
               const arrayEstados: IMultiSelectProps[] = [];

               resp.data.forEach((element: CompraEstadoListaTodos) => {
                  arrayEstados.push({
                     code: element.abreviatura,
                     name: element.nombre,
                     selected: false,
                  });
               });
               setArrayCompraEstados([...arrayEstados]);
            }
         })
         .catch((error: Error) => {});
   };

   const selectedCountryTemplate = (option: IMultiSelectProps) => {
      if (option) {
         return (
            <Tag
               severity={
                  CompraEstados.find((item) => item.estado === option.code)
                     ?.tipo
               }
               value={option.name}
            />
         );
      }
   };

   const actualizarCompraEstado = async (
      compra_id: number,
      compra_estado: string
   ) => {
      const servCompra = new CompraService();
      await servCompra
         .actualizarCompraEstado(compra_id, compra_estado)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Se actualizó estado de compra",
            });
         })
         .catch((error: RespuestaEntity<null>) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgió un error: ${error.error.message}`,
            });
         });
   };

   const countryOptionTemplate = (option: IMultiSelectProps) => {
      return (
         <Tag
            severity={
               CompraEstados.find((item) => item.estado === option.code)?.tipo
            }
            value={option.name}
         />
      );
   };

   return (
      <>
         <ContainerBodyStyled>
            <ComprobanteStyled className="boleta">
               <div className="titulo">
                  <h2>Pedido Pendiente</h2>
               </div>
               <hr />
               <div className="tabla">
                  <div className="logo-boleta">
                     <img src="" alt="" />
                  </div>
                  <div className="formulario">
                     <div className="input">
                        <label htmlFor="cliente">Cliente</label>
                        <InputText
                           disabled
                           id="cliente"
                           value={`${sesionGamertec.usuario.nombre} ${sesionGamertec.usuario.apellido}`}
                        />
                     </div>

                     <div className="input">
                        <label htmlFor="fecha">Fecha</label>
                        <InputText disabled id="fecha" value={""} />
                     </div>
                     <div className="input">
                        <label htmlFor="fecha">Estado</label>
                        <Dropdown
                           value={compraEstadoSeleccionado}
                           onChange={(e: DropdownChangeEvent) => {
                              setCompraEstadoSeleccionado(e.value);
                           }}
                           options={arrayCompraEstados}
                           optionLabel="name"
                           placeholder="Selecciona un Estado"
                           valueTemplate={selectedCountryTemplate}
                           itemTemplate={countryOptionTemplate}
                           disabled={privilegio === "ADM" ? false : true}
                        />
                     </div>
                     <div className="input">
                        <label htmlFor="direccion">Direccion</label>
                        <InputText disabled id="direccion" value={direccion} />
                     </div>

                     <div className="input">
                        <label htmlFor="telefono">Telefono</label>
                        <InputText disabled id="telefono" value={telefono} />
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
                     <tbody>
                        {compraDetalle.map((item: ICompraDetalleTable) => {
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
                                       label="Ver"
                                       onClick={() =>
                                          funcionAbrirModal(
                                             item.compra_detalle_id,
                                             item.cantidad
                                          )
                                       }
                                    />
                                 </td>
                                 <td>{convertirFormatoMoneda(item.precio)}</td>
                                 <td>{convertirFormatoMoneda(item.total)}</td>
                              </tr>
                           );
                        })}

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

                  {privilegio === "ADM" && (
                     <Button
                        label="Actualizar Estado"
                        onClick={() =>
                           actualizarCompraEstado(
                              compraCabeceraId,
                              compraEstadoSeleccionado?.code ?? ""
                           )
                        }
                     />
                  )}
               </div>
            </ComprobanteStyled>
            <SeriesRegistro
               compraDetalleId={compraDetalleId}
               opciones={opciones}
               maximoOpciones={maximoOpciones}
               estadoModal={modal}
               funcionCerrarModal={funcionCerrarModal}
               disableButton={false}
            />
         </ContainerBodyStyled>
      </>
   );
};
