import { Dialog } from "primereact/dialog";
import { useContext, useEffect, useState } from "react";
import {
	IMultiSelectProps,
	MultiSelectPrimeUI,
} from "../../controls/primeUI/MultiSelectPrimeUI";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { IActualizaSerie } from "../../../interfaces/pedido.interface";
import { PedidoService } from "../../../services/pedido.service";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { Chip } from "primereact/chip";
// import { PedidoService } from "../../../services/pedido.service";
interface Props {
	compraDetalleId: number;
	opciones: IMultiSelectProps[];
	maximoOpciones: number;
	estadoModal: boolean;
	funcionCerrarModal: () => void;
	disableButton: boolean;
}

export const SeriesRegistro = ({
	compraDetalleId,
	opciones,
	maximoOpciones,
	estadoModal,
	funcionCerrarModal,
	disableButton,
}: Props) => {
	const { privilegio, mostrarNotificacion } = useContext(GamertecSesionContext);

	const [options, setOptions] = useState<IMultiSelectProps[]>([]);

	const [seriesSeleccionadas, setSeriesSeleccionadas] = useState<
		IMultiSelectProps[]
	>([]);

	const obtenerData = async (
		opciones: IMultiSelectProps[],
		estadoModal: boolean
	) => {
		setOptions([]);
		if (!estadoModal) {
			return;
		}
		setOptions(opciones);
	};

	const agregarSeries = async () => {
		console.log(seriesSeleccionadas);

		const series: IActualizaSerie[] = [];

		seriesSeleccionadas.forEach((element: IMultiSelectProps) => {
			const serie: IActualizaSerie = {
				fk_producto: Number(element.code),
				numero_serie: element.name,
			};
			series.push(serie);
		});

		const pedidoServ = new PedidoService();
		await pedidoServ.agregarSeries(compraDetalleId, series)
			.then(() => {
				mostrarNotificacion({ tipo: "success", titulo: "Éxito", detalle: "Se agregó la(s) serie(s) correctamente ", pegado: false });
			}).catch((error: Error) => {
				mostrarNotificacion({ tipo: "error", titulo: "Error", detalle: `surgió un error: ${error.message}`, pegado: true });

			});
	};

	useEffect(() => {
		obtenerData(opciones, estadoModal);
	}, [opciones, estadoModal]);

	return (
		<Dialog
			header={privilegio ? "Series asignadas" : "Añadir Series"}
			visible={estadoModal}
			className="grid col-11 md:col-4"
			onHide={() => funcionCerrarModal()}
		>
			<p> {privilegio === "USU" ? `Numero de series en total: ${maximoOpciones}` : `Cantidad de series a escoger: ${maximoOpciones}`}</p>
			{
				privilegio === "USU" ?
					<div className="card flex flex-wrap gap-2">
						{options.length <= 0 ?
							<p>Aún no se asigna niguna serie a su compra</p>
							:
							options.map((item: IMultiSelectProps) => { return (<Chip key={item.code} label={item.name} />); })
						}

					</div> :
					<>
						{options.length <= 0 ?
							<p>Producto sin stock, registre uno para asignar serie</p>
							:
							<MultiSelectPrimeUI
								title="Series"
								placeholder="Escoger Series"
								options={options}
								disabled={disableButton}
								selectedOptions={seriesSeleccionadas}
								maxOptions={maximoOpciones}
								fuctionSelectedOptions={setSeriesSeleccionadas}
							/>
						}
					</>
			}

			{privilegio === "USU" ?
				<></>
				:
				(disableButton ?
					<></>
					:
					<Divider align="center">
						<Button
							label="Añadir"
							icon="pi pi-plus"
							raised
							onClick={agregarSeries}
						/>
					</Divider>
				)
			}
		</Dialog >
	);
};
