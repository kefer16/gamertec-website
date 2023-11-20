import { useCallback, useContext, useEffect, useState } from "react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import {
   ColumnProps,
   EstadoProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { MarcaRegistro } from "./MarcaRegistro";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ConfirmDialog } from "primereact/confirmdialog";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { IconAlertTriangle } from "@tabler/icons-react";
import { DropdownProps } from "../categoria/CategoriaRegistro";
import { CategoriaService } from "../../../services/categoria.service";
import { MarcaResponse } from "../../../responses/marca.response";
import { MarcaService } from "../../../services/marca.service";
import { MarcaEntity } from "../../../entities/marca.entities";

export interface ValuesMarcaProps {
   id: number;
   index: number;
   fecha_registro: string;
   categoria_id: number;
   categoria_nombre?: string;
   marca_nombre: string;
   estado: EstadoProps;
}
const arrayFiltroGlobal: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "marca_nombre",
   "estado.estado",
];
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

export const Marca = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [marcaSeleccionada, setMarcaSeleccionada] = useState<ValuesMarcaProps>(
      {} as ValuesMarcaProps
   );
   const [arrayMarca, setArrayMarca] = useState<ValuesMarcaProps[]>([]);
   const [dialogo, setDialogo] = useState(false);
   const [itemSeleccionado, setItemSeleccionado] = useState<MarcaResponse>(
      {} as MarcaResponse
   );
   const funObtenerCategorias = useCallback(async () => {
      const srvCategoria = new CategoriaService();

      await srvCategoria
         .obtenerCategoriasCombobox()
         .then((resp) => {
            arrayCategoria = [...resp];
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funObtenerMarcas = useCallback(async () => {
      const srvMarca = new MarcaService();
      const arrayMarca: ValuesMarcaProps[] = [];
      await srvMarca
         .listarTodos()
         .then((resp) => {
            resp.forEach((element: MarcaResponse, index: number) => {
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
            });
            setArrayMarca(arrayMarca);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   useEffect(() => {
      funObtenerCategorias();
      funObtenerMarcas();
   }, [funObtenerCategorias, funObtenerMarcas]);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

   const funcionCrear = () => {
      setItemSeleccionado(new MarcaEntity(0, "", false, 0, fechaActualISO()));
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
            detalle: `Elija un ${nombreFormulario} para poder editar`,
         });
         return;
      }

      setItemSeleccionado(
         new MarcaEntity(
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
      const srvMarca = new MarcaService();
      await srvMarca
         .eliminarUno(marcaSeleccionada.id)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: `${nombreFormulario} se eliminó correctamente`,
            });
            funcionCerrarDialogo();
            funObtenerMarcas();
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
            funcionCerrarDialogo();
         });
   };

   const funcionValidarEliminar = () => {
      const itemEdicion = arrayMarca.find((item) =>
         item.id === marcaSeleccionada.id ? item : undefined
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
         <TableControl<ValuesMarcaProps>
            ancho={{ minWidth: "70rem" }}
            columnas={columnsMarcas2}
            filas={arrayMarca}
            filaSeleccionada={marcaSeleccionada}
            arrayFiltroGlobal={arrayFiltroGlobal}
            funcionFilaSeleccionada={setMarcaSeleccionada}
            funcionCrear={funcionCrear}
            funcionActualizar={funcionEditar}
            funcionEliminar={funcionValidarEliminar}
         />

         <MarcaRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funObtenerMarcas}
            arrayCategorias={arrayCategoria}
         />
      </ContainerBodyStyled>
   );
};
