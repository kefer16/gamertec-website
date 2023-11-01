import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
   IconTrash,
   IconPlus,
   IconEdit,
   IconHistory,
   IconSearch,
} from "@tabler/icons-react";

interface Props {
   functionCrear?: () => void;
   functionActualizar?: () => void;
   functionEliminar?: () => void;
   functionHistoria?: () => void;
}

export const ToolbarControl = ({
   functionCrear,
   functionActualizar,
   functionEliminar,
   functionHistoria,
}: Props) => {
   const startContent = (
      <>
         <Button
            tooltip="Nuevo"
            icon={<IconPlus size={24} />}
            className="mr-2 p-button-success"
            onClick={functionCrear}
            rounded
         />
         <Button
            tooltip="Modificar"
            icon={<IconEdit size={24} />}
            className="mr-2 p-button-warning"
            onClick={functionActualizar}
            rounded
         />

         <Button
            tooltip="Eliminar"
            icon={<IconTrash size={24} />}
            className="mr-2 p-button-danger"
            onClick={functionEliminar}
            rounded
         />
         <Button
            tooltip="Historial"
            icon={<IconHistory size={24} />}
            className="mr-2"
            onClick={functionHistoria}
            rounded
         />
      </>
   );

   const endContent = (
      <>
         <div className="p-inputgroup">
            <InputText placeholder="Buscar..." />
            <Button icon={<IconSearch size={24} />} />
         </div>
      </>
   );
   return (
      <>
         <div className="card">
            <Toolbar start={startContent} end={endContent} />
         </div>
      </>
   );
};
