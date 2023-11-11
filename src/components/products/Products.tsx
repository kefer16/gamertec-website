import { useEffect, useState } from "react";
import { funcionObtenerCategorias } from "../admin/categoria/Categoria";
import styled from "styled-components";
import { funcionListarModelosPorFiltro } from "../../apis/producto.api";
import { Link } from "react-router-dom";
import { ModeloPorFiltroProps } from "../../interfaces/modelo.interface";
import { InputText } from "primereact/inputtext";
// import { IconSearch } from "@tabler/icons-react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { IconSearch } from "@tabler/icons-react";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { formatoMonedaPerunana } from "../../utils/funciones.utils";

interface DropdownProps {
   name: string;
   code: string;
}

export const Products = () => {
   const [categoria, setCategoria] = useState<DropdownProps>({
      code: "0",
      name: "Todas las Categorias",
   });
   const [nombreModelo, setNombreModelo] = useState<string>("");
   const [arrayCategoria, setArrayCategoria] = useState<DropdownProps[]>([]);
   const [arrayModelo, setArrayModelo] = useState<ModeloPorFiltroProps[]>([]);
   useEffect(() => {
      const obtenerData = async () => {
         let array: DropdownProps[] = [];
         await funcionObtenerCategorias().then((resp: DropdownProps[]) => {
            if (resp) {
               array = resp.map((item) => ({
                  code: item.code,
                  name: item.name,
               }));
            }
         });

         setArrayCategoria([
            { code: "0", name: "Todas las Categorias" },
            ...array,
         ]);

         await funcionListarModelosPorFiltro(0, "").then((response) => {
            setArrayModelo(response);
         });
      };

      obtenerData();
   }, []);

   const funcionAsignarFiltroCategoria = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();
      await funcionListarModelosPorFiltro(
         parseInt(categoria.code),
         nombreModelo
      ).then((response: ModeloPorFiltroProps[]) => {
         setArrayModelo(response);
      });
   };

   return (
      <ContainerBodyStyled>
         <h2 className="text-2xl text-center">Productos</h2>

         <form
            className="flex flex-start justify-content-between"
            onSubmit={funcionAsignarFiltroCategoria}
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
                  {arrayModelo.map((item: ModeloPorFiltroProps) => {
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
