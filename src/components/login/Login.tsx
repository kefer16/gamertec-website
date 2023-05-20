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
import { AlerControl, InterfaceAlertControl } from "../controls/AlertControl";
import { UsuarioService } from "../../services/UsuarioService";
import { PrivilegioService } from "../../services/PrivilegioService";

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

	const saveSessionLogin = (user: UsuarioService, priv: PrivilegioService) => {
		sessionStorage.setItem("gamertec-user", JSON.stringify(user));
		sessionStorage.setItem("gamertec-privilegio", JSON.stringify(priv));
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

		let data_usuario: UsuarioService;
		let id_privilegio: number = 0;

		await UsuarioService.Logearse(user, password)
			.then((response) => {
				console.log(response.data);

				if (response.data.code === 200) {
					data_usuario = new UsuarioService(
						response.data.data[0].usuario_id,
						response.data.data[0].nombre,
						response.data.data[0].apellido,
						response.data.data[0].correo,
						response.data.data[0].usuario,
						response.data.data[0].contrasenia,
						response.data.data[0].dinero,
						response.data.data[0].foto,
						response.data.data[0].fecha_registro,
						response.data.data[0].activo,
						response.data.data[0].fk_privilegio
					);

					id_privilegio = response.data.data[0].fk_privilegio;

					handleReset();
				}
				if (response.data.code === 404) {
					setAlert({
						active: true,
						type: "warning",
						text: "Usuario o contraseña incorrecta",
					});

					return;
				}
			})
			.catch((error) => {
				console.log(error);
				setAlert({
					active: true,
					type: "error",
					text: "Hubo un error, contacte al administrador...",
				});

				return;
			});

		if (!id_privilegio) {
			return;
		}

		let data_privilegio: PrivilegioService;
		console.log("id_privilegio", id_privilegio);

		await PrivilegioService.BuscarPorID(id_privilegio)
			.then((response) => {
				console.log(response.data);

				if (response.data.code === 200) {
					data_privilegio = new PrivilegioService(
						response.data.data[0].idprivilegio,
						response.data.data[0].tipo,
						response.data.data[0].activo,
						response.data.data[0].abreviatura
					);
					saveSessionLogin(data_usuario, data_privilegio);

					setAlert({
						active: true,
						type: "success",
						text: `Hola ${data_usuario.usuario}, Bienvenido...`,
					});
					return;
				}
			})
			.catch((error) => {
				console.log(error);
				setAlert({
					active: true,
					type: "error",
					text: "Hubo un error, contacte al administrador...",
				});
				return;
			});
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
