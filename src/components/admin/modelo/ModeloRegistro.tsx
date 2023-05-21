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

import { Component, useEffect, useState } from "react";
import {
	convertirFechaSQL,
	convertirFechaVisual,
} from "../../../utils/Funciones";
import { ModeloService } from "../../../services/ModeloService";
import { SelectAnidadoProps, SelectProps } from "../../../utils/Interfaces";
import { relative } from "path";

interface Props {
	nombreFormulario: string;
	abrir: boolean;
	esEdicion: boolean;
	itemSeleccionado: ModeloService;
	funcionCerrarModal: () => void;
	funcionActualizarTabla: () => void;
	funcionAsignarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
	arrayCategorias: SelectProps[];
	arrayMarcas: SelectAnidadoProps[];
}

interface ChangeValueSelect {
	valorCategoria: string;
	valorMarca: string;
}
export const ModeloRegistro = ({
	nombreFormulario,
	abrir,
	esEdicion,
	itemSeleccionado,
	funcionCerrarModal,
	funcionActualizarTabla,
	funcionAsignarAlerta,
	funcionAbrirAlerta,
	arrayCategorias,
	arrayMarcas,
}: Props) => {
	const [modeloId, setModeloId] = useState(0);
	const [nombre, setNombre] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [foto, setFoto] = useState("");
	const [caracteristicas, setCaracteristicas] = useState("");
	const [color, setColor] = useState("");
	const [precio, setPrecio] = useState("0");
	const [fechaRegistro, seFechaRegistro] = useState("");
	const [stock, setStock] = useState("0");
	const [numeroSeries, setNumeroSeries] = useState("0");
	const [activo, setActivo] = useState("0");
	const [fkMarca, setFkMarca] = useState("0");
	const [fkCategoria, setFkCategoria] = useState("0");
	const [arrayAnidadoMarca, setArrayAnidadoMarca] = useState<
		SelectAnidadoProps[]
	>([]);

	useEffect(() => {
		setModeloId(itemSeleccionado.modelo_id);
		setNombre(itemSeleccionado.nombre);
		setDescripcion(itemSeleccionado.descripcion);
		setFoto(itemSeleccionado.foto);
		setCaracteristicas(itemSeleccionado.caracteristicas);
		setColor(itemSeleccionado.color);
		setPrecio(String(itemSeleccionado.precio));
		seFechaRegistro(itemSeleccionado.fecha_registro);
		setStock(String(itemSeleccionado.stock));
		setNumeroSeries(itemSeleccionado.numero_series);
		setActivo(itemSeleccionado.activo ? "1" : "0");
		setFkMarca(String(itemSeleccionado.fk_marca));
		setFkCategoria(String(itemSeleccionado.fk_categoria));
		funcionObtenerMarcaPorCategoria({
			valorCategoria: String(itemSeleccionado.fk_categoria),
			valorMarca: String(itemSeleccionado.fk_marca),
		});
	}, [itemSeleccionado]);

	const funcionObtenerMarcaPorCategoria = ({
		valorCategoria,
		valorMarca,
	}: ChangeValueSelect) => {
		setFkCategoria(valorCategoria);
		const arrayNuevo: SelectAnidadoProps[] = arrayMarcas.filter(
			(item) => item.valor === parseInt(valorCategoria)
		);
		// console.log(arrayNuevo);
		console.log(valorMarca);

		// const encuentraValor = arrayNuevo.find(
		// 	(item) => item.valorAnidado === parseInt(valorMarca)
		// )?.valorAnidado;
		setArrayAnidadoMarca(arrayNuevo);
		setFkMarca(valorMarca);
	};

	const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: ModeloService = new ModeloService(
			modeloId,
			nombre,
			descripcion,
			foto,
			caracteristicas,
			color,
			parseInt(precio),
			convertirFechaSQL(fechaRegistro),
			parseInt(stock),
			numeroSeries,
			activo === "1",
			parseInt(fkMarca),
			parseInt(fkCategoria)
		);
		console.log(data, esEdicion);

		if (esEdicion) {
			await ModeloService.Actualizar(modeloId, data)
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
			await ModeloService.Registrar(data)
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
									value={convertirFechaVisual(fechaRegistro)}
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
											funcionObtenerMarcaPorCategoria({
												valorCategoria: event.target.value,
												valorMarca: "0",
											})
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
								<FormControl fullWidth>
									<InputLabel id="marca-select-label">Marca</InputLabel>
									<Select
										labelId="marca-select-label"
										id="marca-select"
										value={fkMarca}
										label="Marca"
										defaultValue={"0"}
										onChange={(event: SelectChangeEvent) =>
											setFkMarca(event.target.value as string)
										}
									>
										<MenuItem value={"0"}>Selec. Marca</MenuItem>
										{arrayAnidadoMarca.map((marca: SelectAnidadoProps) => {
											return (
												<MenuItem
													key={marca.valorAnidado}
													value={String(marca.valorAnidado)}
												>
													{marca.descripcion}
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
									label="Modelo"
									variant="outlined"
									value={nombre}
									name="model"
									onChange={(event) => setNombre(event.target.value)}
								/>
							</Grid>

							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Nombre Producto"
									variant="outlined"
									value={descripcion}
									name="description"
									multiline
									onChange={(event) => setDescripcion(event.target.value)}
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
								<TextField
									required
									fullWidth
									label="Caracteristicas"
									variant="outlined"
									value={caracteristicas}
									name="features"
									multiline
									onChange={(event) => setCaracteristicas(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Color"
									variant="outlined"
									value={color}
									name="color"
									onChange={(event) => setColor(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Precio"
									variant="outlined"
									value={precio}
									name="price"
									onChange={(event) => setPrecio(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Stock"
									variant="outlined"
									value={stock}
									name="stock"
									onChange={(event) => setStock(event.target.value)}
								/>
							</Grid>
							<Grid item xs={1}>
								<TextField
									required
									fullWidth
									label="Numeros de Serie"
									variant="outlined"
									value={numeroSeries}
									name="serial numbers"
									onChange={(event) => setNumeroSeries(event.target.value)}
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
									sx={
										esEdicion
											? { backgroundColor: "#448aff" }
											: { backgroundColor: "#00c853" }
									}
									type="submit"
								>
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
