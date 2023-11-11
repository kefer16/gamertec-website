import { useContext, useEffect, useState } from "react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { ToolbarControl } from "../../controls/ToobarControl";
import {
   ColumnProps,
   EstadoProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { MarcaRegistro } from "./MarcaRegistro";
import { MarcaService } from "../../../entities/marca.entities";
import { funcionObtenerCategorias } from "../categoria/Categoria";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ConfirmDialog } from "primereact/confirmdialog";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { IconAlertTriangle } from "@tabler/icons-react";
import {
   DropdownProps,
   DropdownPropsAnidado,
} from "../categoria/CategoriaRegistro";

export interface ValuesMarcaProps {
   id: number;
   index: number;
   fecha_registro: string;
   categoria_id: number;
   categoria_nombre?: string;
   marca_nombre: string;
   estado: EstadoProps;
}
const columnsMarcas2: ColumnProps[] = [
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
      field: "categoria_nombre",
      header: "Categoria",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "marca_nombre",
      header: "Marca",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "20%" },
   },
];
interface Props {
   nombreFormulario: string;
}

let arrayCategoria: DropdownProps[] = [];

export const funcionObtenerMarcas = async (): Promise<
   DropdownPropsAnidado[]
> => {
   const array: DropdownPropsAnidado[] = [];
   await MarcaService.ListarTodos()
      .then((respuesta) => {
         respuesta.data.data.forEach((element: MarcaService) => {
            array.push({
               codeAnidado: String(element.fk_categoria),
               code: String(element.marca_id),
               name: element.nombre,
            });
         });
      })
      .catch((error: any) => {});
   return array;
};

export const Marca = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [marcaSeleccionada, setMarcaSeleccionada] = useState<ValuesMarcaProps>(
      {} as ValuesMarcaProps
   );
   const [arrayMarca, setArrayMarca] = useState<ValuesMarcaProps[]>([]);
   const [dialogo, setDialogo] = useState(false);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<MarcaService>(
      new MarcaService()
   );

   const funcionListar = async () => {
      const arrayMarca: ValuesMarcaProps[] = [];
      await MarcaService.ListarTodos()
         .then((response) => {
            response.data.data.forEach(
               (element: MarcaService, index: number) => {
                  const newRow: ValuesMarcaProps = {
                     id: element.marca_id,
                     index: index + 1,
                     categoria_id: element.fk_categoria,
                     categoria_nombre: arrayCategoria.find(
                        (categoria: DropdownProps) =>
                           categoria.code === String(element.fk_categoria)
                     )?.name,
                     marca_nombre: element.nombre,
                     fecha_registro: element.fecha_registro,
                     estado: {
                        valor: element.activo,
                        estado: element.activo ? "Activo" : "Inactivo",
                     },
                  };
                  arrayMarca.push(newRow);
               }
            );
            setArrayMarca(arrayMarca);
         })
         .catch((error: any) => {
            return;
         });
   };

   const funcionCrear = () => {
      setItemSeleccionado(new MarcaService(0, "", false, 0, fechaActualISO()));
      setEsEdicion(false);
      setAbrirModal(true);
   };

   const funcionEditar = () => {
      const itemEdicion = arrayMarca.find((item) =>
         item.id === marcaSeleccionada.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            titulo: "Alerta",
            detalle: `Elija un ${nombreFormulario} para poder editar`,
            pegado: false,
         });

         return;
      }

      setItemSeleccionado(
         new MarcaService(
            itemEdicion.id,
            itemEdicion.marca_nombre,
            itemEdicion.estado.valor,
            itemEdicion.categoria_id,
            itemEdicion.fecha_registro
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };

   const funcionEliminar = async () => {
      await MarcaService.EliminarUno(marcaSeleccionada.id)
         .then((response) => {
            mostrarNotificacion({
               tipo: "success",
               titulo: "Correcto",
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

   const funcionValidarEliminar = () => {
      const itemEdicion = arrayMarca.find((item) =>
         item.id === marcaSeleccionada.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            titulo: "Alerta",
            detalle: `Elija un ${nombreFormulario} para poder eliminar`,
            pegado: false,
         });
         funcionCerrarDialogo();
         return;
      }

      setDialogo(true);
   };

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

   useEffect(() => {
      const obtenerCategorias = async () => {
         return await funcionObtenerCategorias();
      };
      obtenerCategorias().then((result) => {
         arrayCategoria = result;
         funcionListar();
      });
   }, []);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${marcaSeleccionada.marca_nombre}?`}
            header="Confirmación"
            acceptClassName="p-button-danger"
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
         <TableControl<ValuesMarcaProps>
            ancho={{ minWidth: "70rem" }}
            columnas={columnsMarcas2}
            filas={arrayMarca}
            filaSeleccionada={marcaSeleccionada}
            funcionFilaSeleccionada={setMarcaSeleccionada}
         />

         <MarcaRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funcionListar}
            arrayCategorias={arrayCategoria}
         />
      </ContainerBodyStyled>
   );
};
