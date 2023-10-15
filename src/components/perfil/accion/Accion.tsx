import { useEffect, useState, useContext, useCallback } from "react";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { Link } from "react-router-dom";
import { AccionStyled } from "./styles/Accion.styled";
import { IconArrowBack } from "@tabler/icons-react";
import { Button } from "primereact/button";

import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { PlantillaAccion } from "./plantilla/PlantillaAccion";
import { PlantillaContrasenia } from "./plantilla/PlantillaContrasenia";
import { PlantillaFoto } from "./plantilla/PlatillaFoto";

interface AccionPerfilProps {
   nombreAccion: AccionNombreEnum | string;
}

export enum AccionNombreEnum {
   INDEFINIDO = "",
   NOMBRE = "name",
   APELLIDO = "lastname",
   CONTRASENIA = "password",
   FOTO = "photo",
   CORREO = "email",
   DIRECCION = "address",
}

export interface AccionNombreElement {
   nombreAccion: AccionNombreEnum | string;
   titulo: string;
   plantilla: JSX.Element;
}
export const Accion = ({ nombreAccion }: AccionPerfilProps) => {
   const { obtenerSesion, sesionGamertec } = useContext(GamertecSesionContext);
   const [titulo, setTitulo] = useState<string>("");
   const [plantilla, setPlantilla] = useState<JSX.Element>(<></>);

   const [arrayAccionNombreElement] = useState<AccionNombreElement[]>([
      {
         nombreAccion: AccionNombreEnum.NOMBRE,
         titulo: "Nombre",
         plantilla: (
            <PlantillaAccion
               titulo="Nombre"
               dato={sesionGamertec.usuario["nombre"]}
            />
         ),
      },
      {
         nombreAccion: AccionNombreEnum.APELLIDO,
         titulo: "Apellido",
         plantilla: (
            <PlantillaAccion
               titulo="Apellido"
               dato={sesionGamertec.usuario["apellido"]}
            />
         ),
      },
      {
         nombreAccion: AccionNombreEnum.CORREO,
         titulo: "Correo",
         plantilla: (
            <PlantillaAccion
               titulo="Correo"
               dato={sesionGamertec.usuario["correo"]}
            />
         ),
      },
      {
         nombreAccion: AccionNombreEnum.CONTRASENIA,
         titulo: "Contraseña",
         plantilla: <PlantillaContrasenia />,
      },
      {
         nombreAccion: AccionNombreEnum.FOTO,
         titulo: "Foto",
         plantilla: <PlantillaFoto dato={sesionGamertec.usuario["foto"]} />,
      },
      {
         nombreAccion: AccionNombreEnum.DIRECCION,
         titulo: "Dirección",
         plantilla: (
            <PlantillaAccion
               titulo="Dirección"
               dato={sesionGamertec.usuario["direccion"]}
            />
         ),
      },
   ]);

   const filtrarPlantilla = useCallback(() => {
      const item = arrayAccionNombreElement.find(
         (item) => item.nombreAccion === nombreAccion
      );
      setPlantilla(item ? item.plantilla : <></>);
      setTitulo(item ? item.titulo : "");
   }, [arrayAccionNombreElement, nombreAccion]);

   useEffect(() => {
      obtenerSesion();
      filtrarPlantilla();
   }, [obtenerSesion, filtrarPlantilla]);

   return (
      <ContainerBodyStyled>
         <AccionStyled>
            <div className="titulo-principal">
               <h1>Cambiar {titulo}</h1>
               <Link className="regresar" to="/profile/">
                  <Button
                     icon={<IconArrowBack size={24} />}
                     label="Regresar"
                     text
                  />
               </Link>
            </div>
            <div className="cajas">{plantilla}</div>
         </AccionStyled>
      </ContainerBodyStyled>
   );
};
