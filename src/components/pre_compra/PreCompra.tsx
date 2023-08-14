import { Link } from "react-router-dom";
import { PreCompraStyled } from "./styles/PreCompra";
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
} from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { DepartamentoService } from "../../services/departamento.service";
import { ProvinciaService } from "../../services/provincia.service";
import { DistritoService } from "../../services/distrito.service";
import {
	ChangeValueCombobox,
	ComboboxAnidadoProps,
	ComboboxProps,
} from "../../interfaces/combobox.interface";
import { CarritoService } from "../../services/carrito.service";
import { CarritoUsuarioProps } from "../../interfaces/carrito.interface";
import { convertirFormatoMoneda } from "../../utils/funciones.utils";
import { GamertecSesionContext } from "../sesion/Sesion.component";

export const PreCompra = () => {
	const { sesionGamertec } = useContext(GamertecSesionContext);
	const [arrayDepartamento, setArrayDepartamento] = useState<ComboboxProps[]>(
		[]
	);
	const [arrayProvincia, setArrayProvincia] = useState<ComboboxAnidadoProps[]>(
		[]
	);
	const [arrayDistrito, setArrayDistrito] = useState<ComboboxAnidadoProps[]>([]);

	const [arrayAnidadoProvincia, setArrayAnidadoProvincia] = useState<
		ComboboxAnidadoProps[]
	>([]);

	const [arrayAnidadoDistrito, setArrayAnidadoDistrito] = useState<
		ComboboxAnidadoProps[]
	>([]);

	const [arrayCarrito, setArrayCarrito] = useState<CarritoUsuarioProps[]>([]);

	const [departamentoId, setDepartamentoId] = useState<string>("0");
	const [provinciaId, setProvinciaId] = useState<string>("0");
	const [distritoId, setDistritoId] = useState<string>("0");
	const [direccion, setDireccion] = useState<string>("");
	const [telefono, setTelefono] = useState<string>("");

	const [precioSubTotal, setPrecioSubTotal] = useState<number>(0);
	const [precioTotal, setPrecioTotal] = useState<number>(0);
	const [precioEnvio, setPrecioEnvio] = useState<number>(0);

	useEffect(() => {
		const obtenerData = async () => {
			await DepartamentoService.listarComboDepartamento().then((array) => {
				setArrayDepartamento(array);
			});
			await ProvinciaService.listarComboProvincia().then((array) => {
				setArrayProvincia(array);
			});
			await DistritoService.listarComboDistrito().then((array) => {
				setArrayDistrito(array);
			});

			await CarritoService.listarCaracteristicas(
				sesionGamertec.usuario.usuario_id
			).then((respuesta) => {
				setArrayCarrito(respuesta);
				const precioSubTotal: number = respuesta.reduce(
					(suma, item) => suma + item.cls_modelo.precio * item.cantidad,
					0
				);
				setPrecioSubTotal(precioSubTotal);
				const precioEnvio: number = 0;
				setPrecioEnvio(precioEnvio);
				const precioTotal: number = precioSubTotal + precioEnvio;
				setPrecioTotal(precioTotal);
			});
		};

		obtenerData();
		setDireccion(sesionGamertec.usuario.direccion);
		setTelefono(sesionGamertec.usuario.telefono);
	}, [sesionGamertec]);

	const funcionListarComboboxAnidadoProvincia = ({
		valor,
		valorAnidado,
	}: ChangeValueCombobox) => {
		setDepartamentoId(valor);

		const arrayNuevo: ComboboxAnidadoProps[] = arrayProvincia.filter(
			(item) => item.valorAnidado === parseInt(valor)
		);
		setArrayAnidadoProvincia(arrayNuevo);
		setProvinciaId(valorAnidado);
		setDistritoId("0");
		setArrayAnidadoDistrito([]);
	};

	const funcionListarComboboxAnidadoDistrito = ({
		valor,
		valorAnidado,
	}: ChangeValueCombobox) => {
		setProvinciaId(valor);

		const arrayNuevo: ComboboxAnidadoProps[] = arrayDistrito.filter(
			(item) => item.valorAnidado === parseInt(valor)
		);
		setArrayAnidadoDistrito(arrayNuevo);
		setDistritoId(valorAnidado);
	};

	return (
		<>
			<PreCompraStyled>
				<div className="titulo">
					<h2>Estas a un paso de realizar tu compra</h2>
					<hr />
				</div>

				<div className="orden-despacho">
					<div className="despacho">
						<div className="despacho-titulo">
							<h3>Elige tus opciones de despacho</h3>
							<p>
								Selecciona el Departamento, Provincia y Distrito donde quieres despachar
								o retirar tus productos
							</p>
						</div>
						<div className="despacho-select">
							<FormControl fullWidth sx={{ marginBottom: "20px" }}>
								<InputLabel id="departamento-select-label" required>
									Departamento
								</InputLabel>
								<Select
									labelId="departamento-select-label"
									id="departamento-select"
									value={departamentoId}
									label="Departamento"
									onChange={(event: SelectChangeEvent) =>
										funcionListarComboboxAnidadoProvincia({
											valor: event.target.value,
											valorAnidado: "0",
										})
									}
								>
									<MenuItem value={"0"}>Selec. Departamento</MenuItem>
									{arrayDepartamento.map((item: ComboboxProps) => {
										return (
											<MenuItem key={item.valor} value={String(item.valor)}>
												{item.descripcion}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>

							<FormControl fullWidth sx={{ marginBottom: "20px" }}>
								<InputLabel id="provincia-select-label" required>
									Provincia
								</InputLabel>
								<Select
									labelId="provincia-select-label"
									id="provincia-select"
									value={provinciaId}
									label="Provincia"
									onChange={(event: SelectChangeEvent) =>
										funcionListarComboboxAnidadoDistrito({
											valor: event.target.value as string,
											valorAnidado: "0",
										})
									}
								>
									<MenuItem value={"0"}>Selec. Provincia</MenuItem>
									{arrayAnidadoProvincia.map((item: ComboboxProps) => {
										return (
											<MenuItem key={item.valor} value={String(item.valor)}>
												{item.descripcion}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>

							<FormControl fullWidth sx={{ marginBottom: "20px" }}>
								<InputLabel id="distrito-select-label" required>
									Distrito
								</InputLabel>
								<Select
									labelId="distrito-select-label"
									id="distrito-select"
									value={distritoId}
									label="Distrito"
									onChange={(event: SelectChangeEvent) =>
										setDistritoId(event.target.value as string)
									}
								>
									<MenuItem value={"0"}>Selec. Distrito</MenuItem>
									{arrayAnidadoDistrito.map((item: ComboboxProps) => {
										return (
											<MenuItem key={item.valor} value={String(item.valor)}>
												{item.descripcion}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>

							<TextField
								sx={{ marginBottom: "20px" }}
								required
								fullWidth
								label="Dirección de vivienda exacta"
								variant="outlined"
								value={direccion}
								name="direccion"
								onChange={(event) => setDireccion(event.target.value)}
							/>

							<TextField
								sx={{ marginBottom: "20px" }}
								required
								fullWidth
								label="Teléfono"
								variant="outlined"
								value={telefono}
								name="telefono"
								onChange={(event) => setTelefono(event.target.value)}
							/>

							<Link to={`/voucher/`} type="submit">
								CONTINUAR
							</Link>
						</div>
					</div>

					<div className="orden">
						<div className="orden-titulo">
							<h3>Resumen de tu orden</h3>
						</div>

						<div className="orden-cantidad"></div>

						<div id="orden-productos" className="orden-productos">
							{arrayCarrito.map((carrito: CarritoUsuarioProps) => {
								return (
									<div key={carrito.cls_modelo.modelo_id} className="content-producto">
										<div className="producto-foto">
											<img src={carrito.cls_modelo.foto} alt={carrito.cls_modelo.nombre} />
										</div>
										<div className="producto-detalles">
											<h4>{carrito.cls_modelo.cls_marca.nombre}</h4>
											<h5>{carrito.cls_modelo.nombre}</h5>
											<span>{convertirFormatoMoneda(carrito.cls_modelo.precio)}</span>
										</div>

										<div className="producto-cantidad">
											<p>{`${carrito.cantidad} Und.`} </p>
										</div>
									</div>
								);
							})}
						</div>

						<div className="volver">
							<h5>Monto Sub Total</h5>
							<span id="costo-envio">{convertirFormatoMoneda(precioSubTotal)}</span>
						</div>
						<div className="volver">
							<h5>Costo de envío</h5>
							<span id="costo-envio">{convertirFormatoMoneda(precioEnvio)}</span>
						</div>
						<div className="volver">
							<Link to="/shoping_cart/">Volver al carrito</Link>
						</div>
						<hr />
						<div className="monto">
							<h5>Monto Total</h5>
							<span id="precio-final">{convertirFormatoMoneda(precioTotal)} </span>
						</div>
					</div>
				</div>
			</PreCompraStyled>
		</>
	);
};
