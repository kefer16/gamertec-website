import { Tag } from "primereact/tag";
import {
	convertirFechaVisual,
	convertirFormatoMoneda,
} from "../../utils/funciones.utils";
import { CardPedidoStyle } from "./styles/CardPedido.style";

interface Props {
	id: number;
	link: string;
	codigo: string;
	estado: string;
	fechaRegistro: string;
	cantidadTotal: number;
	precioTotal: number;
	arrayImagenes: string[][];
}

interface CompraEstadosProps {
	estado: "PRE" | "CAM" | "ENT" | "";
	tipo: "danger" | "success" | "info" | "warning"
}

export const CompraEstados: CompraEstadosProps[] = [
	{ estado: "PRE", tipo: "danger" },
	{ estado: "CAM", tipo: "warning" },
	{ estado: "ENT", tipo: "success" }
];

export const CardPedido = ({
	id,
	link,
	codigo,
	estado,
	fechaRegistro,
	cantidadTotal,
	precioTotal,
	arrayImagenes,
}: Props) => {
	return (
		<CardPedidoStyle to={`${link}/${id}`} key={id}>
			<div className="codigo">{codigo}  <Tag severity={CompraEstados.find(item => item.estado === estado)?.tipo} value={estado} /></div>
			<div className="detalles_generales">
				<div className="detalles">
					<p>
						<span className="cantidad">{`${cantidadTotal} Produc.`}</span>
					</p>
					<p>
						Total:
						<span>{convertirFormatoMoneda(precioTotal)}</span>
					</p>
					<p>
						Fecha:
						<span>{convertirFechaVisual(fechaRegistro)}</span>
					</p>
				</div>
				<div className="previ-productos">
					{arrayImagenes.map((elemento: string[], index: number) => {
						return <img key={index} src={elemento[0]} alt={elemento[1]} />;
					})}
				</div>
			</div>
		</CardPedidoStyle>
	);
};
