import { Link } from "react-router-dom";
import { CompraStyled } from "./styles/CompraStyles";

export const Compra = () => {
	return (
		<>
			<CompraStyled>
				<div className="titulo">
					<h1>Tus compras</h1>
				</div>

				<div id="contenedor_compras" className="contenedor_compras">
					<Link to="#" className="compra">
						<div className="codigo">001</div>
						<div className="detalles_generales">
							<div className="detalles">
								<p>
									<span className="cantidad">9 Produc.</span>{" "}
								</p>
								<p>
									Total: <span>$900</span>{" "}
								</p>
								<p>
									Fecha: <span> 12/05/2023</span>
								</p>
							</div>
							<div className="previ-productos">
								`;
								<img src="#" alt="" />
								modelo += `
							</div>
						</div>
					</Link>
					<Link to="#" className="compra">
						<div className="codigo">001</div>
						<div className="detalles_generales">
							<div className="detalles">
								<p>
									<span className="cantidad">9 Produc.</span>{" "}
								</p>
								<p>
									Total: <span>$900</span>{" "}
								</p>
								<p>
									Fecha: <span> 12/05/2023</span>
								</p>
							</div>
							<div className="previ-productos">
								`;
								<img src="#" alt="" />
								modelo += `
							</div>
						</div>
					</Link>
				</div>
			</CompraStyled>
		</>
	);
};
