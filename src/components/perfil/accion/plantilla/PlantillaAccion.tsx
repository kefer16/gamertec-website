import { useEffect, useContext, useState } from "react";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";

interface Props {
   titulo: string;
   dato: string;
}
export const PlantillaAccion = ({ titulo, dato }: Props) => {
   const { obtenerSesion, sesionGamertec } = useContext(GamertecSesionContext);
   const [datoCambio, setDatoCambio] = useState<string>("");

   // const actualizarNombre = async (
   //    usuario_id: number,
   //    data: ActualizaNombreUsuario
   // ) => {
   //    const usuServ = new UsuarioService();
   //    await usuServ
   //       .actualizarNombre(usuario_id, data)
   //       .then((resp: RespuestaEntity<ActualizaNombreUsuario>) => {
   //          if (resp.data) {
   //             setNombre(resp.data.nombre);
   //          }
   //       })
   //       .catch((error: Error) => {
   //          mostrarNotificacion({
   //             tipo: "error",
   //             titulo: "Error",
   //             detalle: `surgio un error: ${error.message}`,
   //             pegado: true,
   //          });
   //       });
   // };

   useEffect(() => {
      obtenerSesion();
      console.log("titulo", titulo);

      setDatoCambio(dato);
   }, [dato, obtenerSesion, titulo, sesionGamertec]);

   return (
      <div className="cajas-form">
         <form action="" method="POST">
            <div className="texto">
               <p>{`${titulo} actual: ${datoCambio}`}</p>
            </div>
            <div className="inputs">
               <label> {`Ingrese el nuevo ${titulo}:`}</label>
               <input type="email" placeholder="Nombre" />
            </div>

            <div className="boton">
               <input type="submit" value="Actualizar" />
            </div>
         </form>
      </div>
   );
};
