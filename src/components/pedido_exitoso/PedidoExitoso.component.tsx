import { Link } from "react-router-dom";
import { PedidoExitosoStyled } from "./styles/PedidoExitoso.styled";
import { useContext, useEffect } from "react";
import { GamertecSesionContext } from "../sesion/Sesion.component";
import { ContainerBodyStyled } from "../global/styles/ContainerStyled";
import { CompraService } from "../../services/compra.service";
import { CompraRegistra } from "../../interfaces/compra.interface";
interface Props {
	id: string | null;
	estado: string | null;
	preferenciaId: string | null;
}
export const PedidoExitoso = ({ id, estado, preferenciaId }: Props) => {
	const { sesionGamertec, obtenerSesion, mostrarNotificacion, obtenerCantidadCarrito } = useContext(GamertecSesionContext);

	useEffect(() => {
		obtenerSesion();
		registrarCompra(sesionGamertec.usuario.usuario_id);
		obtenerCantidadCarrito();

	}, [sesionGamertec, obtenerSesion, obtenerCantidadCarrito]);

	const registrarCompra = async (usuario_id: number) => {
		if (preferenciaId && estado && id) {
			const servCompra = new CompraService();

			const data: CompraRegistra = {
				preferencia_id: String(preferenciaId),
				estado: String(estado),
				pago_id: String(id),
				usuario_id: usuario_id,
			};

			await servCompra.registrar(data)
				.then(() => {
					mostrarNotificacion({ tipo: "success", titulo: "Éxito", detalle: "Se registró la compra exitosamente", pegado: false });
				}).catch((error: Error) => {
					mostrarNotificacion({ tipo: "error", titulo: "Error", detalle: `surgió un error: ${error.message}`, pegado: true });
				});
		}
	};

	return (
		<>
			<ContainerBodyStyled>
				<PedidoExitosoStyled>
					<div className="check">
						<div className="success-checkmark">
							<div className="check-icon">
								<span className="icon-line line-tip"></span>
								<span className="icon-line line-long"></span>
								<div className="icon-circle"></div>
								<div className="icon-fix"></div>
							</div>
						</div>
					</div>
					<div className="mensaje">
						<h2>Compra Realizada con Éxito</h2>
					</div>
					<div className="link">
						<Link className="links est1" to="/products/">
							Seguir Comprando
						</Link>
						<Link className="links est2" to="/buy/">
							Ver compra realizada
						</Link>
					</div>
				</PedidoExitosoStyled>
			</ContainerBodyStyled>
		</>
	);
};
