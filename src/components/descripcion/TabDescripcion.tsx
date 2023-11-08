import { Params, useParams } from "react-router-dom";
import { Descripcion } from "./Descripcion";

export const TabDescripcion = () => {
   const { modelo_id }: Readonly<Params<string>> = useParams();

   return (
      <>
         <Descripcion
            modelo_id={modelo_id === undefined ? 0 : parseInt(modelo_id)}
         />
      </>
   );
};
