import {
	Box,
	Button,
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
import { CategoryService } from "../../../services/CategoriaService";
import {
	convertirFechaSQL,
	convertirFechaVisual,
	crearFechaISO,
} from "../../../utils/Funciones";

interface Props {
	nombreFormulario: string;
	abrir: boolean;
	esEdicion: boolean;
	itemSeleccionado: CategoryService;
	funcionCerrarModal: () => void;
	funcionActualizarTabla: () => void;
	funcionEjecutarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
}

export const CategoryRegister = ({
	nombreFormulario,
	abrir,
	esEdicion,
	itemSeleccionado,
	funcionCerrarModal,
	funcionActualizarTabla,
	funcionEjecutarAlerta,
	funcionAbrirAlerta,
}: Props) => {
	const [categoriaId, setCategoriaId] = useState(0);
	const [nombre, setNombre] = useState("");
	const [activo, setActivo] = useState("");
	const [fecha_registro, setFecha_registro] = useState("");
	const [fecha_actualizacion, setFecha_actualizacion] = useState("");

	useEffect(() => {
		setCategoriaId(itemSeleccionado.categoria_id);
		setNombre(itemSeleccionado.nombre);
		setActivo(itemSeleccionado.activo ? "1" : "0");
		setFecha_registro(itemSeleccionado.fecha_registro);
		setFecha_actualizacion(itemSeleccionado.fecha_actualizacion);
	}, [itemSeleccionado]);

	const funcionCambiarEstado = (event: SelectChangeEvent) => {
		setActivo(event.target.value as string);
	};

	const funcionEnviarCategoria = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const dataCategoria: CategoryService = new CategoryService(
			categoriaId,
			nombre,
			activo === "1",
			convertirFechaSQL(fecha_registro),
			convertirFechaSQL(crearFechaISO())
		);

		if (esEdicion) {
			await CategoryService.Actualizar(categoriaId, dataCategoria)
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
			await CategoryService.Registrar(dataCategoria)
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
							rowSpacing={3}
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
									fullWidth
									label="Nombre"
									variant="outlined"
									value={nombre}
									name="name"
									// style={{ textTransform: "capitalize" }}
									onChange={(event) => setNombre(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<InputLabel id="estado-select-label">Estado</InputLabel>

								<Select
									labelId="estado-select-label"
									id="estado-select"
									value={activo}
									label="Estado"
									fullWidth
									onChange={funcionCambiarEstado}
								>
									<MenuItem value={"1"}>ACTIVO</MenuItem>
									<MenuItem value={"0"}>INACTIVO</MenuItem>
								</Select>
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
