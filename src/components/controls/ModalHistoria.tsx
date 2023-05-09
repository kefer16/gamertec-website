import { useState, useEffect } from "react";

import {
	Modal,
	Box,
	Container,
	Typography,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Checkbox,
	TableFooter,
	TablePagination,
} from "@mui/material";
import { UsuarioService } from "../../services/Usuario";
import { convertirFecha } from "../../utils/Funciones";

interface Props {
	itemSeleccionado: UsuarioService;
	modalHistoria: boolean;
	funcionCerrarHistoria: () => void;
}

interface Cabeceras {
	titulo: string;
}

const cabeceras: Cabeceras[] = [
	{ titulo: "N°" },
	{ titulo: "Fecha Inicial" },
	{ titulo: "Fecha Final" },
	{ titulo: "Apellido" },
	{ titulo: "Nombre" },
	{ titulo: "Correo" },
	{ titulo: "Usuario" },
	{ titulo: "Dinero" },
	{ titulo: "Activo" },
];

export const ModalHistoria = ({
	itemSeleccionado,
	modalHistoria,
	funcionCerrarHistoria,
}: Props) => {
	const [historiales, setHistoriales] = useState<UsuarioService[]>([]);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	useEffect(() => {
		buscarUsuarioHistorial(itemSeleccionado.usuario_id);
	}, [itemSeleccionado]);

	const buscarUsuarioHistorial = async (idUsuario: number) => {
		let historial: UsuarioService[] = [];
		console.log(idUsuario);

		await UsuarioService.Historial(idUsuario)
			.then((response) => {
				response.data.data.forEach((element: UsuarioService, index: number) => {
					element.index = index + 1;
					historial.push(element);
				});

				setHistoriales(historial);
			})
			.catch((err: any) => {
				console.log(err);
			});
	};

	return (
		<>
			<Modal open={modalHistoria} onClose={funcionCerrarHistoria}>
				<Box
					sx={{ flexGrow: 1 }}
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "60%",

						border: "1px solid #ccc",
						borderRadius: 10,
						overflow: "hidden",
						padding: 20,
						background: "#fff",
					}}
				>
					<Container maxWidth="lg">
						<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
							Historial
						</Typography>

						<TableContainer>
							<Table aria-label="Todo table">
								<TableHead>
									<TableRow>
										{cabeceras.map((cabecera, index) => {
											return <TableCell key={index}>{cabecera.titulo}</TableCell>;
										})}
									</TableRow>
								</TableHead>
								<TableBody>
									{historiales
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((historial, index) => {
											const dineroAnterior =
												historiales[historiales.length - historial.index]?.dinero;
											const dineroActual = historial.dinero;

											let activa: boolean = false;

											if (dineroAnterior !== dineroActual) {
												activa = true;
											}
											console.log(historial.index, activa);

											return (
												<TableRow key={index}>
													<TableCell>{historial.index}</TableCell>
													<TableCell width={170}>
														{convertirFecha(historial.fecha_inicial)}
													</TableCell>
													<TableCell width={170}>
														{convertirFecha(historial.fecha_final)}
													</TableCell>
													<TableCell>{historial.apellido}</TableCell>
													<TableCell>{historial.nombre}</TableCell>
													<TableCell>{historial.correo}</TableCell>
													<TableCell>{historial.usuario}</TableCell>
													<TableCell sx={activa ? { background: "yellow" } : {}}>
														{historial.dinero}
													</TableCell>
													<TableCell>{historial.activo ? "activo" : "inactivo"}</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
											count={historiales.length}
											page={page}
											onPageChange={(event: any, newPage: number) => {
												setPage(newPage);
											}}
											rowsPerPage={rowsPerPage}
											onRowsPerPageChange={(event: any) => {
												setRowsPerPage(+event.target.value);
												setPage(0);
											}}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</TableContainer>
					</Container>
				</Box>
			</Modal>
		</>
	);
};
