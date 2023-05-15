import { Typography, Container } from "@mui/material";
import { TableControl } from "../../controls/TableControl";
import { ToolbarControl } from "../../controls/ToobarControl";
import { CategoryService } from "../../../services/CategoryServices";
import { useEffect, useState } from "react";
import { GridRowsProp, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

const columnsCategorias: GridColDef<GridValidRowModel>[] = [
	{
		field: "id",
		headerName: "ID",
	},
	{
		field: "index",
		headerName: "N°",
		// width: 100,
	},
	{ field: "nombre", headerName: "Nombre", width: 130 },
	{ field: "activo", headerName: "Activo", width: 130 },
];

export const Category = () => {
	const [rowsCategorias, setRowsCategorias] = useState<GridRowsProp>([]);

	const listarTodosCategoria = async () => {
		let arrayCategorias: {}[] = [];
		await CategoryService.ListarTodos()
			.then((response) => {
				response.data.data.forEach((element: CategoryService, index: number) => {
					const newRow = {
						id: element.categoria_id,
						index: index + 1,
						nombre: element.nombre,
						activo: element.activo ? "Activo" : "Inactivo",
					};
					arrayCategorias.push(newRow);
				});
				setRowsCategorias(arrayCategorias);
			})
			.catch((error: any) => {
				console.log(error);
				return;
			});
	};

	useEffect(() => {
		listarTodosCategoria();
	}, []);

	return (
		<Container maxWidth="lg">
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				Categoria
			</Typography>
			<ToolbarControl />
			<TableControl rows={rowsCategorias} columns={columnsCategorias} />
		</Container>
	);
};
