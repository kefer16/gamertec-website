import {
	Typography,
	Snackbar,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import {
	ColumnProps,
	EstadoProps,
	TableControl,
	TypeColumn,
} from "../../controls/TableControl";
import { ToolbarControl } from "../../controls/ToobarControl";
import { CategoryService } from "../../../entities/categoria.entities";
import { useEffect, useState } from "react";
import { CategoryRegister } from "./CategoriaRegistro";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import { fechaActualISO } from "../../../utils/funciones.utils";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

const columnsCategorias2: ColumnProps[] = [
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
		style: { width: "5%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "categoria_nombre",
		header: "Categoria",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.STATUS,
		field: "estado",
		header: "Estado",
		style: { width: "15%" },
	},
];

export interface ValuesCategoriaProps {
	id: number;
	index: number;
	categoria_nombre: string;
	fecha_registro: Date;
	fecha_actualizacion: Date;
	estado: EstadoProps;
}

interface Props {
	nombreFormulario: string;
}

export const funcionObtenerCategorias = async (): Promise<ComboboxProps[]> => {
	const array: ComboboxProps[] = [];
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
	const [arrayCategoria, setArrayCategoria] = useState<ValuesCategoriaProps[]>(
		[]
	);
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);
	const [categoriaSeleccionada, setCategoriaSeleccionada] =
		useState<ValuesCategoriaProps>({} as ValuesCategoriaProps);
	const [dialogo, setDialogo] = useState(false);

	const funcionCerrarDialogo = () => {
		setDialogo(false);
	};

	const funcionAbrirDialogo = () => {
		const itemEdicion = arrayCategoria.find((item) =>
			item.id === categoriaSeleccionada?.id ? item : undefined
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

	const [itemSeleccionado, setItemSeleccionado] = useState<CategoryService>(
		new CategoryService()
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
		const arrayCategorias: ValuesCategoriaProps[] = [];
		await CategoryService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: CategoryService, index: number) => {
					const newRow: ValuesCategoriaProps = {
						id: element.categoria_id,
						index: index + 1,
						categoria_nombre: element.nombre,
						fecha_registro: element.fecha_registro,
						fecha_actualizacion: element.fecha_actualizacion,
						estado: {
							valor: element.activo,
							estado: element.activo ? "Activo" : "Inactivo",
						},
					};
					arrayCategorias.push(newRow);
				});
				setArrayCategoria(arrayCategorias);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrearCategoria = () => {
		setItemSeleccionado(
			new CategoryService(0, "", false, fechaActualISO(), fechaActualISO())
		);
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditarCategoria = () => {
		const editarItem = arrayCategoria.find((item) =>
			item.id === categoriaSeleccionada?.id ? item : undefined
		);

		if (editarItem === undefined) {
			funcionAsignarAlerta("warning", "Elija un usuario para poder editar");
			funcionAbrirAlerta();

			return;
		}

		setItemSeleccionado(
			new CategoryService(
				editarItem.id,
				editarItem.categoria_nombre,
				editarItem.estado.valor,
				editarItem.fecha_registro,
				editarItem.fecha_actualizacion
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionEliminar = async () => {
		const eliminarItem = arrayCategoria.find((item) =>
			item.id === categoriaSeleccionada?.id ? item : undefined
		);

		if (eliminarItem === undefined) {
			funcionAsignarAlerta(
				"warning",
				`Elija un ${nombreFormulario} para poder eliminar`
			);
			funcionAbrirAlerta();
			funcionCerrarDialogo();
			return;
		}

		await CategoryService.EliminarUno(eliminarItem.id)
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
		<ContainerBodyStyled>
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
			<TableControl<ValuesCategoriaProps>
				ancho={{ minWidth: "50rem" }}
				columnas={columnsCategorias2}
				filas={arrayCategoria}
				filaSeleccionada={categoriaSeleccionada}
				funcionFilaSeleccionada={setCategoriaSeleccionada}
			/>

			<CategoryRegister
				nombreFormulario={nombreFormulario}
				abrir={abrirModal}
				esEdicion={esEdicion}
				itemSeleccionado={itemSeleccionado}
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
				<DialogTitle id="alert-dialog-title">¿Desea continuar?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{`Este proceso eliminará el/la ${nombreFormulario.toLowerCase()}: ${
							arrayCategoria.find((item: ValuesCategoriaProps	) => item.id === (categoriaSeleccionada ? categoriaSeleccionada.id : 0))
								?.categoria_nombre
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
