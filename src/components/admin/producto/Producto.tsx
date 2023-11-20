import { useCallback, useContext, useEffect, useState } from "react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import {
   ColumnProps,
   EstadoProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { ProductoRegistro } from "./ProductoRegistro";
import { funcionObteneModelo } from "../modelo/Modelo";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import {
   DropdownProps,
   DropdownPropsAnidado,
} from "../categoria/CategoriaRegistro";
import { ProductoEntity } from "../../../entities/producto.entities";
import { ProductoService } from "../../../services/producto.service";
import { ProductoResponse } from "../../../responses/producto.response";
import { CategoriaService } from "../../../services/categoria.service";
import { MarcaService } from "../../../services/marca.service";

const columnsProducto2: ColumnProps[] = [
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
      type: TypeColumn.TEXT,
      field: "modelo_nombre",
      header: "Modelo",
      style: { width: "10%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "numero_serie",
      header: "Número Serie",
      style: { width: "5%" },
   },
   {
      type: TypeColumn.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "4%" },
   },
];

export interface ValuesProductoProps {
   id: number;
   index: number;
   fecha_registro: string;
   categoria_id: number;
   categoria_nombre?: string;
   marca_id: number;
   marca_nombre?: string;
   modelo_id: number;
   modelo_nombre?: string;
   numero_serie: string;
   estado: EstadoProps;
}

const arrayFiltroGlobal: string[] = [
   "fecha_registro",
   "categoria_nombre",
   "marca_nombre",
   "modelo_nombre",
   "numero_serie",
   "estado.estado",
];

interface Props {
   nombreFormulario: string;
}

let arrayCategoria: DropdownProps[] = [];
let arrayMarca: DropdownPropsAnidado[] = [];
let arrayModelo: DropdownPropsAnidado[] = [];

export const Producto = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [dialogo, setDialogo] = useState(false);
   const [arrayProducto, setArrayProducto] = useState<ValuesProductoProps[]>(
      []
   );
   const [productoSeleccionado, setProductoSeleccionado] =
      useState<ValuesProductoProps>({} as ValuesProductoProps);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<ProductoEntity>(
      new ProductoEntity()
   );

   const funcionListar = async () => {
      const arrayProducto: ValuesProductoProps[] = [];
      const srvProducto = new ProductoService();
      await srvProducto
         .listarTodos()
         .then((resp) => {
            resp.forEach((element: ProductoResponse, index: number) => {
               const newRow: ValuesProductoProps = {
                  id: element.producto_id,
                  index: index + 1,
                  fecha_registro: element.fecha_registro,
                  categoria_id: element.fk_categoria,
                  categoria_nombre: arrayCategoria.find(
                     (categoria: DropdownProps) =>
                        categoria.code === String(element.fk_categoria)
                  )?.name,
                  marca_id: element.fk_marca,
                  marca_nombre: arrayMarca.find(
                     (marca: DropdownPropsAnidado) =>
                        marca.code === String(element.fk_marca)
                  )?.name,
                  modelo_id: element.fk_modelo,
                  modelo_nombre: arrayModelo.find(
                     (modelo: DropdownPropsAnidado) =>
                        modelo.code === String(element.fk_modelo)
                  )?.name,
                  numero_serie: element.numero_serie,
                  estado: {
                     valor: element.activo,
                     estado: element.activo ? "Activo" : "Inactivo",
                  },
               };
               arrayProducto.push(newRow);
            });

            setArrayProducto(arrayProducto);
         })
         .catch((error: any) => {
            return;
         });
   };

   const funcionCrear = () => {
      setItemSeleccionado(
         new ProductoEntity(0, "", 0, 0, 0, fechaActualISO(), false)
      );
      setEsEdicion(false);
      setAbrirModal(true);
   };

   const funcionEditar = () => {
      const itemEdicion = arrayProducto.find((item) =>
         item.id === productoSeleccionado?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: `Elija un ${nombreFormulario} para poder editar`,
         });
         return;
      }

      setItemSeleccionado(
         new ProductoEntity(
            itemEdicion.id,
            itemEdicion.numero_serie,
            itemEdicion.modelo_id,
            itemEdicion.marca_id,
            itemEdicion.categoria_id,
            itemEdicion.fecha_registro,
            itemEdicion.estado.valor
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };

   const funcionValidarEliminar = () => {
      const itemEdicion = arrayProducto.find((item) =>
         item.id === productoSeleccionado?.id ? item : undefined
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
      const srvProducto = new ProductoService();
      await srvProducto
         .eliminarUno(productoSeleccionado.id)
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

   const obtenerData = useCallback(async () => {
      const srvCategoria = new CategoriaService();
      const srvMarcas = new MarcaService();
      // const srvModelo = new modelose();

      await srvCategoria
         .obtenerCategoriasCombobox()
         .then((resp) => {
            arrayCategoria = resp;
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });

      await srvMarcas
         .obtenerMarcasCombobox()
         .then((resp) => {
            arrayMarca = resp;
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });

      await funcionObteneModelo().then((resp) => {
         arrayModelo = resp;
      });

      await funcionListar();
   }, [mostrarNotificacion]);

   useEffect(() => {
      obtenerData();
   }, [obtenerData]);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${productoSeleccionado.numero_serie}?`}
            header="Confirmación"
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />
         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            {nombreFormulario}
         </h2>
         <TableControl
            ancho={{ minWidth: "90rem" }}
            columnas={columnsProducto2}
            filas={arrayProducto}
            filaSeleccionada={productoSeleccionado}
            arrayFiltroGlobal={arrayFiltroGlobal}
            funcionFilaSeleccionada={setProductoSeleccionado}
            funcionCrear={funcionCrear}
            funcionActualizar={funcionEditar}
            funcionEliminar={funcionValidarEliminar}
         />
         <ProductoRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funcionListar}
            arrayCategorias={arrayCategoria}
            arrayMarcas={arrayMarca}
            arrayModelos={arrayModelo}
         />
      </ContainerBodyStyled>
   );
};
