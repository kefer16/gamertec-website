import {
	Typography,
	Container,
	Snackbar,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import { TableControl } from "../../controls/TableControl";
import { ToolbarControl } from "../../controls/ToobarControl";
import { CategoryService } from "../../../services/CategoriaService";
import { useEffect, useState } from "react";
import {
	GridRowsProp,
	GridColDef,
	GridValidRowModel,
	GridColumnVisibilityModel,
} from "@mui/x-data-grid";
import { CategoryRegister } from "./CategoriaRegistro";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { convertirFechaVisual, crearFechaISO } from "../../../utils/Funciones";
import { SelectProps } from "../../../utils/Interfaces";

const columnsCategorias: GridColDef<GridValidRowModel>[] = [
	{ field: "id", headerName: "ID", width: 0 },
	{ field: "index", headerName: "N°", width: 60 },
	{ field: "fecha_registro", headerName: "Fecha Registro", width: 0 },
	{ field: "fecha_registro_visual", headerName: "Fecha Registro", width: 190 },
	{ field: "nombre", headerName: "Nombre", width: 200 },
	{ field: "activo", headerName: "", width: 0 },
	{ field: "activo_nombre", headerName: "Estado", width: 130 },
];
const columasVisibles: GridColumnVisibilityModel = {
	id: false,
	activo: false,
	fecha_registro: false,
};
interface Props {
	nombreFormulario: string;
}

export const funcionObtenerCategorias = async (): Promise<SelectProps[]> => {
	const array: SelectProps[] = [];
	await CategoryService.ListarTodos()
		.then((respuesta) => {
			respuesta.data.data.forEach((element: CategoryService) => {
				array.push({ valor: element.categoria_id, descripcion: element.nombre });
			});
		})
		.catch((error: any) => {
			console.log(error);
		});
	return array;
};

export const Categoria = ({ nombreFormulario }: Props) => {
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

	const [categoriaSeleccionada, setCategoriaSeleccionada] =
		useState<CategoryService>(new CategoryService());

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
		let arrayCategorias: {}[] = [];
		await CategoryService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: CategoryService, index: number) => {
					const newRow = {
						id: element.categoria_id,
						index: index + 1,
						nombre: element.nombre,
						fecha_registro: element.fecha_registro,
						fecha_registro_visual: convertirFechaVisual(element.fecha_registro),
						fecha_actualizacion: element.fecha_actualizacion,
						activo: element.activo,
						activo_nombre: element.activo ? "Activo" : "Inactivo",
					};
					arrayCategorias.push(newRow);
				});
				setFilas(arrayCategorias);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrearCategoria = () => {
		setCategoriaSeleccionada(
			new CategoryService(0, "", false, crearFechaISO(), crearFechaISO())
		);
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditarCategoria = () => {
		const categoriaSeleccionada = filas.find((categoria) =>
			categoria.id === filaSeleccionada ? categoria : undefined
		);

		if (categoriaSeleccionada === undefined) {
			funcionAsignarAlerta("warning", "Elija un usuario para poder editar");
			funcionAbrirAlerta();

			return;
		}

		setCategoriaSeleccionada(
			new CategoryService(
				categoriaSeleccionada?.id,
				categoriaSeleccionada?.nombre,
				categoriaSeleccionada?.activo,
				categoriaSeleccionada?.fecha_registro,
				categoriaSeleccionada?.fecha_actualizacion
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

		await CategoryService.EliminarUno(itemEdicion.id)
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
		funcionListar();
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
				functionCrear={funcionCrearCategoria}
				functionActualizar={funcionEditarCategoria}
				functionEliminar={funcionAbrirDialogo}
			/>
			<TableControl
				rows={filas}
				columns={columnsCategorias}
				filaSeleccionada={filaSeleccionada}
				funcionClickFila={funcionClickFila}
				funcionCheckFila={funcionCheckFila}
				columnsVisivility={columasVisibles}
			/>

			<CategoryRegister
				nombreFormulario={nombreFormulario}
				abrir={abrirModal}
				esEdicion={esEdicion}
				itemSeleccionado={categoriaSeleccionada}
				funcionCerrarModal={funcionCerrarModal}
				funcionActualizarTabla={funcionListar}
				funcionAsignarAlerta={funcionAsignarAlerta}
				funcionAbrirAlerta={funcionAbrirAlerta}
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
