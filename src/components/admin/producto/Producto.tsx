import { useCallback, useContext, useEffect, useState } from "react";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { ProductoRegistro } from "./ProductoRegistro";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ProductoEntity } from "../../../entities/producto.entities";
import { ProductoService } from "../../../services/producto.service";
import { ProductoResponse } from "../../../responses/producto.response";
import { CategoriaService } from "../../../services/categoria.service";
import { MarcaService } from "../../../services/marca.service";
import { TableControl } from "../../controls/TableControl";
import {
   ColumnasProducto,
   arrayColumnasFiltroProducto,
   arrayEstructuraColumnasProducto,
} from "../../../tables/producto.table";
import { ModeloService } from "../../../services/modelo.service";
import {
   ComboboxAnidadoProps,
   ComboboxProps,
} from "../../../interfaces/combobox.interface";

interface Props {
   nombreFormulario: string;
}

let arrayCategoria: ComboboxProps[] = [];
let arrayMarca: ComboboxAnidadoProps[] = [];
let arrayModelo: ComboboxAnidadoProps[] = [];

export const Producto = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [dialogo, setDialogo] = useState(false);
   const [arrayProducto, setArrayProducto] = useState<ColumnasProducto[]>([]);
   const [productoSeleccionado, setProductoSeleccionado] =
      useState<ColumnasProducto>({} as ColumnasProducto);

   const funObtenerCategorias = useCallback(async () => {
      const srvCategoria = new CategoriaService();
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
   }, [mostrarNotificacion]);

   const funObtenerMarcas = useCallback(async () => {
      const srvMarcas = new MarcaService();

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
   }, [mostrarNotificacion]);

   const funObtenerModelos = useCallback(async () => {
      const srvModelo = new ModeloService();
      await srvModelo
         .listarModeloCombobox()
         .then((resp) => {
            arrayModelo = resp;
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "error",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funcionListar = useCallback(async () => {
      const arrayProducto: ColumnasProducto[] = [];
      const srvProducto = new ProductoService();
      await srvProducto
         .listarTodos()
         .then((resp) => {
            resp.forEach((element: ProductoResponse, index: number) => {
               const newRow: ColumnasProducto = {
                  id: element.producto_id,
                  index: index + 1,
                  fecha_registro: element.fecha_registro,
                  categoria_id: element.fk_categoria,
                  categoria_nombre: arrayCategoria.find(
                     (categoria: ComboboxProps) =>
                        categoria.code === String(element.fk_categoria)
                  )?.name,
                  marca_id: element.fk_marca,
                  marca_nombre: arrayMarca.find(
                     (marca: ComboboxAnidadoProps) =>
                        marca.code === String(element.fk_marca)
                  )?.name,
                  modelo_id: element.fk_modelo,
                  modelo_nombre: arrayModelo.find(
                     (modelo: ComboboxAnidadoProps) =>
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
      funObtenerModelos();
      funcionListar();
   }, [
      funObtenerCategorias,
      funObtenerMarcas,
      funObtenerModelos,
      funcionListar,
   ]);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<ProductoEntity>(
      new ProductoEntity()
   );

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
         <TableControl<ColumnasProducto>
            ancho={{ minWidth: "90rem" }}
            columnas={arrayEstructuraColumnasProducto}
            filas={arrayProducto}
            filaSeleccionada={productoSeleccionado}
            arrayFiltroGlobal={arrayColumnasFiltroProducto}
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
