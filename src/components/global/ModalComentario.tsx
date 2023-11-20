import { useState, useContext } from "react";
import { fechaActualISO } from "../../utils/funciones.utils";
import { Nullable } from "primereact/ts-helpers";
import { RatingPrimeUI } from "../controls/primeUI/RatingPrimeUI";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { IconMessage2Up } from "@tabler/icons-react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { ComentarioEntity } from "../../entities/comentario.entity";
import { ComentarioService } from "../../services/comentario.service";
interface Props {
   modeloId: number;
   modalComentario: boolean;
   funcionObtenerComentarios: (modelo_id: number) => void;
   funcionCerrarModal: () => void;
}

export const ModalComentario = ({
   modeloId,
   modalComentario,
   funcionObtenerComentarios,
   funcionCerrarModal,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [titulo, setTitulo] = useState<string>("");
   const [mensaje, setMensaje] = useState<string>("");
   const [valoracion, setValoracion] = useState<Nullable<number>>(0);

   const funcionLimpiarControles = () => {
      setValoracion(0);
      setTitulo("");
      setMensaje("");
   };
   const funcionRegistarComentario = async () => {
      const srvComentario = new ComentarioService();

      const data: ComentarioEntity = {
         comentario_id: 0,
         valoracion: valoracion ?? 0,
         usuario: "usuario",
         titulo: titulo,
         mensaje: mensaje,
         fecha_registro: fechaActualISO(),
         activo: true,
         fk_usuario: 1,
         fk_modelo: modeloId,
      };

      await srvComentario
         .registrar(data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "Se publicó el comentario",
            });

            funcionLimpiarControles();
            funcionObtenerComentarios(modeloId);
            funcionCerrarModal();
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgió un error: ${error.message}`,
            });
         });
   };

   return (
      <Dialog
         header="Tu opinión nos importa ¡Evalúa tu producto!"
         visible={modalComentario}
         style={{ width: "50vw" }}
         onHide={funcionCerrarModal}
      >
         <div className="flex flex-column">
            <p className="mb-1">Calificacion General:</p>
            <RatingPrimeUI
               style={{ marginBottom: "20px" }}
               valoracion={valoracion}
               funcionValoracion={setValoracion}
               readonly={false}
            />

            <InputText
               className="w-full mb-2"
               type="text"
               name="titulo"
               value={titulo}
               onChange={(event) => {
                  setTitulo(event.target.value);
               }}
               placeholder="Título"
            />

            <InputTextarea
               className="w-full mb-2"
               name="comentario"
               value={mensaje}
               onChange={(event) => {
                  setMensaje(event.target.value);
               }}
               placeholder="Comentario"
            />
            <Button
               className="w-full"
               type="submit"
               onClick={funcionRegistarComentario}
               icon={<IconMessage2Up size={24} className="mr-2" />}
               label="Publicar comentario"
            />
         </div>
      </Dialog>
   );
};
