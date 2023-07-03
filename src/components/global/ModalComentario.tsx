import { Button, Grid, Rating, TextField } from "@mui/material";
import { FondoModalStyled } from "./styles/FondoModalStyled";
import { ModalStyled } from "./styles/ModalStyled";
import { ButtonCerrarModal } from "./ButtonCerrarModal";
import { useState } from "react";
import { ComentarioService } from "../../entities/comentario.entities";
import { convertirFechaSQL, crearFechaISO } from "../../utils/funciones.utils";

interface Props {
	modeloId: number;
	modalComentario: boolean;
	funcionObtenerComentarios: (modelo_id: number) => void;
	funcionCerrarModal: () => void;
	funcionAsignarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
}

export const ModalComentario = ({
	modeloId,
	modalComentario,
	funcionObtenerComentarios,
	funcionCerrarModal,
	funcionAsignarAlerta,
	funcionAbrirAlerta,
}: Props) => {
	const [titulo, setTitulo] = useState<string>("");
	const [mensaje, setMensaje] = useState<string>("");
	const [valoracion, setValoracion] = useState<number | null>(0);

	const funcionLimpiarControles = () => {
		setValoracion(0);
		setTitulo("");
		setMensaje("");
	};
	const funcionRegistarComentario = async () => {
		const data: ComentarioService = new ComentarioService(
			0,
			valoracion ?? 0,
			"usuario",
			titulo,
			mensaje,
			convertirFechaSQL(crearFechaISO()),
			true,
			1,
			modeloId
		);

		await ComentarioService.Registrar(data)
			.then((response) => {
				if (response.data.code === 200) {
					funcionAsignarAlerta("success", `Comentario se registró correctamente`);

					funcionAbrirAlerta();
					funcionLimpiarControles();
					funcionObtenerComentarios(modeloId);
					funcionCerrarModal();
					return;
				}
			})
			.catch((error) => {
				funcionAsignarAlerta("error", "Hubo un error");

				funcionAbrirAlerta();
				return;
			});
	};
	return (
		<FondoModalStyled activo={modalComentario}>
			<ModalStyled activo={modalComentario}>
				<ButtonCerrarModal funcionCerrarModal={funcionCerrarModal} />
				<h2>Tu opinión nos importa ¡Evalúa tu producto!</h2>

				<Grid
					container
					direction={"column"}
					rowSpacing={2}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				>
					<Grid item xs={1}>
						<p>Calificacion General:</p>
						<Rating
							name="simple-controlled"
							value={valoracion}
							onChange={(event, newValue) => {
								setValoracion(newValue);
							}}
						/>
					</Grid>
					<Grid item xs={1}>
						<TextField
							fullWidth
							type="text"
							name="titulo"
							value={titulo}
							onChange={(event) => {
								setTitulo(event.target.value);
							}}
							placeholder="Título"
							label="Titulo"
						/>
					</Grid>

					<Grid item xs={1}>
						<TextField
							fullWidth
							type="text"
							name="comentario"
							value={mensaje}
							onChange={(event) => {
								setMensaje(event.target.value);
							}}
							placeholder="Comentario"
							label="Comentario"
							multiline
						/>
					</Grid>

					<Grid item xs={1}>
						<Button
							fullWidth
							variant="contained"
							type="submit"
							onClick={funcionRegistarComentario}
						>
							Publicar comentario
						</Button>
					</Grid>
				</Grid>
			</ModalStyled>
		</FondoModalStyled>
	);
};
