import { Link, useNavigate } from "react-router-dom";

import "./styles/Login.scss";

import { useContext, useState } from "react";
import { PrivilegioService } from "../../entities/privilegio.entities";
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
import { UsuarioService } from "../../services/usuario.service";
import { RespuestaEntity } from "../../entities/respuesta.entity";
import { LogeoUsuario } from "../../interfaces/usuario.interface";

export const Login = () => {
	const { obtenerSesion, obtenerCantidadCarrito, mostrarNotificacion } = useContext(GamertecSesionContext);
	const navigate = useNavigate();

	const [checked, setChecked] = useState<boolean>(false);

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

			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "Ingrese un usuario",
				pegado: true,
			});

			return;
		}

		if (!password) {
			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "Ingrese una contraseña",
				pegado: true,
			});

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
		let id_privilegio: number | undefined;

		const usuServ = new UsuarioService();
		await usuServ.logearse(user, password)
			.then((resp: RespuestaEntity<LogeoUsuario>) => {
				if (resp.data) {
					data_usuario = {
						usuario_id: resp.data.usuario_id,
						usuario: resp.data.usuario,
						correo: resp.data.correo,
						nombre: resp.data.nombre,
						apellido: resp.data.apellido,
						foto: resp.data.foto,
						direccion: resp.data.direccion,
						telefono: resp.data.telefono,
					};
				}
				id_privilegio = resp.data?.fk_privilegio;
				handleReset();
			})
			.catch((error: Error) => {
				mostrarNotificacion({
					tipo: "error",
					titulo: "Error",
					detalle: `surgio un error: ${error.message}`,
					pegado: true,
				});
				return;
			});

		if (!id_privilegio) {
			mostrarNotificacion({
				tipo: "warn",
				titulo: "Alerta",
				detalle: "No se encontró privilegio para el usuario",
				pegado: true,
			});
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
					obtenerCantidadCarrito();

					mostrarNotificacion({
						tipo: "success",
						titulo: "Éxito",
						detalle: `Hola ${data_usuario.usuario}, Bienvenido...`,
						pegado: false,
					});

					navigate("/products/");
					return;
				}
			})
			.catch((error: Error) => {
				mostrarNotificacion({
					tipo: "error",
					titulo: "Error",
					detalle: `surgio un error: ${error.message}`,
					pegado: true,
				});
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
		</>
	);
};
