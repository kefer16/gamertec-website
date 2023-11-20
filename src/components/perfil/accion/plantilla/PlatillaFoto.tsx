import Compressor from "compressorjs";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import { Image } from "primereact/image";

import { UsuarioService } from "../../../../services/usuario.service";
import { ActualizaFotoUsuario } from "../../../../interfaces/usuario.interface";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";
import { RespuestaEntity } from "../../../../entities/respuesta.entity";
import { Button } from "primereact/button";
import { SesionGamertec } from "../../../../interfaces/sesion.interface";
import { Panel } from "primereact/panel";

interface Props {
   dato: "foto";
}
export const PlantillaFoto = ({ dato }: Props) => {
   const { obtenerSesion, sesionGamertec, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );
   const [foto, setFoto] = useState<string>("");
   const [fotoSeleccionada, setFotoSeleccionada] = useState<string>("");

   useEffect(() => {
      obtenerSesion();
      setFoto(sesionGamertec.usuario[dato]);
   }, [obtenerSesion, sesionGamertec, dato]);

   const actualizarFoto = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const servUsuario = new UsuarioService();
      const data: ActualizaFotoUsuario = {
         foto: fotoSeleccionada,
      };
      servUsuario
         .actualizarFoto(sesionGamertec.usuario.usuario_id, data)
         .then((resp: ActualizaFotoUsuario) => {
            guardarFotoLocalStorage(resp.foto);
            setFoto(resp.foto);
            obtenerSesion();

            mostrarNotificacion({
               tipo: "success",
               detalle: "Se actualizó la foto correctamente ",
            });
         })
         .catch((error: RespuestaEntity<null>) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgió un error: ${error.error.message}`,
            });
         });
   };

   const guardarFotoLocalStorage = (foto: string) => {
      const jsonData = sessionStorage.getItem("sesion_gamertec");
      const objeto: SesionGamertec = JSON.parse(jsonData ?? "");
      objeto.usuario.foto = foto;
      const nuevoJsonData = JSON.stringify(objeto);
      sessionStorage.setItem("sesion_gamertec", nuevoJsonData);
   };

   const seleccionarFoto = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
         if (file.size > 2000000) {
            return;
         }
         new Compressor(file, {
            quality: 0.6, // Ajustar la calidad de compresión (0.1 - 1)
            maxWidth: 300, // Ajustar el ancho máximo de la imagen
            maxHeight: 300, // Ajustar la altura máxima de la imagen
            success(result) {
               // `result` es el archivo comprimido
               const reader = new FileReader();
               reader.readAsDataURL(result);

               reader.onload = () => {
                  const compressedImage = reader.result as string;
                  setFotoSeleccionada(compressedImage);
               };
            },
            error(error: Error) {
               return;
            },
         });
      }
   };

   return (
      <form className="form__accion" onSubmit={actualizarFoto}>
         <div className="form__accion__cambio">
            <label className="form__accion__cambio-definicion">
               Foto Actual:
            </label>
            <div className="form__accion__cambio-valor">
               <Image src={foto} alt="Image" width="100" />
            </div>
         </div>
         <div className="form__accion__cambio">
            <label className="form__accion__cambio-definicion">
               Escoje una Foto:
            </label>

            <div className="form__accion__cambio-valor">
               <Panel
                  header="Previsualización"
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     fontSize: "1rem",
                  }}
               >
                  <div>
                     {fotoSeleccionada ? (
                        <img
                           src={fotoSeleccionada}
                           style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "scale-down",
                              borderRadius: "7px",
                           }}
                           alt="Escoger imagen Usuario"
                        />
                     ) : (
                        <img
                           src="https://placehold.co/100"
                           style={{
                              width: "100px",
                              height: "100px",
                              objectFit: "scale-down",
                              borderRadius: "7px",
                           }}
                           alt="Escoger imagen Usuario"
                        />
                     )}
                  </div>
                  <input
                     id="selecciona-arhivo"
                     style={{ marginTop: "5px", display: "none" }}
                     type="file"
                     accept="image/*"
                     onChange={seleccionarFoto}
                  />
                  <label
                     htmlFor="selecciona-arhivo"
                     className="boton__seleccionar__imagen"
                  >
                     Selecciona Un archivo
                  </label>
               </Panel>
            </div>
         </div>
         <Button label="Actualizar" type="submit" />
      </form>
   );
};
