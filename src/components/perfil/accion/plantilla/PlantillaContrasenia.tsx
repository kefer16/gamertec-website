import React, { useContext, useState } from "react";
import { GamertecSesionContext } from "../../../sesion/Sesion.component";
import { UsuarioService } from "../../../../services/usuario.service";
import { ActualizaContraseniaUsuario } from "../../../../interfaces/usuario.interface";
import { Button } from "primereact/button";
import { Password } from "primereact/password";

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
            detalle: "Ingrese todos los datos",
         });
         return;
      }
      if (contraseniaNueva !== contraseniaNuevaRepetida) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "La contraseña nueva y la confirmación debe ser iguales",
         });
         return;
      }

      if (contraseniaActual === contraseniaNueva) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "La contraseña nueva no puede ser igual a la actual",
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
               detalle: "Se actualizó la contraseña correctamente",
            });
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgió un error: ${error.message}`,
            });
         });
   };

   return (
      <form className="form__accion" onSubmit={(e) => cambiarContrasenia(e)}>
         <div className="form__accion__cambio">
            <label className="form__accion__cambio-definicion">
               Contraseña Actual:
            </label>

            <Password
               className="form__accion__cambio-valor"
               inputClassName="form__accion__cambio-input"
               placeholder="Ingrese Contraseña Actual"
               value={contraseniaActual}
               onChange={(e) => {
                  setContraseniaActual(e.target.value);
               }}
               toggleMask
               feedback={false}
            />
         </div>
         <div className="form__accion__cambio">
            <label className="form__accion__cambio-definicion">
               Nueva Contraseña:
            </label>
            <Password
               className="form__accion__cambio-valor"
               inputClassName="form__accion__cambio-input"
               placeholder="Ingrese Nueva Contraseña"
               value={contraseniaNueva}
               onChange={(e) => {
                  setContraseniaNueva(e.target.value);
               }}
               toggleMask
               promptLabel="Ingrese una contraseña"
               weakLabel="Débil"
               mediumLabel="Medio"
               strongLabel="Fuerte"
            />
         </div>
         <div className="form__accion__cambio">
            <label className="form__accion__cambio-definicion">
               Nueva Contraseña:{" "}
            </label>
            <Password
               className="form__accion__cambio-valor"
               inputClassName="form__accion__cambio-input"
               placeholder="Ingrese Nueva Contraseña"
               value={contraseniaNuevaRepetida}
               onChange={(e) => {
                  setContraseniaNuevaRepetida(e.target.value);
               }}
               toggleMask
               promptLabel="Ingrese una contraseña"
               weakLabel="Débil"
               mediumLabel="Medio"
               strongLabel="Fuerte"
            />
         </div>

         <div className="boton">
            <Button type="submit" label="Actualizar" />
         </div>
      </form>
   );
};
