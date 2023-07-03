import {
	GridColDef,
	GridColumnVisibilityModel,
	GridRowsProp,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import {
	convertirFechaVisual,
	crearFechaISO,
} from "../../../utils/funciones.utils";
import {
	Alert,
	Button,
	Container,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Typography,
	Dialog,
} from "@mui/material";
import { ToolbarControl } from "../../controls/ToobarControl";
import { TableControl } from "../../controls/TableControl";

import { UsuarioService } from "../../../entities/usuario.entities";
import { UsuarioRegistro } from "./UsuarioRegistro";
import { funcionObtenerPrivilegios } from "../privilegio/Privilegio";
import { ComboboxProps } from "../../../interfaces/combobox.interface";

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
		field: "nombre_privilegio",
		headerName: "Privilegio",
		width: 150,
	},
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
let arrayPrivilegio: ComboboxProps[] = [];

export const Usuario = ({ nombreFormulario }: Props) => {
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

	const [itemSeleccionado, setItemSeleccionado] = useState<UsuarioService>(
		new UsuarioService()
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
						nombre_privilegio: arrayPrivilegio.find(
							(privilegio: ComboboxProps) => privilegio.valor === element.fk_privilegio
						)?.descripcion,
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
			funcionAsignarAlerta("warning", "Elija un usuario para poder editar");
			funcionAbrirAlerta();

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

		await UsuarioService.EliminarUno(itemEdicion.id)
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
		const ObtenerData = async () => {
			return await funcionObtenerPrivilegios();
		};

		ObtenerData().then((result) => {
			arrayPrivilegio = result;
			funcionListar();
		});
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography
				variant="h5"
				component={"h2"}
				style={{ textAlign: "center", margin: "50px 0 20px 0" }}
			>
				Usuario
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

			<UsuarioRegistro
				nombreFormulario={nombreFormulario}
				abrir={abrirModal}
				esEdicion={esEdicion}
				itemSeleccionado={itemSeleccionado}
				funcionCerrarModal={funcionCerrarModal}
				funcionActualizarTabla={funcionListar}
				funcionAsignarAlerta={funcionAsignarAlerta}
				funcionAbrirAlerta={funcionAbrirAlerta}
				arrayPrivilegios={arrayPrivilegio}
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
