import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useLocalStorage from "use-local-storage";
import imgUsuarioProfile from "../../images/usuario.png";
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
								<img
									className="header__menu__item-profileimg"
									src={imgUsuarioProfile}
									alt="fdf"
								/>
							</div>
						</div>

						{/* <button className="header__theme" onClick={switchTheme}>
							{theme === "light" ? "🌜" : "☀️"}
						</button> */}

						<div className="header__profile">
							<Link className="header__profile-item" to={`/profile/`}>
								Perfil
							</Link>

							<Link className="header__profile-item" to={`/profile/`}>
								Panel Administrador
							</Link>

							<Link className="header__profile-item" to={`/profile/`}>
								Compras
							</Link>

							<Link className="header__profile-item" to={`/profile/`}>
								Cambiar Constraseña
							</Link>

							<Link className="header__profile-item" to={`/profile/`}>
								Cerrar Sessión
							</Link>
						</div>
					</header>
				</div>
			</div>
			<div className="padding__header"></div>
		</>
	);
};
