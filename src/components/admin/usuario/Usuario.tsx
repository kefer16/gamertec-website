import { useContext, useEffect, useState } from "react";
import { ToolbarControl } from "../../controls/ToobarControl";
import {
   ColumnProps,
   EstadoProps,
   ImagenProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";

import { UsuarioRegistro } from "./UsuarioRegistro";
import { funcionObtenerPrivilegios } from "../privilegio/Privilegio";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { UsuarioEntity } from "../../../entities/usuario.entities";
import { UsuarioService } from "../../../services/usuario.service";
import { RespuestaEntity } from "../../../entities/respuesta.entity";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";

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
      type: TypeColumn.MONEY,
      field: "dinero",
      header: "Dinero",
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
   fecha_registro: Date;
   privilegio_id: number;
   privilegio_nombre?: string;
   usuario_nombre: string;
   usuario_apellido: string;
   correo: string;
   foto: ImagenProps;
   usuario: string;
   dinero: number;
   estado: EstadoProps;
}

interface Props {
   nombreFormulario: string;
}
let arrayPrivilegio: ComboboxProps[] = [];

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

   const funcionListar = async () => {
      const arrayUsuario: ValuesUsuarioProps[] = [];
      const usuServ = new UsuarioService();
      await usuServ
         .listarTodos()
         .then((resp: RespuestaEntity<UsuarioEntity[]>) => {
            if (resp.data) {
               resp.data.forEach((element: UsuarioEntity, index: number) => {
                  const newRow: ValuesUsuarioProps = {
                     id: element.usuario_id,
                     index: index + 1,
                     fecha_registro: element.fecha_registro,
                     privilegio_id: element.fk_privilegio,
                     privilegio_nombre: arrayPrivilegio.find(
                        (privilegio: ComboboxProps) =>
                           privilegio.valor === element.fk_privilegio
                     )?.descripcion,
                     usuario_nombre: element.nombre,
                     usuario_apellido: element.apellido,
                     correo: element.correo,
                     usuario: element.usuario,
                     dinero: element.dinero,
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
            }
            setArrayUsuario(arrayUsuario);
         })
         .catch((error: any) => {
            return;
         });
   };

   const funcionCrear = () => {
      setItemSeleccionado(
         new UsuarioEntity(
            0,
            "",
            "",
            "",
            "",
            "",
            0,
            "",
            new Date(),
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
            titulo: "Alerta",
            detalle: "Elija un usuario para poder editar",
            pegado: true,
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
            itemEdicion.dinero,
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
            titulo: "Alerta",
            detalle: `Elija un ${nombreFormulario} para poder eliminar`,
            pegado: true,
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
               titulo: "Éxito",
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
               detalle: `surgio un error: ${error.message}`,
               pegado: true,
            });

            funcionCerrarDialogo();
            return;
         });
   };

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

   useEffect(() => {
      const ObtenerData = async () => {
         return await funcionObtenerPrivilegios();
      };

      ObtenerData().then((result) => {
         arrayPrivilegio = result;
         funcionListar();
      });
   }, []);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${usuarioSeleccionado.usuario}?`}
            header="Confirmación"
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />
         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            Usuario
         </h2>
         <ToolbarControl
            functionCrear={funcionCrear}
            functionActualizar={funcionEditar}
            functionEliminar={funcionValidarEliminar}
         />
         <TableControl<ValuesUsuarioProps>
            ancho={{ minWidth: "110rem" }}
            columnas={columnsUsuario2}
            filas={arrayUsuario}
            filaSeleccionada={usuarioSeleccionado}
            funcionFilaSeleccionada={setUsuarioSeleccioando}
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
