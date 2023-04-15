import React, { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import useLocalStorage from "use-local-storage";
import imgUsuarioProfile from "../../images/usuario.png";
import "./styles/Header.scss";
import { Link } from "react-router-dom";
import {
	Avatar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Tooltip,
	Typography,
} from "@mui/material";

const settings = ["Cuenta", "Administrador", "Dashboard", "Cerrar Sessión"];
export const Header = () => {
	// const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	// const [theme, setTheme] = useLocalStorage(
	// 	"theme",
	// 	defaultDark ? "dark" : "light"
	// );

	const [openMenu, setOpenMenu] = useState(false);

	// const switchTheme = () => {
	// 	const newTheme = theme === "light" ? "dark" : "light";
	// 	document.body.setAttribute("data-theme", newTheme);
	// 	setTheme(newTheme);
	// };

	const switchMenu = () => {
		const closeMenu: boolean = !openMenu;
		console.log(closeMenu);

		setOpenMenu(closeMenu);
	};

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	return (
		<>
			<div className="container-fixed">
				<div className="container-max">
					<header className="header">
						<div className="header__menu-icon" onClick={switchMenu}>
							<MenuRoundedIcon />
						</div>

						<div className="header__logo">
							<Link to={`/`}>
								<h1 className="header__logo__title">Gamertec</h1>
							</Link>
						</div>

						<div
							className={`header__menu ${openMenu ? "header__menu-open" : ""}`.trim()}
						>
							<Link className="header__menu__item" to={`/`}>
								Inicio
							</Link>

							<Link className="header__menu__item" to={`/products/`}>
								Productos
							</Link>

							{/* <Link className="header__menu__item" to={`/about/`}>
								Acerca de
							</Link> */}

							<Link className="header__menu__item" to={`/contact/`}>
								Contacto
							</Link>
							<Link className="header__menu__item" to={`/login/`}>
								Acceder
							</Link>
							<div className="header__menu__item">
								<Box sx={{ flexGrow: 0 }}>
									<Tooltip title="Open settings">
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar alt="Remy Sharp" src={imgUsuarioProfile} />
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
							</div>
						</div>

						{/* <button className="header__theme" onClick={switchTheme}>
							{theme === "light" ? "🌜" : "☀️"}
						</button> */}
					</header>
				</div>
			</div>
			<div className="padding__header"></div>
		</>
	);
};
