import { ModalComentario } from "../global/ModalComentario";
import { ComentariosStyled } from "./styles/ComentariosStyled";
import { Button, Container, Rating } from "@mui/material";

interface Props {
	modalComentario: boolean;
	funcionAbrirModal: () => void;
	funcionCerrarModal: () => void;
}

export const Comentarios = ({
	modalComentario,
	funcionAbrirModal,
	funcionCerrarModal,
}: Props) => {
	return (
		<>
			<Container maxWidth={"lg"}>
				<ComentariosStyled>
					<div className="cont-coment">
						<h2>Comentarios</h2>

						<div className="contenedor-cali-general">
							<h3>Calificación General</h3>

							<div id="calificacion-general" className="calificacion-general">
								<div className="cali">
									<Rating name="no-value" value={null} disabled />

									<div className="cali-numeros">
										<p></p>
									</div>

									<p>Sin comentarios</p>
								</div>
								<Button variant="contained" onClick={funcionAbrirModal}>
									Escribir comentario
								</Button>
							</div>
						</div>
					</div>

					<div id="cont-comentarios" className="cont-comentarios"></div>
				</ComentariosStyled>
			</Container>
			<ModalComentario
				modalComentario={modalComentario}
				funcionCerrarModal={funcionCerrarModal}
			/>
		</>
	);
};
