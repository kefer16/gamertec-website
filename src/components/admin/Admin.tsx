import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Admin = () => {
	return (
		<>
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				Administrador
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<Link to={`/admin/category/`}>Ir a Categoria</Link>
				<Link to={`/admin/brand/`}>Ir a Marca</Link>
				<Link to={`/admin/privilege/`}>Ir a Privilegio</Link>
				<Link to={`/admin/user/`}>Ir a Usuario</Link>
			</Box>
		</>
	);
};
