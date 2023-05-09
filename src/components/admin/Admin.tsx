import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Admin = () => {
	return (
		<>
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				Administrador
			</Typography>
			<Link to={`/category/`}> ir a Categoria</Link>
		</>
	);
};
