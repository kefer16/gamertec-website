import {
	GridColDef,
	GridColumnVisibilityModel,
	GridRowsProp,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { convertirFechaVisual, crearFechaISO } from "../../../utils/Funciones";
import {
	Alert,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Typography,
} from "@mui/material";
import { ToolbarControl } from "../../controls/ToobarControl";
import { TableControl } from "../../controls/TableControl";
import { funcionObtenerCategorias } from "../categoria/Categoria";
import { ModeloRegistro } from "./ModeloRegistro";
import { ModeloService } from "../../../services/ModeloService";
import { funcionObtenerMarcas } from "../marca/Marca";
import { SelectAnidadoProps, SelectProps } from "../../../utils/Interfaces";

const columnas: GridColDef<GridValidRowModel>[] = [
	{
		field: "id",
		headerName: "ID",
	},
	{
		field: "index",
		headerName: "N°",
		width: 60,
	},
	{ field: "fecha_registro_visual", headerName: "Fecha Registro", width: 190 },
	{
		field: "nombre_categoria",
		headerName: "Categoria",
		width: 150,
	},
	{
		field: "nombre_marca",
		headerName: "Marca",
		width: 150,
	},
	{
		field: "nombre",
		headerName: "Modelo",
		width: 150,
	},

	{
		field: "descripcion",
		headerName: "Nombre Producto",
		width: 250,
	},

	{
		field: "precio",
		headerName: "Precio",
		width: 150,
	},

	{
		field: "stock",
		headerName: "Stock",
		width: 150,
	},
	{ field: "activo_nombre", headerName: "Estado", width: 130 },
];

const columasVisibles: GridColumnVisibilityModel = {
	id: false,
};
interface Props {
	nombreFormulario: string;
}

let arrayCategoria: SelectProps[] = [];
let arrayMarca: SelectAnidadoProps[] = [];

export const funcionObteneModelo = async (): Promise<SelectAnidadoProps[]> => {
	const array: SelectAnidadoProps[] = [];
	await ModeloService.ListarTodos()
		.then((respuesta) => {
			respuesta.data.data.forEach((element: ModeloService) => {
				array.push({
					valor: element.fk_marca,
					valorAnidado: element.modelo_id,
					descripcion: element.nombre,
				});
			});
		})
		.catch((error: any) => {
			console.log(error);
		});
	return array;
};

export const Modelo = ({ nombreFormulario }: Props) => {
	const [filas, setFilas] = useState<GridRowsProp>([]);
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);
	const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);
	const [dialogo, setDialogo] = useState(false);

	const funcionCerrarDialogo = () => {
		setDialogo(false);
	};

	const funcionAbrirDialogo = () => {
		const itemEdicion = filas.find((item) =>
			item.id === filaSeleccionada ? item : undefined
		);

		if (itemEdicion === undefined) {
			funcionAsignarAlerta(
				"warning",
				`Elija un ${nombreFormulario} para poder eliminar`
			);
			funcionAbrirAlerta();

			return;
		}
		setDialogo(true);
	};
	const funcionClickFila = (params: any) => {
		setFilaSeleccionada(params.id === filaSeleccionada ? null : params.id);
	};

	const funcionCheckFila = (params: any) => {
		const item = params[params.length - 1];
		setFilaSeleccionada(item === undefined ? null : item);
	};

	const [itemSeleccionado, setItemSeleccionado] = useState<ModeloService>(
		new ModeloService()
	);

	const [alerta, setAlerta] = useState<InterfaceAlertControl>({
		active: false,
		type: "info",
		text: "",
	});

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

	const funcionAbrirAlerta = () => {
		setAbrirAlerta(true);
	};

	const funcionCerrarAlerta = () => {
		setAbrirAlerta(false);
	};

	const funcionListar = async () => {
		let array: {}[] = [];
		await ModeloService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: ModeloService, index: number) => {
					const newRow = {
						id: element.modelo_id,
						index: index + 1,
						fecha_registro: element.fecha_registro,
						fecha_registro_visual: convertirFechaVisual(element.fecha_registro),
						fk_categoria: element.fk_categoria,
						nombre_categoria: arrayCategoria.find(
							(categoria: SelectProps) => categoria.valor === element.fk_categoria
						)?.descripcion,
						fk_marca: element.fk_marca,
						nombre_marca: arrayMarca.find(
							(marca: SelectAnidadoProps) => marca.valorAnidado === element.fk_marca
						)?.descripcion,
						nombre: element.nombre,
						descripcion: element.descripcion,
						foto: element.foto,
						caracteristicas: element.caracteristicas,
						color: element.color,
						precio: element.precio,
						stock: element.stock,
						numero_series: element.numero_series,
						activo: element.activo,
						activo_nombre: element.activo ? "Activo" : "Inactivo",
					};
					array.push(newRow);
				});

				setFilas(array);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrear = () => {
		setItemSeleccionado(
			new ModeloService(
				0,
				"",
				"",
				"",
				"",
				"",
				0,
				crearFechaISO(),
				0,
				"",
				false,
				0,
				0
			)
		);
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditar = () => {
		const itemEdicion = filas.find((item) =>
			item.id === filaSeleccionada ? item : undefined
		);

		if (itemEdicion === undefined) {
			funcionAsignarAlerta(
				"warning",
				`Elija un ${nombreFormulario} para poder editar`
			);
			funcionAbrirAlerta();

			return;
		}

		setItemSeleccionado(
			new ModeloService(
				itemEdicion.id,
				itemEdicion.nombre,
				itemEdicion.descripcion,
				itemEdicion.foto,
				itemEdicion.caracteristicas,
				itemEdicion.color,
				itemEdicion.precio,
				itemEdicion.fecha_registro,
				itemEdicion.stock,
				itemEdicion.numero_series,
				itemEdicion.activo,
				itemEdicion.fk_marca,
				itemEdicion.fk_categoria
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionEliminar = async () => {
		const itemEdicion = filas.find((item) =>
			item.id === filaSeleccionada ? item : undefined
		);

		if (itemEdicion === undefined) {
			funcionAsignarAlerta(
				"warning",
				`Elija un ${nombreFormulario} para poder eliminar`
			);
			funcionAbrirAlerta();
			funcionCerrarDialogo();
			return;
		}

		await ModeloService.EliminarUno(itemEdicion.id)
			.then((response) => {
				if (response.data.code === 200) {
					funcionAsignarAlerta(
						"success",
						`${nombreFormulario} se eliminó correctamente`
					);
					funcionAbrirAlerta();
					funcionCerrarDialogo();
					funcionListar();
					return;
				}
			})
			.catch((error) => {
				console.log(error);
				funcionAsignarAlerta("error", "Hubo un error");
				funcionAbrirAlerta();
				funcionCerrarDialogo();
				return;
			});
	};

	const funcionCerrarModal = () => {
		setAbrirModal(false);
	};

	useEffect(() => {
		const obtenerData = async () => {
			await funcionObtenerCategorias().then((result) => {
				arrayCategoria = result;
			});

			await funcionObtenerMarcas().then((result) => {
				arrayMarca = result;
			});

			await funcionListar();
		};

		obtenerData();
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography
				variant="h5"
				component={"h2"}
				style={{ textAlign: "center", margin: "50px 0 20px 0" }}
			>
				{nombreFormulario}
			</Typography>
			<ToolbarControl
				functionCrear={funcionCrear}
				functionActualizar={funcionEditar}
				functionEliminar={funcionAbrirDialogo}
			/>
			<TableControl
				rows={filas}
				columns={columnas}
				filaSeleccionada={filaSeleccionada}
				funcionClickFila={funcionClickFila}
				funcionCheckFila={funcionCheckFila}
				columnsVisivility={columasVisibles}
			/>

			<ModeloRegistro
				nombreFormulario={nombreFormulario}
				abrir={abrirModal}
				esEdicion={esEdicion}
				itemSeleccionado={itemSeleccionado}
				funcionCerrarModal={funcionCerrarModal}
				funcionActualizarTabla={funcionListar}
				funcionAsignarAlerta={funcionAsignarAlerta}
				funcionAbrirAlerta={funcionAbrirAlerta}
				arrayCategorias={arrayCategoria}
				arrayMarcas={arrayMarca}
			/>
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
			<Dialog
				open={dialogo}
				onClose={funcionCerrarDialogo}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{` ¿Desea continuar?`}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{`Este proceso eliminará el/la ${nombreFormulario.toLowerCase()}: ${
							filas.find(
								(item) =>
									item.id === (filaSeleccionada === undefined ? 0 : filaSeleccionada)
							)?.nombre
						}`}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={funcionCerrarDialogo} autoFocus>
						Cancelar
					</Button>
					<Button color="error" onClick={funcionEliminar}>
						Eliminar
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};
