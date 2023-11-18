import {
   ColumnProps,
   EstadoProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { CategoryService } from "../../../entities/categoria.entities";
import { useContext, useEffect, useState } from "react";
import { CategoryRegister, DropdownProps } from "./CategoriaRegistro";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";

const columnsCategorias2: ColumnProps[] = [
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
      style: { width: "5%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "categoria_nombre",
      header: "Categoria",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "15%" },
   },
];

export interface ValuesCategoriaProps {
   id: number;
   index: number;
   categoria_nombre: string;
   fecha_registro: string;
   fecha_actualizacion: string;
   estado: EstadoProps;
}

const arrayFiltroGlobal: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "estado.estado",
];

interface Props {
   nombreFormulario: string;
}

export const funcionObtenerCategorias = async (): Promise<DropdownProps[]> => {
   const array: DropdownProps[] = [];
   await CategoryService.ListarTodos()
      .then((respuesta) => {
         respuesta.data.data.forEach((element: CategoryService) => {
            array.push({
               code: String(element.categoria_id),
               name: element.nombre,
            });
         });
      })
      .catch((error: any) => {});
   return array;
};

export const Categoria = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [arrayCategoria, setArrayCategoria] = useState<ValuesCategoriaProps[]>(
      []
   );
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [categoriaSeleccionada, setCategoriaSeleccionada] =
      useState<ValuesCategoriaProps>({} as ValuesCategoriaProps);
   const [dialogo, setDialogo] = useState(false);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<CategoryService>(
      new CategoryService()
   );

   const funcionListar = async () => {
      const arrayCategorias: ValuesCategoriaProps[] = [];
      await CategoryService.ListarTodos()
         .then((response) => {
            response.data.data.forEach(
               (element: CategoryService, index: number) => {
                  const newRow: ValuesCategoriaProps = {
                     id: element.categoria_id,
                     index: index + 1,
                     categoria_nombre: element.nombre,
                     fecha_registro: element.fecha_registro,
                     fecha_actualizacion: element.fecha_actualizacion,
                     estado: {
                        valor: element.activo,
                        estado: element.activo ? "Activo" : "Inactivo",
                     },
                  };
                  arrayCategorias.push(newRow);
               }
            );
            setArrayCategoria(arrayCategorias);
         })
         .catch((error: any) => {
            return;
         });
   };

   const funcionCrearCategoria = () => {
      setItemSeleccionado(
         new CategoryService(0, "", false, fechaActualISO(), fechaActualISO())
      );
      setEsEdicion(false);
      setAbrirModal(true);
   };

   const funcionEditarCategoria = () => {
      const editarItem = arrayCategoria.find((item) =>
         item.id === categoriaSeleccionada?.id ? item : undefined
      );

      if (editarItem === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: "Elija un usuario para poder editar",
         });
         return;
      }

      setItemSeleccionado(
         new CategoryService(
            editarItem.id,
            editarItem.categoria_nombre,
            editarItem.estado.valor,
            editarItem.fecha_registro,
            editarItem.fecha_actualizacion
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };

   const funcionValidarEliminar = async () => {
      const eliminarItem = arrayCategoria.find((item) =>
         item.id === categoriaSeleccionada.id ? item : undefined
      );

      if (eliminarItem === undefined) {
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
      await CategoryService.EliminarUno(categoriaSeleccionada.id)
         .then((response) => {
            if (response.data.code === 200) {
               mostrarNotificacion({
                  tipo: "success",

                  detalle: `${nombreFormulario} se eliminó correctamente`,
               });
               funcionCerrarDialogo();
               funcionListar();
               return;
            }
         })
         .catch((error: any) => {
            mostrarNotificacion({
               tipo: "error",

               detalle: error.message,
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
   }, []);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${categoriaSeleccionada.categoria_nombre}?`}
            header="Confirmación"
            acceptClassName="p-button-danger"
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />

         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            {nombreFormulario}
         </h2>

         <TableControl<ValuesCategoriaProps>
            ancho={{ minWidth: "50rem" }}
            columnas={columnsCategorias2}
            filas={arrayCategoria}
            filaSeleccionada={categoriaSeleccionada}
            arrayFiltroGlobal={arrayFiltroGlobal}
            funcionFilaSeleccionada={setCategoriaSeleccionada}
            funcionCrear={funcionCrearCategoria}
            funcionActualizar={funcionEditarCategoria}
            funcionEliminar={funcionValidarEliminar}
         />

         <CategoryRegister
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
