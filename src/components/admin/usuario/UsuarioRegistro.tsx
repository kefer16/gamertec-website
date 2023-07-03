import {
	Box,
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
	convertirFechaSQL,
	convertirFechaVisual,
} from "../../../utils/funciones.utils";
import { UsuarioService } from "../../../entities/usuario.entities";
import { ComboboxProps } from "../../../interfaces/combobox.interface";

interface Props {
	nombreFormulario: string;
	abrir: boolean;
	esEdicion: boolean;
	itemSeleccionado: UsuarioService;
	funcionCerrarModal: () => void;
	funcionActualizarTabla: () => void;
	funcionAsignarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
	arrayPrivilegios: ComboboxProps[];
}

export const UsuarioRegistro = ({
	nombreFormulario,
	abrir,
	esEdicion,
	itemSeleccionado,
	funcionCerrarModal,
	funcionActualizarTabla,
	funcionAsignarAlerta,
	funcionAbrirAlerta,
	arrayPrivilegios,
}: Props) => {
	const [usuarioId, setUsuarioId] = useState(0);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [correo, setCorreo] = useState("");
	const [usuario, setUsuario] = useState("");
	const [contrasenia, setContrasenia] = useState("");
	const [dinero, setDinero] = useState("0");
	const [foto, setFoto] = useState("");
	const [fecha_registro, setFecha_registro] = useState("");
	const [activo, setActivo] = useState("0");
	const [fk_privilegio, setFk_privilegio] = useState("0");

	useEffect(() => {
		setUsuarioId(itemSeleccionado.usuario_id);
		setNombre(itemSeleccionado.nombre);
		setApellido(itemSeleccionado.apellido);
		setCorreo(itemSeleccionado.correo);
		setUsuario(itemSeleccionado.usuario);
		setContrasenia(itemSeleccionado.contrasenia);
		setDinero(String(itemSeleccionado.dinero));
		setFoto(itemSeleccionado.foto);
		setFecha_registro(itemSeleccionado.fecha_registro);
		setActivo(itemSeleccionado.activo ? "1" : "0");
		setFk_privilegio(String(itemSeleccionado.fk_privilegio));
	}, [itemSeleccionado]);

	const funcionCambiarPrivilegio = (event: SelectChangeEvent) => {
		setFk_privilegio(event.target.value as string);
	};
	const funcionCambiarEstado = (event: SelectChangeEvent) => {
		setActivo(event.target.value as string);
	};

	const funcionEnviarCategoria = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const data: UsuarioService = new UsuarioService(
			usuarioId,
			nombre,
			apellido,
			correo,
			usuario,
			contrasenia,
			parseInt(dinero),
			foto,
			convertirFechaSQL(fecha_registro),
			activo === "0",
			parseInt(fk_privilegio)
		);

		if (esEdicion) {
			await UsuarioService.Actualizar(usuarioId, data)
				.then((response) => {
					if (response.data.code === 200) {
						funcionAsignarAlerta(
							"success",
							`${nombreFormulario} se actualizó correctamente`
						);

						funcionAbrirAlerta();
						funcionActualizarTabla();
						funcionCerrarModal();
						return;
					}
				})
				.catch((error) => {
					funcionAsignarAlerta("error", "Hubo un error");

					funcionAbrirAlerta();
					return;
				});
		} else {
			await UsuarioService.Registrar(data)
				.then((response) => {
					if (response.data.code === 200) {
						funcionAsignarAlerta(
							"success",
							`${nombreFormulario} se registró correctamente`
						);
						funcionAbrirAlerta();
						funcionActualizarTabla();
						funcionCerrarModal();
						return;
					}
				})
				.catch((error) => {
					funcionAsignarAlerta("error", "Hubo un error");
					funcionAbrirAlerta();
					return;
				});
		}
	};
	return (
		<>
			<Modal open={abrir} onClose={funcionCerrarModal}>
				<Box
					sx={{
						flexGrow: 1,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "90%",
						maxWidth: "500px",
						overflow: "hidden",
						border: "1px solid #ccc",
						borderRadius: "10px",
						background: "#fff",
					}}
				>
					<Typography
						sx={[
							{
								position: "fixed",
								zIndex: "99",
								width: "100%",
								height: "60px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								color: "#ffffff",
								// border: "1px solid red",
							},
							esEdicion
								? { backgroundColor: "#448aff" }
								: { backgroundColor: "#00c853" },
						]}
						variant="h5"
						component={"h2"}
					>
						{`${esEdicion ? "Edición" : "Registro"} de ${nombreFormulario}`}
					</Typography>
					<Box
						sx={{
							position: "relative",
							flexGrow: 1,
							background: "#fff",
							overflow: "hidden",
							overflowY: "scroll",
							height: "auto",
							maxHeight: "500px",
							padding: "20px",
						}}
						component={"form"}
						onSubmit={funcionEnviarCategoria}
					>
						<Grid
							sx={{ marginTop: "50px" }}
							container
							direction={"column"}
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs={1}>
								<TextField
									fullWidth
									label="Fecha Registro"
									variant="outlined"
									value={convertirFechaVisual(fecha_registro)}
									name="date"
									disabled
								/>
							</Grid>
							<Grid item xs={1}>
								<FormControl fullWidth>
									<InputLabel id="estado-select-label">Privilegio</InputLabel>
									<Select
										labelId="estado-select-label"
										id="estado-select"
										value={fk_privilegio}
										label="Privilegio"
										onChange={funcionCambiarPrivilegio}
									>
										<MenuItem value={"0"}>Selec. Privilegio</MenuItem>
										{arrayPrivilegios.map((item: ComboboxProps) => {
											return (
												<MenuItem value={String(item.valor)}>{item.descripcion}</MenuItem>
											);
										})}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Nombre"
									variant="outlined"
									value={nombre}
									name="name"
									onChange={(event) => setNombre(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Apellido"
									variant="outlined"
									value={apellido}
									name="lastname"
									onChange={(event) => setApellido(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Correo"
									variant="outlined"
									value={correo}
									name="email"
									onChange={(event) => setCorreo(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Usuario"
									variant="outlined"
									value={usuario}
									name="user"
									onChange={(event) => setUsuario(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Contraseña"
									variant="outlined"
									type="password"
									value={contrasenia}
									name="password"
									onChange={(event) => setContrasenia(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Confirmación"
									variant="outlined"
									value={contrasenia}
									name="password"
									type="password"
									onChange={(event) => setContrasenia(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Dinero"
									variant="outlined"
									value={dinero}
									name="diner"
									onChange={(event) => setDinero(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Foto"
									variant="outlined"
									value={foto}
									name="photo"
									onChange={(event) => setFoto(event.target.value)}
								/>
							</Grid>

							<Grid item xs={1}>
								<FormControl fullWidth>
									<InputLabel id="estado-select-label">Estado</InputLabel>
									<Select
										labelId="estado-select-label"
										id="estado-select"
										value={activo}
										label="Estado"
										onChange={funcionCambiarEstado}
									>
										<MenuItem value={"1"}>ACTIVO</MenuItem>
										<MenuItem value={"0"}>INACTIVO</MenuItem>
									</Select>
								</FormControl>
							</Grid>

							<Grid item xs={1}>
								<Button
									fullWidth
									variant="contained"
									style={
										esEdicion
											? { backgroundColor: "#448aff" }
											: { backgroundColor: "#00c853" }
									}
									type="submit"
								>
									{" "}
									{esEdicion ? "Editar" : "Registrarse"}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>
		</>
	);
};
