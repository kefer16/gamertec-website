import React, { ReactElement, useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import {
	AppBar,
	Avatar,
	Badge,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Drawer,
	SvgIconTypeMap,
	Divider,
} from "@mui/material";
import {
	MenuTwoTone as MenuIcon,
	HomeTwoTone as HomeIcon,
	CategoryTwoTone as ProductIcon,
	ConnectWithoutContactTwoTone as ContactIcon,
	LoginTwoTone as AccessIcon,
	ShoppingCartOutlined as ShoppingCartIcon,
	Logout as LogoutIcon,
	AdminPanelSettingsOutlined as AdminIcon,
	DashboardOutlined as DashboardIcon,
	ShoppingBagOutlined as ShoppingIcon,
} from "@mui/icons-material";
import { GamertecSesionContext } from "../sesion/Sesion.component";

interface menuProps {
	index: number;
	nombre: string;
	url: string;
	iconSvg: ReactElement<SvgIconTypeMap<{}, "svg">>;
	privilegios: ("" | "ADM" | "INV" | "USU")[];
}

// interface PrivilegioProps{
// 	privilegio: "ADM"| "INV" | "USU"
// }

const settings: menuProps[] = [
	// { index: 1, nombre: "Cuenta", url: "/", iconSvg: <PersonIcon /> },
	{
		index: 1,
		nombre: "Administrador",
		url: "/admin/",
		iconSvg: <AdminIcon />,
		privilegios: ["ADM", "INV"],
	},
	{
		index: 2,
		nombre: "Dashboard",
		url: "/dasboard",
		iconSvg: <DashboardIcon />,
		privilegios: ["ADM", "INV", "USU"],
	},
	{
		index: 3,
		nombre: "Compras",
		url: "/buy",
		iconSvg: <ShoppingIcon />,
		privilegios: ["INV", "USU"],
	},
	{
		index: 4,
		nombre: "Cerrar Sessión",
		url: "/logout/",
		iconSvg: <LogoutIcon />,
		privilegios: ["ADM", "INV", "USU"],
	},
];

const opcionesMenu: menuProps[] = [
	{
		index: 1,
		nombre: "Inicio",
		url: "/",
		iconSvg: <HomeIcon />,
		privilegios: ["ADM", "INV", "USU"],
	},
	{
		index: 2,
		nombre: "Productos",
		url: "/products/",
		iconSvg: <ProductIcon />,
		privilegios: ["ADM", "INV", "USU"],
	},
	{
		index: 3,
		nombre: "Contacto",
		url: "/contact/",
		iconSvg: <ContactIcon />,
		privilegios: ["ADM", "INV", "USU"],
	},
	{
		index: 4,
		nombre: "Acceder",
		url: "/login/",
		iconSvg: <AccessIcon />,
		privilegios: ["ADM", "INV", "USU"],
	},
];
type Anchor = "top" | "left" | "bottom" | "right";
export const Header = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [privilegio, setPrivilegio] = useState<"" | "ADM" | "INV" | "USU">(
		"USU"
	);
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const toggleDrawer =
		(anchor: Anchor, open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{opcionesMenu.map((item: menuProps) => (
					<Link
						to={item.url}
						style={{ textDecoration: "none", color: "inherit" }}
						key={item.index}
					>
						<ListItem disablePadding>
							<ListItemButton>
								<ListItemIcon>{item.iconSvg}</ListItemIcon>
								<ListItemText primary={item.nombre} />
							</ListItemButton>
						</ListItem>
					</Link>
				))}
			</List>
		</Box>
	);

	useEffect(() => {
		obtenerSesion();
		setPrivilegio(sesionGamertec.privilegio.abreviatura);
	}, [obtenerSesion, sesionGamertec]);
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="default">
					<Container maxWidth={"xl"}>
						<Toolbar>
							<IconButton
								size="medium"
								edge="start"
								color="inherit"
								aria-label="open drawer"
								// sx={{ mr: 2 }}
								onClick={toggleDrawer("top", true)}
							>
								<MenuIcon />
							</IconButton>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{ display: { xs: "none", sm: "block" } }}
							>
								Gamertec
							</Typography>

							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { md: "flex" } }}>
								<IconButton
									size="medium"
									aria-label="show 2 new notifications"
									color="inherit"
								>
									<Link to={`/shoping_cart/`}>
										<Badge badgeContent={2} color="error">
											<ShoppingCartIcon />
										</Badge>
									</Link>
								</IconButton>

								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="medium">
										<Avatar
											style={{ width: "40px", height: "40px" }}
											src={sesionGamertec.usuario.foto}
											alt={`foto-${sesionGamertec.usuario.usuario}`}
										/>
									</IconButton>
								</Tooltip>

								<Menu
									anchorEl={anchorElUser}
									id="account-menu"
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
									PaperProps={{
										elevation: 0,
										sx: {
											overflow: "visible",
											filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
											mt: 1.5,
											"& .MuiAvatar-root": {
												width: 32,
												height: 32,
												ml: -0.5,
												mr: 1,
											},
											"&:before": {
												content: '""',
												display: "block",
												position: "absolute",
												top: 0,
												right: 14,
												width: 10,
												height: 10,
												bgcolor: "background.paper",
												transform: "translateY(-50%) rotate(45deg)",
												zIndex: 0,
											},
										},
									}}
									transformOrigin={{ horizontal: "right", vertical: "top" }}
									anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
								>
									<MenuItem>
										<Avatar
											src={sesionGamertec.usuario.foto}
											alt={`foto-${sesionGamertec.usuario.usuario}`}
										/>
										<p style={{ textTransform: "uppercase" }}>
											{sesionGamertec.usuario.usuario}
										</p>
									</MenuItem>

									<Divider />
									{settings
										.filter((setting: menuProps) =>
											setting.privilegios.includes(privilegio)
										)
										.map((setting: menuProps) => {
											return (
												<Link
													to={setting.url}
													style={{ textDecoration: "none", color: "inherit" }}
												>
													<MenuItem onClick={handleCloseUserMenu} key={setting.index}>
														<ListItemIcon>{setting.iconSvg}</ListItemIcon>
														<Typography textAlign="center">{setting.nombre}</Typography>
													</MenuItem>
												</Link>
											);
										})}
								</Menu>
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
			</Box>
			<Drawer
				anchor={"top"}
				open={state["top"]}
				onClose={toggleDrawer("top", false)}
			>
				{list("top")}
			</Drawer>
		</>
	);
};
