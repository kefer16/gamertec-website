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

import { UsuarioService } from "../../../services/UsuarioService";
import { ProductoRegistro } from "./ProductoRegistro";

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
	{ field: "fecha_registro", headerName: "", width: 0 },
	{ field: "fecha_registro_visual", headerName: "Fecha Registro", width: 190 },

	{
		field: "nombre",
		headerName: "Nombre",
		width: 150,
	},
	{
		field: "apellido",
		headerName: "Apellido",
		width: 150,
	},
	{
		field: "correo",
		headerName: "Correo",
		width: 200,
	},
	{
		field: "usuario",
		headerName: "Usuario",
		width: 100,
	},
	{
		field: "contrasenia",
		headerName: "",
		width: 0,
	},
	{
		field: "dinero",
		headerName: "Dinero",
		width: 100,
	},

	{ field: "activo", headerName: "" },
	{ field: "activo_nombre", headerName: "Estado", width: 130 },
];

const columasVisibles: GridColumnVisibilityModel = {
	id: false,
	activo: false,
	contrasenia: false,
	fecha_registro: false,
};
interface Props {
	nombreFormulario: string;
}
export const Producto = ({ nombreFormulario }: Props) => {
	const [filas, setFilas] = useState<GridRowsProp>([]);
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

	const [itemSeleccionado, setItemSeleccionado] = useState<UsuarioService>(
		new UsuarioService()
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
		await UsuarioService.ListarTodos()
			.then((response) => {
				console.log(response.data.data);

				response.data.data.forEach((element: UsuarioService, index: number) => {
					const newRow = {
						id: element.usuario_id,
						index: index + 1,
						nombre: element.nombre,
						apellido: element.apellido,
						correo: element.correo,
						usuario: element.usuario,
						dinero: element.dinero,
						foto: element.foto,
						fecha_registro: element.fecha_registro,
						fecha_registro_visual: convertirFechaVisual(element.fecha_registro),
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
			new UsuarioService(0, "", "", "", "", "", 0, "", crearFechaISO(), false, 0)
		);
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditar = () => {
		const itemEdicion = filas.find((item) =>
			item.id === filaSeleccionada ? item : undefined
		);

		if (itemEdicion === undefined) {
			funcionActivarAlerta(
				"warning",
				`Elija un ${nombreFormulario} para poder editar`
			);
			funcionMostrarAlerta();

			return;
		}

		setItemSeleccionado(
			new UsuarioService(
				itemEdicion.usuario_id,
				itemEdicion.nombre,
				itemEdicion.apellido,
				itemEdicion.correo,
				itemEdicion.usuario,
				itemEdicion.contrasenia,
				itemEdicion.dinero,
				itemEdicion.foto,
				itemEdicion.fecha_registro,
				itemEdicion.activo,
				itemEdicion.fk_privilegio
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
				Usuario
			</Typography>
			<ToolbarControl
				functionCrear={funcionCrear}
				functionActualizar={funcionEditar}
			/>
			<TableControl
				rows={filas}
				columns={columnas}
				filaSeleccionada={filaSeleccionada}
				funcionClickFila={funcionClickFila}
				funcionCheckFila={funcionCheckFila}
				columnsVisivility={columasVisibles}
			/>

			<ProductoRegistro
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
