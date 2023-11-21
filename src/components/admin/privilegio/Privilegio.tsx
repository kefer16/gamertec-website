import { useCallback, useContext, useEffect, useState } from "react";
import { TableControl } from "../../controls/TableControl";
import { PrivilegioRegistro } from "./PrivilegioRegistro";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { PrivilegioService } from "../../../services/privilegio.service";
import { PrivilegioResponse } from "../../../responses/privilegio.response";
import { PrivilegioEntity } from "../../../entities/privilegio.entities";
import {
   ColumnasPrivilegio,
   arrayColumnasFiltroPrivilegio,
   arrayEstruturaColumnasPrivilegio,
} from "../../../tables/privilegio.table";

interface Props {
   nombreFormulario: string;
}

export const Privilegio = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);

   const [dialogo, setDialogo] = useState(false);
   const [arrayPrivilegio, setArrayPrivilegio] = useState<ColumnasPrivilegio[]>(
      []
   );
   const [privilegioSeleccionado, setPrivilegioSeleccionado] =
      useState<ColumnasPrivilegio>({} as ColumnasPrivilegio);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };
   const [itemSeleccionado, setItemSeleccionado] = useState<PrivilegioEntity>(
      new PrivilegioEntity()
   );

   const funcionListar = useCallback(async () => {
      const arrayPrivilegio: ColumnasPrivilegio[] = [];
      const srvPrivilegio = new PrivilegioService();
      await srvPrivilegio
         .listarTodos()
         .then((resp) => {
            resp.forEach((element: PrivilegioResponse, index: number) => {
               const newRow: ColumnasPrivilegio = {
                  id: element.privilegio_id,
                  index: index + 1,
                  fecha_registro: element.fecha_registro,
                  tipo: element.tipo,
                  abreviatura: element.abreviatura,
                  estado: {
                     valor: element.activo,
                     estado: element.activo ? "Activo" : "Inactivo",
                  },
               };
               arrayPrivilegio.push(newRow);
            });
            setArrayPrivilegio(arrayPrivilegio);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funcionCrear = () => {
      setItemSeleccionado(
         new PrivilegioEntity(0, "", false, "", fechaActualISO())
      );
      setEsEdicion(false);
      setAbrirModal(true);
   };

   const funcionEditar = () => {
      const itemEdicion = arrayPrivilegio.find((categoria) =>
         categoria.id === privilegioSeleccionado?.id ? categoria : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Elija un usuario para poder editar",
         });
         return;
      }

      setItemSeleccionado(
         new PrivilegioEntity(
            itemEdicion.id,
            itemEdicion.tipo,
            itemEdicion.estado.valor,
            itemEdicion.abreviatura,
            itemEdicion.fecha_registro
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };

   const funcionValidarEliminar = () => {
      const itemEdicion = arrayPrivilegio.find((item) =>
         item.id === privilegioSeleccionado?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: `Elija un ${nombreFormulario} para poder eliminar`,
         });
         return;
      }
      setDialogo(true);
   };

   const funcionEliminar = async () => {
      const srvPrivilegio = new PrivilegioService();
      await srvPrivilegio
         .eliminarUno(privilegioSeleccionado.id)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: `${nombreFormulario} se eliminó correctamente`,
            });

            funcionCerrarDialogo();
            funcionListar();
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
            funcionCerrarDialogo();
         });
   };

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

   useEffect(() => {
      funcionListar();
   }, [funcionListar]);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${privilegioSeleccionado.tipo}?`}
            header="Confirmación"
            acceptClassName="p-button-danger"
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />
         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            {nombreFormulario}
         </h2>
         <TableControl<ColumnasPrivilegio>
            ancho={{ minWidth: "70rem" }}
            columnas={arrayEstruturaColumnasPrivilegio}
            filas={arrayPrivilegio}
            filaSeleccionada={privilegioSeleccionado}
            arrayFiltroGlobal={arrayColumnasFiltroPrivilegio}
            funcionFilaSeleccionada={setPrivilegioSeleccionado}
            funcionCrear={funcionCrear}
            funcionActualizar={funcionEditar}
            funcionEliminar={funcionValidarEliminar}
         />

         <PrivilegioRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funcionListar}
         />
      </ContainerBodyStyled>
   );
};
