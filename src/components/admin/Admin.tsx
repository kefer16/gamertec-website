import { Link } from "react-router-dom";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";

export const Admin = () => {
   return (
      <>
         <ContainerBodyStyled>
            <h2 style={{ textAlign: "center" }}>Administrador</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
               <Link to={"/admin/category/"}>Ir a Categoria</Link>
               <Link to={"/admin/brand/"}>Ir a Marca</Link>
               <Link to={"/admin/model/"}>Ir a Modelo</Link>
               <Link to={"/admin/product/"}>Ir a Productos</Link>
               <Link to={"/admin/privilege/"}>Ir a Privilegio</Link>
               <Link to={"/admin/user/"}>Ir a Usuario</Link>
               <Link to={"/admin/order/"}>Ir a Pedidos</Link>
            </div>
         </ContainerBodyStyled>
      </>
   );
};
