import { useContext, useEffect, useRef, useState } from "react";

import { GamertecSesionContext, privilegio } from "../sesion/Sesion.component";

import { Menubar } from "primereact/menubar";
import { useNavigate } from "react-router-dom";

import {
   IconAddressBook,
   IconBuildingStore,
   IconHome2,
   IconLayoutDashboard,
   IconLogout,
   IconLogout2,
   IconShoppingBag,
   IconUserUp,
} from "@tabler/icons-react";

import IconGamertec from "../../images/svg/icon-gamertec.svg";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { IconShoppingCart } from "@tabler/icons-react";
import { Badge } from "primereact/badge";

export const Header = () => {
   const {
      sesionGamertec,
      cerrarSesion,
      obtenerSesion,
      cantidadCarrito,
      privilegio,
      obtenerCantidadCarrito,
   } = useContext(GamertecSesionContext);
   const [cantidadCarritoCabecera, setCantidadCarritoCabecera] =
      useState<number>(0);
   interface MenuItemBar {
      privilegio?: privilegio[];
      label?: string;
      icon?: JSX.Element;
      command?: () => void;
      separator?: boolean;
   }

   interface MenuItem {
      privilegio?: privilegio[];
      label?: string;
      icon?: JSX.Element;
      command?: () => void;
      separator?: boolean;
   }

   const irInicio = () => {
      navigate("/");
   };

   const irCarrito = () => {
      navigate("/shoping_cart/");
   };

   const navigate = useNavigate();
   const items: MenuItemBar[] = [
      {
         privilegio: ["INV", "ADM", "USU"],
         label: "Inicio",
         icon: <IconHome2 size={24} style={{ marginRight: "10px" }} />,
         command: () => {
            navigate("/");
         },
      },
      {
         privilegio: ["INV", "ADM", "USU"],
         label: "Productos",
         icon: <IconBuildingStore size={24} style={{ marginRight: "10px" }} />,
         command: () => {
            navigate("/products/");
         },
      },
      {
         privilegio: ["INV", "ADM", "USU"],
         label: "Contacto",
         icon: <IconAddressBook size={24} style={{ marginRight: "10px" }} />,
         command: () => {
            navigate("/contact/");
         },
      },
      {
         privilegio: ["INV"],
         label: "",
         icon: (
            <Button
               icon={<IconLogout size={24} style={{ marginRight: "10px" }} />}
               label="Acceder"
               style={{ height: "24px", margin: "0px", padding: 0 }}
               text
               className="border-none"
            />
         ),
         command: () => {
            navigate("/login/");
         },
      },
   ];

   const start = (
      <img
         alt="logo"
         src={IconGamertec}
         height="48px"
         className="mr-2 cursor-pointer"
         onClick={irInicio}
      />
   );
   const end = (
      <div className="flex align-items-center">
         {privilegio === "USU" && (
            <Button
               className="p-button-badge"
               rounded
               link
               icon={<IconShoppingCart size={24} />}
               onClick={irCarrito}
            >
               <Badge value={cantidadCarritoCabecera} severity="danger"></Badge>
            </Button>
         )}

         {["USU", "ADM"].includes(privilegio) && (
            <Avatar
               className="shadow-1 ml-2 img"
               image={sesionGamertec.usuario.foto}
               style={{ width: "48px", height: "48px", objectFit: "cover" }}
               shape="circle"
               onClick={(event) => menuRight.current?.toggle(event)}
            />
         )}
      </div>
   );

   const menuRight = useRef<Menu>(null);
   //const router = useRouter();

   const itemsAcount: MenuItem[] = [
      {
         privilegio: ["ADM", "USU"],
         icon: (
            <button className="w-full p-link flex align-items-center">
               <Avatar
                  image={sesionGamertec.usuario.foto}
                  className="mr-2"
                  shape="circle"
               />
               <div className="flex flex-column align">
                  <span className="font-bold">
                     {sesionGamertec.usuario.nombre}
                  </span>
                  <span className="text-sm">
                     {sesionGamertec.privilegio.nombre}
                  </span>
               </div>
            </button>
         ),
         command: () => {
            navigate("/profile/");
         },
      },
      { separator: true },
      {
         privilegio: ["ADM"],
         label: "Administrador",
         icon: <IconUserUp size={24} style={{ marginRight: "10px" }} />,
         command: () => {
            navigate("/admin/");
         },
      },
      {
         privilegio: ["ADM"],
         label: "Dashboard",
         icon: (
            <IconLayoutDashboard size={24} style={{ marginRight: "10px" }} />
         ),
      },
      {
         privilegio: ["USU", "ADM"],
         label: "Compras",
         icon: <IconShoppingBag size={24} style={{ marginRight: "10px" }} />,
         command: () => {
            navigate("/buy/");
         },
      },
      {
         privilegio: ["ADM", "USU"],
         label: "Cerrar Sesión",
         icon: <IconLogout2 size={24} style={{ marginRight: "10px" }} />,
         command: () => {
            cerrarSesion();
            obtenerSesion();
            obtenerCantidadCarrito();
            navigate("/products/");
         },
      },
   ];

   useEffect(() => {
      obtenerSesion();
      obtenerCantidadCarrito();
      console.log("cantidadCarrito", cantidadCarrito);

      setCantidadCarritoCabecera(cantidadCarrito);
   }, [obtenerSesion, obtenerCantidadCarrito, sesionGamertec, cantidadCarrito]);

   return (
      <div className="fixed top-0 left-0 w-full z-5 bg-white shadow-1">
         <Menubar
            className="mx-auto bg-white border-0 "
            style={{ maxWidth: "1240px" }}
            model={items.filter((item) =>
               item.privilegio?.includes(privilegio)
            )}
            start={start}
            end={end}
         />
         <Menu
            model={itemsAcount.filter((item) =>
               item.privilegio?.includes(privilegio)
            )}
            popup
            ref={menuRight}
            id="popup_menu_right"
            popupAlignment="right"
            style={{ width: "300px" }}
         />
      </div>
   );
};
