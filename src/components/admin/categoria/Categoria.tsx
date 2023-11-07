import {
   ColumnProps,
   EstadoProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { ToolbarControl } from "../../controls/ToobarControl";
import { CategoryService } from "../../../entities/categoria.entities";
import { useContext, useEffect, useState } from "react";
import { CategoryRegister } from "./CategoriaRegistro";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";

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
   fecha_registro: Date;
   fecha_actualizacion: Date;
   estado: EstadoProps;
}

interface Props {
   nombreFormulario: string;
}

export const funcionObtenerCategorias = async (): Promise<ComboboxProps[]> => {
   const array: ComboboxProps[] = [];
   await CategoryService.ListarTodos()
      .then((respuesta) => {
         respuesta.data.data.forEach((element: CategoryService) => {
            array.push({
               valor: element.categoria_id,
               descripcion: element.nombre,
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
            titulo: "Alerta",
            detalle: "Elija un usuario para poder editar",
            pegado: false,
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

   const funcionEliminarUno = async (id: number) => {
      await CategoryService.EliminarUno(id)
         .then((response) => {
            if (response.data.code === 200) {
               mostrarNotificacion({
                  tipo: "warn",
                  titulo: "Alerta",
                  detalle: `${nombreFormulario} se eliminó correctamente`,
                  pegado: false,
               });
               funcionCerrarDialogo();
               funcionListar();
               return;
            }
         })
         .catch((error: any) => {
            mostrarNotificacion({
               tipo: "error",
               titulo: "Error",
               detalle: error.message,
               pegado: true,
            });
            funcionCerrarDialogo();
            return;
         });
   };

   const funcionEliminar = async () => {
      const eliminarItem = arrayCategoria.find((item) =>
         item.id === categoriaSeleccionada?.id ? item : undefined
      );

      if (eliminarItem === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            titulo: "Alerta",
            detalle: `Elija un ${nombreFormulario} para poder eliminar`,
            pegado: false,
         });
         funcionCerrarDialogo();
         return;
      }
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
            message="Are you sure you want to proceed?"
            header="Confirmation"
            icon="pi pi-exclamation-triangle"
            accept={() => funcionEliminarUno(1)}
            reject={funcionCerrarDialogo}
         />

         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            {nombreFormulario}
         </h2>
         <ToolbarControl
            functionCrear={funcionCrearCategoria}
            functionActualizar={funcionEditarCategoria}
            functionEliminar={funcionEliminar}
         />
         <TableControl<ValuesCategoriaProps>
            ancho={{ minWidth: "50rem" }}
            columnas={columnsCategorias2}
            filas={arrayCategoria}
            filaSeleccionada={categoriaSeleccionada}
            funcionFilaSeleccionada={setCategoriaSeleccionada}
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
