import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

export const Header = (usuario: string) => {
	return (
		<div className="container">
			<div className="container-max">
				<header className="header">
					<div className="header__menu" id="btnmenu">
						<MenuRoundedIcon />
					</div>
					<div className="header__logo">
						<h1>Gamertec</h1>
					</div>

					<ul className="header__links">
						<li>
							<a href="http://localhost/gamertec/" className="header__links__item">
								Inicio
							</a>
						</li>
						<li>
							<a
								href="http://localhost/gamertec/productos/?categoria=0"
								className="header__links__item"
							>
								Productos
							</a>
						</li>
						<li>
							<a
								href="http://localhost/gamertec/comunidad/"
								className="header__links__item"
							>
								Comunidad
							</a>
						</li>
						<li>
							<a
								href="http://localhost/gamertec/about/"
								className="header__links__item"
							>
								Acerca de
							</a>
						</li>
						<li>
							<a
								href="http://localhost/gamertec/contac/"
								className="header__links__item"
							>
								Contacto
							</a>
						</li>
					</ul>

					<div className="botones">
						<a href="http://localhost/gamertec/login/">Acceder</a>
					</div>

					<div id="carrito" className="carrito-compras"></div>

					<div className="login-user">
						<img
							id="btn-user"
							src="<?php echo $ruta_foto ?>"
							alt="<?php echo $alt ?>"
						/>
					</div>

					<div className="menu-user">
						<div className="user-texto">
							{usuario}
							<span>S/ </span>
						</div>
						<nav>
							<li>
								<a href="http://localhost/gamertec/usuario/perfil/">Perfil</a>
							</li>

							<li>
								<a href="http://localhost/gamertec/admin/">Panel Administrador 🕵️‍♂️</a>
							</li>

							<li>
								<a href="http://localhost/gamertec/usuario/compras/">Compras</a>
							</li>

							<li>
								<a href="http://localhost/gamertec/usuario/perfil/actividades/?cambiar=contra">
									Cambiar contraseña
								</a>
							</li>
							<li>
								<a href="http://localhost/gamertec/login/php/desconectar.php">
									Cerrar Sesión
								</a>
							</li>
						</nav>
					</div>
				</header>
			</div>
		</div>
	);
};
