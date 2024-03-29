import { createContext, useRef, useState } from "react";
import { SesionGamertec } from "../../interfaces/sesion.interface";
import { CarritoService } from "../../services/carrito.service";
import { Toast } from "primereact/toast";

export interface NotificacionProps {
   tipo: "success" | "info" | "warn" | "error" | undefined;
   detalle: string;
}
export interface SesionGamertecContextProps {
   sesionGamertec: SesionGamertec;
   cantidadCarrito: number;
   privilegio: privilegio;
   obtenerSesion: () => void;
   cerrarSesion: () => void;
   obtenerCantidadCarrito: () => void;
   mostrarNotificacion: (prosp: NotificacionProps) => void;
}

export const GamertecSesionContext = createContext<SesionGamertecContextProps>(
   {} as SesionGamertecContextProps
);
export type privilegio = "ADM" | "USU" | "INV";

export const SesionProvider = ({ children }: any) => {
   const [privilegio, setPrivilegio] = useState<privilegio>("INV");
   const [sesionGamertec, setSesionGamertec] = useState<SesionGamertec>({
      usuario: {
         usuario_id: 0,
         usuario: "",
         correo: "",
         nombre: "",
         apellido: "",
         foto: "",
         direccion: "",
         telefono: "",
      },
      privilegio: {
         privilegio_id: 0,
         nombre: "",
         abreviatura: "INV",
      },
   });
   const [cantidadCarrito, setCantidadCarrito] = useState<number>(0);
   const notificacion = useRef<Toast>(null);

   const obtenerSesion = () => {
      if (
         !Object.prototype.hasOwnProperty.call(
            sessionStorage,
            "sesion_gamertec"
         )
      ) {
         return {
            usuario: {
               usuario_id: 0,
               usuario: "",
               correo: "",
               nombre: "",
               apellido: "",
               foto: "",
               direccion: "",
               telefono: "",
            },
            privilegio: {
               privilegio_id: 0,
               nombre: "",
               abreviatura: "",
            },
         };
      }

      const sesion = sessionStorage.getItem("sesion_gamertec");

      sesionGamertec.usuario = sesion
         ? JSON.parse(sesion).usuario
         : sesionGamertec;

      sesionGamertec.privilegio = sesion
         ? JSON.parse(sesion).privilegio
         : sesionGamertec;

      setSesionGamertec(sesionGamertec);
      setPrivilegio(sesionGamertec.privilegio.abreviatura);
   };
   const cerrarSesion = () => {
      sessionStorage.removeItem("sesion_gamertec");
      setSesionGamertec({
         usuario: {
            usuario_id: 0,
            usuario: "",
            correo: "",
            nombre: "",
            apellido: "",
            foto: "",
            direccion: "",
            telefono: "",
         },
         privilegio: {
            privilegio_id: 0,
            nombre: "",
            abreviatura: "INV",
         },
      });
      setPrivilegio("INV");
   };
   const obtenerCantidadCarrito = async () => {
      const srvCarrito = new CarritoService();

      await srvCarrito
         .listarCantidadCarrito(sesionGamertec.usuario.usuario_id)
         .then((resp) => {
            setCantidadCarrito(resp[0].cantidad);
         });
   };

   const mostrarNotificacion = ({ tipo, detalle }: NotificacionProps) => {
      let titulo = "";
      let pegado = false;

      if (detalle.substring(0, 6) === "[warn]") {
         tipo = "warn";
         detalle = detalle.substring(6);
      }

      if (tipo === "error") {
         titulo = "Error";
         pegado = true;
      }
      if (tipo === "warn") {
         titulo = "Alerta";
         pegado = false;
      }
      if (tipo === "success") {
         titulo = "Éxito";
         pegado = false;
      }
      notificacion.current?.show({
         severity: tipo,
         summary: titulo,
         detail: detalle,
         sticky: pegado,
      });
   };

   return (
      <GamertecSesionContext.Provider
         value={{
            sesionGamertec,
            cantidadCarrito,
            privilegio,
            obtenerSesion,
            cerrarSesion,
            obtenerCantidadCarrito,
            mostrarNotificacion,
         }}
      >
         {children}
         <Toast ref={notificacion} />
      </GamertecSesionContext.Provider>
   );
};
