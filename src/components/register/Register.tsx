import "./styles/Register.scss";
import { InputControl } from "../controls/InputControl";
import PhotoCameraFrontRoundedIcon from "@mui/icons-material/PhotoCameraFrontRounded";
import LockOpenRoundedIcon from "@mui/icons-material/LockOpenRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import HttpsRoundedIcon from "@mui/icons-material/HttpsRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { Link } from "react-router-dom";
import { ButtonControl } from "../controls/ButtonControl";
import React, { useState } from "react";
import { AlerControl, InterfaceAlertControl } from "../controls/AlertControl";
import { UsuarioService } from "../../services/UsuarioService";

export const Register = () => {
	const [alert, setAlert] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});

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
			setAlert({
				active: true,
				type: "warning",
				text: "complete el campo nombre",
			});
			return;
		}
		if (!lastname) {
			setAlert({
				active: true,
				type: "warning",
				text: "complete el campo apellido",
			});
			return;
		}

		if (!validateEmail(email)) {
			setAlert({
				active: true,
				type: "warning",
				text: "se introdujo una direccion de correo inválida",
			});
			return;
		}

		if (!validateUserName(user)) {
			setAlert({
				active: true,
				type: "warning",
				text:
					"nombre de usuario, solo caracteres: [ a-z, A-Z, _, 0-9] y longitud: [3-16]",
			});
			return;
		}

		if (password !== repeat_password) {
			setAlert({
				active: true,
				type: "warning",
				text: "las contraseñas tiene que ser las mismas",
			});
			return;
		}

		const data_usuario: UsuarioService = new UsuarioService(
			0,
			name,
			lastname,
			email,
			user,
			password,
			0,
			"",
			Date(),
			true,
			1
		);

		await UsuarioService.Registrar(data_usuario)
			.then((response) => {
				if (response.data.code === 200) {
					setAlert({
						active: true,
						type: "success",
						text: "Se registró correctamente, ahora debe iniciar sesión",
					});

					handleReset();

					return;
				}
			})
			.catch((error) => {
				console.log(error);
				setAlert({
					active: true,
					type: "error",
					text: "Hubo un error en la Aplicación, avise al administrador",
				});

				return;
			});
	};

	return (
		<div className="container">
			<div className="container-max">
				<div className="register">
					<form className="register__form" onSubmit={(e) => onSubmit(e)}>
						<div className="register__form__titles">
							<h2 className="register__form__titles-title">Registrate Ya!</h2>
							<p className="register__form__titles-subtitle">
								Sé parte de nuestra comunidad
							</p>
						</div>

						<AlerControl active={alert.active} type={alert.type} text={alert.text} />

						<InputControl
							icon={<PhotoCameraFrontRoundedIcon />}
							type="text"
							name="name"
							value={name}
							placeholder="Nombre Completo"
							onChange={(e) => onChange(e)}
						/>

						<InputControl
							icon={<PhotoCameraFrontRoundedIcon />}
							type="text"
							name="lastname"
							value={lastname}
							placeholder="Apellido Completo"
							onChange={(e) => onChange(e)}
						/>
						<InputControl
							icon={<AlternateEmailRoundedIcon />}
							type="text"
							name="email"
							value={email}
							placeholder="Correo"
							onChange={(e) => onChange(e)}
						/>
						<InputControl
							icon={<AccountCircleRoundedIcon />}
							type="text"
							name="user"
							value={user}
							placeholder="Usuario"
							onChange={(e) => onChange(e)}
						/>
						<InputControl
							icon={<LockOpenRoundedIcon />}
							type="password"
							name="password"
							value={password}
							placeholder="Contraseña"
							onChange={(e) => onChange(e)}
						/>
						<InputControl
							icon={<HttpsRoundedIcon />}
							type="password"
							name="repeat_password"
							value={repeat_password}
							placeholder="Repetir Contraseña"
							onChange={(e) => onChange(e)}
						/>

						<ButtonControl
							icon={<PersonAddAltRoundedIcon />}
							type="submit"
							text="Registrar"
						/>
					</form>
					<div className="register__returnlogin">
						<span className="register__returnlogin-question">
							¿Ya tienes una cuenta?
						</span>
						<Link className="register__returnlogin-link" to={`/login`}>
							Inicia Sesión
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
