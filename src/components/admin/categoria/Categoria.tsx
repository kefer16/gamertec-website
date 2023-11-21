import { useCallback, useContext, useEffect, useState } from "react";
import { CategoryRegister } from "./CategoriaRegistro";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { CategoriaService } from "../../../services/categoria.service";
import { CategoriaResponse } from "../../../responses/categoria.response";
import { CategoriaEntity } from "../../../entities/categoria.entities";
import {
   ColumnasCategoria,
   arrayColumnasFiltroCategoria,
   arrayEstructuraColumnasCategoria,
} from "../../../tables/categoria.table";
import { TableControl } from "../../controls/TableControl";
interface Props {
   nombreFormulario: string;
}

export const Categoria = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [arrayCategoria, setArrayCategoria] = useState<ColumnasCategoria[]>(
      []
   );
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [categoriaSeleccionada, setCategoriaSeleccionada] =
      useState<ColumnasCategoria>({} as ColumnasCategoria);
   const [dialogo, setDialogo] = useState(false);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<CategoriaEntity>(
      new CategoriaEntity()
   );

   const funcionListar = useCallback(async () => {
      const arrayCategorias: ColumnasCategoria[] = [];
      const srvCategoria = new CategoriaService();
      await srvCategoria
         .listarTodos()
         .then((resp) => {
            resp.forEach((element: CategoriaResponse, index: number) => {
               const newRow: ColumnasCategoria = {
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
            });
            setArrayCategoria(arrayCategorias);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funcionCrearCategoria = () => {
      const data: CategoriaEntity = {
         categoria_id: 0,
         nombre: "",
         activo: false,
         fecha_actualizacion: fechaActualISO(),
         fecha_registro: fechaActualISO(),
      };
      setItemSeleccionado(data);
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

      const data: CategoriaEntity = {
         categoria_id: editarItem.id,
         nombre: editarItem.categoria_nombre,
         activo: editarItem.estado.valor,
         fecha_actualizacion: editarItem.fecha_registro,
         fecha_registro: editarItem.fecha_actualizacion,
      };

      setItemSeleccionado(data);

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
      const srvCategoria = new CategoriaService();
      await srvCategoria
         .eliminarUno(categoriaSeleccionada.id)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: `${nombreFormulario} se eliminó correctamente`,
            });
            funcionCerrarDialogo();
            funcionListar();
         })
         .catch((error: any) => {
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

         <TableControl<ColumnasCategoria>
            ancho={{ minWidth: "50rem" }}
            columnas={arrayEstructuraColumnasCategoria}
            filas={arrayCategoria}
            filaSeleccionada={categoriaSeleccionada}
            arrayFiltroGlobal={arrayColumnasFiltroCategoria}
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
