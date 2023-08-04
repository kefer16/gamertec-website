import { Params, useParams } from "react-router-dom";
import { PedidoDetalle } from "./PedidoDetalle.component";

export const IndexPedidoDetalle = () => {
	const { pedido_id }: Readonly<Params<string>> = useParams();

	return (
		<>
			<PedidoDetalle
				pedido_id={pedido_id === undefined ? 0 : parseInt(pedido_id)}
			/>
		</>
	);
};
