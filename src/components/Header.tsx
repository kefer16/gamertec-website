import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import "../styles/Header.scss";

export const Header = () => {
	return (
		<div className="container">
			<div className="container-max">
				<header className="header">
					{/* <div className="header__menu" id="btnmenu">
						<MenuRoundedIcon />
					</div> */}
					<div className="header__logo">
						<h1>Gamertec</h1>
					</div>

					<div className="header__links">
						<a href="http://localhost/gamertec/" className="header__links__item">
							Inicio
						</a>

						<a
							href="http://localhost/gamertec/productos/?categoria=0"
							className="header__links__item"
						>
							Productos
						</a>

						<a
							href="http://localhost/gamertec/comunidad/"
							className="header__links__item"
						>
							Comunidad
						</a>

						<a
							href="http://localhost/gamertec/about/"
							className="header__links__item"
						>
							Acerca de
						</a>

						<a
							href="http://localhost/gamertec/contac/"
							className="header__links__item"
						>
							Contacto
						</a>
					</div>

					<div className="botones">
						<a href="http://localhost/gamertec/login/" className="botones__item">
							Acceder
						</a>
					</div>

					<div id="header__carrito" className="header__carrito__compras"></div>

					<div className="header__user">
						<img src="" alt="user_foto" className="header__user__photo" />
					</div>

					<div className="header__menu">
						<div className="header__menu__items">
							<a href="http://localhost/gamertec/usuario/perfil/">Perfil</a>

							<a href="http://localhost/gamertec/admin/">Panel Administrador 🕵️‍♂️</a>

							<a href="http://localhost/gamertec/usuario/compras/">Compras</a>

							<a href="http://localhost/gamertec/usuario/perfil/actividades/?cambiar=contra">
								Cambiar contraseña
							</a>

							<a href="http://localhost/gamertec/login/php/desconectar.php">
								Cerrar Sesión
							</a>
						</div>
					</div>
				</header>
			</div>
		</div>
	);
};
