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
import { MarcaService } from "../../../services/MarcaService";
import { SelectProps } from "../../../utils/Interfaces";

interface Props {
	nombreFormulario: string;
	abrir: boolean;
	esEdicion: boolean;
	itemSeleccionado: MarcaService;
	funcionCerrarModal: () => void;
	funcionActualizarTabla: () => void;
	funcionAsignarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
	arrayCategorias: SelectProps[];
}

export const MarcaRegistro = ({
	nombreFormulario,
	abrir,
	esEdicion,
	itemSeleccionado,
	funcionCerrarModal,
	funcionActualizarTabla,
	funcionAsignarAlerta,
	funcionAbrirAlerta,
	arrayCategorias,
}: Props) => {
	const [marcaId, setMarcaId] = useState(0);
	const [nombre, setNombre] = useState("");
	const [fecha_registro, setFecha_registro] = useState("");
	const [activo, setActivo] = useState("0");
	const [fkCategoria, setFkCategoria] = useState("0");

	useEffect(() => {
		setMarcaId(itemSeleccionado.marca_id);
		setNombre(itemSeleccionado.nombre);
		setFecha_registro(itemSeleccionado.fecha_registro);
		setFkCategoria(String(itemSeleccionado.fk_categoria));
		setActivo(itemSeleccionado.activo ? "1" : "0");
	}, [itemSeleccionado]);

	const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: MarcaService = new MarcaService(
			marcaId,
			nombre,
			activo === "1",
			parseInt(fkCategoria),
			convertirFechaSQL(fecha_registro)
		);
		console.log(data, esEdicion);

		if (esEdicion) {
			await MarcaService.Actualizar(marcaId, data)
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
					console.log(error);
					funcionAsignarAlerta("error", "Hubo un error");

					funcionAbrirAlerta();
					return;
				});
		} else {
			await MarcaService.Registrar(data)
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
						onSubmit={funcionGuardar}
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
									<InputLabel id="categoria-select-label">Categoria</InputLabel>
									<Select
										labelId="categoria-select-label"
										id="categoria-select"
										value={fkCategoria}
										label="Categoria"
										onChange={(event: SelectChangeEvent) =>
											setFkCategoria(event.target.value as string)
										}
									>
										<MenuItem value={"0"}>Selec. Categoria</MenuItem>
										{arrayCategorias.map((categoria: SelectProps) => {
											return (
												<MenuItem key={categoria.valor} value={String(categoria.valor)}>
													{categoria.descripcion}
												</MenuItem>
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
								<FormControl fullWidth>
									<InputLabel id="estado-select-label">Estado</InputLabel>
									<Select
										labelId="estado-select-label"
										id="estado-select"
										value={activo}
										label="Estado"
										onChange={(event: SelectChangeEvent) =>
											setActivo(event.target.value as string)
										}
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
