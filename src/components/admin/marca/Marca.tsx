import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { fechaActualISO } from "../../../utils/funciones.utils";
import {
   Alert,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Snackbar,
   Typography,
} from "@mui/material";
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
import {
   ComboboxProps,
   ComboboxAnidadoProps,
} from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

export interface ValuesMarcaProps {
   id: number;
   index: number;
   fecha_registro: Date;
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

let arrayCategoria: ComboboxProps[] = [];

export const funcionObtenerMarcas = async (): Promise<
   ComboboxAnidadoProps[]
> => {
   const array: ComboboxAnidadoProps[] = [];
   await MarcaService.ListarTodos()
      .then((respuesta) => {
         respuesta.data.data.forEach((element: MarcaService) => {
            array.push({
               valor: element.fk_categoria,
               valorAnidado: element.marca_id,
               descripcion: element.nombre,
            });
         });
      })
      .catch((error: any) => {});
   return array;
};

export const Marca = ({ nombreFormulario }: Props) => {
   const [abrirModal, setAbrirModal] = useState(false);
   const [esEdicion, setEsEdicion] = useState(false);
   const [abrirAlerta, setAbrirAlerta] = useState(false);
   const [marcaSeleccionada, setMarcaSeleccionada] = useState<ValuesMarcaProps>(
      {} as ValuesMarcaProps
   );
   const [arrayMarca, setArrayMarca] = useState<ValuesMarcaProps[]>([]);
   const [dialogo, setDialogo] = useState(false);

   const funcionCerrarDialogo = () => {
      setDialogo(false);
   };

   const funcionAbrirDialogo = () => {
      const itemEdicion = arrayMarca.find((item) =>
         item.id === marcaSeleccionada?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         funcionAsignarAlerta(
            "warning",
            `Elija un ${nombreFormulario} para poder eliminar`
         );
         funcionAbrirAlerta();

         return;
      }
      setDialogo(true);
   };

   const [itemSeleccionado, setItemSeleccionado] = useState<MarcaService>(
      new MarcaService()
   );

   const [alerta, setAlerta] = useState<InterfaceAlertControl>({
      active: false,
      type: "info",
      text: "",
   });

   const funcionAsignarAlerta = (
      type: "error" | "warning" | "info" | "success",
      text: string
   ) => {
      setAlerta({
         active: true,
         type: type,
         text: text,
      });
   };

   const funcionAbrirAlerta = () => {
      setAbrirAlerta(true);
   };

   const funcionCerrarAlerta = () => {
      setAbrirAlerta(false);
   };

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
                        (categoria: ComboboxProps) =>
                           categoria.valor === element.fk_categoria
                     )?.descripcion,
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
         item.id === marcaSeleccionada?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         funcionAsignarAlerta(
            "warning",
            `Elija un ${nombreFormulario} para poder editar`
         );
         funcionAbrirAlerta();

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
      const itemEdicion = arrayMarca.find((item) =>
         item.id === marcaSeleccionada?.id ? item : undefined
      );

      if (itemEdicion === undefined) {
         funcionAsignarAlerta(
            "warning",
            `Elija un ${nombreFormulario} para poder eliminar`
         );
         funcionAbrirAlerta();
         funcionCerrarDialogo();
         return;
      }

      await MarcaService.EliminarUno(itemEdicion.id)
         .then((response) => {
            if (response.data.code === 200) {
               funcionAsignarAlerta(
                  "success",
                  `${nombreFormulario} se eliminó correctamente`
               );
               funcionAbrirAlerta();
               funcionCerrarDialogo();
               funcionListar();
               return;
            }
         })
         .catch((error) => {
            funcionAsignarAlerta("error", "Hubo un error");
            funcionAbrirAlerta();
            funcionCerrarDialogo();
            return;
         });
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
         <Typography
            variant="h5"
            component={"h2"}
            style={{ textAlign: "center", margin: "50px 0 20px 0" }}
         >
            {nombreFormulario}
         </Typography>
         <ToolbarControl
            functionCrear={funcionCrear}
            functionActualizar={funcionEditar}
            functionEliminar={funcionAbrirDialogo}
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
            funcionAsignarAlerta={funcionAsignarAlerta}
            funcionAbrirAlerta={funcionAbrirAlerta}
            arrayCategorias={arrayCategoria}
         />
         <Snackbar
            open={abrirAlerta}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={3000}
            onClose={funcionCerrarAlerta}
         >
            <Alert onClose={funcionCerrarAlerta} severity={alerta.type}>
               {alerta.text}
            </Alert>
         </Snackbar>
         <Dialog
            open={dialogo}
            onClose={funcionCerrarDialogo}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
         >
            <DialogTitle id="alert-dialog-title">¿Desea continuar?</DialogTitle>
            <DialogContent>
               <DialogContentText id="alert-dialog-description">
                  {`Este proceso eliminará el/la ${nombreFormulario.toLowerCase()}: ${
                     arrayMarca.find(
                        (item) =>
                           item.id ===
                           (marcaSeleccionada ? marcaSeleccionada.id : 0)
                     )?.marca_nombre
                  }`}
               </DialogContentText>
            </DialogContent>
            <DialogActions>
               <Button onClick={funcionCerrarDialogo} autoFocus>
                  Cancelar
               </Button>
               <Button color="error" onClick={funcionEliminar}>
                  Eliminar
               </Button>
            </DialogActions>
         </Dialog>
      </ContainerBodyStyled>
   );
};
