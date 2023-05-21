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
import { MarcaRegistro } from "./MarcaRegistro";
import { MarcaService } from "../../../services/MarcaService";
import { funcionObtenerCategorias } from "../categoria/Categoria";
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
		field: "nombre",
		headerName: "Marca",
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

export const funcionObtenerMarcas = async (): Promise<SelectAnidadoProps[]> => {
	const array: SelectAnidadoProps[] = [];
	await MarcaService.ListarTodos()
		.then((respuesta) => {
			respuesta.data.data.forEach((element: MarcaService) => {
				array.push({
					valor: element.fk_categoria,
					valorAnidado: element.marca_id,
					descripcion: element.nombre,
				});
			});
		})
		.catch((error: any) => {
			console.log(error);
		});
	return array;
};

export const Marca = ({ nombreFormulario }: Props) => {
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

	const [itemSeleccionado, setItemSeleccionado] = useState<MarcaService>(
		new MarcaService()
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
		await MarcaService.ListarTodos()
			.then((response) => {
				console.log(response.data.data);

				response.data.data.forEach((element: MarcaService, index: number) => {
					const newRow = {
						id: element.marca_id,
						index: index + 1,
						nombre: element.nombre,
						fecha_registro: element.fecha_registro,
						fecha_registro_visual: convertirFechaVisual(element.fecha_registro),
						fk_categoria: element.fk_categoria,
						nombre_categoria: arrayCategoria.find(
							(categoria: SelectProps) => categoria.valor === element.fk_categoria
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
		setItemSeleccionado(new MarcaService(0, "", false, 0, crearFechaISO()));
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
			new MarcaService(
				itemEdicion.id,
				itemEdicion.nombre,
				itemEdicion.activo,
				itemEdicion.fk_categoria,
				itemEdicion.fecha_registro
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

		await MarcaService.EliminarUno(itemEdicion.id)
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
		const obtenerCategorias = async () => {
			return await funcionObtenerCategorias();
		};
		obtenerCategorias().then((result) => {
			arrayCategoria = result;
			funcionListar();
		});
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
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

			<MarcaRegistro
				nombreFormulario={nombreFormulario}
				abrir={abrirModal}
				esEdicion={esEdicion}
				itemSeleccionado={itemSeleccionado}
				funcionCerrarModal={funcionCerrarModal}
				funcionActualizarTabla={funcionListar}
				funcionAsignarAlerta={funcionAsignarAlerta}
				funcionAbrirAlerta={funcionAbrirAlerta}
				arrayCategorias={arrayCategoria}
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
