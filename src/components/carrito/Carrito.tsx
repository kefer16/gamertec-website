import { Link } from "react-router-dom";
import { CarritoStyles } from "./styles/CarritoStyles";
import {
	DeleteForeverTwoTone as DeleteIcon,
	ArchiveTwoTone as ArchiveIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

import { convertirFormatoMoneda } from "../../utils/funciones.utils";
import { Button, Container } from "@mui/material";
import { CarritoService } from "../../services/carrito.service";
import { CarritoCaracteristicasProps } from "../../interfaces/carrito.interface";

export const Carrito = () => {
	const [arrayCarrito, setArrayCarrito] = useState<
		CarritoCaracteristicasProps[]
	>([]);
	const [precioEnvio, setPrecioEnvio] = useState<number>(0);
	const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
	const [precioTotal, setPrecioTotal] = useState<number>(0);

	const calcularTotalOrden = () => {
		const precioSubTotal: number = arrayCarrito.reduce(
			(suma, item) => suma + item.modelo.precio * item.carrito.cantidad,
			0
		);
		setPrecioSubTotal(precioSubTotal);
		const precioEnvio: number = 0;
		setPrecioEnvio(precioEnvio);
		const precioTotal: number = precioSubTotal + precioEnvio;
		setPrecioTotal(precioTotal);
	};

	useEffect(() => {
		const ObtenerData = async () => {
			await CarritoService.listarCaracteristicas(1).then((respuesta) => {
				setArrayCarrito(respuesta);
				const precioSubTotal: number = respuesta.reduce(
					(suma, item) => suma + item.modelo.precio * item.carrito.cantidad,
					0
				);
				setPrecioSubTotal(precioSubTotal);
				const precioEnvio: number = 0;
				setPrecioEnvio(precioEnvio);
				const precioTotal: number = precioSubTotal + precioEnvio;
				setPrecioTotal(precioTotal);
			});
		};
		ObtenerData();
	}, []);

	return (
		<Container maxWidth={"lg"}>
			<CarritoStyles>
				<div className="titulo">
					<h1>Carrito de Compras</h1>
				</div>

				<div className="contenido">
					<div className="productos">
						{arrayCarrito.map((item: CarritoCaracteristicasProps) => {
							return (
								<div key={item.carrito.carrito_id} className="pro-detalle">
									<div className="deta-arriba">
										<div className="foto">
											<img src={item.modelo.foto} alt="foto" />
										</div>
										<div className="detalles">
											<h2>{item.marca.nombre}</h2>
											<Link to={`/product/description/${item.modelo.modelo_id}`}>
												{item.modelo.descripcion}
											</Link>
											<p>{item.modelo.nombre}</p>
										</div>
										<div className="precio">
											<h2>{convertirFormatoMoneda(item.modelo.precio)}</h2>
											<span>Envio a Domicilio</span>
											<p className="stock"> {`${item.modelo.stock} Un. disponibles `}</p>
										</div>
										<div className="opciones">
											<div className="cantidad">
												<button className="disminuir">-</button>
												<input type="number" value={item.carrito.cantidad} disabled />
												<button className="aumentar">+</button>
											</div>
										</div>
									</div>

									<div className="cont-botones">
										<div className="boton">
											<Link to="#">
												<ArchiveIcon />
												Guardar para depués
											</Link>
										</div>
										<span>|</span>
										<div className="boton">
											<Link to="#" className="eliminar">
												<DeleteIcon />
												Eliminar
											</Link>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="carrito_orden">
						<h1>RESUMEN DE TU ORDEN</h1>
						<p>
							Sub-total productos<span>{convertirFormatoMoneda(precioSubTotal)}</span>
						</p>
						<p>
							Envío<span>{convertirFormatoMoneda(precioEnvio)}</span>
						</p>

						<p>
							Total<span>{convertirFormatoMoneda(precioTotal)}</span>
						</p>

						<Link to={`/before_purchase/`} style={{ color: "red" }}>
							Procesar Compra
						</Link>
						<Button onClick={calcularTotalOrden}>Volver a calcular</Button>
					</div>
				</div>
			</CarritoStyles>
		</Container>
	);
};
