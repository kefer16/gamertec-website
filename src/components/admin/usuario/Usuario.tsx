import { useCallback, useContext, useEffect, useState } from "react";
import {
   ColumnProps,
   EstadoProps,
   ImagenProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";

import { UsuarioRegistro } from "./UsuarioRegistro";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { UsuarioEntity } from "../../../entities/usuario.entities";
import { UsuarioService } from "../../../services/usuario.service";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { DropdownProps } from "../categoria/CategoriaRegistro";
import { PrivilegioService } from "../../../services/privilegio.service";

const columnsUsuario2: ColumnProps[] = [
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
      field: "privilegio_nombre",
      header: "Privilegio",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "usuario_nombre",
      header: "Nombre",
      style: { width: "10%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "usuario_apellido",
      header: "Apellido",
      style: { width: "10%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "correo",
      header: "Correo",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.IMAGE,
      field: "foto",
      header: "Foto",
      style: { width: "4%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "usuario",
      header: "Usuario",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "4%" },
   },
];
export interface ValuesUsuarioProps {
   id: number;
   index: number;
   fecha_registro: string;
   privilegio_id: number;
   privilegio_nombre?: string;
   usuario_nombre: string;
   usuario_apellido: string;
   correo: string;
   foto: ImagenProps;
   usuario: string;
   estado: EstadoProps;
}
const arrayFiltroGlobal: string[] = [
   "fecha_registro",
   "privilegio_nombre",
   "usuario_nombre",
   "usuario_apellido",
   "correo",
   "usuario",
   "estado.estado",
];
interface Props {
   nombreFormulario: string;
}

let arrayPrivilegio: DropdownProps[] = [];

export const Usuario = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);

   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);

   const [dialogo, setDialogo] = useState(false);
   const [arrayUsuario, setArrayUsuario] = useState<ValuesUsuarioProps[]>([]);
   const [usuarioSeleccionado, setUsuarioSeleccioando] =
      useState<ValuesUsuarioProps>({} as ValuesUsuarioProps);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<UsuarioEntity>(
      new UsuarioEntity()
   );

   const funcionListar = useCallback(async () => {
      const arrayUsuario: ValuesUsuarioProps[] = [];
      const srvUsuario = new UsuarioService();
      await srvUsuario
         .listarTodos()
         .then((resp: UsuarioEntity[]) => {
            resp.forEach((element: UsuarioEntity, index: number) => {
               const newRow: ValuesUsuarioProps = {
                  id: element.usuario_id,
                  index: index + 1,
                  fecha_registro: element.fecha_registro,
                  privilegio_id: element.fk_privilegio,
                  privilegio_nombre: arrayPrivilegio.find(
                     (privilegio: DropdownProps) =>
                        privilegio.code === String(element.fk_privilegio)
                  )?.name,
                  usuario_nombre: element.nombre,
                  usuario_apellido: element.apellido,
                  correo: element.correo,
                  usuario: element.usuario,
                  foto: {
                     img: element.foto,
                     alt: element.usuario,
                  },
                  estado: {
                     valor: element.activo,
                     estado: element.activo ? "Activo" : "Inactivo",
                  },
               };
               arrayUsuario.push(newRow);
            });
            setArrayUsuario(arrayUsuario);
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
         new UsuarioEntity(
            0,
            "",
            "",
            "",
            "",
            "",
            "",
            fechaActualISO(),
            "",
            "",
            false,
            0
         )
      );
      setEsEdicion(false);
      setAbrirModal(true);
   };

   const funcionEditar = () => {
      const itemEdicion = arrayUsuario.find((item) =>
         item.id === usuarioSeleccionado?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Elija un usuario para poder editar",
         });
         return;
      }

      setItemSeleccionado(
         new UsuarioEntity(
            itemEdicion.id,
            itemEdicion.usuario_nombre,
            itemEdicion.usuario_apellido,
            itemEdicion.correo,
            itemEdicion.usuario,
            "",
            itemEdicion.foto.img,
            itemEdicion.fecha_registro,
            "",
            "",
            itemEdicion.estado.valor,
            itemEdicion.privilegio_id
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };
   const funcionValidarEliminar = () => {
      const itemEdicion = arrayUsuario.find((item) =>
         item.id === usuarioSeleccionado?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: `Elija un ${nombreFormulario} para poder eliminar`,
         });
         funcionCerrarDialogo();
         return;
      }
      setDialogo(true);
   };
   const funcionEliminar = async () => {
      const usuServ = new UsuarioService();
      await usuServ
         .eliminarUno(usuarioSeleccionado.id)
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
               detalle: `surgio un error: ${error.message}`,
            });
            funcionCerrarDialogo();
         });
   };

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

   const funcionObtenerPrivilegios = useCallback(async () => {
      const srvPrivilegio = new PrivilegioService();
      await srvPrivilegio
         .obtenerPrivilegiosCombobox()
         .then((resp) => {
            arrayPrivilegio = [...resp];
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: `surgio un error: ${error.message}`,
            });
         });
   }, [mostrarNotificacion]);

   useEffect(() => {
      funcionObtenerPrivilegios();
      funcionListar();
   }, [funcionObtenerPrivilegios, funcionListar]);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${usuarioSeleccionado.usuario}?`}
            header="Confirmación"
            acceptClassName="p-button-danger"
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />
         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            Usuario
         </h2>

         <TableControl<ValuesUsuarioProps>
            ancho={{ minWidth: "110rem" }}
            columnas={columnsUsuario2}
            filas={arrayUsuario}
            filaSeleccionada={usuarioSeleccionado}
            arrayFiltroGlobal={arrayFiltroGlobal}
            funcionFilaSeleccionada={setUsuarioSeleccioando}
            funcionCrear={funcionCrear}
            funcionActualizar={funcionEditar}
            funcionEliminar={funcionValidarEliminar}
         />

         <UsuarioRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funcionListar}
            arrayPrivilegios={arrayPrivilegio}
         />
      </ContainerBodyStyled>
   );
};
