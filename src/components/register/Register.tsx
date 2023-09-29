import "./styles/Register.scss";

import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { UsuarioEntity } from "../../entities/usuario.entities";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { IconUserPlus } from "@tabler/icons-react";
import { UsuarioService } from "../../services/usuario.service";
import { GamertecSesionContext } from "../sesion/Sesion.component";

export const Register = () => {

	const { mostrarNotificacion } = useContext(GamertecSesionContext);

	const [formData, setFormData] = useState({
		name: "",
		lastname: "",
		email: "",
		user: "",
		password: "",
		repeat_password: "",
	});

	const { name, lastname, email, user, password, repeat_password } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// setFormData({ ...formData, [e.target.name]: e.target.value });
		const { name, value } = e.target;

		const shouldTrim = ["email", "user", "password", "repeat_password"].includes(
			name
		);

		// Asignar el valor correspondiente al estado 'formData', aplicando 'trim()' si es necesario
		setFormData((prevState) => ({
			...prevState,
			[name]: shouldTrim ? value.trim() : value,
		}));
	};

	const handleReset = () => {
		setFormData({
			name: "",
			lastname: "",
			email: "",
			user: "",
			password: "",
			repeat_password: "",
		});
	};

	const validateUserName = (user: string) => {
		const regex = /^[a-zA-Z0-9_]{3,16}$/;

		return regex.test(user);
	};

	const validateEmail = (email: string) => {
		const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
		return regex.test(email);
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!name) {

			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "complete el campo nombre",
				pegado: true,
			});
			return;
		}
		if (!lastname) {

			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "complete el campo apellido",
				pegado: true,
			});
			return;
		}

		if (!validateEmail(email)) {

			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "se introdujo una direccion de correo inválida",
				pegado: true,
			});
			return;
		}

		if (!validateUserName(user)) {

			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "nombre de usuario, solo caracteres: [ a-z, A-Z, _, 0-9] y longitud: [3-16]",
				pegado: true,
			});
			return;
		}

		if (password !== repeat_password) {
			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "Las contraseñas no coinciden",
				pegado: true,
			});
			return;
		}

		const data_usuario: UsuarioEntity = new UsuarioEntity(
			0,
			name,
			lastname,
			email,
			user,
			password,
			0,
			"",
			new Date(),
			"",
			"",
			true,
			1
		);
		const usuServ = new UsuarioService();

		await usuServ.registrar(data_usuario)
			.then(() => {
				mostrarNotificacion({
					tipo: "success",
					titulo: "Éxito",
					detalle: "Usuario registrado correctamente",
					pegado: false,
				});
				handleReset();
			})
			.catch((error: Error) => {
				mostrarNotificacion({
					tipo: "error",
					titulo: "Error",
					detalle: `surgio un error: ${error.message}`,
					pegado: true,
				});
			});
	};

	return (
		<ContainerBodyStyled>
			<div className="register">
				<div className="flex align-items-center justify-content-center py-5">
					<form
						className="surface-card p-4 shadow-2 border-round w-full lg:w-8"
						onSubmit={(e) => onSubmit(e)}
					>
						<div className="text-center mb-5">
							<div className="text-900 text-3xl font-medium mb-3">Registrate Ya!</div>
							<div className="text-600 font-medium line-height-3">
								Y disfruta de la variedad de nuestros productos
							</div>
						</div>
						<div>
							<label htmlFor="name" className="block text-900 font-medium mb-2">
								Nombre Completo
							</label>

							<InputText
								id="name"
								value={name}
								type="text"
								placeholder="Juan Pedro"
								className="w-full mb-3"
								name="name"
								onChange={(e) => onChange(e)}
							/>

							<label htmlFor="lastname" className="block text-900 font-medium mb-2">
								Apelllido Completo
							</label>

							<InputText
								id="lastname"
								value={lastname}
								type="text"
								placeholder="Lopez Rodriguez"
								className="w-full mb-3"
								name="lastname"
								onChange={(e) => onChange(e)}
							/>

							<label htmlFor="email" className="block text-900 font-medium mb-2">
								Dirección de Correo
							</label>

							<InputText
								id="email"
								value={email}
								type="email"
								placeholder="email@dominio.com"
								className="w-full mb-3"
								name="email"
								onChange={(e) => onChange(e)}
							/>

							<label htmlFor="user" className="block text-900 font-medium mb-2">
								Usuario
							</label>

							<InputText
								id="user"
								value={user}
								type="text"
								placeholder="juan"
								className="w-full mb-3"
								name="user"
								onChange={(e) => onChange(e)}
							/>

							<label htmlFor="password" className="block text-900 font-medium mb-2">
								Contraseña
							</label>

							<InputText
								id="password"
								value={password}
								type="password"
								placeholder="Ingrese contraseña"
								className="w-full mb-3"
								name="password"
								onChange={(e) => onChange(e)}
							/>

							<label
								htmlFor="repeat_password"
								className="block text-900 font-medium mb-2"
							>
								Confirmar Contraseña
							</label>
							<InputText
								id="repeat_password"
								type="password"
								placeholder="Confirme contraseña"
								className="w-full mb-3"
								name="repeat_password"
								value={repeat_password}
								onChange={(e) => onChange(e)}
							/>

							<Button
								type="submit"
								label="Registrate Ahora"
								icon={<IconUserPlus size={24} />}
								className="w-full"
							/>

							<div className="text-center mt-3">
								<span className="text-600 font-medium line-height-3">
									Ya tienes una cuenta?
								</span>
								<Link
									to="/login/"
									className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
								>
									Inicia Sesión
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</ContainerBodyStyled>
	);
};
