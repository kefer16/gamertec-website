import { Params, useParams } from "react-router-dom";
import { CompraPedidoDetalle } from "./CompraPedidoDetalle.component";

export const IndexCompraPedidoDetalle = () => {
	const { pedido_cabecera_id }: Readonly<Params<string>> = useParams();

	return (
		<>
			<CompraPedidoDetalle
				pedido_id={
					pedido_cabecera_id === undefined ? 0 : parseInt(pedido_cabecera_id)
				}
			/>
		</>
	);
};
