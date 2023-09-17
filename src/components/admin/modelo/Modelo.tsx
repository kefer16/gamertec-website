import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
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
	ImagenProps,
	TableControl,
	TypeColumn,
} from "../../controls/TableControl";
import { funcionObtenerCategorias } from "../categoria/Categoria";
import { ModeloRegistro } from "./ModeloRegistro";

import { funcionObtenerMarcas } from "../marca/Marca";
import {
	ComboboxProps,
	ComboboxAnidadoProps,
} from "../../../interfaces/combobox.interface";
import { ModeloEntity } from "../../../entities/modelo.entity";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

const columnsModelo2: ColumnProps[] = [
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
		type: TypeColumn.IMAGE,
		field: "foto",
		header: "Foto",
		style: { width: "1%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "producto_nombre",
		header: "Nombre Producto",
		style: { width: "15%" },
	},
	{
		type: TypeColumn.MONEY,
		field: "precio",
		header: "Precio",
		style: { width: "4%" },
	},
	{
		type: TypeColumn.NUMBER,
		field: "stock",
		header: "Stock",
		style: { width: "1%" },
	},
	{
		type: TypeColumn.STATUS,
		field: "estado",
		header: "Estado",
		style: { width: "4%" },
	},
];

export interface ValuesModeloProps {
	id: number;
	index: number;
	fecha_registro: Date;
	categoria_id: number;
	categoria_nombre?: string;
	marca_id: number;
	marca_nombre?: string;
	modelo_nombre: string;
	producto_nombre: string;
	foto: ImagenProps;
	precio: number;
	stock: number;
	color: string;
	caracteristicas: string;
	estado: EstadoProps;
}
interface Props {
	nombreFormulario: string;
}

let arrayCategoria: ComboboxProps[] = [];
let arrayMarca: ComboboxAnidadoProps[] = [];

export const funcionObteneModelo = async (): Promise<
	ComboboxAnidadoProps[]
> => {
	const array: ComboboxAnidadoProps[] = [];
	await ModeloEntity.ListarTodos()
		.then((respuesta) => {
			respuesta.data.data.forEach((element: ModeloEntity) => {
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
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);
	const [dialogo, setDialogo] = useState(false);
	const [arrayModelo, setArrayModelo] = useState<ValuesModeloProps[]>([]);
	const [modeloSeleccionado, setModeloSeleccionado] =
		useState<ValuesModeloProps >({} as ValuesModeloProps);

	const funcionCerrarDialogo = () => {
		setDialogo(false);
	};

	const funcionAbrirDialogo = () => {
		const itemEdicion = arrayModelo.find((item) =>
			item.id === modeloSeleccionado?.id ? item : undefined
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

	const [itemSeleccionado, setItemSeleccionado] = useState<ModeloEntity>(
		new ModeloEntity()
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
		const arrayModelo: ValuesModeloProps[] = [];
		await ModeloEntity.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: ModeloEntity, index: number) => {
					const newRow: ValuesModeloProps = {
						id: element.modelo_id,
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
						modelo_nombre: element.nombre,
						producto_nombre: element.descripcion,
						foto: {
							img: element.foto,
							alt: element.descripcion,
						},
						precio: element.precio,
						stock: element.stock,
						color: element.color,
						caracteristicas: element.caracteristicas,
						estado: {
							valor: element.activo,
							estado: element.activo ? "Activo" : "Inactivo",
						},
					};
					arrayModelo.push(newRow);
				});

				setArrayModelo(arrayModelo);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrear = () => {
		setItemSeleccionado(
			new ModeloEntity(0, "", "", "", "", "", 0, new Date(), 0, false, 0, 0)
		);
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditar = () => {
		const itemEdicion = arrayModelo.find((item) =>
			item.id === modeloSeleccionado?.id ? item : undefined
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
			new ModeloEntity(
				itemEdicion.id,
				itemEdicion.modelo_nombre,
				itemEdicion.producto_nombre,
				itemEdicion.foto.img,
				itemEdicion.caracteristicas,
				itemEdicion.color,
				itemEdicion.precio,
				itemEdicion.fecha_registro,
				itemEdicion.stock,
				itemEdicion.estado.valor,
				itemEdicion.marca_id,
				itemEdicion.categoria_id
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionEliminar = async () => {
		const itemEdicion = arrayModelo.find((item) =>
			item.id === modeloSeleccionado?.id ? item : undefined
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

		await ModeloEntity.EliminarUno(itemEdicion.id)
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
			<TableControl<ValuesModeloProps>
				ancho={{ minWidth: "110rem" }}
				columnas={columnsModelo2}
				filas={arrayModelo}
				filaSeleccionada={modeloSeleccionado}
				funcionFilaSeleccionada={setModeloSeleccionado}
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
				<DialogTitle id="alert-dialog-title">¿Desea continuar?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{`Este proceso eliminará el/la ${nombreFormulario.toLowerCase()}: ${
							arrayModelo.find(
								(item) => item.id === (modeloSeleccionado ? modeloSeleccionado.id : 0)
							)?.modelo_nombre
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
