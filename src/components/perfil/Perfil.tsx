import { useContext, useEffect } from "react";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { PerfilStyled } from "./styles/Perfil.styled";
import { GamertecSesionContext } from "../sesion/Sesion.component";

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
						<a href="##">Cambiar Foto</a>
					</div>

					<div className="detalle-contenido">

						<div className="detalle-texto">
							<div className="texto">
								<p>Nombre: {sesionGamertec.usuario.nombre}</p>
								<a href="##">
									Cambiar Nombre
								</a>
							</div>
						</div>

						<div className="detalle-texto">
							<div className="texto">
								<p>Apellido: {sesionGamertec.usuario.apellido}</p>
								<a href="##">
									Cambiar Apellido
								</a>
							</div>
						</div>

						<div className="detalle-texto">
							<div className="texto">
								<p>Correo: {sesionGamertec.usuario.correo}</p>
								<a href="##">
									Cambiar Correo
								</a>
							</div>
						</div>
						<div className="detalle-texto">

							<div className="texto">
								<p>Direccion: {sesionGamertec.usuario.direccion}</p>
								<a href="##">
									Cambiar Dirección
								</a>
							</div>
						</div>

						<div className="detalle-texto">
							<div className="texto">
								<p>Usuario: {sesionGamertec.usuario.usuario}</p>
								<a href="##">
									Cambiar Usuario
								</a>
							</div>
						</div>
						<div className="detalle-texto">
							<div className="texto">
								<p>Contraseña: ********</p>
								<a href="##">
									Cambiar Contraseña
								</a>
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
