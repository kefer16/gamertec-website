import { useContext, useEffect, useState } from "react";
import { CardPedido } from "../../controls/CardPedido";
import { GamertecSesionContext } from "../../sesion/Sesion.component";
import { RespuestaEntity } from "../../../entities/respuesta.entity";
import { PedidoService } from "../../../services/pedido.service";
import { Container } from "@mui/material";
import { PedidoCabeceraUsuarioProsp } from "../../../interfaces/pedido.interface";

export const Pedido = () => {
	const { sesionGamertec, obtenerSesion } = useContext(GamertecSesionContext);

	const [arrayPedidoCabecera, setArrayPedidoCabecera] = useState<
		PedidoCabeceraUsuarioProsp[]
	>([]);

	useEffect(() => {
		const obtenerData = async () => {
			obtenerSesion();
			const pedido: PedidoService = new PedidoService();

			await pedido
				.listarPedidoUsuario(sesionGamertec.usuario.usuario_id)
				.then((resp: RespuestaEntity<PedidoCabeceraUsuarioProsp[]>) => {
					console.log(resp);

					if (resp.data) {
						setArrayPedidoCabecera(resp.data);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		};

		obtenerData();
	}, [sesionGamertec, obtenerSesion]);

	return (
		<Container
			maxWidth="xl"
			sx={{ display: "grid", gap: "2rem", padding: "2rem 0rem" }}
		>
			{arrayPedidoCabecera.map((item: PedidoCabeceraUsuarioProsp) => {
				return (
					<CardPedido
						key={item.pedido_cabecera_id}
						pedido_cabecera={item}
						link="/admin/order/detail"
					/>
				);
			})}
		</Container>
	);
};
