import { ComentarioService } from "../../entities/comentario.entities";
import { formatoCalificacion } from "../../utils/funciones.utils";

import { ModalComentario } from "../global/ModalComentario";
import {
	ComentariosStyled,
	ListaComentariosStyled,
} from "./styles/ComentariosStyles";
import { Button, Container, Rating } from "@mui/material";

interface Props {
	modeloId: number;
	calificacionGeneral: number;
	comentarios: ComentarioService[];
	modalComentario: boolean;
	funcionObtenerComentarios: (modelo_id: number) => void;
	funcionAbrirModal: () => void;
	funcionCerrarModal: () => void;
	funcionAsignarAlerta: (
		type: "error" | "warning" | "info" | "success",
		text: string
	) => void;
	funcionAbrirAlerta: () => void;
}

export const Comentarios = ({
	modeloId,
	calificacionGeneral,
	comentarios,
	modalComentario,
	funcionObtenerComentarios,
	funcionAbrirModal,
	funcionCerrarModal,
	funcionAsignarAlerta,
	funcionAbrirAlerta,
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
									<Rating
										name="no-value"
										value={calificacionGeneral}
										precision={0.1}
										readOnly
									/>

									<div className="cali-numeros">
										<p>{`${formatoCalificacion(calificacionGeneral)} / 5`}</p>
									</div>

									<p>
										{comentarios.length > 0
											? `${comentarios.length} comentarios`
											: "Sin comentarios"}
									</p>
								</div>
								<Button variant="contained" onClick={funcionAbrirModal}>
									Escribir comentario
								</Button>
							</div>
						</div>
					</div>
				</ComentariosStyled>

				<ListaComentariosStyled>
					{comentarios.map((comentario: ComentarioService) => {
						return (
							<div key={comentario.comentario_id} className="comentario">
								<div className="com-izq">
									<h4 className="asunto">{comentario.titulo} </h4>
									<p className="usuario">Por {comentario.usuario}</p>

									<Rating value={comentario.valoracion} readOnly />
									<div className="msj">
										<p>{comentario.mensaje}</p>
									</div>
								</div>
								<div className="fecha-comentario">
									<p>{comentario.fecha_registro}</p>
								</div>
							</div>
						);
					})}
				</ListaComentariosStyled>
			</Container>
			<ModalComentario
				modeloId={modeloId}
				modalComentario={modalComentario}
				funcionObtenerComentarios={funcionObtenerComentarios}
				funcionCerrarModal={funcionCerrarModal}
				funcionAsignarAlerta={funcionAsignarAlerta}
				funcionAbrirAlerta={funcionAbrirAlerta}
			/>
		</>
	);
};
