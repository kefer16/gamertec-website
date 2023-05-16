import { Typography, Container, Snackbar, Alert } from "@mui/material";
import { TableControl } from "../../controls/TableControl";
import { ToolbarControl } from "../../controls/ToobarControl";
import { CategoryService } from "../../../services/CategoryServices";
import { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { CategoryRegister } from "./CategoryRegister";
import { InterfaceAlertControl } from "../../controls/AlertControl";

const columnsCategorias: GridColDef<GridValidRowModel>[] = [
	{
		field: "id",
		headerName: "ID",
	},
	{
		field: "index",
		headerName: "N°",
		width: 100,
	},
	{ field: "nombre", headerName: "Nombre", width: 200 },
	{ field: "estado", headerName: "" },
	{ field: "estado_nombre", headerName: "Estado", width: 130 },
];

export const Category = () => {
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
						estado: element.activo,
						estado_nombre: element.activo ? "Activo" : "Inactivo",
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
		setCategoriaSeleccionada(new CategoryService(0, "", false));
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
				categoriaSeleccionada?.estado
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
				Categoria
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
			/>

			<CategoryRegister
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
