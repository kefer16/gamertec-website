import { Button } from "primereact/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
   convertirFormatoMoneda,
   fechaActualISO,
   formatoCalificacion,
} from "../../utils/funciones.utils";

import { Comentarios } from "./Comentarios";
import { CarritoEntity } from "../../entities/carrito.entities";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { IconShoppingCartPlus } from "@tabler/icons-react";
import {
   AbajoDetalles,
   ContenidoAbajo,
   ContenidoArriba,
   ContenidoArribaDerecha,
   ContenidoArribaIzquierda,
   ContenidoArribaIzquierdaImagen,
   Detalles,
   DetallesMarca,
   DetallesPro,
   DetallesTecnicos,
   FondoOpaco,
   ModalInicioSesion,
   RutaProductos,
} from "./styles/DescripcionStyled";
import { Dialog } from "primereact/dialog";
import { IconShoppingCartUp, IconPlus, IconMinus } from "@tabler/icons-react";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { ComentarioEntity } from "../../entities/comentario.entity";
import { ComentarioService } from "../../services/comentario.service";
import { ComentarioResponse } from "../../responses/comentario.response";
import { ModeloService } from "../../services/modelo.service";
import { ModeloDescripcionResponse } from "../../responses/modelo.response";
import { CarritoService } from "../../services/carrito.service";

interface Props {
   modelo_id: number;
}

export const Descripcion = ({ modelo_id }: Props) => {
   // const [nombre, setNombre] = useState<string>("");
   const { obtenerCantidadCarrito, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );
   const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
   const [categoriaNombre, setCategoriaNombre] = useState<string>("");
   const [marcaNombre, setMarcaNombre] = useState<string>("");
   const [modeloNombre, setModeloNombre] = useState<string>("");
   const [descripcion, setDescripcion] = useState<string>("");
   const [foto, setFoto] = useState<string>("");
   const [precio, setPrecio] = useState<number>(0);
   const [caracteristicas, setCaracteristicas] = useState<string>("");
   const [color, setColor] = useState<string>("");
   const [stock, setStock] = useState<number>(0);
   const [usuarioId, setUsuarioId] = useState<number>(0);

   const [modalLogin, setModalLogin] = useState<boolean>(false);

   const [modalComentario, setModalComentario] = useState<boolean>(false);
   const [calificacionGeneral, setCalificacionGeneral] = useState<number>(0);
   const [arrayComentarios, setArrayComentarios] = useState<
      ComentarioResponse[]
   >([]);

   const funObtenerComentarios = useCallback(
      async (modelo_id: number) => {
         const srvComentario = new ComentarioService();
         let arrayComentarios: ComentarioEntity[] = [];

         await srvComentario
            .buscarPorModelo(modelo_id)
            .then((resp) => {
               arrayComentarios = [...resp];
               setArrayComentarios(arrayComentarios);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: `surgio un error: ${error.message}`,
               });
            });

         let calificacionGeneral: number =
            arrayComentarios.length === 0
               ? 0
               : arrayComentarios.reduce(
                    (suma, item) => suma + item.valoracion,
                    0
                 ) / arrayComentarios.length;

         calificacionGeneral = Number(formatoCalificacion(calificacionGeneral));
         setCalificacionGeneral(calificacionGeneral);
      },
      [mostrarNotificacion]
   );

   const funObtenerModeloDescripcion = useCallback(async () => {
      const srvModelo = new ModeloService();
      await srvModelo
         .listarModeloDescripcion(modelo_id)
         .then((data: ModeloDescripcionResponse) => {
            setCategoriaNombre(data.cls_marca.cls_categoria.nombre);
            setMarcaNombre(data.cls_marca.nombre);
            setModeloNombre(data.nombre);
            setDescripcion(data.descripcion);
            setFoto(data.foto);
            setPrecio(data.precio);
            setCaracteristicas(data.caracteristicas);
            setColor(data.color);
            setStock(data._count.lst_producto);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgio un error: ${error.message}`,
            });
         });
      setUsuarioId(sesionGamertec.usuario.usuario_id);
   }, [modelo_id, sesionGamertec, mostrarNotificacion]);

   useEffect(() => {
      obtenerSesion();
      funObtenerModeloDescripcion();
      funObtenerComentarios(modelo_id);
   }, [
      modelo_id,
      obtenerSesion,
      funObtenerModeloDescripcion,
      funObtenerComentarios,
   ]);

   const funcionActivarModalLogin = () => {
      setModalLogin(true);
   };

   const funcionActivarModalComentario = () => {
      setModalComentario(true);
   };

   const funcionDesactivarModalComentario = () => {
      setModalComentario(false);
   };

   const [productosCarrito, setProductosCarrito] = useState<number>(1);

   const funcionAmentarProductosCarrito = () => {
      const totalProductosCarrrito = productosCarrito + 1;
      const validar =
         totalProductosCarrrito > stock ? stock : totalProductosCarrrito;

      setProductosCarrito(validar);
   };

   const funcionDisminuirProductosCarrito = () => {
      const totalProductosCarrrito = productosCarrito - 1;
      const validar = totalProductosCarrrito <= 1 ? 1 : totalProductosCarrrito;
      setProductosCarrito(validar);
   };

   const funcionAgregarProductoCarrito = async () => {
      const srvCarrito = new CarritoService();

      const data: CarritoEntity = new CarritoEntity(
         0,
         productosCarrito,
         precio,
         false,
         false,
         fechaActualISO(),
         true,
         usuarioId,
         modelo_id
      );

      await srvCarrito
         .registrar(data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Producto agregado al carrito",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgio un error: ${error.message}`,
            });
         });
      obtenerCantidadCarrito();
   };
   return (
      <>
         <ContainerBodyStyled>
            <RutaProductos>{`${categoriaNombre} / ${marcaNombre} / ${modeloNombre}`}</RutaProductos>

            <ContenidoArriba>
               <ContenidoArribaIzquierda>
                  <ContenidoArribaIzquierdaImagen src={foto} alt="foto" />
               </ContenidoArribaIzquierda>

               <ContenidoArribaDerecha>
                  <Detalles>
                     <DetallesMarca>
                        <h3 onClick={funcionActivarModalLogin}>
                           {" "}
                           {marcaNombre}{" "}
                        </h3>
                     </DetallesMarca>

                     <DetallesPro>
                        <h1>{descripcion}</h1>
                     </DetallesPro>

                     <DetallesPro>
                        <h2>{convertirFormatoMoneda(precio)}</h2>
                     </DetallesPro>

                     <DetallesPro>
                        <div className="detalles-envio">
                           <h4>Envio Gratis</h4>
                           <p>Recíbelo despues de de 7 dias, en tu direccion</p>
                        </div>
                     </DetallesPro>

                     <DetallesPro>
                        <p>
                           Color:{" "}
                           <Avatar
                              size="normal"
                              style={{ backgroundColor: `${color}` }}
                              shape="circle"
                           />
                        </p>
                     </DetallesPro>

                     <DetallesPro>
                        <p>
                           {stock > 0
                              ? `Unidades disponibles: ${stock}`
                              : "producto sin stock"}
                        </p>
                     </DetallesPro>

                     <DetallesPro>
                        <Button
                           icon={
                              <IconShoppingCartPlus
                                 className="mr-2"
                                 size={24}
                              />
                           }
                           onClick={() => setModalLogin(true)}
                           label="Agregar al Carrito"
                           disabled={stock > 0 ? false : true}
                        />
                     </DetallesPro>
                  </Detalles>
               </ContenidoArribaDerecha>
            </ContenidoArriba>

            <ContenidoAbajo>
               <AbajoDetalles>
                  <DetallesTecnicos>
                     <h1>Detalles del producto</h1>
                     <p>{caracteristicas}</p>
                  </DetallesTecnicos>
               </AbajoDetalles>
            </ContenidoAbajo>
         </ContainerBodyStyled>
         <Comentarios
            modeloId={modelo_id}
            calificacionGeneral={calificacionGeneral}
            comentarios={arrayComentarios}
            modalComentario={modalComentario}
            funcionObtenerComentarios={funObtenerComentarios}
            funcionAbrirModal={funcionActivarModalComentario}
            funcionCerrarModal={funcionDesactivarModalComentario}
         />
         <FondoOpaco activo={modalLogin}>
            <ModalInicioSesion activo={modalLogin}>
               {/* <CerrarLogin onClick={funcionDesactivarModalLogin} /> */}

               <h1 className="login__titulo">GamerShop</h1>
               <h2 className="login__subtitulo">Inicio de Sesión</h2>
               <p className="login__saludo">
                  Hola! para poder comprar o comentar debes iniciar sesión
               </p>
               <div className="login__mensaje"></div>
               <div className="login__formulario">
                  <InputText type="text" placeholder="Usuario" />
                  <InputText type="password" placeholder="Contraseña" />
                  <Button type="submit" label="Ingresar" />
               </div>

               <p className="login__irregistro">
                  ¿No tienes cuenta?
                  <a href="http://localhost/proyecto_pagina_web/login/registro/">
                     Regístrate
                  </a>
               </p>
            </ModalInicioSesion>
         </FondoOpaco>
         <Dialog
            header="Agregar productos al carrito"
            visible={modalLogin}
            style={{ width: "550px" }}
            onHide={() => setModalLogin(false)}
         >
            <div
               style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "20px",
               }}
            >
               <div
                  style={{
                     width: "20%",
                     display: "flex",
                     justifyContent: "center",
                  }}
               >
                  <img
                     style={{ width: "100px", objectFit: "scale-down" }}
                     src={foto}
                     alt={descripcion}
                  />
               </div>
               <div
                  style={{
                     width: "40%",
                  }}
               >
                  <p
                     style={{
                        textTransform: "uppercase",
                        fontSize: "0.9em",
                        fontWeight: 700,
                        color: "gray",
                     }}
                  >
                     {marcaNombre}
                  </p>
                  <span>{descripcion}</span>
               </div>
               <div
                  style={{
                     width: "20%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     paddingRight: "20px",
                  }}
               >
                  <h2
                     style={{
                        fontSize: "1em",
                        color: "#ea2840",
                     }}
                  >
                     {convertirFormatoMoneda(precio)}
                  </h2>
               </div>
               <div
                  style={{
                     width: "20%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-around",
                  }}
               >
                  <Button
                     icon={<IconMinus size={16} />}
                     style={{
                        width: "25px",
                        height: "25px",
                        textAlign: "center",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "gray",
                        outline: "none",
                        cursor: "pointer",
                     }}
                     onClick={funcionDisminuirProductosCarrito}
                  />

                  <input style={{ width: "20px" }} value={productosCarrito} />
                  <Button
                     icon={<IconPlus size={16} />}
                     style={{
                        width: "25px",
                        height: "25px",
                        textAlign: "center",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "GrayText",
                        outline: "none",
                        cursor: "pointer",
                     }}
                     onClick={funcionAmentarProductosCarrito}
                  />
               </div>
            </div>
            <div
               style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
               }}
            >
               <Link
                  style={{
                     textDecoration: "none",
                     color: "gray",
                     fontSize: "0.9em",
                     transition: "0.5s all",
                     marginRight: "15px",
                     textDecorationLine: "underline",
                  }}
                  to={"/shoping_cart/"}
               >
                  Ir a carrito
               </Link>
               <Button
                  icon={<IconShoppingCartUp size={24} className="mr-2" />}
                  type="submit"
                  onClick={funcionAgregarProductoCarrito}
                  label="Subir a carrito"
               />
            </div>
         </Dialog>
      </>
   );
};
