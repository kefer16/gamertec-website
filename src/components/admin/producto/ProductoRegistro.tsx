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
import { SelectAnidadoProps, SelectProps } from "../../../utils/Interfaces";
import { ProductoService } from "../../../services/ProductService";

interface Props {
	nombreFormulario: string;
	abrir: boolean;
	esEdicion: boolean;
	itemSeleccionado: ProductoService;
	funcionCerrarModal: () => void;
	funcionActualizarTabla: () => void;
	funcionAsignarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
	arrayCategorias: SelectProps[];
	arrayMarcas: SelectAnidadoProps[];
	arrayModelos: SelectAnidadoProps[];
}

interface ChangeValueSelect {
	valor: string;
	valorAnidado: string;
}
export const ProductoRegistro = ({
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
	arrayModelos,
}: Props) => {
	const [productoId, setProductoId] = useState(0);
	const [numeroSerie, setNumeroSerie] = useState("");
	const [fkModelo, setFkModelo] = useState("0");
	const [fkMarca, setFkMarca] = useState("0");
	const [fkCategoria, setFkCategoria] = useState("0");
	const [fechaRegistro, setFechaRegistro] = useState("");
	const [activo, setActivo] = useState("0");

	const [arrayAnidadoMarca, setArrayAnidadoMarca] = useState<
		SelectAnidadoProps[]
	>([]);
	const [arrayAnidadoModelo, setArrayAnidadoModelo] = useState<
		SelectAnidadoProps[]
	>([]);

	useEffect(() => {
		setProductoId(itemSeleccionado.producto_id);
		setFechaRegistro(itemSeleccionado.fecha_registro);
		setNumeroSerie(itemSeleccionado.numero_serie);
		setActivo(itemSeleccionado.activo ? "1" : "0");

		setFkCategoria(String(itemSeleccionado.fk_categoria));

		const nuevoArrayMarca: SelectAnidadoProps[] = arrayMarcas.filter(
			(item) => item.valor === itemSeleccionado.fk_categoria
		);
		setArrayAnidadoMarca(nuevoArrayMarca);
		setFkMarca(String(itemSeleccionado.fk_marca));

		const nuevoArrayModelo: SelectAnidadoProps[] = arrayModelos.filter(
			(item) => item.valor === itemSeleccionado.fk_marca
		);
		setArrayAnidadoModelo(nuevoArrayModelo);
		setFkModelo(String(itemSeleccionado.fk_modelo));
	}, [itemSeleccionado, arrayMarcas, arrayModelos]);

	const funcionObtenerMarcaPorCategoria = ({
		valor,
		valorAnidado,
	}: ChangeValueSelect) => {
		setFkCategoria(valor);
		const arrayNuevo: SelectAnidadoProps[] = arrayMarcas.filter(
			(item) => item.valor === parseInt(valor)
		);

		setArrayAnidadoMarca(arrayNuevo);
		setFkMarca(valorAnidado);
	};

	const funcionObtenerModeloPorMarca = ({
		valor,
		valorAnidado,
	}: ChangeValueSelect) => {
		setFkMarca(valor);
		const arrayNuevo: SelectAnidadoProps[] = arrayModelos.filter(
			(item) => item.valor === parseInt(valor)
		);

		setArrayAnidadoModelo(arrayNuevo);
		setFkModelo(valorAnidado);
	};

	const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: ProductoService = new ProductoService(
			productoId,
			numeroSerie,
			parseInt(fkModelo),
			parseInt(fkMarca),
			parseInt(fkCategoria),
			convertirFechaSQL(fechaRegistro),
			activo === "1"
		);
		console.log(data, esEdicion);

		if (esEdicion) {
			await ProductoService.Actualizar(productoId, data)
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
			await ProductoService.Registrar(data)
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
												valor: event.target.value,
												valorAnidado: "0",
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
											funcionObtenerModeloPorMarca({
												valor: event.target.value,
												valorAnidado: "0",
											})
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
								<FormControl fullWidth>
									<InputLabel id="modelo-select-label">Modelo</InputLabel>
									<Select
										labelId="modelo-select-label"
										id="modelo-select"
										value={fkModelo}
										label="Modelo"
										defaultValue={"0"}
										onChange={(event: SelectChangeEvent) =>
											setFkModelo(event.target.value as string)
										}
									>
										<MenuItem value={"0"}>Selec. Modelo</MenuItem>
										{arrayAnidadoModelo.map((modelo: SelectAnidadoProps) => {
											return (
												<MenuItem
													key={modelo.valorAnidado}
													value={String(modelo.valorAnidado)}
												>
													{modelo.descripcion}
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
									label="Numeros de Serie"
									variant="outlined"
									value={numeroSerie}
									name="serial numbers"
									onChange={(event) => setNumeroSerie(event.target.value)}
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
