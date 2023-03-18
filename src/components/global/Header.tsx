import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useLocalStorage from "use-local-storage";

import "./styles/Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
	const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [theme, setTheme] = useLocalStorage(
		"theme",
		defaultDark ? "dark" : "light"
	);

	const [openMenu, setOpenMenu] = useState(false);

	const switchTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		document.body.setAttribute("data-theme", newTheme);
		setTheme(newTheme);
	};

	const switchMenu = () => {
		const closeMenu: boolean = !openMenu;
		console.log(closeMenu);

		setOpenMenu(closeMenu);
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

							<Link className="header__menu__item" to={`/about/`}>
								Acerca de
							</Link>

							<Link className="header__menu__item" to={`/contact/`}>
								Contacto
							</Link>
							<Link className="header__menu__item" to={`/login/`}>
								Acceder
							</Link>
						</div>

						{/* <div className="header__login">
						<a
							className="header__login__buttom"
							href="http://localhost/gamertec/login/"
						>
							Acceder
						</a>
					</div>

					<div className="header__carrito" id="header__carrito">
						<a href="local" className="header__carrito__icon">
							<ShoppingCartIcon />
						</a>
					</div> */}

						<button className="header__theme" onClick={switchTheme}>
							{theme === "light" ? "🌜" : "☀️"}
						</button>

						{/* <div className="header__user">
						<img className="header__user__photo" src="" alt="user_foto" />
						<div className="header__user__perfil">
							<a
								className="header__user__perfil__item"
								href="http://localhost/gamertec/usuario/perfil/"
							>
								Perfil
							</a>

							<a
								className="header__user__perfil__item"
								href="http://localhost/gamertec/admin/"
							>
								Panel Administrador 🕵️‍♂️
							</a>

							<a
								className="header__user__perfil__item"
								href="http://localhost/gamertec/usuario/compras/"
							>
								Compras
							</a>

							<a
								className="header__user__perfil__item"
								href="http://localhost/gamertec/usuario/perfil/actividades/?cambiar=contra"
							>
								Cambiar contraseña
							</a>

							<a
								className="header__user__perfil__item"
								href="http://localhost/gamertec/login/php/desconectar.php"
							>
								Cerrar Sesión
							</a>
						</div>
					</div> */}
					</header>
				</div>
			</div>
			<div className="padding__header"></div>
		</>
	);
};
