import { Button } from "primereact/button";
import "./styles/contact.scss";
import { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ContactoEntity } from "../../entities/contacto.entity";
import { fechaActualISO } from "../../utils/funciones.utils";
import { ContactoService } from "../../services/contacto.service";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { IconMailForward } from "@tabler/icons-react";

export const Contact = () => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);

   const [nombre, setNombre] = useState<string>("");
   const [correo, setCorreo] = useState<string>("");
   const [mensaje, setMensaje] = useState<string>("");

   const funFormularioContactoEnviar = async (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();

      const data: ContactoEntity = {
         contacto_id: 0,
         fecha_registro: fechaActualISO(),
         nombre: nombre,
         correo: correo,
         mensaje: mensaje,
      };
      const srvContacto = new ContactoService();

      await srvContacto
         .registrar(data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: "El mensaje se envió correctamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   };

   return (
      <>
         <div className="container">
            <div className="container-max">
               <div className="contact">
                  <div className="contact__message">
                     <h2 className="contact__message-title">Contacto</h2>
                     <p className="contact__message-description">
                        Hablemos 👋 No dudes en ponerte en contacto con nosotros
                        mediante la información de contacto a continuación, o
                        envíanos un mensaje mediante el formulario.
                     </p>
                  </div>
                  <div className="contact__group">
                     <div className="contact__group__info">
                        <h3 className="contact__group__info-title">
                           Ponte en contacto
                        </h3>
                        <p className="contact__group__info-parraf">
                           Nueva Florencia Sector III Lote 15
                        </p>
                        <p className="contact__group__info-parraf">
                           Trujillo, La Libertad
                        </p>
                        <p className="contact__group__info-parraf">Perú</p>
                        <p className="contact__group__info-parraf">
                           morafi.1999.19@gmail.com
                        </p>
                        <p className="contact__group__info-parraf">
                           Teléfono (+51) 910 372 728
                        </p>
                     </div>
                     <form
                        className="contact__group__form"
                        onSubmit={funFormularioContactoEnviar}
                     >
                        <h3 className="contact__group__form-title">
                           Envíanos un mensaje
                        </h3>
                        <div style={{ marginBottom: "10px" }}>
                           <label htmlFor="input-nombre">Nombre *</label>
                           <InputText
                              required
                              id="input-nombre"
                              type="text"
                              style={{ width: "100%" }}
                              name="name"
                              value={nombre}
                              onChange={(event) =>
                                 setNombre(event.target.value)
                              }
                           />
                        </div>

                        <div style={{ marginBottom: "10px" }}>
                           <label htmlFor="input-correo">Correo *</label>
                           <InputText
                              required
                              id="input-correo"
                              type="text"
                              style={{ width: "100%" }}
                              name="name"
                              value={correo}
                              onChange={(event) =>
                                 setCorreo(event.target.value)
                              }
                           />
                        </div>
                        <div style={{ marginBottom: "10px" }}>
                           <label htmlFor="input-mensaje">Mensaje *</label>
                           <InputTextarea
                              required
                              id="input-mensaje"
                              style={{ width: "100%" }}
                              name="mensaje"
                              value={mensaje}
                              onChange={(event) =>
                                 setMensaje(event.target.value)
                              }
                              autoResize
                              rows={5}
                              cols={30}
                           />
                        </div>

                        <Button
                           icon={<IconMailForward size={24} />}
                           type="submit"
                           label="Enviar Mensaje"
                        />
                     </form>
                  </div>
                  <div className="contact__maps">
                     <h3 className="contact__maps-title">Ubicación</h3>
                     <iframe
                        title="mapa"
                        className="contact__maps-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63197.59930288774!2d-79.02007239999999!3d-8.116755649999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ad3d7fe3fae92d%3A0xd3bc7d125d4e8508!2sTrujillo!5e0!3m2!1ses-419!2spe!4v1675395176450!5m2!1ses-419!2spe"
                        width="600"
                        height="450"
                        loading="lazy"
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};
