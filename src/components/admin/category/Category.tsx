import { Typography, Container } from "@mui/material";
import { PropsTableHeader, TableControl } from "../../controls/TableControl";
import { CategoryService } from "../../../services/CategoryServices";

let headers: PropsTableHeader[] = [
	{ key: 1, title: "N°" },
	{ key: 2, title: "ID" },
	{ key: 2, title: "Nombre" },
	{ key: 4, title: "Activo" },
];

let categories: CategoryService[] = [
	{ categoria_id: 1, nombre: "HP", activo: true },
	{ categoria_id: 2, nombre: "HP2", activo: true },
];

export const Category = () => {
	return (
		<>
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				Categoria
			</Typography>
			<Container maxWidth="lg">
				<TableControl dataHeader={headers} dataBody={categories} />
			</Container>
		</>
	);
};
