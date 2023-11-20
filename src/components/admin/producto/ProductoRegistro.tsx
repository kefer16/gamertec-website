import { useCallback, useContext, useEffect, useState } from "react";
import {
   fechaActualISO,
   fechaVisualizarCalendario,
} from "../../../utils/funciones.utils";

import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
   DropdownProps,
   DropdownPropsAnidado,
   estadoCategoria,
} from "../categoria/CategoriaRegistro";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { ChangeValueSelect } from "../modelo/ModeloRegistro";
import { ProductoEntity } from "../../../entities/producto.entities";
import { ProductoService } from "../../../services/producto.service";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: ProductoEntity;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
   arrayCategorias: DropdownProps[];
   arrayMarcas: DropdownPropsAnidado[];
   arrayModelos: DropdownPropsAnidado[];
}

export const ProductoRegistro = ({
   nombreFormulario,
   abrir,
   esEdicion,
   itemSeleccionado,
   funcionCerrarModal,
   funcionActualizarTabla,
   arrayCategorias,
   arrayMarcas,
   arrayModelos,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [productoId, setProductoId] = useState(0);
   const [numeroSerie, setNumeroSerie] = useState("");
   const [fkModelo, setFkModelo] = useState<DropdownPropsAnidado>(
      {} as DropdownPropsAnidado
   );
   const [fkMarca, setFkMarca] = useState<DropdownPropsAnidado>(
      {} as DropdownPropsAnidado
   );
   const [fkCategoria, setFkCategoria] = useState<DropdownProps>(
      {} as DropdownProps
   );
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [activo, setActivo] = useState<DropdownProps>({
      code: "0",
      name: "Inactivo",
   });
   const [arrayAnidadoMarca, setArrayAnidadoMarca] = useState<
      DropdownPropsAnidado[]
   >([]);
   const [arrayAnidadoModelo, setArrayAnidadoModelo] = useState<
      DropdownPropsAnidado[]
   >([]);
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   const funcionObtenerMarcaPorCategoria = useCallback(
      ({ valorPadre, valorHijo }: ChangeValueSelect) => {
         const valorCategoria = arrayCategorias.find(
            (item) => item.code === valorPadre
         ) ?? { code: "", name: "" };

         setFkCategoria({
            code: valorCategoria.code,
            name: valorCategoria.name,
         });
         const arrayNuevo: DropdownPropsAnidado[] = arrayMarcas.filter(
            (item) => item.codeAnidado === valorPadre
         );

         const valorMarca = arrayNuevo.find(
            (item) => item.code === valorHijo
         ) ?? { code: "", name: "", codeAnidado: "" };

         setArrayAnidadoMarca(arrayNuevo);
         setFkMarca(valorMarca);
      },
      [arrayCategorias, arrayMarcas]
   );

   const funcionObtenerModeloPorMarca = useCallback(
      ({ valorPadre, valorHijo }: ChangeValueSelect) => {
         const valorMarca = arrayMarcas.find(
            (item) => item.code === valorPadre
         ) ?? { codeAnidado: "", code: "", name: "" };

         setFkMarca({
            codeAnidado: valorMarca.codeAnidado,
            code: valorMarca.code,
            name: valorMarca.name,
         });
         const arrayNuevo: DropdownPropsAnidado[] = arrayModelos.filter(
            (item) => item.codeAnidado === valorPadre
         );

         const valorModelo = arrayNuevo.find(
            (item) => item.code === valorHijo
         ) ?? { code: "", name: "", codeAnidado: "" };

         setArrayAnidadoModelo(arrayNuevo);
         setFkModelo(valorModelo);
      },
      [arrayMarcas, arrayModelos]
   );

   useEffect(() => {
      setProductoId(itemSeleccionado.producto_id);
      setFechaRegistro(
         fechaVisualizarCalendario(itemSeleccionado.fecha_registro)
      );
      setNumeroSerie(itemSeleccionado.numero_serie);
      setActivo(
         itemSeleccionado.activo
            ? {
                 code: "1",
                 name: "Activo",
              }
            : {
                 code: "0",
                 name: "Inactivo",
              }
      );

      funcionObtenerMarcaPorCategoria({
         valorPadre: String(itemSeleccionado.fk_categoria),
         valorHijo: String(itemSeleccionado.fk_marca),
      });

      funcionObtenerModeloPorMarca({
         valorPadre: String(itemSeleccionado.fk_marca),
         valorHijo: String(itemSeleccionado.fk_modelo),
      });
   }, [
      itemSeleccionado,
      arrayMarcas,
      arrayModelos,
      funcionObtenerMarcaPorCategoria,
      funcionObtenerModeloPorMarca,
   ]);

   const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: ProductoEntity = new ProductoEntity(
         productoId,
         numeroSerie,
         parseInt(fkModelo.code),
         parseInt(fkMarca.code),
         parseInt(fkCategoria.code),
         fechaActualISO(),
         activo.code === "1",
         false
      );
      const srvProducto = new ProductoService();
      if (esEdicion) {
         await srvProducto
            .actualizar(productoId, data)
            .then(() => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `${nombreFormulario} se actualizó correctamente`,
               });
               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: error.message,
               });
            });
      } else {
         await srvProducto
            .registrar(data)
            .then(() => {
               mostrarNotificacion({
                  tipo: "success",
                  detalle: `${nombreFormulario} se registró correctamente`,
               });
               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: error.message,
               });
            });
      }
   };
   return (
      <>
         <Dialog
            header={`Registrar ${nombreFormulario}`}
            visible={abrir}
            onHide={funcionCerrarModal}
            headerStyle={{ background: "#f8f9fa" }}
            contentStyle={{ padding: "0px" }}
         >
            <form
               onSubmit={(e) => funcionGuardar(e)}
               style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "0 24px 24px 24px",
                  background: "#f8f9fa",
               }}
            >
               <div
                  style={{
                     width: "100%",
                     padding: "24px",
                     height: "300px",
                     overflowY: "auto",
                     background: "#fff",
                     border: "1px solid #cccccc75",
                  }}
               >
                  <div>
                     <label htmlFor="calendar">Fecha Registro</label>
                     <Calendar
                        id="calendar"
                        dateFormat="dd/mm/yy"
                        showTime
                        hourFormat="24"
                        style={{ width: "100%" }}
                        value={fechaRegistro}
                        onChange={(e) => setFechaRegistro(e.value ?? "")}
                        showIcon
                        disabled
                     />
                  </div>
                  <div>
                     <label htmlFor="select-categoria">Categoria</label>
                     <Dropdown
                        id="select-categoria"
                        style={{ width: "100%" }}
                        value={fkCategoria}
                        onChange={(e: DropdownChangeEvent) => {
                           setFkCategoria(e.value);
                           funcionObtenerMarcaPorCategoria({
                              valorPadre: e.value.code,
                              valorHijo: "0",
                           });
                        }}
                        options={arrayCategorias}
                        optionLabel="name"
                        placeholder="Selec. Categoria"
                     />
                  </div>

                  <div>
                     <label htmlFor="select-marca">Marca</label>
                     <Dropdown
                        id="select-marca"
                        style={{ width: "100%" }}
                        value={fkMarca}
                        onChange={(e: DropdownChangeEvent) => {
                           setFkMarca(e.value);
                           funcionObtenerModeloPorMarca({
                              valorPadre: e.value.code,
                              valorHijo: "0",
                           });
                        }}
                        options={arrayAnidadoMarca}
                        optionLabel="name"
                        placeholder="Selec. Marca"
                     />
                  </div>
                  <div>
                     <label htmlFor="select-modelo">Modelo</label>
                     <Dropdown
                        id="select-modelo"
                        style={{ width: "100%" }}
                        value={fkModelo}
                        onChange={(e: DropdownChangeEvent) =>
                           setFkModelo(e.value)
                        }
                        options={arrayAnidadoModelo}
                        optionLabel="name"
                        placeholder="Selec. Modelo"
                     />
                  </div>

                  <div>
                     <label htmlFor="input-numero-serie">Número de Serie</label>
                     <InputText
                        id="input-nombre"
                        type="text"
                        name="numero_serie"
                        style={{ width: "100%" }}
                        value={numeroSerie}
                        onChange={(event) => setNumeroSerie(event.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="select-estado">Estado</label>
                     <Dropdown
                        id="select-estado"
                        style={{ width: "100%" }}
                        value={activo}
                        onChange={(e: DropdownChangeEvent) =>
                           setActivo(e.value)
                        }
                        options={arrayEstado}
                        optionLabel="name"
                        placeholder="Todas las Categorias"
                     />
                  </div>
               </div>
               <Button
                  style={{ marginTop: "24px" }}
                  severity={esEdicion ? "warning" : "success"}
                  type="submit"
                  label={esEdicion ? "Editar" : "Registrarse"}
               />
            </form>
         </Dialog>
      </>
   );
};
