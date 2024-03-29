import { Link, useNavigate } from "react-router-dom";

import "./styles/Login.scss";

import { useContext, useState } from "react";
import { GuadarSession } from "../../utils/sesion.utils";
import { SesionGamertec } from "../../interfaces/sesion.interface";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { InputText } from "primereact/inputtext";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import NombreGamertec from "../../images/svg/name-gamertec.svg";
import { IconLogout } from "@tabler/icons-react";
import { UsuarioService } from "../../services/usuario.service";
import { LogeoUsuario } from "../../interfaces/usuario.interface";
import { Password } from "primereact/password";

export const Login = () => {
   const { obtenerSesion, obtenerCantidadCarrito, mostrarNotificacion } =
      useContext(GamertecSesionContext);
   const navigate = useNavigate();

   const [checked, setChecked] = useState<boolean>(false);

   const [formData, setFormData] = useState({
      user: "",
      password: "",
   });

   const { user, password } = formData;

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
   };

   const handleReset = () => {
      setFormData({
         user: "",
         password: "",
      });
   };

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!user) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese un usuario",
         });
         return;
      }

      if (!password) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Ingrese una contraseña",
         });
         return;
      }

      let data_sesion: SesionGamertec = {} as SesionGamertec;

      const srvUsuario = new UsuarioService();
      await srvUsuario
         .logearse(user, password)
         .then((resp: LogeoUsuario) => {
            data_sesion = {
               usuario: {
                  usuario_id: resp.usuario_id,
                  usuario: resp.usuario,
                  correo: resp.correo,
                  nombre: resp.nombre,
                  apellido: resp.apellido,
                  foto: resp.foto,
                  direccion: resp.direccion,
                  telefono: resp.telefono,
               },
               privilegio: {
                  privilegio_id: resp.cls_privilegio.privilegio_id,
                  abreviatura: resp.cls_privilegio.abreviatura,
                  nombre: resp.cls_privilegio.tipo,
               },
            };
            handleReset();
            GuadarSession(data_sesion);
            obtenerSesion();
            obtenerCantidadCarrito();
            mostrarNotificacion({
               tipo: "success",
               detalle: `Hola ${data_sesion.usuario.usuario}, Bienvenido...`,
            });
            navigate("/products/");
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   };

   return (
      <div className="flex align-items-center justify-content-center py-5">
         <form
            className="surface-card p-4 shadow-2 border-round w-full lg:w-6"
            onSubmit={(e) => onSubmit(e)}
         >
            <div className="text-center mb-5">
               <img
                  src={NombreGamertec}
                  alt="hyper"
                  height={50}
                  className="mb-3"
               />
               <div className="text-900 text-3xl font-medium mb-3">
                  Hola Bienvenido!
               </div>
               <span className="text-600 font-medium line-height-3">
                  ¿No tienes una cuenta?
               </span>
               <Link
                  to="/register/"
                  className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
               >
                  Créala hoy!
               </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
               <label
                  htmlFor="user"
                  className="block text-900 font-medium mb-2"
               >
                  Usuario
               </label>

               <InputText
                  id="user"
                  className="w-full mb-3"
                  value={user}
                  type="text"
                  placeholder="Ingrese usuario"
                  name="user"
                  onChange={(e) => onChange(e)}
                  autoComplete="none"
               />

               <label
                  htmlFor="password"
                  className="block text-900 font-medium mb-2"
               >
                  Contraseña
               </label>

               <Password
                  id="password"
                  className="w-full mb-3"
                  inputClassName="w-full"
                  type="password"
                  placeholder="Ingrese contraseña"
                  name="password"
                  value={password}
                  onChange={(e) => onChange(e)}
                  toggleMask
                  feedback={false}
               />

               <div className="flex align-items-center justify-content-between mb-6">
                  <div className="flex align-items-center">
                     <Checkbox
                        id="rememberme"
                        onChange={(e: CheckboxChangeEvent) =>
                           setChecked(
                              e.checked === undefined ? false : e.checked
                           )
                        }
                        checked={checked}
                        className="mr-2"
                     />
                     <label htmlFor="rememberme">Recuérdame</label>
                  </div>
                  <a
                     href="##"
                     className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
                  >
                     ¿Olvidó su contraseña?
                  </a>
               </div>

               <Button
                  type="submit"
                  label="Iniciar Sesión"
                  icon={<IconLogout size={24} />}
                  className="w-full"
               />
            </div>
         </form>
      </div>
   );
};
