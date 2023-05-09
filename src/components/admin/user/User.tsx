import { useState, useEffect } from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	Paper,
	Container,
	Toolbar,
	IconButton,
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	Snackbar,
	Alert,
	TableFooter,
	TablePagination,
} from "@mui/material";

import {
	addOutline,
	trashOutline,
	createOutline,
	analyticsOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { UsuarioService } from "../../../services/Usuario";
import { convertirFecha } from "../../../utils/Funciones";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { ModalHistoria } from "../../controls/ModalHistoria";

interface Props {
	usuarios: UsuarioService[];
	funcionActualizarTabla: () => void;
}

export const User = ({ usuarios, funcionActualizarTabla }: Props) => {
	// const classes = useStyles();
	const [selectedTodos, setSelectedTodos] = useState<number[]>([]);
	const [esEdicion, setEsEdicion] = useState(false);
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioService>(
		new UsuarioService()
	);

	const seleccionarItem = (todoId: number) => {
		if (selectedTodos.length === 0 || selectedTodos[0] !== todoId) {
			setSelectedTodos([todoId]);
		} else {
			setSelectedTodos([]);
		}
	};
	const [abrirAlerta, setAbrirAlerta] = useState(false);
	const [abrirHistoria, setAbrirHistoria] = useState(false);
	const [alerta, setAlerta] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});

	const EjecutarAlerta = (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => {
		setAlerta({
			active: true,
			type: type,
			text: text,
		});
	};

	const ClickAbrirHistoria = () => {
		const usuarioSeleccionado = usuarios.find(
			(usuario) => usuario.usuario_id === selectedTodos[0]
		);
		if (usuarioSeleccionado?.usuario_id === undefined) {
			EjecutarAlerta("warning", "Escoja un usuario");
			MostrarAlerta();
			return;
		}
		setUsuarioSeleccionado(
			new UsuarioService(
				usuarioSeleccionado?.usuario_id,
				usuarioSeleccionado?.nombre,
				usuarioSeleccionado?.apellido,
				usuarioSeleccionado?.correo,
				usuarioSeleccionado?.usuario,
				usuarioSeleccionado?.contrasenia,
				usuarioSeleccionado?.dinero,
				"",
				usuarioSeleccionado?.fecha_registro,
				usuarioSeleccionado?.activo,
				usuarioSeleccionado?.fk_privilegio
			)
		);

		setAbrirHistoria(true);
	};

	// Define el estado para manejar la apertura y cierre del modal

	// Define la función para manejar el evento onClick del botón
	const NuevoUsuario = () => {
		setUsuarioSeleccionado(
			new UsuarioService(
				0,
				"",
				"",
				"",
				"",
				"123",
				0,
				"",
				Date().toString(),
				true,
				0
			)
		);
		setEsEdicion(false);
		setOpen(true);
	};

	const EditarUsuario = () => {
		const usuarioSeleccionado = usuarios.find(
			(usuario) => usuario.usuario_id === selectedTodos[0]
		);

		if (usuarioSeleccionado?.usuario_id === undefined) {
			EjecutarAlerta("warning", "Elija un usuario para poder editar");
			MostrarAlerta();

			return;
		}

		setUsuarioSeleccionado(
			new UsuarioService(
				usuarioSeleccionado?.usuario_id,
				usuarioSeleccionado?.nombre,
				usuarioSeleccionado?.apellido,
				usuarioSeleccionado?.correo,
				usuarioSeleccionado?.usuario,
				usuarioSeleccionado?.contrasenia,
				usuarioSeleccionado?.dinero,
				"",
				usuarioSeleccionado?.fecha_registro,
				usuarioSeleccionado?.activo,
				usuarioSeleccionado?.fk_privilegio
			)
		);
		setEsEdicion(true);
		setOpen(true);
	};
	// Define la función para manejar el evento onClose del modal
	const handleClose = () => {
		setOpen(false);
	};

	const MostrarAlerta = () => {
		setAbrirAlerta(true);
	};
	const CerrarAlerta = () => {
		setAbrirAlerta(false);
	};

	const CerrarHistoria = () => {
		setAbrirHistoria(false);
	};

	return (
		<>
			<Container maxWidth="lg">
				<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
					Usuarios
				</Typography>
				<Toolbar
					style={{
						justifyContent: "flex-end",
					}}
				>
					<IconButton style={{ color: "#00c853" }} onClick={NuevoUsuario}>
						<IonIcon icon={addOutline} size="30" color="#00c853" />
					</IconButton>
					<IconButton style={{ color: "#448aff" }} onClick={EditarUsuario}>
						<IonIcon icon={createOutline} size="30" />
					</IconButton>
					<IconButton style={{ color: "#d50000" }}>
						<IonIcon icon={trashOutline} size="30" />
					</IconButton>
					<IconButton style={{ color: "#7c4dff" }} onClick={ClickAbrirHistoria}>
						<IonIcon icon={analyticsOutline} size="30" />
					</IconButton>
				</Toolbar>
				<TableContainer component={Paper}>
					<Table aria-label="Todo table">
						<TableHead>
							<TableRow>
								<TableCell>N°</TableCell>
								<TableCell></TableCell>
								<TableCell>Fecha</TableCell>
								<TableCell>Nombre</TableCell>
								<TableCell>Apellido</TableCell>
								<TableCell>Correo</TableCell>
								<TableCell>Usuario</TableCell>
								<TableCell>Dinero</TableCell>
								<TableCell>Activo</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{usuarios
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((usuario, index) => {
									const isItemSelected =
										selectedTodos.indexOf(usuario.usuario_id) !== -1;

									return (
										<TableRow
											key={usuario.usuario_id}
											aria-checked={isItemSelected}
											selected={isItemSelected}
										>
											<TableCell>{usuario.index}</TableCell>
											<TableCell padding="checkbox">
												<Checkbox
													checked={isItemSelected}
													onChange={() => seleccionarItem(usuario.usuario_id)}
													inputProps={{
														"aria-labelledby": `checkbox-${usuario.usuario_id}`,
													}}
												/>
											</TableCell>
											<TableCell>{convertirFecha(usuario.fecha_registro)}</TableCell>
											<TableCell>{usuario.nombre}</TableCell>
											<TableCell>{usuario.apellido}</TableCell>
											<TableCell>{usuario.correo}</TableCell>
											<TableCell>{usuario.usuario}</TableCell>
											<TableCell>{usuario.dinero}</TableCell>
											<TableCell>{usuario.activo ? "activo" : "inactivo"}</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[10, 15, 20, { label: "All", value: -1 }]}
									count={usuarios.length}
									page={page}
									onPageChange={(event: any, newPage: number) => {
										setPage(newPage);
									}}
									rowsPerPage={rowsPerPage}
									onRowsPerPageChange={(event: any) => {
										setRowsPerPage(+event.target.value);
										setPage(0);
									}}
								/>
							</TableRow>
						</TableFooter>
						<ModalUsuario
							abrir={open}
							funcionCerrarModal={handleClose}
							esEdicion={esEdicion}
							usuarioSeleccionado={usuarioSeleccionado}
							funcionActualizarTabla={funcionActualizarTabla}
							funcionEjecutarAlerta={EjecutarAlerta}
							funcionAbrirAlerta={MostrarAlerta}
						/>
						<ModalHistoria
							itemSeleccionado={usuarioSeleccionado}
							modalHistoria={abrirHistoria}
							funcionCerrarHistoria={CerrarHistoria}
						/>
					</Table>
				</TableContainer>
			</Container>
			<Snackbar
				open={abrirAlerta}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				autoHideDuration={3000}
				onClose={CerrarAlerta}
			>
				<Alert onClose={CerrarAlerta} severity={alerta.type}>
					{alerta.text}
				</Alert>
			</Snackbar>
		</>
	);
};

interface ModalUsuario {
	abrir: boolean;
	funcionCerrarModal: () => void;
	esEdicion: boolean;
	usuarioSeleccionado: UsuarioService;
	funcionActualizarTabla: () => void;
	funcionEjecutarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
}

export const ModalUsuario = ({
	abrir,
	funcionCerrarModal,
	esEdicion,
	usuarioSeleccionado,
	funcionActualizarTabla,
	funcionEjecutarAlerta,
	funcionAbrirAlerta,
}: ModalUsuario) => {
	const [usuario_id, setUsuarioId] = useState(0);
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [correo, setCorreo] = useState("");
	const [usuario, setUsuario] = useState("");
	const [contrasenia, setContrasenia] = useState("");
	const [dinero, setDinero] = useState(0);
	const [fechaRegistro, setFechaRegistro] = useState("");
	const [activo, setActivo] = useState(false);
	const [fkPrivilegio, setFkPrivilegio] = useState(0);

	useEffect(() => {
		setUsuarioId(usuarioSeleccionado.usuario_id);
		setNombre(usuarioSeleccionado.nombre);
		setApellido(usuarioSeleccionado.apellido);
		setCorreo(usuarioSeleccionado.correo);
		setUsuario(usuarioSeleccionado.usuario);
		setContrasenia(usuarioSeleccionado.contrasenia);
		setDinero(usuarioSeleccionado.dinero);
		setFechaRegistro(usuarioSeleccionado.fecha_registro);
		setActivo(usuarioSeleccionado.activo);
		setFkPrivilegio(usuarioSeleccionado.fk_privilegio);
	}, [usuarioSeleccionado]);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const dataUsuario: UsuarioService = new UsuarioService(
			usuario_id,
			nombre,
			apellido,
			correo,
			usuario,
			contrasenia,
			dinero,
			"",
			fechaRegistro,
			activo,
			fkPrivilegio
		);

		if (esEdicion) {
			await UsuarioService.Actualizar(usuario_id, dataUsuario)
				.then((response) => {
					if (response.data.code === 200) {
						funcionEjecutarAlerta("success", "Usuario se actualizó correctamente");

						funcionAbrirAlerta();
						funcionActualizarTabla();
						funcionCerrarModal();
						return;
					}
				})
				.catch((error) => {
					funcionEjecutarAlerta("error", "Hubo un error");

					funcionAbrirAlerta();
					return;
				});
		} else {
			await UsuarioService.Registrar(dataUsuario)
				.then((response) => {
					if (response.data.code === 200) {
						funcionEjecutarAlerta("success", "Usuario se registró correctamente");

						funcionAbrirAlerta();
						funcionActualizarTabla();
						funcionCerrarModal();
						return;
					}
				})
				.catch((error) => {
					funcionEjecutarAlerta("error", "Hubo un error");
					funcionAbrirAlerta();
					return;
				});
		}
	};
	return (
		<>
			<Modal open={abrir} onClose={funcionCerrarModal}>
				<Box
					sx={{ flexGrow: 1 }}
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "500px",

						border: "1px solid #ccc",
						borderRadius: 10,
						overflow: "hidden",
						padding: 20,
						background: "#fff",
					}}
				>
					<Typography variant="h5" component={"h2"} style={{ marginBottom: 20 }}>
						Registro de Usuario
					</Typography>
					<Box sx={{ flexGrow: 1 }} component={"form"} onSubmit={handleSubmit}>
						<Grid
							container
							direction={"column"}
							rowSpacing={3}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs={1}>
								<TextField
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
									fullWidth
									label="Correo"
									variant="outlined"
									value={correo}
									type="email"
									name="email"
									onChange={(event) => setCorreo(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									fullWidth
									label="Usuario"
									variant="outlined"
									value={usuario}
									name="username"
									onChange={(event) => setUsuario(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									fullWidth
									label="Dinero"
									variant="outlined"
									value={dinero}
									type="number"
									name="money"
									onChange={(event) => setDinero(parseInt(event.target.value))}
								/>
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
