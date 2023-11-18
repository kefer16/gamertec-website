import { useEffect, useState, useCallback } from "react";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { Link } from "react-router-dom";
import { AccionStyled } from "./styles/Accion.styled";
import { IconArrowBack } from "@tabler/icons-react";
import { Button } from "primereact/button";

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
   const [titulo, setTitulo] = useState<string>("");
   const [plantilla, setPlantilla] = useState<JSX.Element>(<></>);

   const [arrayAccionNombreElement] = useState<AccionNombreElement[]>([
      {
         nombreAccion: AccionNombreEnum.NOMBRE,
         titulo: "Nombre",
         plantilla: <PlantillaAccion titulo="Nombre" dato="nombre" />,
      },
      {
         nombreAccion: AccionNombreEnum.APELLIDO,
         titulo: "Apellido",
         plantilla: <PlantillaAccion titulo="Apellido" dato="apellido" />,
      },
      {
         nombreAccion: AccionNombreEnum.CORREO,
         titulo: "Correo",
         plantilla: <PlantillaAccion titulo="Correo" dato="correo" />,
      },
      {
         nombreAccion: AccionNombreEnum.CONTRASENIA,
         titulo: "Contraseña",
         plantilla: <PlantillaContrasenia />,
      },
      {
         nombreAccion: AccionNombreEnum.FOTO,
         titulo: "Foto",
         plantilla: <PlantillaFoto dato="foto" />,
      },
      {
         nombreAccion: AccionNombreEnum.DIRECCION,
         titulo: "Dirección",
         plantilla: <PlantillaAccion titulo="Dirección" dato="direccion" />,
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
      filtrarPlantilla();
   }, [filtrarPlantilla]);

   return (
      <ContainerBodyStyled>
         <AccionStyled>
            <div className="titulo-principal">
               <h2>Cambiar {titulo}</h2>
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
