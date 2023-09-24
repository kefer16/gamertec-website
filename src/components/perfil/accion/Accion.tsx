import { useEffect, useState } from "react";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";
import { Link } from "react-router-dom";
import { AccionStyled } from "./styles/Accion.styled";
import { IconArrowBack } from "@tabler/icons-react";
import { Button } from "primereact/button";

interface AccionPerfilProps {
	nombre: AccionNombreEnum | string;
}

export enum AccionNombreEnum {
	UNDEFINED = "",
	NAME = "name",
	LASTNAME = "lastname",
	USER = "user",
	PASSWORD = "password",
	PHOTO = "photo",
	EMAIL = "email",
	ADDRESS = "address",
}

export interface AccionNombreFuncion {
	nombre: AccionNombreEnum | string;
	titulo: string;
	plantilla: () => JSX.Element;
}
export const Accion = ({ nombre }: AccionPerfilProps) => {
	const [titulo, setTitulo] = useState<string>("");
	const [plantilla, setPlantilla] = useState<JSX.Element>(<></>);

	const plantillaNombre = () => {
		return (
			<>
				<div className="cajas-form">
					<form id="actu_nombre" action="">

						<div className="texto">
							<p id="nombre_actual">Nombre actual: Kevin Fernando</p>
						</div>
						<div className="inputs">
							<label >Ingrese el nuevo Nombre</label>
							<input id="usu_nombre" type="text" placeholder="Nombre" />
						</div>

						<div className="boton">
							<input type="submit" value="Actualizar" />
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

	const plantillaUsuario = () => {
		return (
			<>

				<div className="cajas-form">
					<form id="actu_usuario" action="" method="POST">
						<div className="texto">
							<p id="usuario_actual">Nombre de usuario actual: </p>
						</div>
						<div className="inputs">
							<label >Ingrese el nuevo nombre de</label>
							<input id="usu_usuario" type="text" placeholder="Nombre" />
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
			nombre: AccionNombreEnum.NAME,
			titulo: "Nombre",
			plantilla: plantillaNombre
		},
		{
			nombre: AccionNombreEnum.LASTNAME,
			titulo: "Apellido",
			plantilla: plantillaApellido
		},
		{
			nombre: AccionNombreEnum.EMAIL,
			titulo: "Correo",
			plantilla: plantillaCorreo
		},
		{
			nombre: AccionNombreEnum.USER,
			titulo: "Usuario",
			plantilla: plantillaUsuario
		},
		{
			nombre: AccionNombreEnum.PASSWORD,
			titulo: "Contraseña",
			plantilla: plantillaContrasenia
		},
		{
			nombre: AccionNombreEnum.PHOTO,
			titulo: "Foto",
			plantilla: plantillaFoto
		},
		{
			nombre: AccionNombreEnum.ADDRESS,
			titulo: "Dirección",
			plantilla: plantillaCorreo
		}
	];

	useEffect(() => {
		const item = arrayAccionNombre.filter((item) => item.nombre === nombre)[0];
		setPlantilla(item.plantilla);
		setTitulo(item.titulo);
	}, []);



	return (
		<ContainerBodyStyled>
			<AccionStyled >
				<div className="titulo-principal">
					<h1>Cambiar {titulo}</h1>
					<Link className="regresar" to="/profile/" > <Button icon={<IconArrowBack size={24} />} label="Regresar" text /></Link>
				</div>
				<div className="cajas">
					{plantilla}
				</div>
			</AccionStyled>
		</ContainerBodyStyled>
	);
};



