import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Link, useNavigate } from "react-router-dom";
import img_realidad_virtual from "../../images/chico_realidad_virtual.svg";

import "./styles/Login.scss";
import { InputControl } from "../controls/InputControl";

import { useContext, useEffect, useState } from "react";
import { InterfaceAlertControl } from "../controls/AlertControl";
import { UsuarioService } from "../../entities/usuario.entities";
import { PrivilegioService } from "../../entities/privilegio.entities";
import { Alert, Button, Container, Snackbar } from "@mui/material";
import { LoginStyles } from "./styles/LoginStyles";
import { GuadarSession } from "../../utils/sesion.utils";
import {
	SesionGamertec,
	SesionPrivilegio,
	SesionUsuario,
} from "../../interfaces/sesion.interface";
import { GamertecSesionContext } from "../sesion/Sesion.component";

export const Login = () => {
	const { obtenerSesion } = useContext(GamertecSesionContext);
	const navigate = useNavigate();

	const [alerta, setAlerta] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});

	const [formData, setFormData] = useState({
		user: "",
		password: "",
	});

	const [abrirAlerta, setAbrirAlerta] = useState(false);

	const funcionAsignarAlerta = (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => {
		setAlerta({
			active: true,
			type: type,
			text: text,
		});
	};
	const { user, password } = formData;

	const funcionAbrirAlerta = () => {
		setAbrirAlerta(true);
	};

	const funcionCerrarAlerta = () => {
		setAbrirAlerta(false);
	};

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
			funcionAsignarAlerta("warning", "Ingrese un usuario");
			funcionAbrirAlerta();

			return;
		}

		if (!password) {
			funcionAsignarAlerta("warning", "Ingrese una contraseña");
			funcionAbrirAlerta();

			return;
		}

		let data_usuario: SesionUsuario = {
			usuario_id: 0,
			usuario: "",
			correo: "",
			nombre: "",
			apellido: "",
			foto: "",
			direccion: "",
			telefono: "",
		};
		let id_privilegio: number = 0;

		await UsuarioService.Logearse(user, password)
			.then((response) => {
				if (response.data.code === 200) {
					data_usuario = {
						usuario_id: response.data.data[0].usuario_id,
						usuario: response.data.data[0].usuario,
						correo: response.data.data[0].correo,
						nombre: response.data.data[0].nombre,
						apellido: response.data.data[0].apellido,
						foto: response.data.data[0].foto,
						direccion: response.data.data[0].direccion,
						telefono: response.data.data[0].telefono,
					};
				}
				console.log(response);

				id_privilegio = response.data.data[0].fk_privilegio;

				handleReset();

				if (response.data.code === 404) {
					funcionAsignarAlerta("warning", "Usuario o contraseña incorrecta");
					funcionAbrirAlerta();

					return;
				}
			})
			.catch((error) => {
				funcionAsignarAlerta(
					"error",
					"Hubo un error, contacte al administrador..."
				);
				funcionAbrirAlerta();

				return;
			});

		if (!id_privilegio) {
			funcionAsignarAlerta("warning", "No se encontró privilegio para el usuario");
			funcionAbrirAlerta();
			return;
		}

		let data_privilegio: SesionPrivilegio = {
			privilegio_id: 0,
			nombre: "",
			abreviatura: "USU",
		};

		await PrivilegioService.BuscarPorID(id_privilegio)
			.then((response) => {
				if (response.data.code === 200) {
					data_privilegio = {
						privilegio_id: response.data.data[0].privilegio_id,
						abreviatura: response.data.data[0].abreviatura,
						nombre: response.data.data[0].tipo,
					};
					const data_sesion: SesionGamertec = {
						usuario: data_usuario,
						privilegio: data_privilegio,
					};
					GuadarSession(data_sesion);

					obtenerSesion();
					funcionAsignarAlerta(
						"success",
						`Hola ${data_usuario.usuario}, Bienvenido...`
					);
					funcionAbrirAlerta();

					navigate(`/products/`);

					return;
				}
			})
			.catch((error) => {
				funcionAsignarAlerta(
					"error",
					"Hubo un error, contacte al administrador..."
				);
				funcionAbrirAlerta();

				return;
			});
	};

	useEffect(() => {}, []);
	return (
		<>
			<Container maxWidth={"lg"}>
				<LoginStyles>
					<img className="login__img" src={img_realidad_virtual} alt="" />

					<div className="login__card">
						<form className="login__card__form" onSubmit={(e) => onSubmit(e)}>
							<div className="login__card__form__titles">
								<h2 className="login__card__form__titles-welcome">Hola Bienvenido!</h2>
								<p className="login__card__form__titles-subtitle">Ingresa tus datos</p>
							</div>

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

							<Button type="submit">Ingresar</Button>
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
				</LoginStyles>
			</Container>
			<Snackbar
				open={abrirAlerta}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={3000}
				onClose={funcionCerrarAlerta}
			>
				<Alert onClose={funcionCerrarAlerta} severity={alerta.type}>
					{alerta.text}
				</Alert>
			</Snackbar>
		</>
	);
};
