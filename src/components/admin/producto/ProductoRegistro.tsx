import { useContext, useEffect, useState } from "react";
import { fechaActualISO } from "../../../utils/funciones.utils";

import { ProductoService } from "../../../entities/producto.entities";
import { ComboboxAnidadoProps } from "../../../interfaces/combobox.interface";
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

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: ProductoService;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
   arrayCategorias: DropdownProps[];
   arrayMarcas: DropdownPropsAnidado[];
   arrayModelos: ComboboxAnidadoProps[];
}

// interface ChangeValueSelect {
//    valor: string;
//    valorAnidado: string;
// }
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
   const [fkModelo, setFkModelo] = useState("0");
   const [fkMarca, setFkMarca] = useState("0");
   const [fkCategoria, setFkCategoria] = useState("0");
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [activo, setActivo] = useState("0");

   const [arrayAnidadoMarca, setArrayAnidadoMarca] = useState<
      DropdownPropsAnidado[]
   >([]);
   const [arrayAnidadoModelo, setArrayAnidadoModelo] = useState<
      ComboboxAnidadoProps[]
   >([]);
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   useEffect(() => {
      setProductoId(itemSeleccionado.producto_id);
      setFechaRegistro(itemSeleccionado.fecha_registro);
      setNumeroSerie(itemSeleccionado.numero_serie);
      setActivo(itemSeleccionado.activo ? "1" : "0");

      setFkCategoria(String(itemSeleccionado.fk_categoria));

      const nuevoArrayMarca: DropdownPropsAnidado[] = arrayMarcas.filter(
         (item) => item.code === String(itemSeleccionado.fk_categoria)
      );
      setArrayAnidadoMarca(nuevoArrayMarca);
      setFkMarca(String(itemSeleccionado.fk_marca));

      const nuevoArrayModelo: ComboboxAnidadoProps[] = arrayModelos.filter(
         (item) => item.valor === itemSeleccionado.fk_marca
      );
      setArrayAnidadoModelo(nuevoArrayModelo);
      setFkModelo(String(itemSeleccionado.fk_modelo));
   }, [itemSeleccionado, arrayMarcas, arrayModelos]);

   // const funcionObtenerMarcaPorCategoria = ({
   //    valor,
   //    valorAnidado,
   // }: ChangeValueSelect) => {
   //    setFkCategoria(valor);
   //    const arrayNuevo: ComboboxAnidadoProps[] = arrayMarcas.filter(
   //       (item) => item.valor === parseInt(valor)
   //    );

   //    setArrayAnidadoMarca(arrayNuevo);
   //    setFkMarca(valorAnidado);
   // };

   // const funcionObtenerModeloPorMarca = ({
   //    valor,
   //    valorAnidado,
   // }: ChangeValueSelect) => {
   //    setFkMarca(valor);
   //    const arrayNuevo: ComboboxAnidadoProps[] = arrayModelos.filter(
   //       (item) => item.valor === parseInt(valor)
   //    );

   //    setArrayAnidadoModelo(arrayNuevo);
   //    setFkModelo(valorAnidado);
   // };

   const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: ProductoService = new ProductoService(
         productoId,
         numeroSerie,
         parseInt(fkModelo),
         parseInt(fkMarca),
         parseInt(fkCategoria),
         fechaActualISO(),
         activo === "1",
         false
      );
      if (esEdicion) {
         await ProductoService.Actualizar(productoId, data)
            .then((response) => {
               if (response.data.code === 200) {
                  mostrarNotificacion({
                     tipo: "warn",
                     titulo: "Alerta",
                     detalle: `${nombreFormulario} se actualizó correctamente`,
                     pegado: false,
                  });
                  funcionActualizarTabla();
                  funcionCerrarModal();
                  return;
               }
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "warn",
                  titulo: "Alerta",
                  detalle: error.message,
                  pegado: false,
               });
               return;
            });
      } else {
         await ProductoService.Registrar(data)
            .then((response) => {
               mostrarNotificacion({
                  tipo: "success",
                  titulo: "Exito",
                  detalle: `${nombreFormulario} se registró correctamente`,
                  pegado: false,
               });
               funcionActualizarTabla();
               funcionCerrarModal();
               return;
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "success",
                  titulo: "Exito",
                  detalle: error.message,
                  pegado: false,
               });
               return;
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
                        onChange={(e: DropdownChangeEvent) =>
                           setActivo(e.value)
                        }
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
                        onChange={(e: DropdownChangeEvent) =>
                           setFkMarca(e.value)
                        }
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
