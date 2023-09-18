import { useState } from "react";
import { ComentarioService } from "../../entities/comentario.entities";
import { fechaActualISO } from "../../utils/funciones.utils";
import { Nullable } from "primereact/ts-helpers";
import { RatingPrimeUI } from "../controls/primeUI/RatingPrimeUI";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { IconMessage2Up } from "@tabler/icons-react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
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
	const [valoracion, setValoracion] = useState<Nullable<number>>(0);

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
			fechaActualISO(),
			true,
			1,
			modeloId
		);

		await ComentarioService.Registrar(data)
			.then((response) => {
				if (response.data.code === 200) {
					funcionAsignarAlerta("success", "Comentario se registró correctamente");

					funcionAbrirAlerta();
					funcionLimpiarControles();
					funcionObtenerComentarios(modeloId);
					funcionCerrarModal();
					return;
				}
			})
			.catch(() => {
				funcionAsignarAlerta("error", "Hubo un error");

				funcionAbrirAlerta();
				return;
			});
	};
	return (

		<Dialog header="Tu opinión nos importa ¡Evalúa tu producto!" visible={modalComentario} style={{ width: "50vw" }} onHide={funcionCerrarModal}>

			<div className="flex flex-column">
				<p className="mb-1">Calificacion General:</p>
				<RatingPrimeUI
					style={{ marginBottom: "20px" }}
					valoracion={valoracion}
					funcionValoracion={setValoracion}
					readonly={false}
				/>

				<InputText
					className="w-full mb-2"
					type="text"
					name="titulo"
					value={titulo}
					onChange={(event) => {
						setTitulo(event.target.value);
					}}
					placeholder="Título"
				/>

				<InputTextarea
					className="w-full mb-2"
					name="comentario"
					value={mensaje}
					onChange={(event) => {
						setMensaje(event.target.value);
					}}
					placeholder="Comentario"
				/>
				<Button
					className="w-full"
					type="submit"
					onClick={funcionRegistarComentario}
					icon={<IconMessage2Up size={24} className="mr-2" />}
					label="Publicar comentario"
				/>
			</div>
		</Dialog>

	);
};
