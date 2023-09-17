import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { fechaActualISO } from "../../../utils/funciones.utils";
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Typography,
} from "@mui/material";
import { ToolbarControl } from "../../controls/ToobarControl";
import {
	ColumnProps,
	EstadoProps,
	TableControl,
	TypeColumn,
} from "../../controls/TableControl";
import { funcionObtenerCategorias } from "../categoria/Categoria";
import { funcionObtenerMarcas } from "../marca/Marca";

import { ProductoRegistro } from "./ProductoRegistro";
import { funcionObteneModelo } from "../modelo/Modelo";
import { ProductoService } from "../../../entities/producto.entities";
import {
	ComboboxProps,
	ComboboxAnidadoProps,
} from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

const columnsProducto2: ColumnProps[] = [
	{
		type: TypeColumn.TEXT,
		field: "index",
		header: "N°",
		style: { width: "1%" },
	},
	{
		type: TypeColumn.DATE,
		field: "fecha_registro",
		header: "Fecha Registro",
		style: { width: "10%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "categoria_nombre",
		header: "Categoria",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "marca_nombre",
		header: "Marca",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "modelo_nombre",
		header: "Modelo",
		style: { width: "10%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "numero_serie",
		header: "Número Serie",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.STATUS,
		field: "estado",
		header: "Estado",
		style: { width: "4%" },
	},
];

export interface ValuesProductoProps {
	id: number;
	index: number;
	fecha_registro: Date;
	categoria_id: number;
	categoria_nombre?: string;
	marca_id: number;
	marca_nombre?: string;
	modelo_id: number;
	modelo_nombre?: string;
	numero_serie: string;
	estado: EstadoProps;
}

interface Props {
	nombreFormulario: string;
}

let arrayCategoria: ComboboxProps[] = [];
let arrayMarca: ComboboxAnidadoProps[] = [];
let arrayModelo: ComboboxAnidadoProps[] = [];

export const Producto = ({ nombreFormulario }: Props) => {
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);

	const [dialogo, setDialogo] = useState(false);
	const [arrayProducto, setArrayProducto] = useState<ValuesProductoProps[]>([]);
	const [productoSeleccionado, setProductoSeleccionado] =
		useState<ValuesProductoProps | null>(null);

	const funcionCerrarDialogo = () => {
		setDialogo(false);
	};

	const funcionAbrirDialogo = () => {
		const itemEdicion = arrayProducto.find((item) =>
			item.id === productoSeleccionado?.id ? item : undefined
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
		let arrayProducto: ValuesProductoProps[] = [];
		await ProductoService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: ProductoService, index: number) => {
					const newRow: ValuesProductoProps = {
						id: element.producto_id,
						index: index + 1,
						fecha_registro: element.fecha_registro,
						categoria_id: element.fk_categoria,
						categoria_nombre: arrayCategoria.find(
							(categoria: ComboboxProps) => categoria.valor === element.fk_categoria
						)?.descripcion,
						marca_id: element.fk_marca,
						marca_nombre: arrayMarca.find(
							(marca: ComboboxAnidadoProps) => marca.valorAnidado === element.fk_marca
						)?.descripcion,
						modelo_id: element.fk_modelo,
						modelo_nombre: arrayModelo.find(
							(modelo: ComboboxAnidadoProps) =>
								modelo.valorAnidado === element.fk_modelo
						)?.descripcion,
						numero_serie: element.numero_serie,
						estado: {
							valor: element.activo,
							estado: element.activo ? "Activo" : "Inactivo",
						},
					};
					arrayProducto.push(newRow);
				});

				setArrayProducto(arrayProducto);
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
		const itemEdicion = arrayProducto.find((item) =>
			item.id === productoSeleccionado?.id ? item : undefined
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
				itemEdicion.modelo_id,
				itemEdicion.marca_id,
				itemEdicion.categoria_id,
				itemEdicion.fecha_registro,
				itemEdicion.estado.valor
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionEliminar = async () => {
		const itemEdicion = arrayProducto.find((item) =>
			item.id === productoSeleccionado?.id ? item : undefined
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
		<ContainerBodyStyled>
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
				ancho={{ minWidth: "90rem" }}
				columnas={columnsProducto2}
				filas={arrayProducto}
				filaSeleccionada={productoSeleccionado}
				funcionFilaSeleccionada={setProductoSeleccionado}
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
							arrayProducto.find(
								(item) =>
									item.id ===
									(productoSeleccionado === null ? 0 : productoSeleccionado.id)
							)?.numero_serie
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
		</ContainerBodyStyled>
	);
};
