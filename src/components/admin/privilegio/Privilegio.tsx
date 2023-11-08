import { useCallback, useContext, useEffect, useState } from "react";
import { ToolbarControl } from "../../controls/ToobarControl";
import {
   ColumnProps,
   EstadoProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { PrivilegioService } from "../../../entities/privilegio.entities";
import { PrivilegioRegistro } from "./PrivilegioRegistro";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";

const columnsPrivilegio2: ColumnProps[] = [
   {
      type: TypeColumn.TEXT,
      field: "index",
      header: "N°",
      style: { width: "1%" },
   },
   {
      type: TypeColumn.DATE,
      field: "fecha_registro",
      header: "Fecha Registro",
      style: { width: "10%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "tipo",
      header: "Tipo",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "abreviatura",
      header: "Abreviatura",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "10%" },
   },
];

export interface ValuesPrivilegioProps {
   id: number;
   index: number;
   fecha_registro: Date;
   tipo: string;
   abreviatura: string;
   estado: EstadoProps;
}
interface Props {
   nombreFormulario: string;
}

export const funcionObtenerPrivilegios = async (): Promise<ComboboxProps[]> => {
   const array: ComboboxProps[] = [];
   await PrivilegioService.ListarTodos()
      .then((response) => {
         response.data.data.forEach((element: PrivilegioService) => {
            array.push({
               valor: element.privilegio_id,
               descripcion: element.tipo,
            });
         });
      })
      .catch((error: any) => {});
   return array;
};

export const Privilegio = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);

   const [dialogo, setDialogo] = useState(false);
   const [arrayPrivilegio, setArrayPrivilegio] = useState<
      ValuesPrivilegioProps[]
   >([]);
   const [privilegioSeleccionado, setPrivilegioSeleccionado] =
      useState<ValuesPrivilegioProps>({} as ValuesPrivilegioProps);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };
   const [itemSeleccionado, setItemSeleccionado] = useState<PrivilegioService>(
      new PrivilegioService()
   );

   const funcionListar = useCallback(async () => {
      const arrayPrivilegio: ValuesPrivilegioProps[] = [];
      await PrivilegioService.ListarTodos()
         .then((response) => {
            response.data.data.forEach(
               (element: PrivilegioService, index: number) => {
                  const newRow: ValuesPrivilegioProps = {
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
               }
            );
            setArrayPrivilegio(arrayPrivilegio);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: error.message,
               pegado: false,
            });
         });
   }, [mostrarNotificacion]);

   const funcionCrear = () => {
      setItemSeleccionado(new PrivilegioService(0, "", false, "", new Date()));
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
            titulo: "Alerta",
            detalle: "Elija un usuario para poder editar",
            pegado: false,
         });
         return;
      }

      setItemSeleccionado(
         new PrivilegioService(
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
            titulo: "Alerta",
            detalle: `Elija un ${nombreFormulario} para poder eliminar`,
            pegado: false,
         });
         return;
      }
      setDialogo(true);
   };

   const funcionEliminar = async () => {
      await PrivilegioService.EliminarUno(privilegioSeleccionado.id)
         .then((response) => {
            mostrarNotificacion({
               tipo: "success",
               titulo: "Exito",
               detalle: `${nombreFormulario} se eliminó correctamente`,
               pegado: false,
            });

            funcionCerrarDialogo();
            funcionListar();
            return;
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: error.message,
               pegado: false,
            });
            funcionCerrarDialogo();
            return;
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
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />
         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            {nombreFormulario}
         </h2>
         <ToolbarControl
            functionCrear={funcionCrear}
            functionActualizar={funcionEditar}
            functionEliminar={funcionValidarEliminar}
         />
         <TableControl<ValuesPrivilegioProps>
            ancho={{ minWidth: "70rem" }}
            columnas={columnsPrivilegio2}
            filas={arrayPrivilegio}
            filaSeleccionada={privilegioSeleccionado}
            funcionFilaSeleccionada={setPrivilegioSeleccionado}
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
