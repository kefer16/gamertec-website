import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "../styles/Header.scss";

export const Header = () => {
	return (
		<div className="container">
			<div className="container-max">
				<header className="header">
					<div className="header__logo">
						<h1 className="header__logo__title">Gamertec</h1>
					</div>

					<div className="header__menu">
						<a className="header__menu__item" href="http://localhost/gamertec/">
							Inicio
						</a>

						<a
							className="header__menu__item"
							href="http://localhost/gamertec/productos/?categoria=0"
						>
							Productos
						</a>

						<a
							className="header__menu__item"
							href="http://localhost/gamertec/comunidad/"
						>
							Comunidad
						</a>

						<a className="header__menu__item" href="http://localhost/gamertec/about/">
							Acerca de
						</a>

						<a
							className="header__menu__item"
							href="http://localhost/gamertec/contac/"
						>
							Contacto
						</a>
					</div>

					<div className="header__login">
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
					</div>

					<div className="header__user">
						<img className="header__user__photo" src="" alt="user_foto" />
						<div className="header__user__perfil">
							<MenuRoundedIcon />
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
					</div>
				</header>
			</div>
		</div>
	);
};
