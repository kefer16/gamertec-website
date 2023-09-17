import { useEffect, useState } from "react";
import { InterfaceAlertControl } from "../../controls/AlertControl";
import {
	Alert,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
	Typography,
	Dialog,
} from "@mui/material";
import { ToolbarControl } from "../../controls/ToobarControl";
import {
	ColumnProps,
	EstadoProps,
	ImagenProps,
	TableControl,
	TypeColumn,
} from "../../controls/TableControl";

import { UsuarioService } from "../../../entities/usuario.entities";
import { UsuarioRegistro } from "./UsuarioRegistro";
import { funcionObtenerPrivilegios } from "../privilegio/Privilegio";
import { ComboboxProps } from "../../../interfaces/combobox.interface";
import { ContainerBodyStyled } from "../../global/styles/ContainerStyled";

const columnsUsuario2: ColumnProps[] = [
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
		field: "privilegio_nombre",
		header: "Privilegio",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "usuario_nombre",
		header: "Nombre",
		style: { width: "10%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "usuario_apellido",
		header: "Apellido",
		style: { width: "10%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "correo",
		header: "Correo",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.IMAGE,
		field: "foto",
		header: "Foto",
		style: { width: "4%" },
	},
	{
		type: TypeColumn.TEXT,
		field: "usuario",
		header: "Usuario",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.MONEY,
		field: "dinero",
		header: "Dinero",
		style: { width: "5%" },
	},
	{
		type: TypeColumn.STATUS,
		field: "estado",
		header: "Estado",
		style: { width: "4%" },
	},
];
export interface ValuesUsuarioProps {
	id: number;
	index: number;
	fecha_registro: Date;
	privilegio_id: number;
	privilegio_nombre?: string;
	usuario_nombre: string;
	usuario_apellido: string;
	correo: string;
	foto: ImagenProps;
	usuario: string;
	dinero: number;
	estado: EstadoProps;
}

interface Props {
	nombreFormulario: string;
}
let arrayPrivilegio: ComboboxProps[] = [];

export const Usuario = ({ nombreFormulario }: Props) => {
	const [abrirModal, setAbrirModal] = useState(false);
	const [esEdicion, setEsEdicion] = useState(false);
	const [abrirAlerta, setAbrirAlerta] = useState(false);
	const [dialogo, setDialogo] = useState(false);
	const [arrayUsuario, setArrayUsuario] = useState<ValuesUsuarioProps[]>([]);
	const [usuarioSeleccionado, setUsuarioSeleccioando] =
		useState<ValuesUsuarioProps >({} as ValuesUsuarioProps);

	const funcionCerrarDialogo = () => {
		setDialogo(false);
	};

	const funcionAbrirDialogo = () => {
		const itemEdicion = arrayUsuario.find((item: ValuesUsuarioProps) =>
			item.id === usuarioSeleccionado?.id ? item : undefined
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
		const arrayUsuario: ValuesUsuarioProps[] = [];
		await UsuarioService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: UsuarioService, index: number) => {
					const newRow: ValuesUsuarioProps = {
						id: element.usuario_id,
						index: index + 1,
						fecha_registro: element.fecha_registro,
						privilegio_id: element.fk_privilegio,
						privilegio_nombre: arrayPrivilegio.find(
							(privilegio: ComboboxProps) => privilegio.valor === element.fk_privilegio
						)?.descripcion,
						usuario_nombre: element.nombre,
						usuario_apellido: element.apellido,
						correo: element.correo,
						usuario: element.usuario,
						dinero: element.dinero,
						foto: {
							img: element.foto,
							alt: element.usuario,
						},
						estado: {
							valor: element.activo,
							estado: element.activo ? "Activo" : "Inactivo",
						},
					};
					arrayUsuario.push(newRow);
				});
				setArrayUsuario(arrayUsuario);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	const funcionCrear = () => {
		setItemSeleccionado(
			new UsuarioService(0, "", "", "", "", "", 0, "", new Date(), false, 0)
		);
		setEsEdicion(false);
		setAbrirModal(true);
	};

	const funcionEditar = () => {
		const itemEdicion = arrayUsuario.find((item) =>
			item.id === usuarioSeleccionado?.id ? item : undefined
		);

		if (itemEdicion === undefined) {
			funcionAsignarAlerta("warning", "Elija un usuario para poder editar");
			funcionAbrirAlerta();

			return;
		}

		setItemSeleccionado(
			new UsuarioService(
				itemEdicion.id,
				itemEdicion.usuario_nombre,
				itemEdicion.usuario_apellido,
				itemEdicion.correo,
				itemEdicion.usuario,
				"",
				itemEdicion.dinero,
				itemEdicion.foto.img,
				itemEdicion.fecha_registro,
				itemEdicion.estado.valor,
				itemEdicion.privilegio_id
			)
		);

		setEsEdicion(true);
		setAbrirModal(true);
	};

	const funcionEliminar = async () => {
		const itemEdicion = arrayUsuario.find((item) =>
			item.id === usuarioSeleccionado?.id ? item : undefined
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
		<ContainerBodyStyled>
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
			<TableControl<ValuesUsuarioProps>
				ancho={{ minWidth: "110rem" }}
				columnas={columnsUsuario2}
				filas={arrayUsuario}
				filaSeleccionada={usuarioSeleccionado}
				funcionFilaSeleccionada={setUsuarioSeleccioando}
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
				<DialogTitle id="alert-dialog-title">¿Desea continuar?</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{`Este proceso eliminará el/la ${nombreFormulario.toLowerCase()}: ${
							arrayUsuario.find(
								(item) =>
									item.id === (usuarioSeleccionado === null ? 0 : usuarioSeleccionado.id)
							)?.usuario
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
