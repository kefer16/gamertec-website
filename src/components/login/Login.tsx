import { Link, useNavigate } from "react-router-dom";

import "./styles/Login.scss";

import { useContext,  useState } from "react";
import { InterfaceAlertControl } from "../controls/AlertControl";
import { UsuarioService } from "../../entities/usuario.entities";
import { PrivilegioService } from "../../entities/privilegio.entities";
import { Alert, Snackbar } from "@mui/material";

import { GuadarSession } from "../../utils/sesion.utils";
import {
	SesionGamertec,
	SesionPrivilegio,
	SesionUsuario,
} from "../../interfaces/sesion.interface";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { InputText } from "primereact/inputtext";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { Button } from "primereact/button";
import NombreGamertec from "../../images/svg/name-gamertec.svg";
import { IconLogout } from "@tabler/icons-react";

export const Login = () => {
	const { obtenerSesion } = useContext(GamertecSesionContext);
	const navigate = useNavigate();

	const [alerta, setAlerta] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});

	const [checked, setChecked] = useState<boolean>(false);

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
		let id_privilegio = 0;

		await UsuarioService.Logearse(user, password)
			.then((response) => {
				const resp = response.data.data;
				console.log(resp);

				if (response.data.code === 200) {
					data_usuario = {
						usuario_id: resp.usuario_id,
						usuario: resp.usuario,
						correo: resp.correo,
						nombre: resp.nombre,
						apellido: resp.apellido,
						foto: resp.foto,
						direccion: resp.direccion,
						telefono: resp.telefono,
					};
				}

				id_privilegio = resp.fk_privilegio;

				handleReset();

				if (response.data.code === 404) {
					funcionAsignarAlerta("warning", "Usuario o contraseña incorrecta");
					funcionAbrirAlerta();

					return;
				}
			})
			.catch(() => {
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
				const resp = response.data.data;

				if (response.data.code === 200) {
					data_privilegio = {
						privilegio_id: resp.privilegio_id,
						abreviatura: resp.abreviatura,
						nombre: resp.tipo,
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

					navigate("/products/");

					return;
				}
			})
			.catch(() => {
				funcionAsignarAlerta(
					"error",
					"Hubo un error, contacte al administrador..."
				);
				funcionAbrirAlerta();

				return;
			});
	};


	return (
		<>
			<div className="flex align-items-center justify-content-center py-5">
				<form
					className="surface-card p-4 shadow-2 border-round w-full lg:w-6"
					onSubmit={(e) => onSubmit(e)}
				>
					<div className="text-center mb-5">
						<img src={NombreGamertec} alt="hyper" height={50} className="mb-3" />
						<div className="text-900 text-3xl font-medium mb-3">Hola Bienvenido!</div>
						<span className="text-600 font-medium line-height-3">
							¿No tienes una cuenta?
						</span>
						<Link
							to="/register/"
							className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
						>
							Créala hoy!
						</Link>
					</div>

					<div>
						<label htmlFor="user" className="block text-900 font-medium mb-2">
							Usuario
						</label>

						<InputText
							id="user"
							value={user}
							type="text"
							placeholder="Ingrese usuario"
							className="w-full mb-3"
							name="user"
							onChange={(e) => onChange(e)}
							autoComplete="none"
						/>

						<label htmlFor="password" className="text-900 font-medium mb-2">
							Contraseña
						</label>
						<InputText
							id="password"
							type="password"
							placeholder="Ingrese contraseña"
							className="w-full mb-3"
							name="password"
							value={password}
							onChange={(e) => onChange(e)}
						/>

						<div className="flex align-items-center justify-content-between mb-6">
							<div className="flex align-items-center">
								<Checkbox
									id="rememberme"
									onChange={(e: CheckboxChangeEvent) =>
										setChecked(e.checked === undefined ? false : e.checked)
									}
									checked={checked}
									className="mr-2"
								/>
								<label htmlFor="rememberme">Recuérdame</label>
							</div>
							<a
								href="##"
								className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
							>
								¿Olvidó su contraseña?
							</a>
						</div>

						<Button
							type="submit"
							label="Iniciar Sesión"
							icon={<IconLogout size={24} />}
							className="w-full"
						/>
					</div>
				</form>
			</div>

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
