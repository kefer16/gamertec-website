import {
	Box,
	Button,
	Container,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	TextField,
	Typography,
} from "@mui/material";
import { SearchTwoTone as SearchIcon } from "@mui/icons-material";

import { useEffect, useState } from "react";
import { funcionObtenerCategorias } from "../admin/categoria/Categoria";
import styled from "styled-components";
import { funcionListarModelosPorFiltro } from "../../apis/producto.api";
import { Link } from "react-router-dom";
import { ComboboxProps } from "../../interfaces/combobox.interface";
import { ModeloPorFiltroProps } from "../../interfaces/modelo.interface";

export const Products = () => {
	const [categoria, setCategoria] = useState<string>("0");
	const [nombreModelo, setNombreModelo] = useState<string>("");
	const [arrayCategoria, setArrayCategoria] = useState<ComboboxProps[]>([]);
	const [arrayModelo, setArrayModelo] = useState<ModeloPorFiltroProps[]>([]);

	useEffect(() => {
		const obtenerData = async () => {
			await funcionObtenerCategorias().then((response) => {
				setArrayCategoria(response);
			});

			await funcionListarModelosPorFiltro(0, "").then((response) => {
				setArrayModelo(response);
			});
		};

		obtenerData();
	}, []);

	const funcionAsignarFiltroCategoria = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		await funcionListarModelosPorFiltro(parseInt(categoria), nombreModelo).then(
			(response) => {
				setArrayModelo(response);
			}
		);
	};

	return (
		<>
			<Container maxWidth="lg">
				<Typography
					variant="h5"
					component={"h2"}
					style={{ textAlign: "center", margin: "30px 0 20px 0" }}
				>
					Productos
				</Typography>

				<Box
					component={"form"}
					style={{ display: "flex", justifyContent: "space-between" }}
					onSubmit={funcionAsignarFiltroCategoria}
				>
					<FormControl sx={{ width: "30%" }}>
						<InputLabel id="categoria-select-label">Categoria</InputLabel>
						<Select
							labelId="categoria-select-label"
							id="categoria-select"
							value={categoria}
							label="Categoria"
							onChange={(event: SelectChangeEvent) =>
								setCategoria(event.target.value as string)
							}
						>
							<MenuItem value={"0"}>Selec. Categoria</MenuItem>
							{arrayCategoria.map((categoria: ComboboxProps) => {
								return (
									<MenuItem key={categoria.valor} value={String(categoria.valor)}>
										{categoria.descripcion}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
					<Box
						sx={{
							display: "flex",
							width: "60%",
						}}
					>
						<TextField
							sx={{ width: "100%", height: "100%" }}
							placeholder="Buscar Productos…"
							// inputProps={{ "aria-label": "search" }}
							value={nombreModelo}
							name="nombre_producto"
							onChange={(event) => setNombreModelo(event.target.value as string)}
						/>
						<Button
							variant="contained"
							sx={{
								width: "50px",
								// background: "#000",
								// color: "#fff",
								cursor: "pointer",
							}}
							type="submit"
						>
							<SearchIcon />
						</Button>
					</Box>
				</Box>
				<Box
					sx={{ width: "100%", height: "calc(100vh - 364px)", padding: "1.5em 0 " }}
				>
					{arrayModelo.length <= 0 ? (
						<p
							style={{
								width: "100%",
								lineHeight: "40px",
								fontSize: "0.8em",
								textAlign: "center",
								fontWeight: "300",
							}}
						>
							Tu búsqueda no coincide con ningun resultado, ingrese otro producto
						</p>
					) : (
						<Box
							sx={{
								width: "100%",
								display: "grid",
								height: "auto",
								gridTemplateColumns: "repeat(4, 1fr)",
								gap: "1.5em",
								// padding: "1.5em",
							}}
						>
							{arrayModelo.map((item: ModeloPorFiltroProps) => {
								return (
									<CardProduct
										key={item.modelo_id}
										to={`/product/description/${item.modelo_id}`}
										state={item.modelo_id}
									>
										<CardImageProduct src={item.foto} alt="img_card" />
										<CardTextProduct>
											<CardTextProductBrand>{item.cls_marca.nombre}</CardTextProductBrand>
											<CardTextProductTitle>
												{item.descripcion.length > 45
													? `${item.descripcion.substring(0, 45)}...`
													: item.descripcion}
											</CardTextProductTitle>
											<CardTextProductPrice>{`S./ ${item.precio}`}</CardTextProductPrice>
										</CardTextProduct>
									</CardProduct>
								);
							})}
						</Box>
					)}
				</Box>
			</Container>
		</>
	);
};

const CardProduct = styled(Link)`
	width: 100%;
	border-radius: 10px;
	text-decoration: none;
	transition: 0.2s;
	box-shadow: 0 0 10px 1px rgba(128, 128, 128, 0.3);
	&:hover {
		transform: translateY(-2px);
		filter: brightness(85%);
	}
`;

const CardImageProduct = styled.img`
	border-radius: 10px 10px 0 0;
	width: 100%;
	height: 250px;
	display: block;
	border-bottom: 1px solid rgba(128, 128, 128, 0.3);
	object-fit: scale-down;
	background-color: #fff;
`;

const CardTextProduct = styled(Box)`
	width: 1fr;
	padding: 10px 20px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 0 0 5px 5px;
`;

const CardTextProductBrand = styled.p`
	display: block;
	font-size: 0.8em;
	color: #999;
	font-weight: 800;
`;

const CardTextProductTitle = styled.p`
	display: block;
	color: #000;
	margin: 5px 0;
	font-weight: 300;
`;
const CardTextProductPrice = styled.span`
	display: block;
	color: #ca2f2f;
	font-size: 1.1em;
	font-weight: 700;
	font-style: italic;
`;
