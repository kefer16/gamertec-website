import Compressor from "compressorjs";
import {
   ChangeEvent,
   useCallback,
   useContext,
   useEffect,
   useState,
} from "react";
import { ModeloEntity } from "../../../entities/modelo.entity";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import {
   DropdownProps,
   DropdownPropsAnidado,
   estadoCategoria,
} from "../categoria/CategoriaRegistro";
import {
   fechaActualISO,
   fechaVisualizarCalendario,
} from "../../../utils/funciones.utils";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import {
   ColorPicker,
   ColorPickerChangeEvent,
   ColorPickerHSBType,
   ColorPickerRGBType,
} from "primereact/colorpicker";
import {
   InputNumber,
   InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { ModeloService } from "../../../services/modelo.service";

interface Props {
   nombreFormulario: string;
   abrir: boolean;
   esEdicion: boolean;
   itemSeleccionado: ModeloEntity;
   funcionCerrarModal: () => void;
   funcionActualizarTabla: () => void;
   arrayCategorias: DropdownProps[];
   arrayMarcas: DropdownPropsAnidado[];
}

export interface ChangeValueSelect {
   valorPadre: string;
   valorHijo: string;
}
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
   const [precio, setPrecio] = useState<number>(0.0);
   const [fechaRegistro, setFechaRegistro] = useState<string | Date | Date[]>(
      new Date()
   );
   const [activo, setActivo] = useState<DropdownProps>({
      code: "0",
      name: "Inactivo",
   });
   const [arrayEstado] = useState<DropdownProps[]>(estadoCategoria);

   const [fkMarca, setFkMarca] = useState<DropdownPropsAnidado>(
      {} as DropdownPropsAnidado
   );
   const [fkCategoria, setFkCategoria] = useState<DropdownProps>(
      {} as DropdownProps
   );
   const [arrayAnidadoMarca, setArrayAnidadoMarca] = useState<
      DropdownPropsAnidado[]
   >([]);

   const [seleccionaImagen, setSeleccionaImagen] = useState<string | null>(
      null
   );

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
   useEffect(() => {
      setModeloId(itemSeleccionado.modelo_id);
      setNombre(itemSeleccionado.nombre);
      setDescripcion(itemSeleccionado.descripcion);
      setFoto(itemSeleccionado.foto);
      setSeleccionaImagen(itemSeleccionado.foto);
      setCaracteristicas(itemSeleccionado.caracteristicas);
      setColor(itemSeleccionado.color);
      setPrecio(itemSeleccionado.precio);
      setFechaRegistro(
         fechaVisualizarCalendario(itemSeleccionado.fecha_registro)
      );
      setActivo(
         itemSeleccionado.activo
            ? { code: "1", name: "Activo" }
            : { code: "0", name: "Inactivo" }
      );
      funcionObtenerMarcaPorCategoria({
         valorPadre: String(itemSeleccionado.fk_categoria),
         valorHijo: String(itemSeleccionado.fk_marca),
      });
   }, [itemSeleccionado, funcionObtenerMarcaPorCategoria]);

   const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data: ModeloEntity = new ModeloEntity(
         modeloId,
         nombre,
         descripcion,
         foto ? foto : "",
         caracteristicas,
         color.toString(),
         precio,
         fechaActualISO(),
         activo.code === "1",
         parseInt(fkMarca.code),
         parseInt(fkCategoria.code)
      );

      const srvModelo = new ModeloService();

      if (esEdicion) {
         await srvModelo
            .actualizar(modeloId, data)
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
         await srvModelo
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

   const funcionCargarImagen = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         if (file.size > 2000000) {
            mostrarNotificacion({
               tipo: "warn",
               detalle: "Archivo demasiado grande",
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
                  detalle: error.message,
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

                     <InputTextarea
                        id="input-caracteristicas"
                        style={{ width: "100%" }}
                        name="caracteristicas"
                        autoResize
                        value={caracteristicas}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                           setCaracteristicas(e.target.value)
                        }
                        rows={5}
                        cols={30}
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

                     <InputNumber
                        inputId="input-precio"
                        style={{ width: "100%" }}
                        value={precio}
                        onValueChange={(e: InputNumberValueChangeEvent) =>
                           setPrecio(e.value ?? 0)
                        }
                        mode="currency"
                        currency="PEN"
                        locale="es-ES"
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
