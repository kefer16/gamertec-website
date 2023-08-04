import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PedidoDetalleEntity } from "../../../entities/pedido_detalle.entity";

interface Props {
	abrir: boolean;
	esEdicion: boolean;
	arrayDetalleProducto: PedidoDetalleEntity[];
	funcionCerrarModal: () => void;
}

export const SeriesRegistro = ({
	abrir,
	esEdicion,
	arrayDetalleProducto,
	funcionCerrarModal,
}: Props) => {
	const [arrayPedidoDetalleProducto, setArrayPedidoDetalleProducto] = useState<
		PedidoDetalleEntity[]
	>([]);

	useEffect(() => {
		setArrayPedidoDetalleProducto(arrayDetalleProducto);
	}, [arrayDetalleProducto]);

	const funcionGuardar = async (event: React.FormEvent<HTMLFormElement>) => {
		console.log(arrayPedidoDetalleProducto);
	};
	return (
		<>
			<Modal open={abrir} onClose={funcionCerrarModal}>
				<Box
					sx={{
						flexGrow: 1,
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "90%",
						maxWidth: "500px",
						overflow: "hidden",
						border: "1px solid #ccc",
						borderRadius: "10px",
						background: "#fff",
					}}
				>
					<Typography
						sx={[
							{
								position: "fixed",
								zIndex: "99",
								width: "100%",
								height: "60px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								color: "#ffffff",
								// border: "1px solid red",
							},
							esEdicion
								? { backgroundColor: "#448aff" }
								: { backgroundColor: "#00c853" },
						]}
						variant="h5"
						component={"h2"}
					>
						{`${esEdicion ? "Edición" : "Registro"} de Series`}
					</Typography>
					<Box
						sx={{
							position: "relative",
							flexGrow: 1,
							background: "#fff",
							overflow: "hidden",
							overflowY: "scroll",
							height: "auto",
							maxHeight: "500px",
							padding: "20px",
						}}
						component={"form"}
						onSubmit={funcionGuardar}
					>
						<Grid
							sx={{ marginTop: "50px" }}
							container
							direction={"column"}
							rowSpacing={2}
							columnSpacing={{ xs: 1, sm: 2, md: 3 }}
						>
							<Grid item xs={1}>
								<TextField
									fullWidth
									label="Fecha Registro"
									variant="outlined"
									// value={convertirFechaVisual(fecha_registro)}
									name="date"
									disabled
								/>
							</Grid>

							<Grid item xs={1}>
								<TextField
									fullWidth
									multiline
									label="Series"
									variant="outlined"
									// value={convertirFechaVisual(fecha_registro)}
									name="series"
								/>
							</Grid>

							<Grid item xs={1}>
								<Button
									fullWidth
									variant="contained"
									style={
										esEdicion
											? { backgroundColor: "#448aff" }
											: { backgroundColor: "#00c853" }
									}
									type="submit"
								>
									{" "}
									{esEdicion ? "Editar" : "Registrarse"}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Modal>
		</>
	);
};
