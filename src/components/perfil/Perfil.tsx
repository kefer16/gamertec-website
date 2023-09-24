import { useContext, useEffect } from "react";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { PerfilStyled } from "./styles/Perfil.styled";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { Link } from "react-router-dom";

export const Perfil = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);
	useEffect(() => {
		obtenerSesion();
	}, []);
	return (
		<ContainerBodyStyled>
			<PerfilStyled className="contenido">
				<div className="titulo-principal">
					<h1>Detalles de la cuenta</h1>
					<span>{sesionGamertec.privilegio.nombre}</span>
				</div>

				<div className="detalle">
					<div className="detalle-imagen">
						<img src={sesionGamertec.usuario.foto} alt={`foto-${sesionGamertec.usuario.usuario}`} />
						<Link to="/profile/action/photo">Cambiar Foto</Link>
					</div>

					<div className="detalle-contenido">

						<div className="detalle-texto">
							<div className="texto">
								<p>Nombre: {sesionGamertec.usuario.nombre}</p>
								<Link to="/profile/action/name">Cambiar Nombre</Link>
							</div>
						</div>

						<div className="detalle-texto">
							<div className="texto">
								<p>Apellido: {sesionGamertec.usuario.apellido}</p>
								<Link to="/profile/action/lastname">Cambiar Apellido</Link>
							</div>
						</div>

						<div className="detalle-texto">
							<div className="texto">
								<p>Correo: {sesionGamertec.usuario.correo}</p>
								<Link to="/profile/action/email">Cambiar Correo</Link>
							</div>
						</div>
						<div className="detalle-texto">

							<div className="texto">
								<p>Direccion: {sesionGamertec.usuario.direccion}</p>
								<Link to="/profile/action/address">Cambiar Dirección</Link>
							</div>
						</div>

						<div className="detalle-texto">
							<div className="texto">
								<p>Usuario:</p>
								<span>{sesionGamertec.usuario.usuario}</span>
							</div>
						</div>
						<div className="detalle-texto">
							<div className="texto">
								<p>Contraseña: ********</p>
								<Link to="/profile/action/password">Cambiar Constraseña</Link>
							</div>
						</div>
						<div className="detalle-texto">
							<div className="texto">
								<p>Fecha y Hora de Registro: </p>
								<span>10, septiembre 2023</span>
							</div>
						</div>
					</div>
				</div>
			</PerfilStyled>
		</ContainerBodyStyled>
	);
};
