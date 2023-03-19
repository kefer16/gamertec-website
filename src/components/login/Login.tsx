import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link } from "react-router-dom";
import img_realidad_virtual from "../../images/chico_realidad_virtual.svg";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import "./styles/Login.scss";
import { InputControl } from "../controls/InputControl";
import { ButtonControl } from "../controls/ButtonControl";
import { useState } from "react";
import axios from "axios";
import { AlerControl, InterfaceAlertControl } from "../controls/AlertControl";

const API_URL = process.env.REACT_APP_API_URL;

export const Login = () => {
	const [alert, setAlert] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});
	const [formData, setFormData] = useState({
		user: "",
		password: "",
	});

	const { user, password } = formData;

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
	};

	const handleReset = () => {
		setFormData({
			user: "",
			password: "",
		});
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!user) {
			setAlert({
				active: true,
				type: "warning",
				text: "ingrese un usuario",
			});
			return;
		}

		if (!password) {
			setAlert({
				active: true,
				type: "warning",
				text: "ingrese una contraseña",
			});
			return;
		}

		const Credenciales = {
			usuario: user,
			contrasenia: password,
		};

		console.log(Credenciales);

		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const body = JSON.stringify(Credenciales);
			const res = await axios.post(`${API_URL}/usuario/login`, body, config);
			console.log(res.data);

			if (res.status === 200) {
				if (res.data.code === 200) {
					setAlert({
						active: true,
						type: "success",
						text: "Se logeó exitosamente, redirigiendo...",
					});
					handleReset();
				}
				if (res.data.code === 404) {
					setAlert({
						active: true,
						type: "warning",
						text: "Usuario o contraseña incorrecta",
					});
				}
			}
		} catch (err: any) {
			setAlert({
				active: true,
				type: "error",
				text: "Hubo un error en la Aplicación, avise al administrador",
			});
		}
	};

	return (
		<>
			<div className="constainer">
				<div className="container-max">
					<div className="login">
						<img className="login__img" src={img_realidad_virtual} alt="" />

						<div className="login__card">
							<form className="login__card__form" onSubmit={(e) => onSubmit(e)}>
								<div className="login__card__form__titles">
									<h2 className="login__card__form__titles-welcome">Hola Bienvenido!</h2>
									<p className="login__card__form__titles-subtitle">Ingresa tus datos</p>
								</div>
								<AlerControl
									active={alert.active}
									type={alert.type}
									text={alert.text}
								/>

								<InputControl
									icon={<AccountCircleRoundedIcon />}
									name="user"
									type="text"
									value={user}
									placeholder="Usuario"
									onChange={(e) => onChange(e)}
								/>

								<InputControl
									icon={<LockRoundedIcon />}
									name="password"
									type="password"
									value={password}
									placeholder="Contraseña"
									onChange={(e) => onChange(e)}
								/>

								<ButtonControl
									icon={<LoginRoundedIcon />}
									type="submit"
									text="Ingresar"
								/>
							</form>
							<div className="login__card__register">
								<span className="login__card__register-question">
									¿No tienes cuenta?
								</span>
								<Link className="login__card__register-link" to={`/register`}>
									Registrate
								</Link>
							</div>
							<div className="login__card__social">
								<p className="login__card__social-title">Contacte al administrador:</p>
								<FacebookRoundedIcon className="login__card__social-facebook" />
								<InstagramIcon className="login__card__social-instragram" />
								<YouTubeIcon className="login__card__social-youtube" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
