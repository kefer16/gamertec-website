import { Link } from "react-router-dom";
import { PreCompraStyled } from "./styles/PreCompra";
import { useCallback, useContext, useEffect, useState } from "react";
import { DepartamentoService } from "../../services/departamento.service";
import { ProvinciaService } from "../../services/provincia.service";
import { DistritoService } from "../../services/distrito.service";
import { CarritoService } from "../../services/carrito.service";
import { CarritoUsuarioProps } from "../../interfaces/carrito.interface";
import { convertirFormatoMoneda } from "../../utils/funciones.utils";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { ChangeValueSelect } from "../admin/modelo/ModeloRegistro";
import {
   ComboboxAnidadoProps,
   ComboboxProps,
} from "../../interfaces/combobox.interface";

export const PreCompra = () => {
   const { sesionGamertec, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );
   // departamento
   const [arrayDepartamento, setArrayDepartamento] = useState<ComboboxProps[]>(
      []
   );
   const [departamentoId, setDepartamentoId] = useState<ComboboxProps>({
      code: "0",
      name: "",
   });
   const [arrayProvincia, setArrayProvincia] = useState<ComboboxAnidadoProps[]>(
      []
   );
   // provincia
   const [arrayAnidadoProvincia, setArrayAnidadoProvincia] = useState<
      ComboboxAnidadoProps[]
   >([]);
   const [provinciaId, setProvinciaId] = useState<ComboboxAnidadoProps>({
      code: "0",
      codeAnidado: "0",
      name: "",
   });
   // distrito
   const [arrayDistrito, setArrayDistrito] = useState<ComboboxAnidadoProps[]>(
      []
   );
   const [arrayAnidadoDistrito, setArrayAnidadoDistrito] = useState<
      ComboboxAnidadoProps[]
   >([]);
   const [distritoId, setDistritoId] = useState<ComboboxAnidadoProps>({
      code: "0",
      codeAnidado: "0",
      name: "",
   });

   const [arrayCarrito, setArrayCarrito] = useState<CarritoUsuarioProps[]>([]);
   const [direccion, setDireccion] = useState<string>("");
   const [telefono, setTelefono] = useState<string>("");
   const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
   const [precioTotal, setPrecioTotal] = useState<number>(0);
   const [precioEnvio, setPrecioEnvio] = useState<number>(0);

   const funObtenerCarritoCaracteristicas = useCallback(
      async (usuario_id: number) => {
         const srvCarrito = new CarritoService();

         await srvCarrito
            .listarCaracteristicas(usuario_id)
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
                  detalle: error.message,
               });
            });
      },
      [mostrarNotificacion]
   );

   const funObtenerDepartamento = useCallback(async () => {
      const srvDepartamento = new DepartamentoService();

      await srvDepartamento
         .listarTodos()
         .then((resp) => {
            setArrayDepartamento([...resp]);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funObtenerProvincia = useCallback(async () => {
      const srvProvincia = new ProvinciaService();
      await srvProvincia
         .listarTodos()
         .then((resp) => {
            setArrayProvincia([...resp]);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funObtenerDistrito = useCallback(async () => {
      const srvDistrito = new DistritoService();

      await srvDistrito
         .listarTodos()
         .then((resp) => {
            setArrayDistrito(resp);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   useEffect(() => {
      funObtenerCarritoCaracteristicas(sesionGamertec.usuario.usuario_id);
      funObtenerDepartamento();
      funObtenerProvincia();
      funObtenerDistrito();

      setDireccion(sesionGamertec.usuario.direccion);
      setTelefono(sesionGamertec.usuario.telefono);
   }, [
      sesionGamertec,
      funObtenerCarritoCaracteristicas,
      funObtenerDepartamento,
      funObtenerProvincia,
      funObtenerDistrito,
   ]);

   const funcionObtenerProvinciaPorDepartamento = useCallback(
      ({ valorPadre, valorHijo }: ChangeValueSelect) => {
         const valorCategoria = arrayDepartamento.find(
            (item) => item.code === valorPadre
         ) ?? { code: "", name: "" };

         setDepartamentoId({
            code: valorCategoria.code,
            name: valorCategoria.name,
         });
         const arrayNuevo: ComboboxAnidadoProps[] = arrayProvincia.filter(
            (item) => item.codeAnidado === valorPadre
         );

         const nuevoValorAnidado = arrayNuevo.find(
            (item) => item.code === valorHijo
         ) ?? { code: "", name: "", codeAnidado: "" };

         setArrayAnidadoProvincia(arrayNuevo);
         setProvinciaId(nuevoValorAnidado);
      },
      [arrayDepartamento, arrayProvincia]
   );

   const funcionObtenerDistritoPorProvincia = useCallback(
      ({ valorPadre, valorHijo }: ChangeValueSelect) => {
         const valorCategoria = arrayProvincia.find(
            (item) => item.code === valorPadre
         ) ?? { code: "", codeAnidado: "", name: "" };

         setProvinciaId({
            code: valorCategoria.code,
            codeAnidado: valorCategoria.codeAnidado,
            name: valorCategoria.name,
         });
         const arrayNuevo: ComboboxAnidadoProps[] = arrayDistrito.filter(
            (item) => item.codeAnidado === valorPadre
         );

         const nuevoValorAnidado = arrayNuevo.find(
            (item) => item.code === valorHijo
         ) ?? { code: "", name: "", codeAnidado: "" };

         setArrayAnidadoDistrito(arrayNuevo);
         setDistritoId(nuevoValorAnidado);
      },
      [arrayProvincia, arrayDistrito]
   );
   return (
      <ContainerBodyStyled>
         <PreCompraStyled>
            <div className="titulo">
               <h2>Estas a un paso de realizar tu compra</h2>
               <hr />
            </div>

            <div className="orden-despacho">
               <div className="despacho">
                  <div className="despacho-titulo">
                     <h3>Elige tus opciones de despacho</h3>
                     <p>
                        Selecciona el Departamento, Provincia y Distrito donde
                        quieres despachar o retirar tus productos
                     </p>
                  </div>
                  <form className="despacho-select">
                     <div>
                        <label htmlFor="departamento-select-label">
                           Departamento
                        </label>
                        <Dropdown
                           id="departamento-select-label"
                           style={{ width: "100%" }}
                           value={departamentoId}
                           onChange={(e: DropdownChangeEvent) => {
                              setDepartamentoId(e.value);
                              funcionObtenerProvinciaPorDepartamento({
                                 valorPadre: e.value.code,
                                 valorHijo: "0",
                              });
                           }}
                           options={arrayDepartamento}
                           optionLabel="name"
                           placeholder="Todos los departamentos"
                        />
                     </div>

                     <div>
                        <label id="provincia-select-label">Provincia</label>
                        <Dropdown
                           id="provincia-select-label"
                           style={{ width: "100%" }}
                           value={provinciaId}
                           onChange={(e: DropdownChangeEvent) => {
                              setProvinciaId(e.value);
                              funcionObtenerDistritoPorProvincia({
                                 valorPadre: e.value.code,
                                 valorHijo: "0",
                              });
                           }}
                           options={arrayAnidadoProvincia}
                           optionLabel="name"
                           placeholder="Todas las provincias"
                        />
                     </div>

                     <div>
                        <label id="distrito-select-label">Distrito</label>
                        <Dropdown
                           id="distrito-select-label"
                           style={{ width: "100%" }}
                           value={distritoId}
                           onChange={(e: DropdownChangeEvent) =>
                              setDistritoId(e.value)
                           }
                           options={arrayAnidadoDistrito}
                           optionLabel="name"
                           placeholder="Todas las provincias"
                        />
                     </div>
                     <div>
                        <label htmlFor="input-direccion">
                           Dirección de vivienda
                        </label>
                        <InputText
                           required
                           style={{ width: "100%" }}
                           id="input-direccion"
                           placeholder="Dirección de vivienda exacta"
                           value={direccion}
                           name="direccion"
                           onChange={(event) =>
                              setDireccion(event.target.value)
                           }
                        />
                     </div>

                     <div>
                        <label htmlFor="input-telefono">Teléfono</label>
                        <InputText
                           required
                           style={{ width: "100%" }}
                           id="input-telefono"
                           placeholder="Teléfono"
                           value={telefono}
                           name="telefono"
                           onChange={(event) => setTelefono(event.target.value)}
                        />
                     </div>

                     <Link to={"/voucher/"} type="submit">
                        CONTINUAR
                     </Link>
                  </form>
               </div>

               <div className="orden">
                  <div className="orden-titulo">
                     <h3>Resumen de tu orden</h3>
                  </div>

                  <div className="orden-cantidad"></div>

                  <div id="orden-productos" className="orden-productos">
                     {arrayCarrito.map((carrito: CarritoUsuarioProps) => {
                        return (
                           <div
                              key={carrito.cls_modelo.modelo_id}
                              className="content-producto"
                           >
                              <div className="producto-foto">
                                 <img
                                    src={carrito.cls_modelo.foto}
                                    alt={carrito.cls_modelo.nombre}
                                 />
                              </div>
                              <div className="producto-detalles">
                                 <h4>{carrito.cls_modelo.cls_marca.nombre}</h4>
                                 <h5>{carrito.cls_modelo.nombre}</h5>
                                 <span>
                                    {convertirFormatoMoneda(
                                       carrito.cls_modelo.precio
                                    )}
                                 </span>
                              </div>

                              <div className="producto-cantidad">
                                 <p>{`${carrito.cantidad} Und.`} </p>
                              </div>
                           </div>
                        );
                     })}
                  </div>

                  <div className="volver">
                     <h5>Monto Sub Total</h5>
                     <span id="costo-envio">
                        {convertirFormatoMoneda(precioSubTotal)}
                     </span>
                  </div>
                  <div className="volver">
                     <h5>Costo de envío</h5>
                     <span id="costo-envio">
                        {convertirFormatoMoneda(precioEnvio)}
                     </span>
                  </div>
                  <div className="volver">
                     <Link to="/shoping_cart/">Volver al carrito</Link>
                  </div>
                  <hr />
                  <div className="monto">
                     <h5>Monto Total</h5>
                     <span id="precio-final">
                        {convertirFormatoMoneda(precioTotal)}{" "}
                     </span>
                  </div>
               </div>
            </div>
         </PreCompraStyled>
      </ContainerBodyStyled>
   );
};
