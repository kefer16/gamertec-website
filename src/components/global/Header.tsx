import React, { ReactElement } from "react";

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
} from "@mui/material";
import {
	MenuTwoTone as MenuIcon,
	MailTwoTone as MailIcon,
	NotificationsTwoTone as NotificationsIcon,
	HomeTwoTone as HomeIcon,
	CategoryTwoTone as ProductIcon,
	ConnectWithoutContactTwoTone as ContactIcon,
	LoginTwoTone as AccessIcon,
	ShoppingCartTwoTone as ShoppingCartIcon,
} from "@mui/icons-material";

const settings = ["Cuenta", "Administrador", "Dashboard", "Cerrar Sessión"];
interface menuProps {
	index: number;
	nombre: string;
	url: string;
	iconSvg: ReactElement<SvgIconTypeMap<{}, "svg">>;
}
const opcionesMenu: menuProps[] = [
	{ index: 1, nombre: "Inicio", url: "/", iconSvg: <HomeIcon /> },
	{ index: 2, nombre: "Productos", url: "/products/", iconSvg: <ProductIcon /> },
	{ index: 3, nombre: "Contacto", url: "/contact/", iconSvg: <ContactIcon /> },
	{ index: 4, nombre: "Acceder", url: "/login/", iconSvg: <AccessIcon /> },
];
type Anchor = "top" | "left" | "bottom" | "right";
export const Header = () => {
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
					<ListItem key={item.index} disablePadding>
						<ListItemButton href={item.url}>
							<ListItemIcon>{item.iconSvg}</ListItemIcon>
							<ListItemText primary={item.nombre} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static" color="default">
					<Container maxWidth={"xl"}>
						<Toolbar>
							<IconButton
								size="large"
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
							{/* <Box
								sx={{
									display: "flex",
									justifyContent: "space-around",
									width: "70%",
								}}
							>
								{opcioneMenu.map((item: menuProps) => (
									<LinkMui
										href={item.url}
										underline="none"
										key={item.index}
										sx={{ color: "#fff", padding: "10px" }}
									>
										{item.nombre}
									</LinkMui>
								))}
							</Box> */}
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: { md: "flex" } }}>
								<IconButton size="large" aria-label="show 4 new mails" color="inherit">
									<Badge badgeContent={4} color="error">
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton
									size="large"
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge badgeContent={17} color="error">
										<NotificationsIcon />
									</Badge>
								</IconButton>

								<IconButton
									size="large"
									aria-label="show 2 new notifications"
									color="inherit"
								>
									<Badge badgeContent={2} color="error">
										<ShoppingCartIcon />
									</Badge>
								</IconButton>

								<Tooltip title="Open settings">
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }} size="large">
										<Avatar alt="Remy Sharp" />
									</IconButton>
								</Tooltip>

								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Link to={`/admin/`}>
												<Typography textAlign="center">{setting}</Typography>
											</Link>
										</MenuItem>
									))}
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
