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
} from "../../../utils/Funciones";
import { PrivilegioService } from "../../../services/PrivilegioService";

interface Props {
	nombreFormulario: string;
	abrir: boolean;
	esEdicion: boolean;
	itemSeleccionado: PrivilegioService;
	funcionCerrarModal: () => void;
	funcionActualizarTabla: () => void;
	funcionEjecutarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
}

export const PrivilegioRegistro = ({
	nombreFormulario,
	abrir,
	esEdicion,
	itemSeleccionado,
	funcionCerrarModal,
	funcionActualizarTabla,
	funcionEjecutarAlerta,
	funcionAbrirAlerta,
}: Props) => {
	const [privilegioId, setPrivilegioId] = useState(0);
	const [tipo, setTipo] = useState("");
	const [activo, setActivo] = useState("");
	const [fecha_registro, setFecha_registro] = useState("");
	const [abreviatura, setAbreviatura] = useState("");

	useEffect(() => {
		setPrivilegioId(itemSeleccionado.privilegio_id);
		setTipo(itemSeleccionado.tipo);
		setActivo(itemSeleccionado.activo ? "1" : "0");
		setAbreviatura(itemSeleccionado.abreviatura);
		setFecha_registro(itemSeleccionado.fecha_registro);
	}, [itemSeleccionado]);

	const funcionCambiarEstado = (event: SelectChangeEvent) => {
		setActivo(event.target.value as string);
	};

	const funcionEnviarCategoria = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const data: PrivilegioService = new PrivilegioService(
			privilegioId,
			tipo,
			activo === "1",
			abreviatura,
			convertirFechaSQL(fecha_registro)
		);

		if (esEdicion) {
			await PrivilegioService.Actualizar(privilegioId, data)
				.then((response) => {
					if (response.data.code === 200) {
						funcionEjecutarAlerta(
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
					funcionEjecutarAlerta("error", "Hubo un error");

					funcionAbrirAlerta();
					return;
				});
		} else {
			await PrivilegioService.Registrar(data)
				.then((response) => {
					if (response.data.code === 200) {
						funcionEjecutarAlerta(
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
						width: "90%",
						maxWidth: "500px",
						border: "1px solid #ccc",
						borderRadius: 10,
						overflow: "hidden",
						padding: 20,
						background: "#fff",
					}}
				>
					<Typography variant="h5" component={"h2"} style={{ marginBottom: 20 }}>
						{`Registro de ${nombreFormulario}`}
					</Typography>
					<Box
						sx={{ flexGrow: 1 }}
						component={"form"}
						onSubmit={funcionEnviarCategoria}
					>
						<Grid
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
									name="fecha_registro"
									disabled
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Nombre"
									variant="outlined"
									value={tipo}
									name="name"
									onChange={(event) => setTipo(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Abreviatura"
									variant="outlined"
									value={abreviatura}
									name="name"
									onChange={(event) => setAbreviatura(event.target.value)}
									inputProps={{
										maxLength: 3,
									}}
									helperText="solo 3 caracteres"
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
