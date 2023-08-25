import {
	GridColDef,
	GridColumnVisibilityModel,
	GridRowsProp,
	GridValidRowModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { fechaActualISO } from "../../../utils/funciones.utils";
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
import { funcionObtenerMarcas } from "../marca/Marca";

import { ProductoRegistro } from "./ProductoRegistro";
import { funcionObteneModelo } from "../modelo/Modelo";
import { ProductoService } from "../../../entities/producto.entities";
import {
	ComboboxProps,
	ComboboxAnidadoProps,
} from "../../../interfaces/combobox.interface";

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
		field: "nombre_modelo",
		headerName: "Modelo",
		width: 150,
	},
	{
		field: "numero_serie",
		headerName: "Número de Serie",
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

let arrayCategoria: ComboboxProps[] = [];
let arrayMarca: ComboboxAnidadoProps[] = [];
let arrayModelo: ComboboxAnidadoProps[] = [];

export const Producto = ({ nombreFormulario }: Props) => {
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

	const [itemSeleccionado, setItemSeleccionado] = useState<ProductoService>(
		new ProductoService()
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
		await ProductoService.ListarTodos()
			.then((response) => {
				console.log(response.data.data);

				response.data.data.forEach((element: ProductoService, index: number) => {
					const newRow = {
						id: element.producto_id,
						index: index + 1,
						fecha_registro: element.fecha_registro,
						fecha_registro_visual: element.fecha_registro,
						fk_categoria: element.fk_categoria,
						nombre_categoria: arrayCategoria.find(
							(categoria: ComboboxProps) => categoria.valor === element.fk_categoria
						)?.descripcion,
						fk_marca: element.fk_marca,
						nombre_marca: arrayMarca.find(
							(marca: ComboboxAnidadoProps) => marca.valorAnidado === element.fk_marca
						)?.descripcion,
						fk_modelo: element.fk_modelo,
						nombre_modelo: arrayModelo.find(
							(modelo: ComboboxAnidadoProps) =>
								modelo.valorAnidado === element.fk_modelo
						)?.descripcion,
						numero_serie: element.numero_serie,
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
			new ProductoService(0, "", 0, 0, 0, fechaActualISO(), false)
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
			new ProductoService(
				itemEdicion.id,
				itemEdicion.numero_serie,
				itemEdicion.fk_modelo,
				itemEdicion.fk_marca,
				itemEdicion.fk_categoria,
				itemEdicion.fecha_registro,
				itemEdicion.activo
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

		await ProductoService.EliminarUno(itemEdicion.id)
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

			await funcionObteneModelo().then((result) => {
				arrayModelo = result;
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

			<ProductoRegistro
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
				arrayModelos={arrayModelo}
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
