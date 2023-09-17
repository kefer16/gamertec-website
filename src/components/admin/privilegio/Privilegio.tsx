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
	TableControl,
	TypeColumn,
} from "../../controls/TableControl";
import { PrivilegioService } from "../../../entities/privilegio.entities";
import { PrivilegioRegistro } from "./PrivilegioRegistro";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

const columnsPrivilegio2: ColumnProps[] = [
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
		field: "tipo",
		header: "Tipo",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "abreviatura",
		header: "Abreviatura",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.STATUS,
		field: "activo_nombre",
		header: "Estado",
		style: { width: "10%" },
	},
];

export interface ValuesPrivilegioProps {
	id: number;
	index: number;
	fecha_registro: Date;
	tipo: string;
	abreviatura: string;
	activo: boolean;
	activo_nombre: string;
}
interface Props {
	nombreFormulario: string;
}

export const funcionObtenerPrivilegios = async (): Promise<ComboboxProps[]> => {
	const array: ComboboxProps[] = [];
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
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);

	const [dialogo, setDialogo] = useState(false);
	const [arrayPrivilegio, setArrayPrivilegio] = useState<
		ValuesPrivilegioProps[]
	>([]);
	const [privilegioSeleccionado, setPrivilegioSeleccionado] =
		useState<ValuesPrivilegioProps>({} as ValuesPrivilegioProps);

	const funcionCerrarDialogo = () => {
		setDialogo(false);
	};

	const funcionAbrirDialogo = () => {
		const itemEdicion = arrayPrivilegio.find((item) =>
			item.id === privilegioSeleccionado?.id ? item : undefined
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

	const [itemSeleccionado, setItemSeleccionado] = useState<PrivilegioService>(
		new PrivilegioService()
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
		const arrayPrivilegio: ValuesPrivilegioProps[] = [];
		await PrivilegioService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: PrivilegioService, index: number) => {
					const newRow: ValuesPrivilegioProps = {
						id: element.privilegio_id,
						index: index + 1,
						fecha_registro: element.fecha_registro,
						tipo: element.tipo,
						abreviatura: element.abreviatura,
						activo: element.activo,
						activo_nombre: element.activo ? "Activo" : "Inactivo",
					};
					arrayPrivilegio.push(newRow);
				});
				setArrayPrivilegio(arrayPrivilegio);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrear = () => {
		setItemSeleccionado(new PrivilegioService(0, "", false, "", new Date()));
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditar = () => {
		const itemEdicion = arrayPrivilegio.find((categoria) =>
			categoria.id === privilegioSeleccionado?.id ? categoria : undefined
		);

		if (itemEdicion === undefined) {
			funcionAsignarAlerta("warning", "Elija un usuario para poder editar");
			funcionAbrirAlerta();

			return;
		}

		setItemSeleccionado(
			new PrivilegioService(
				itemEdicion.id,
				itemEdicion.tipo,
				itemEdicion.activo,
				itemEdicion.abreviatura,
				itemEdicion.fecha_registro
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionEliminar = async () => {
		const itemEdicion = arrayPrivilegio.find((item) =>
			item.id === privilegioSeleccionado?.id ? item : undefined
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

		await PrivilegioService.EliminarUno(itemEdicion.id)
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
			.catch(() => {
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
				functionCrear={funcionCrear}
				functionActualizar={funcionEditar}
				functionEliminar={funcionAbrirDialogo}
			/>
			<TableControl<ValuesPrivilegioProps>
				ancho={{ minWidth: "70rem" }}
				columnas={columnsPrivilegio2}
				filas={arrayPrivilegio}
				filaSeleccionada={privilegioSeleccionado}
				funcionFilaSeleccionada={setPrivilegioSeleccionado}
			/>

			<PrivilegioRegistro
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
							arrayPrivilegio.find(
								(item) =>
									item.id ===
									(privilegioSeleccionado === null ? 0 : privilegioSeleccionado.id)
							)?.tipo
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
