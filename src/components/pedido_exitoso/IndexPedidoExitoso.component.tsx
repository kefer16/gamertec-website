import { useState, useEffect } from "react";
import { PedidoExitoso } from "./PedidoExitoso.component";

export const IndexPedidoExitoso = () => {
	const [estado, setEstado] = useState<string | null>(null);
	const [idMercadoPago, setIdMercadoPago] = useState<string | null>(null);
	const [preferenciaId, setPreferenciaId] = useState<string | null>(null);

	useEffect(() => {
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);
		setIdMercadoPago(params.get("payment_id"));
		setEstado(params.get("status"));
		setPreferenciaId(params.get("preference_id"));

	}, []);

	return (
		<>
			<PedidoExitoso id={idMercadoPago} estado={estado} preferenciaId={preferenciaId} />
		</>
	);
};
