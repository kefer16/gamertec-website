import { useContext, useEffect, useRef } from "react";

import { GamertecSesionContext } from "../sesion/Sesion.component";

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

export const Header = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	interface MenuItemBar {
		label?: string;
		icon?: JSX.Element;
		command?: () => void;
		separator?: boolean;
	}
	interface MenuItem {
		label?: string;
		icon?: JSX.Element;
		command?: () => void;
		separator?: boolean;
	}

	const irInicio = () => {
		navigate("/");
	};

	const navigate = useNavigate();
	const items: MenuItemBar[] = [
		{
			label: "Inicio",
			icon: <IconHome2 size={24} style={{ marginRight: "10px" }} />,
			command: () => {
				navigate("/");
			},
		},
		{
			label: "Productos",
			icon: <IconBuildingStore size={24} style={{ marginRight: "10px" }} />,
			command: () => {
				navigate("/products/");
			},
		},
		{
			label: "Contacto",
			icon: <IconAddressBook size={24} style={{ marginRight: "10px" }} />,
			command: () => {
				navigate("/contact/");
			},
		},
		{
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
		<>
			<Avatar
				className="shadow-1"
				image={sesionGamertec.usuario.foto}
				style={{ height: "48px", width: "48px" }}
				shape="circle"
				onClick={(event) => menuRight.current?.toggle(event)}
			/>
		</>
	);

	const menuRight = useRef<Menu>(null);
	//const router = useRouter();

	const itemsAcount: MenuItem[] = [
		{
			icon: (
				<button className="w-full p-link flex align-items-center">
					<Avatar
						image={sesionGamertec.usuario.foto}
						className="mr-2"
						shape="circle"
					/>
					<div className="flex flex-column align">
						<span className="font-bold">{sesionGamertec.usuario.nombre}</span>
						<span className="text-sm">{sesionGamertec.privilegio.nombre}</span>
					</div>
				</button>
			),
			command: () => {
				console.log("hola");
			},
		},
		{ separator: true },
		{
			label: "Administrador",
			icon: <IconUserUp size={24} style={{ marginRight: "10px" }} />,
			command: () => {
				navigate("/admin/");
			},
		},
		{
			label: "Dashboard",
			icon: <IconLayoutDashboard size={24} style={{ marginRight: "10px" }} />,
		},
		{
			label: "Compras",
			icon: <IconShoppingBag size={24} style={{ marginRight: "10px" }} />,
			command: () => {
				navigate("/buy/");
			},
		},
		{
			label: "Cerrar Sesión",
			icon: <IconLogout2 size={24} style={{ marginRight: "10px" }} />,
		},
	];

	useEffect(() => {
		obtenerSesion();
	}, [obtenerSesion, sesionGamertec]);

	return (
		<div className="fixed top-0 left-0 w-full z-5 bg-white shadow-1">
			<Menubar
				className="mx-auto bg-white border-0 "
				style={{ maxWidth: "1240px" }}
				model={items}
				start={start}
				end={end}
			/>
			<Menu
				model={itemsAcount}
				popup
				ref={menuRight}
				id="popup_menu_right"
				popupAlignment="right"
				style={{ width: "300px" }}
			/>
		</div>
	);
};
