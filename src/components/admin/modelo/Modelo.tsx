import { useCallback, useContext, useEffect, useState } from "react";
import { ModeloRegistro } from "./ModeloRegistro";
import { ModeloEntity } from "../../../entities/modelo.entity";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { CategoriaService } from "../../../services/categoria.service";
import { MarcaService } from "../../../services/marca.service";
import { ModeloService } from "../../../services/modelo.service";
import {
   ColumnasModelo,
   arrayColumnasFiltroModelo,
   arrayEstructuraColumnasModelo,
} from "../../../tables/modelo.table";
import { TableControl } from "../../controls/TableControl";
import {
   ComboboxAnidadoProps,
   ComboboxProps,
} from "../../../interfaces/combobox.interface";

interface Props {
   nombreFormulario: string;
}

let arrayCategoria: ComboboxProps[] = [];
let arrayMarca: ComboboxAnidadoProps[] = [];

export const Modelo = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [dialogo, setDialogo] = useState(false);
   const [arrayModelo, setArrayModelo] = useState<ColumnasModelo[]>([]);
   const [modeloSeleccionado, setModeloSeleccionado] = useState<ColumnasModelo>(
      {} as ColumnasModelo
   );

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<ModeloEntity>(
      new ModeloEntity()
   );

   const funObtenerModelos = useCallback(async () => {
      const srvModelo = new ModeloService();
      const arrayModelo: ColumnasModelo[] = [];
      await srvModelo
         .listarTodos()
         .then((resp) => {
            resp.forEach((element: ModeloEntity, index: number) => {
               const newRow: ColumnasModelo = {
                  id: element.modelo_id,
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
                  modelo_nombre: element.nombre,
                  producto_nombre: element.descripcion,
                  foto: {
                     img: element.foto,
                     alt: element.descripcion,
                  },
                  precio: element.precio,
                  color: element.color,
                  caracteristicas: element.caracteristicas,
                  estado: {
                     valor: element.activo,
                     estado: element.activo ? "Activo" : "Inactivo",
                  },
               };
               arrayModelo.push(newRow);
            });

            setArrayModelo(arrayModelo);
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "success",
               detalle: error.message,
            });
         });
   }, [mostrarNotificacion]);

   const funcionCrear = () => {
      setItemSeleccionado(
         new ModeloEntity(
            0,
            "",
            "",
            "",
            "",
            "",
            0,
            fechaActualISO(),
            false,
            0,
            0
         )
      );
      setEsEdicion(false);
      setAbrirModal(true);
   };

   const funcionEditar = () => {
      const itemEdicion = arrayModelo.find((item) =>
         item.id === modeloSeleccionado?.id ? item : undefined
      );
      if (itemEdicion === undefined) {
         mostrarNotificacion({
            tipo: "warn",
            detalle: `Elija un ${nombreFormulario} para poder editar`,
         });
         return;
      }

      setItemSeleccionado(
         new ModeloEntity(
            itemEdicion.id,
            itemEdicion.modelo_nombre,
            itemEdicion.producto_nombre,
            itemEdicion.foto.img,
            itemEdicion.caracteristicas,
            itemEdicion.color,
            itemEdicion.precio,
            itemEdicion.fecha_registro,
            itemEdicion.estado.valor,
            itemEdicion.marca_id,
            itemEdicion.categoria_id
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };

   const funcionEliminar = async () => {
      const srvModelo = new ModeloService();
      await srvModelo
         .eliminarUno(modeloSeleccionado.id)
         .then(() => {
            mostrarNotificacion({
               tipo: "success",
               detalle: `${nombreFormulario} se eliminó correctamente`,
            });
            funcionCerrarDialogo();
            funObtenerModelos();
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "success",
               detalle: error.message,
            });
            funcionCerrarDialogo();
         });
   };
   const funcionValidarEliminar = () => {
      const itemEdicion = arrayModelo.find((item) =>
         item.id === modeloSeleccionado?.id ? item : undefined
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

   const funcionCerrarModal = () => {
      setAbrirModal(false);
   };

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

      await srvMarca
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

   useEffect(() => {
      funObtenerCategorias();
      funObtenerMarcas();
      funObtenerModelos();
   }, [funObtenerCategorias, funObtenerMarcas, funObtenerModelos]);

   return (
      <ContainerBodyStyled>
         <ConfirmDialog
            visible={dialogo}
            onHide={() => setDialogo(false)}
            message={`¿Estas seguro que deseas eliminar la ${nombreFormulario}: ${modeloSeleccionado.modelo_nombre}?`}
            header="Confirmación"
            icon={<IconAlertTriangle size={24} />}
            accept={funcionEliminar}
            reject={funcionCerrarDialogo}
         />
         <h2 style={{ textAlign: "center", margin: "50px 0 20px 0" }}>
            {nombreFormulario}
         </h2>
         <TableControl<ColumnasModelo>
            ancho={{ minWidth: "110rem" }}
            columnas={arrayEstructuraColumnasModelo}
            filas={arrayModelo}
            filaSeleccionada={modeloSeleccionado}
            arrayFiltroGlobal={arrayColumnasFiltroModelo}
            funcionFilaSeleccionada={setModeloSeleccionado}
            funcionCrear={funcionCrear}
            funcionActualizar={funcionEditar}
            funcionEliminar={funcionValidarEliminar}
         />

         <ModeloRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funObtenerModelos}
            arrayCategorias={arrayCategoria}
            arrayMarcas={arrayMarca}
         />
      </ContainerBodyStyled>
   );
};
