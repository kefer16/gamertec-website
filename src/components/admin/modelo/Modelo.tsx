import { useContext, useEffect, useState } from "react";
import { ToolbarControl } from "../../controls/ToobarControl";
import {
   ColumnProps,
   EstadoProps,
   ImagenProps,
   TableControl,
   TypeColumn,
} from "../../controls/TableControl";
import { funcionObtenerCategorias } from "../categoria/Categoria";
import { ModeloRegistro } from "./ModeloRegistro";

import { funcionObtenerMarcas } from "../marca/Marca";
import {
   ComboboxProps,
   ComboboxAnidadoProps,
} from "../../../interfaces/combobox.interface";
import { ModeloEntity } from "../../../entities/modelo.entity";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { ConfirmDialog } from "primereact/confirmdialog";
import { IconAlertTriangle } from "@tabler/icons-react";
import { GamertecSesionContext } from "../../sesion/Sesion.component";

const columnsModelo2: ColumnProps[] = [
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
      type: TypeColumn.IMAGE,
      field: "foto",
      header: "Foto",
      style: { width: "1%" },
   },
   {
      type: TypeColumn.TEXT,
      field: "producto_nombre",
      header: "Nombre Producto",
      style: { width: "15%" },
   },
   {
      type: TypeColumn.MONEY,
      field: "precio",
      header: "Precio",
      style: { width: "4%" },
   },
   {
      type: TypeColumn.NUMBER,
      field: "stock",
      header: "Stock",
      style: { width: "1%" },
   },
   {
      type: TypeColumn.STATUS,
      field: "estado",
      header: "Estado",
      style: { width: "4%" },
   },
];

export interface ValuesModeloProps {
   id: number;
   index: number;
   fecha_registro: Date;
   categoria_id: number;
   categoria_nombre?: string;
   marca_id: number;
   marca_nombre?: string;
   modelo_nombre: string;
   producto_nombre: string;
   foto: ImagenProps;
   precio: number;
   stock: number;
   color: string;
   caracteristicas: string;
   estado: EstadoProps;
}
interface Props {
   nombreFormulario: string;
}

let arrayCategoria: ComboboxProps[] = [];
let arrayMarca: ComboboxAnidadoProps[] = [];

export const funcionObteneModelo = async (): Promise<
   ComboboxAnidadoProps[]
> => {
   const array: ComboboxAnidadoProps[] = [];
   await ModeloEntity.ListarTodos().then((respuesta) => {
      respuesta.data.data.forEach((element: ModeloEntity) => {
         array.push({
            valor: element.fk_marca,
            valorAnidado: element.modelo_id,
            descripcion: element.nombre,
         });
      });
   });
   return array;
};

export const Modelo = ({ nombreFormulario }: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [dialogo, setDialogo] = useState(false);
   const [arrayModelo, setArrayModelo] = useState<ValuesModeloProps[]>([]);
   const [modeloSeleccionado, setModeloSeleccionado] =
      useState<ValuesModeloProps>({} as ValuesModeloProps);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<ModeloEntity>(
      new ModeloEntity()
   );

   const funcionListar = async () => {
      const arrayModelo: ValuesModeloProps[] = [];
      await ModeloEntity.ListarTodos()
         .then((response) => {
            response.data.data.forEach(
               (element: ModeloEntity, index: number) => {
                  const newRow: ValuesModeloProps = {
                     id: element.modelo_id,
                     index: index + 1,
                     fecha_registro: element.fecha_registro,
                     categoria_id: element.fk_categoria,
                     categoria_nombre: arrayCategoria.find(
                        (categoria: ComboboxProps) =>
                           categoria.valor === element.fk_categoria
                     )?.descripcion,
                     marca_id: element.fk_marca,
                     marca_nombre: arrayMarca.find(
                        (marca: ComboboxAnidadoProps) =>
                           marca.valorAnidado === element.fk_marca
                     )?.descripcion,
                     modelo_nombre: element.nombre,
                     producto_nombre: element.descripcion,
                     foto: {
                        img: element.foto,
                        alt: element.descripcion,
                     },
                     precio: element.precio,
                     stock: element.stock,
                     color: element.color,
                     caracteristicas: element.caracteristicas,
                     estado: {
                        valor: element.activo,
                        estado: element.activo ? "Activo" : "Inactivo",
                     },
                  };
                  arrayModelo.push(newRow);
               }
            );

            setArrayModelo(arrayModelo);
         })
         .catch((error: any) => {
            return;
         });
   };

   const funcionCrear = () => {
      setItemSeleccionado(
         new ModeloEntity(0, "", "", "", "", "", 0, new Date(), 0, false, 0, 0)
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
            titulo: "Alerta",
            detalle: `Elija un ${nombreFormulario} para poder editar`,
            pegado: false,
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
            itemEdicion.stock,
            itemEdicion.estado.valor,
            itemEdicion.marca_id,
            itemEdicion.categoria_id
         )
      );

      setEsEdicion(true);
      setAbrirModal(true);
   };

   const funcionEliminar = async () => {
      await ModeloEntity.EliminarUno(modeloSeleccionado.id)
         .then((response) => {
            if (response.data.code === 200) {
               mostrarNotificacion({
                  tipo: "success",
                  titulo: "Exito",
                  detalle: `${nombreFormulario} se eliminó correctamente`,
                  pegado: false,
               });
               funcionCerrarDialogo();
               funcionListar();
            }
         })
         .catch((error: Error) => {
            mostrarNotificacion({
               tipo: "success",
               titulo: "Exito",
               detalle: error.message,
               pegado: false,
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
      const obtenerData = async () => {
         await funcionObtenerCategorias().then((result) => {
            arrayCategoria = result;
         });

         await funcionObtenerMarcas().then((result) => {
            arrayMarca = result;
         });

         await funcionListar();
      };

      obtenerData();
   }, []);

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
         <ToolbarControl
            functionCrear={funcionCrear}
            functionActualizar={funcionEditar}
            functionEliminar={funcionValidarEliminar}
         />
         <TableControl<ValuesModeloProps>
            ancho={{ minWidth: "110rem" }}
            columnas={columnsModelo2}
            filas={arrayModelo}
            filaSeleccionada={modeloSeleccionado}
            funcionFilaSeleccionada={setModeloSeleccionado}
         />

         <ModeloRegistro
            nombreFormulario={nombreFormulario}
            abrir={abrirModal}
            esEdicion={esEdicion}
            itemSeleccionado={itemSeleccionado}
            funcionCerrarModal={funcionCerrarModal}
            funcionActualizarTabla={funcionListar}
            arrayCategorias={arrayCategoria}
            arrayMarcas={arrayMarca}
         />
      </ContainerBodyStyled>
   );
};
