import { useEffect, useState, useContext, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { IconSearch } from "@tabler/icons-react";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { formatoMonedaPerunana } from "../../utils/funciones.utils";
import { CategoriaService } from "../../services/categoria.service";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { ModeloPorFiltroResponse } from "../../responses/modelo.response";
import { ModeloService } from "../../services/modelo.service";
interface DropdownProps {
   name: string;
   code: string;
}
let arrayCategoria: DropdownProps[] = [];

export const Products = () => {
   const { mostrarNotificacion } = useContext(GamertecSesionContext);

   const [categoria, setCategoria] = useState<DropdownProps>({
      code: "0",
      name: "Todas las Categorias",
   });
   const [nombreModelo, setNombreModelo] = useState<string>("");
   const [arrayModelo, setArrayModelo] = useState<ModeloPorFiltroResponse[]>(
      []
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

   const funObtenerModelos = useCallback(
      async (categoria_id: number, nombre_modelo: string) => {
         const srvModelo = new ModeloService();
         await srvModelo
            .listarModelosPorFiltro(categoria_id, nombre_modelo)
            .then((resp) => {
               setArrayModelo(resp);
            })
            .catch((error: Error) => {
               mostrarNotificacion({
                  tipo: "error",
                  detalle: error.message,
               });
            });
      },
      [mostrarNotificacion]
   );

   useEffect(() => {
      funObtenerCategorias();
      funObtenerModelos(0, "");
   }, [funObtenerCategorias, funObtenerModelos]);

   const funcionAsignarFiltroCategoria = async (
      event: React.FormEvent<HTMLFormElement>,
      categoria_id: number,
      nombre_modelo: string
   ) => {
      event.preventDefault();
      await funObtenerModelos(categoria_id, nombre_modelo);
   };

   return (
      <ContainerBodyStyled>
         <h2 className="text-2xl text-center">Productos</h2>

         <form
            className="flex flex-start justify-content-between"
            onSubmit={(event) =>
               funcionAsignarFiltroCategoria(
                  event,
                  parseInt(categoria.code),
                  nombreModelo
               )
            }
         >
            <Dropdown
               className="w-3 mr-3"
               value={categoria}
               onChange={(e: DropdownChangeEvent) => setCategoria(e.value)}
               options={arrayCategoria}
               optionLabel="name"
               placeholder="Todas las Categorias"
            />

            <InputText
               className="flex-auto"
               id="search"
               type="text"
               name="search"
               placeholder="Buscar por nombre de producto"
               value={nombreModelo}
               onChange={(event) =>
                  setNombreModelo(event.target.value as string)
               }
            />
            <Button icon={<IconSearch size={24} />} type="submit" />
         </form>
         <div className="w-full my-3">
            {arrayModelo.length <= 0 ? (
               <p
                  style={{
                     width: "100%",
                     lineHeight: "40px",
                     fontSize: "0.8em",
                     textAlign: "center",
                     fontWeight: "300",
                  }}
               >
                  Tu búsqueda no coincide con ningun resultado, ingrese otro
                  producto
               </p>
            ) : (
               <div
                  style={{
                     width: "100%",
                     display: "grid",
                     height: "auto",
                     gridTemplateColumns: "repeat(4, 1fr)",
                     gap: "1.5rem",
                  }}
               >
                  {arrayModelo.map((item: ModeloPorFiltroResponse) => {
                     return (
                        <CardProduct
                           className="shadow-2"
                           key={item.modelo_id}
                           to={`/product/description/${item.modelo_id}`}
                           state={item.modelo_id}
                        >
                           <CardImageProduct src={item.foto} alt="img_card" />
                           <CardTextProduct>
                              <CardTextProductBrand>
                                 {item.cls_marca.nombre}
                              </CardTextProductBrand>
                              <CardTextProductTitle>
                                 {item.descripcion.length > 45
                                    ? `${item.descripcion.substring(0, 45)}...`
                                    : item.descripcion}
                              </CardTextProductTitle>
                              <CardTextProductPrice>
                                 {formatoMonedaPerunana(item.precio)}
                              </CardTextProductPrice>
                           </CardTextProduct>
                        </CardProduct>
                     );
                  })}
               </div>
            )}
         </div>
      </ContainerBodyStyled>
   );
};

const CardProduct = styled(Link)`
   width: 100%;
   border-radius: 10px;
   text-decoration: none;
   transition: 0.2s;
   &:hover {
      transform: translateY(-2px);
      filter: brightness(85%);
   }
`;

const CardImageProduct = styled.img`
   border-radius: 10px 10px 0 0;
   width: 100%;
   height: 250px;
   display: block;
   border-bottom: 1px solid rgba(128, 128, 128, 0.3);
   object-fit: scale-down;
   background-color: #fff;
`;

const CardTextProduct = styled.div`
   width: 1fr;
   padding: 10px 20px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   border-radius: 0 0 5px 5px;
`;

const CardTextProductBrand = styled.p`
   display: block;
   font-size: 0.8em;
   color: #999;
   font-weight: 800;
`;

const CardTextProductTitle = styled.p`
   display: block;
   color: #000;
   margin: 5px 0;
   font-weight: 300;
`;
const CardTextProductPrice = styled.span`
   display: block;
   color: #ca2f2f;
   font-size: 1.1em;
   font-weight: 700;
   font-style: italic;
`;
