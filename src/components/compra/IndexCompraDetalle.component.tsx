import { Params, useParams } from "react-router-dom";
import { CompraDetalle } from "./CompraDetalle.component";
export const IndexCompraDetalleDetalle = () => {
	const { compra_cabecera_id }: Readonly<Params<string>> = useParams();

	return (
		<>
			<CompraDetalle
				compraCabeceraId={
					compra_cabecera_id === undefined ? 0 : parseInt(compra_cabecera_id)
				}
			/>
		</>
	);
};
