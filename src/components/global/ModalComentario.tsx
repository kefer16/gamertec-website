import { Button, Grid, Rating, TextField } from "@mui/material";
import { FondoModalStyled } from "./styles/FondoModalStyled";
import { ModalStyled } from "./styles/ModalStyled";
import { ButtonCerrarModal } from "./ButtonCerrarModal";
import { useState } from "react";

interface Props {
	modalComentario: boolean;
	funcionCerrarModal: () => void;
}

export const ModalComentario = ({
	modalComentario,
	funcionCerrarModal,
}: Props) => {
	const [titulo, setTitulo] = useState<string>("");
	const [comentario, setComentario] = useState<string>("");
	const [numeroCalificacion, setNumeroCalificacion] = useState<number | null>(0);

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
							value={numeroCalificacion}
							onChange={(event, newValue) => {
								setNumeroCalificacion(newValue);
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
							value={comentario}
							onChange={(event) => {
								setComentario(event.target.value);
							}}
							placeholder="Comentario"
							label="Comentario"
							multiline
						/>
					</Grid>

					<Grid item xs={1}>
						<Button fullWidth variant="contained" type="submit">
							Publicar comentario
						</Button>
					</Grid>
				</Grid>
			</ModalStyled>
		</FondoModalStyled>
	);
};
