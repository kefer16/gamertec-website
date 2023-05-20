import { Typography, Container, Snackbar, Alert } from "@mui/material";
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
import { relative } from "path";

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

export interface SelectProps {
	valor: number;
	descripcion: string;
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
	const [rowsCategorias, setRowsCategorias] = useState<GridRowsProp>([]);
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);
	const [filaSeleccionada, setFilaSeleccionada] = useState<number | null>(null);

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

	const funcionActivarAlerta = (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => {
		setAlerta({
			active: true,
			type: type,
			text: text,
		});
	};

	const funcionMostrarAlerta = () => {
		setAbrirAlerta(true);
	};

	const funcionCerrarAlerta = () => {
		setAbrirAlerta(false);
	};

	const funcionListarCategorias = async () => {
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
				setRowsCategorias(arrayCategorias);
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
		const categoriaSeleccionada = rowsCategorias.find((categoria) =>
			categoria.id === filaSeleccionada ? categoria : undefined
		);

		if (categoriaSeleccionada === undefined) {
			funcionActivarAlerta("warning", "Elija un usuario para poder editar");
			funcionMostrarAlerta();

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

	const funcionCerrarModal = () => {
		setAbrirModal(false);
	};

	useEffect(() => {
		funcionListarCategorias();
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				{nombreFormulario}
			</Typography>
			<ToolbarControl
				functionCrear={funcionCrearCategoria}
				functionActualizar={funcionEditarCategoria}
			/>
			<TableControl
				rows={rowsCategorias}
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
				funcionActualizarTabla={funcionListarCategorias}
				funcionEjecutarAlerta={funcionActivarAlerta}
				funcionAbrirAlerta={funcionMostrarAlerta}
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
		</Container>
	);
};
