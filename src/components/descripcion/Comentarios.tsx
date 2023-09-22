import { ComentarioService } from "../../entities/comentario.entities";
import {
	fechaVisualDateToString,
	formatoCalificacion,
} from "../../utils/funciones.utils";

import { ModalComentario } from "../global/ModalComentario";
import { ContainerSectionStyled } from "../global/styles/ContainerStyled";
import {
	ComentariosStyled,
	ListaComentariosStyled,
} from "./styles/ComentariosStyles";
import { Button } from "primereact/button";
import { IconMessage2Plus } from "@tabler/icons-react";
import { RatingPrimeUI } from "../controls/primeUI/RatingPrimeUI";

interface Props {
	modeloId: number;
	calificacionGeneral: number;
	comentarios: ComentarioService[];
	modalComentario: boolean;
	funcionObtenerComentarios: (modelo_id: number) => void;
	funcionAbrirModal: () => void;
	funcionCerrarModal: () => void;
}

export const Comentarios = ({
	modeloId,
	calificacionGeneral,
	comentarios,
	modalComentario,
	funcionObtenerComentarios,
	funcionAbrirModal,
	funcionCerrarModal,
}: Props) => {
	return (
		<>
			<ContainerSectionStyled>
				<ComentariosStyled>
					<div className="cont-coment">
						<h2>Comentarios</h2>

						<div className="contenedor-cali-general">
							<h3>Calificación General</h3>

							<div id="calificacion-general" className="calificacion-general">
								<div className="cali">
									<RatingPrimeUI valoracion={calificacionGeneral} readonly={true} />
									<div className="cali-numeros">
										<p>{`${formatoCalificacion(calificacionGeneral)} / 5`}</p>
									</div>

									<p>
										{comentarios.length > 0
											? `${comentarios.length} comentarios`
											: "Sin comentarios"}
									</p>
								</div>
								<Button
									icon={<IconMessage2Plus className="mr-2" size={24} />}
									onClick={funcionAbrirModal}
									label="Escribir comentario"
								/>
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

									<RatingPrimeUI valoracion={comentario.valoracion} readonly={true} />
									<div className="msj">
										<p>{comentario.mensaje}</p>
									</div>
								</div>
								<div className="fecha-comentario">
									<p>{fechaVisualDateToString(comentario.fecha_registro)}</p>
								</div>
							</div>
						);
					})}
				</ListaComentariosStyled>
			</ContainerSectionStyled>
			<ModalComentario
				modeloId={modeloId}
				modalComentario={modalComentario}
				funcionObtenerComentarios={funcionObtenerComentarios}
				funcionCerrarModal={funcionCerrarModal}
			/>
		</>
	);
};
