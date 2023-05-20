import {
	GridColDef,
	GridColumnVisibilityModel,
	GridRowsProp,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { convertirFechaVisual, crearFechaISO } from "../../../utils/Funciones";
import { Alert, Container, Snackbar, Typography } from "@mui/material";
import { ToolbarControl } from "../../controls/ToobarControl";
import { TableControl } from "../../controls/TableControl";
import { PrivilegioService } from "../../../services/PrivilegioService";
import { PrivilegioRegistro } from "./PrivilegioRegistro";
import { SelectProps } from "../categoria/Categoria";

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

	{ field: "fecha_registro", headerName: "", width: 200 },
	{ field: "fecha_registro_visual", headerName: "Fecha Registro", width: 250 },

	{ field: "tipo", headerName: "Tipo", width: 200 },
	{ field: "abreviatura", headerName: "Abreviatura", width: 200 },

	{ field: "activo", headerName: "" },
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

export const funcionObtenerPrivilegios = async (): Promise<SelectProps[]> => {
	let array: SelectProps[] = [];
	await PrivilegioService.ListarTodos()
		.then((response) => {
			response.data.data.forEach((element: PrivilegioService) => {
				array.push({ valor: element.privilegio_id, descripcion: element.tipo });
			});
		})
		.catch((error: any) => {
			console.log(error);
		});
	return array;
};

export const Privilegio = ({ nombreFormulario }: Props) => {
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

	const [itemSeleccionado, setItemSeleccionado] = useState<PrivilegioService>(
		new PrivilegioService()
	);

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

	const funcionListar = async () => {
		let array: {}[] = [];
		await PrivilegioService.ListarTodos()
			.then((response) => {
				console.log(response.data.data);

				response.data.data.forEach((element: PrivilegioService, index: number) => {
					const newRow = {
						id: element.privilegio_id,
						index: index + 1,
						tipo: element.tipo,
						activo: element.activo,
						activo_nombre: element.activo ? "Activo" : "Inactivo",
						fecha_registro: element.fecha_registro,
						abreviatura: element.abreviatura,
						fecha_registro_visual: convertirFechaVisual(element.fecha_registro),
					};
					array.push(newRow);
				});
				setRowsCategorias(array);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrear = () => {
		setItemSeleccionado(new PrivilegioService(0, "", false, "", crearFechaISO()));
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditar = () => {
		const itemEdicion = rowsCategorias.find((categoria) =>
			categoria.id === filaSeleccionada ? categoria : undefined
		);

		if (itemEdicion === undefined) {
			funcionActivarAlerta("warning", "Elija un usuario para poder editar");
			funcionMostrarAlerta();

			return;
		}

		setItemSeleccionado(
			new PrivilegioService(
				itemEdicion?.id,
				itemEdicion?.tipo,
				itemEdicion?.activo,
				itemEdicion?.abreviatura,
				itemEdicion?.fecha_registro
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionCerrarModal = () => {
		setAbrirModal(false);
	};

	useEffect(() => {
		funcionListar();
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				{nombreFormulario}
			</Typography>
			<ToolbarControl
				functionCrear={funcionCrear}
				functionActualizar={funcionEditar}
			/>
			<TableControl
				rows={rowsCategorias}
				columns={columnsCategorias}
				filaSeleccionada={filaSeleccionada}
				funcionClickFila={funcionClickFila}
				funcionCheckFila={funcionCheckFila}
				columnsVisivility={columasVisibles}
			/>

			<PrivilegioRegistro
				nombreFormulario={nombreFormulario}
				abrir={abrirModal}
				esEdicion={esEdicion}
				itemSeleccionado={itemSeleccionado}
				funcionCerrarModal={funcionCerrarModal}
				funcionActualizarTabla={funcionListar}
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
