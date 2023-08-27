import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import {
	IMultiSelectProps,
	MultiSelectPrimeUI,
} from "../../controls/primeUI/MultiSelectPrimeUI";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { IActualizaSerie } from "../../../interfaces/pedido.interface";
import { PedidoService } from "../../../services/pedido.service";
// import { PedidoService } from "../../../services/pedido.service";
interface Props {
	pedidoDetalleId: number;
	opciones: IMultiSelectProps[];
	estadoModal: boolean;
	funcionCerrarModal: () => void;
	disableButton: boolean;
}

export const SeriesRegistro = ({
	pedidoDetalleId,
	opciones,
	estadoModal,
	funcionCerrarModal,
	disableButton,
}: Props) => {
	const [date, setDate] = useState<string | Date | Date[] | null>(new Date());

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
		await pedidoServ.agregarSeries(pedidoDetalleId, series).then((resp) => {
			console.log(resp);
		});
	};

	useEffect(() => {
		obtenerData(opciones, estadoModal);
	}, [opciones, estadoModal]);

	return (
		<Dialog
			header="Añadir Series"
			visible={estadoModal}
			maximizable
			// style={{ width: "50vw" }}
			className="grid col-11 md:col-4"
			onHide={() => funcionCerrarModal()}
		>
			<label htmlFor="locale-user" className="font-bold mb-2">
				Fecha de Registro
			</label>
			<Calendar
				style={{ width: "100%" }}
				value={date}
				dateFormat="dd/mm/yy"
				onChange={(e: CalendarChangeEvent) => {
					setDate(e.value ? e.value : null);
				}}
				disabled
				showIcon
			/>

			<MultiSelectPrimeUI
				title="Series"
				placeholder="Escoger Series"
				options={options}
				disabled={true}
				selectedOptions={seriesSeleccionadas}
				fuctionSelectedOptions={setSeriesSeleccionadas}
			/>
			{disableButton ? (
				<></>
			) : (
				<Divider align="center">
					<Button
						label="Añadir"
						icon="pi pi-plus"
						raised
						onClick={agregarSeries}
					></Button>
				</Divider>
			)}
		</Dialog>
	);
};
