import { useEffect, useState, useContext } from "react";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { Link } from "react-router-dom";
import { AccionStyled } from "./styles/Accion.styled";
import { IconArrowBack } from "@tabler/icons-react";
import { Button } from "primereact/button";
import { UsuarioService } from "../../../services/usuario.service";
import { RespuestaEntity } from "../../../entities/respuesta.entity";
import { ActualizaNombreUsuario } from "../../../interfaces/usuario.interface";
import { GamertecSesionContext } from "../../sesion/Sesion.component";

interface AccionPerfilProps {
	nombreAccion: AccionNombreEnum | string;
}

export enum AccionNombreEnum {
	UNDEFINED = "",
	NAME = "name",
	LASTNAME = "lastname",
	PASSWORD = "password",
	PHOTO = "photo",
	EMAIL = "email",
	ADDRESS = "address",
}

export interface AccionNombreFuncion {
	nombreAccion: AccionNombreEnum | string;
	titulo: string;
	plantilla: () => JSX.Element;
}
export const Accion = ({ nombreAccion }: AccionPerfilProps) => {
	const { mostrarNotificacion, obtenerSesion, sesionGamertec } = useContext(GamertecSesionContext);
	const [titulo, setTitulo] = useState<string>("");
	const [plantilla, setPlantilla] = useState<JSX.Element>(<></>);

	const [nombre, setNombre] = useState<string>("");

	const actualizarNombre = async (usuario_id: number, data: ActualizaNombreUsuario) => {
		const usuServ = new UsuarioService();
		await usuServ.actualizarNombre(usuario_id, data).then((resp: RespuestaEntity<ActualizaNombreUsuario>) => {
			if (resp.data) {
				setNombre(resp.data.nombre);
			}
		}).catch((error: Error) => {
			mostrarNotificacion({
				tipo: "error",
				titulo: "Error",
				detalle: `surgio un error: ${error.message}`,
				pegado: true,
			});

		});
	};

	const plantillaNombre = () => {
		return (
			<>
				<div className="cajas-form">
					<form id="actu_nombre" action="">

						<div className="texto">
							<p id="nombre_actual">Nombre actual: {nombre}</p>
						</div>
						<div className="inputs">
							<label >Ingrese el nuevo Nombre</label>
							<input id="usu_nombre" type="text" placeholder="Nombre" />
						</div>

						<div className="boton">
							<input type="submit" value="Actualizar" onClick={() => actualizarNombre} />
						</div>

					</form>
				</div>
			</>
		);
	};

	const plantillaApellido = () => {
		return (
			<>
				<div className="cajas-form">
					<form id="actu_apellido" action="" method="POST">
						<div className="texto">
							<p id="apellido_actual">Apellido actual: </p>
						</div>
						<div className="inputs">
							<label>Ingrese el nuevo: </label>
							<input id="usu_apellido" type="text" placeholder="Apellido" />
						</div>

						<div className="boton">
							<input type="submit" value="Actualizar" />
						</div>

					</form>
				</div>

			</>

		);
	};

	const plantillaCorreo = () => {
		return (
			<>

				<div className="cajas-form">
					<form id="actu_correo" action="" method="POST">
						<div className="texto">
							<p id="correo_actual">Correo actual: </p>
						</div>
						<div className="inputs">
							<label >Ingrese el nuevo: </label>
							<input id="usu_correo" type="email" placeholder="Nombre" />
						</div>

						<div className="boton">
							<input type="submit" value="Actualizar" />
						</div>

					</form>
				</div>

			</>

		);
	};

	const plantillaContrasenia = () => {
		return (
			<>
				<div className="cajas-form">
					<form id="actu_contra" action="" method="POST">
						<div className="titulo">
							<label>¿Cambiaras tu contraseña? </label>
							<p>Primero deberás colocar tu contraseña actual</p>
						</div>
						<div className="inputs">
							<label>Ingrese la contraseña Actual:</label>
							<input type="password" placeholder="Contraseña Actual" id="contra_actual" title="Mínimo 8, incluir Caracteres, minúsculas, mayúsculas, números y letras" pattern="[A-Za-z0-9#$!?-]{8,15}" />
						</div>
						<div className="inputs">
							<label>Ingrese la Nueva Contraseña:</label>
							<input type="password" placeholder="Contraseña Nueva" id="contra_nueva" title="Mínimo 8, incluir Caracteres, minúsculas, mayúsculas, números y letras" pattern="[A-Za-z0-9#$!?-]{8,15}" />
						</div>
						<div className="inputs">
							<label>Repita la Nueva Contraseña: </label>
							<input type="password" placeholder="Rep. Contraseña Nueva" id="rep_nueva" title="Mínimo 8, incluir Caracteres, minúsculas, mayúsculas, números y letras" pattern="[A-Za-z0-9#$!?-]{8,15}" />
						</div>

						<div className="boton">
							<input type="submit" value="Actualizar" />
						</div>
					</form>
				</div>

			</>
		);
	};

	const plantillaFoto = () => {
		return (
			<>
				<div className="cajas-form">
					<form id="actu_foto" method="POST">
						<div className="texto">
							<p>Hola ¿Cambiarás tu foto de perfil?</p>
						</div>
						<div className="inputs">
							<label>Escoje una foto:</label>
							<input type="file" name="usu_foto" accept="image/png,image/jpeg" />
						</div>

						<div className="boton">
							<input type="submit" value="Actualizar" />
						</div>

					</form>
				</div>
			</>

		);
	};
	const arrayAccionNombre: AccionNombreFuncion[] = [
		{
			nombreAccion: AccionNombreEnum.NAME,
			titulo: "Nombre",
			plantilla: plantillaNombre
		},
		{
			nombreAccion: AccionNombreEnum.LASTNAME,
			titulo: "Apellido",
			plantilla: plantillaApellido
		},
		{
			nombreAccion: AccionNombreEnum.EMAIL,
			titulo: "Correo",
			plantilla: plantillaCorreo
		},
		{
			nombreAccion: AccionNombreEnum.PASSWORD,
			titulo: "Contraseña",
			plantilla: plantillaContrasenia
		},
		{
			nombreAccion: AccionNombreEnum.PHOTO,
			titulo: "Foto",
			plantilla: plantillaFoto
		},
		{
			nombreAccion: AccionNombreEnum.ADDRESS,
			titulo: "Dirección",
			plantilla: plantillaCorreo
		}
	];

	useEffect(() => {
		const item = arrayAccionNombre.filter((item) => item.nombreAccion === nombreAccion)[0];
		setPlantilla(item.plantilla);
		setTitulo(item.titulo);
	}, []);

	useEffect(() => {
		obtenerSesion();
		console.log(sesionGamertec.usuario);

		setNombre(sesionGamertec.usuario.nombre);
	}, []);

	return (
		<ContainerBodyStyled>
			<AccionStyled >
				<div className="titulo-principal">
					<h1>Cambiar {titulo} {nombre}</h1>
					<Link className="regresar" to="/profile/" > <Button icon={<IconArrowBack size={24} />} label="Regresar" text /></Link>
				</div>
				<div className="cajas">
					{plantilla}
				</div>
			</AccionStyled>
		</ContainerBodyStyled>
	);
};