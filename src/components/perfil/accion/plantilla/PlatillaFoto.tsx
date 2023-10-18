import Compressor from "compressorjs";
import { useState, useEffect, useContext, ChangeEvent } from "react";
import { Image } from "primereact/image";

import { UsuarioService } from "../../../../services/usuario.service";
import { ActualizaFotoUsuario } from "../../../../interfaces/usuario.interface";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";
import { RespuestaEntity } from "../../../../entities/respuesta.entity";
import { Button } from "primereact/button";
import { SesionGamertec } from "../../../../interfaces/sesion.interface";

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
         .then((resp: RespuestaEntity<ActualizaFotoUsuario>) => {
            if (resp.data) {
               guardarFotoLocalStorage(resp.data.foto);
               setFoto(resp.data.foto);
               obtenerSesion();
            }
            mostrarNotificacion({
               tipo: "success",
               titulo: "Éxito",
               detalle: "Se actualizó la foto correctamente ",
               pegado: false,
            });
         })
         .catch((error: RespuestaEntity<null>) => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: `surgió un error: ${error.error.message}`,
               pegado: true,
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
      <div className="cajas-form">
         <form onSubmit={actualizarFoto}>
            <div className="texto">
               <p>Hola ¿Cambiarás tu foto de perfil?</p>

               <Image src={foto} alt="Image" width="250" />
            </div>
            <div className="inputs">
               <label>Escoje una foto:</label>

               <div
                  style={{
                     display: "flex",
                     padding: "10px",
                     flexDirection: "column",
                     border: "1px solid #ccc",
                     borderRadius: "7px",
                  }}
               >
                  <p style={{ color: "#666", fontSize: "0.8em" }}>
                     Previsualización
                  </p>
                  {fotoSeleccionada ? (
                     <img
                        src={fotoSeleccionada}
                        style={{
                           width: "100px",
                           height: "100px",
                           objectFit: "scale-down",
                           border: "1px solid #ccc",
                           borderRadius: "7px",
                        }}
                        alt="Selected"
                     />
                  ) : (
                     <img
                        src="https://placehold.co/300"
                        style={{
                           width: "100%",
                           height: "200px",
                           objectFit: "scale-down",
                           border: "1px solid #ccc",
                           borderRadius: "7px",
                        }}
                        alt="Selected"
                     />
                  )}
                  <input
                     style={{ marginTop: "10px" }}
                     type="file"
                     accept="image/*"
                     // value={foto ? foto : ""}
                     onChange={seleccionarFoto}
                  />
               </div>
            </div>
            <Button label="Actualizar" type="submit" />
         </form>
      </div>
   );
};
