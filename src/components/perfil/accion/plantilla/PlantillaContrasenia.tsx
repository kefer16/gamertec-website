import { InputText } from "primereact/inputtext";
import React, { useContext, useState } from "react";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";
import { UsuarioService } from "../../../../services/usuario.service";
import { ActualizaContraseniaUsuario } from "../../../../interfaces/usuario.interface";
import { Button } from "primereact/button";

export const PlantillaContrasenia = () => {
   const { sesionGamertec, mostrarNotificacion } = useContext(
      GamertecSesionContext
   );

   const [contraseniaActual, setContraseniaActual] = useState<string>("");
   const [contraseniaNueva, setContraseniaNueva] = useState<string>("");
   const [contraseniaNuevaRepetida, setContraseniaNuevaRepetida] =
      useState<string>("");

   const cambiarContrasenia = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (
         !contraseniaActual ||
         !contraseniaNueva ||
         !contraseniaNuevaRepetida
      ) {
         mostrarNotificacion({
            tipo: "warn",
            titulo: "Advertencia",
            detalle: "Ingrese todos los datos",
            pegado: false,
         });
         return;
      }
      if (contraseniaNueva !== contraseniaNuevaRepetida) {
         mostrarNotificacion({
            tipo: "warn",
            titulo: "Advertencia",
            detalle: "La contraseña nueva y la confirmación debe ser iguales",
            pegado: false,
         });
         return;
      }

      if (contraseniaActual === contraseniaNueva) {
         mostrarNotificacion({
            tipo: "warn",
            titulo: "Advertencia",
            detalle: "La contraseña nueva no puede ser igual a la actual",
            pegado: false,
         });
         return;
      }

      const servUsuario = new UsuarioService();
      const data: ActualizaContraseniaUsuario = {
         contrasenia_actual: contraseniaActual,
         contrasenia_nueva: contraseniaNueva,
      };
      servUsuario
         .actualizarContrasenia(sesionGamertec.usuario.usuario_id, data)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               titulo: "Éxito",
               detalle: "Se actualizó la contraseña correctamente",
               pegado: false,
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: `surgió un error: ${error.message}`,
               pegado: true,
            });
         });
   };

   return (
      <div className="cajas-form">
         <form onSubmit={(e) => cambiarContrasenia(e)}>
            <div className="titulo">
               <label>¿Cambiaras tu contraseña? </label>
               <p>Primero deberás colocar tu contraseña actual</p>
            </div>
            <div className="inputs">
               <label>Ingrese la contraseña Actual:</label>

               <InputText
                  value={contraseniaActual}
                  onChange={(e) => {
                     setContraseniaActual(e.target.value);
                  }}
               />
            </div>
            <div className="inputs">
               <label>Ingrese la Nueva Contraseña:</label>
               <InputText
                  value={contraseniaNueva}
                  onChange={(e) => {
                     setContraseniaNueva(e.target.value);
                  }}
               />
            </div>
            <div className="inputs">
               <label>Repita la Nueva Contraseña: </label>
               <InputText
                  value={contraseniaNuevaRepetida}
                  onChange={(e) => {
                     setContraseniaNuevaRepetida(e.target.value);
                  }}
               />
            </div>

            <div className="boton">
               <Button type="submit" label="Actualizar" />
            </div>
         </form>
      </div>
   );
};
