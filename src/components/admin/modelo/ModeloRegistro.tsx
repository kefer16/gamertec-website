import Compressor from "compressorjs";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
   ComboboxProps,
   ComboboxAnidadoProps,
} from "../../../interfaces/combobox.interface";
import { ModeloEntity } from "../../../entities/modelo.entity";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DropdownProps, estadoCategoria } from "../categoria/CategoriaRegistro";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import {
   ColorPicker,
   ColorPickerChangeEvent,
   ColorPickerHSBType,
   ColorPickerRGBType,
} from "primereact/colorpicker";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: ModeloEntity;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
   arrayCategorias: ComboboxProps[];
   arrayMarcas: ComboboxAnidadoProps[];
}

// interface ChangeValueSelect {
//    valorCategoria: string;
//    valorMarca: string;
// }
export const ModeloRegistro = ({
   nombreFormulario,
   abrir,
   esEdicion,
   itemSeleccionado,
   funcionCerrarModal,
   funcionActualizarTabla,
   arrayCategorias,
   arrayMarcas,
}: Props) => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);
   const [modeloId, setModeloId] = useState(0);
   const [nombre, setNombre] = useState("");
   const [descripcion, setDescripcion] = useState("");
   const [foto, setFoto] = useState<string | null>(null);
   const [caracteristicas, setCaracteristicas] = useState("");
   const [color, setColor] = useState<
      string | ColorPickerRGBType | ColorPickerHSBType
   >("");
   const [precio, setPrecio] = useState("0");
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [stock, setStock] = useState("0");
   const [numeroSeries, setNumeroSeries] = useState("0");
   const [activo, setActivo] = useState("0");
   const [fkMarca, setFkMarca] = useState("0");
   const [fkCategoria, setFkCategoria] = useState("0");
   const [arrayAnidadoMarca, setArrayAnidadoMarca] = useState<
      ComboboxAnidadoProps[]
   >([]);

   const [seleccionaImagen, setSeleccionaImagen] = useState<string | null>(
      null
   );

   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   useEffect(() => {
      setModeloId(itemSeleccionado.modelo_id);
      setNombre(itemSeleccionado.nombre);
      setDescripcion(itemSeleccionado.descripcion);
      setFoto(itemSeleccionado.foto);

      setSeleccionaImagen(itemSeleccionado.foto);
      setCaracteristicas(itemSeleccionado.caracteristicas);
      setColor(itemSeleccionado.color);
      setPrecio(String(itemSeleccionado.precio));
      setFechaRegistro(itemSeleccionado.fecha_registro);
      setStock(String(itemSeleccionado.stock));
      setActivo(itemSeleccionado.activo ? "1" : "0");
      setFkCategoria(String(itemSeleccionado.fk_categoria));
      const nuevoArray: ComboboxAnidadoProps[] = arrayMarcas.filter(
         (item) => item.valor === itemSeleccionado.fk_categoria
      );
      setArrayAnidadoMarca(nuevoArray);
      setFkMarca(String(itemSeleccionado.fk_marca));
   }, [itemSeleccionado, arrayMarcas]);

   // const funcionObtenerMarcaPorCategoria = ({
   //    valorCategoria,
   //    valorMarca,
   // }: ChangeValueSelect) => {
   //    setFkCategoria(valorCategoria);
   //    const arrayNuevo: ComboboxAnidadoProps[] = arrayMarcas.filter(
   //       (item) => item.valor === parseInt(valorCategoria)
   //    );

   //    setArrayAnidadoMarca(arrayNuevo);
   //    setFkMarca(valorMarca);
   // };

   const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: ModeloEntity = new ModeloEntity(
         modeloId,
         nombre,
         descripcion,
         foto ? foto : "",
         caracteristicas,
         color.toString(),
         parseInt(precio),
         fechaActualISO(),
         parseInt(stock),
         activo === "1",
         parseInt(fkMarca),
         parseInt(fkCategoria)
      );

      if (esEdicion) {
         await ModeloEntity.Actualizar(modeloId, data)
            .then((response) => {
               mostrarNotificacion({
                  tipo: "success",
                  titulo: "Exito",
                  detalle: `${nombreFormulario} se actualizó correctamente`,
                  pegado: false,
               });
               funcionActualizarTabla();
               funcionCerrarModal();
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: true,
               });
            });
      } else {
         await ModeloEntity.Registrar(data)
            .then((response) => {
               if (response.data.code === 200) {
                  mostrarNotificacion({
                     tipo: "success",
                     titulo: "Exito",
                     detalle: `${nombreFormulario} se registró correctamente`,
                     pegado: false,
                  });
                  funcionActualizarTabla();
                  funcionCerrarModal();
               }
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: true,
               });
            });
      }
   };

   const funcionCargarImagen = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         if (file.size > 2000000) {
            mostrarNotificacion({
               tipo: "warn",
               titulo: "Alerta",
               detalle: "Archivo demasiado grande",
               pegado: false,
            });

            return;
         }
         setSeleccionaImagen(URL.createObjectURL(file));
         new Compressor(file, {
            quality: 0.6, // Ajustar la calidad de compresión (0.1 - 1)
            maxWidth: 300, // Ajustar el ancho máximo de la imagen
            maxHeight: 300, // Ajustar la altura máxima de la imagen
            success(result) {
               // `result` es el archivo comprimido
               const reader = new FileReader();
               reader.readAsDataURL(result);

               reader.onload = () => {
                  const compressedImage = reader.result as string;
                  setFoto(compressedImage);
               };
            },
            error(error: Error) {
               mostrarNotificacion({
                  tipo: "error",
                  titulo: "Error",
                  detalle: error.message,
                  pegado: true,
               });
            },
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
                           setFkCategoria(e.value)
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
                     <label htmlFor="input-nombre-modelo">Nombre Modelo</label>
                     <InputText
                        id="input-nombre-modelo"
                        type="text"
                        name="nombre"
                        style={{ width: "100%" }}
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                     />
                  </div>

                  <div>
                     <label htmlFor="input-nombre-producto">
                        Nombre Producto
                     </label>
                     <InputText
                        id="input-nombre-producto"
                        type="text"
                        name="nombre_producto"
                        style={{ width: "100%" }}
                        value={descripcion}
                        onChange={(event) => setDescripcion(event.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="input-nombre-producto">Imagen</label>
                     <div
                        style={{
                           display: "flex",
                           padding: "10px",
                           flexDirection: "column",
                           border: "1px solid #ccc",
                           borderRadius: "7px",
                        }}
                     >
                        <p style={{ color: "#666", fontSize: "0.8em" }}>
                           Previsualización
                        </p>
                        {seleccionaImagen ? (
                           <img
                              src={seleccionaImagen}
                              style={{
                                 width: "100%",
                                 height: "200px",
                                 objectFit: "scale-down",
                                 border: "1px solid #ccc",
                                 borderRadius: "7px",
                              }}
                              alt="Selected"
                           />
                        ) : (
                           <img
                              src="https://placehold.co/300"
                              style={{
                                 width: "100%",
                                 height: "200px",
                                 objectFit: "scale-down",
                                 border: "1px solid #ccc",
                                 borderRadius: "7px",
                              }}
                              alt="Selected"
                           />
                        )}
                        <input
                           style={{ marginTop: "10px" }}
                           type="file"
                           accept="image/*"
                           onChange={funcionCargarImagen}
                        />
                     </div>
                  </div>
                  <div>
                     <label htmlFor="input-caracteristicas">
                        Caracteristicas
                     </label>
                     <InputText
                        id="input-caracteristicas"
                        type="text"
                        name="caracteristicas"
                        style={{ width: "100%" }}
                        value={caracteristicas}
                        onChange={(event) =>
                           setCaracteristicas(event.target.value)
                        }
                     />
                  </div>
                  <div>
                     <label htmlFor="input-color">Color</label>
                     <ColorPicker
                        style={{ width: "100%" }}
                        inputId="input-color"
                        format="hex"
                        value={color}
                        onChange={(e: ColorPickerChangeEvent) =>
                           setColor(e.value ?? "")
                        }
                     />
                  </div>
                  <div>
                     <label htmlFor="input-precio">Precio</label>
                     <InputText
                        id="input-precio"
                        type="number"
                        name="precio"
                        style={{ width: "100%" }}
                        value={precio}
                        onChange={(event) => setPrecio(event.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="input-stock">Stock</label>
                     <InputText
                        id="input-stock"
                        type="number"
                        name="stock"
                        style={{ width: "100%" }}
                        value={stock}
                        onChange={(event) => setStock(event.target.value)}
                     />
                  </div>
                  <div>
                     <label htmlFor="input-numero-serie">
                        Numeros de Serie
                     </label>
                     <InputText
                        id="input-numero-serie"
                        type="text"
                        name="numero_serie"
                        style={{ width: "100%" }}
                        value={numeroSeries}
                        onChange={(event) =>
                           setNumeroSeries(event.target.value)
                        }
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
