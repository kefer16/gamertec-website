import { Link } from "react-router-dom";
import { PedidoExitosoStyled } from "./styles/PedidoExitoso.styled";

export const PedidoExitoso = () => {
	return (
		<>
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
		</>
	);
};
