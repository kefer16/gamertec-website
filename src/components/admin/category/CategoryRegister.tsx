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
import { CategoryService } from "../../../services/CategoryServices";

interface Props {
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

	useEffect(() => {
		setCategoriaId(itemSeleccionado.categoria_id);
		setNombre(itemSeleccionado.nombre);
		setActivo(itemSeleccionado.activo ? "1" : "0");
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
			activo === "1"
		);

		console.log(dataCategoria);

		if (esEdicion) {
			await CategoryService.Actualizar(categoriaId, dataCategoria)
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
			await CategoryService.Registrar(dataCategoria)
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
						Registro de Categorias
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
