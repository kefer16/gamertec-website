import { useState } from "react";

import styled from "styled-components";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Checkbox,
	Paper,
	Container,
	Toolbar,
	IconButton,
	Modal,
	Box,
	Typography,
} from "@mui/material";

import {
	addOutline,
	trashOutline,
	createOutline,
	analyticsOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { UsuarioService } from "../../../services/Usuario";
import { convertirFecha } from "../../../utils/Funciones";
// import {Typography} from '@mui/material/Typography';

interface Props {
	usuarios: UsuarioService[];
	onTodoSelect: (todoId: number) => void;
}

const StyledButton = styled.button`
	background-color: #007bff;
	color: #fff;
	padding: 10px 20px;
	border-radius: 5px;
	border: none;
	cursor: pointer;

	&:hover {
		background-color: #0069d9;
	}
`;

// const useStyles = styled.button`
// 	toolbar: {
// 		backgroundColor: theme.palette.background.default,
// 		justifyContent: "flex-end",
// 		paddingRight: theme.spacing(1),
// 	};
// 	button: {
// 		marginLeft: theme.spacing(1),
// 	},
// 	modal: {
// 		position: "absolute",
// 		top: "50%",
// 		left: "50%",
// 		transform: "translate(-50%, -50%)",
// 		width: 400,
// 		bgcolor: "background.paper",
// 		border: "2px solid #000",
// 		boxShadow: "24px",
// 		padding: 4,
// 		background: "#fff",
// 	},
// 	buttonIcon: {
// 		backgroundColor: "#fff",
// 		// boxShadow: "0 0 1px rgba(#000,0.4)",
// 	},
// `;

export const Admin = ({ usuarios, onTodoSelect }: Props) => {
	// const classes = useStyles();
	const [selectedTodos, setSelectedTodos] = useState<number[]>([]);

	const handleTodoSelect = (todoId: number) => {
		const selectedIndex = selectedTodos.indexOf(todoId);
		let newSelected: number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedTodos, todoId);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedTodos.slice(1));
		} else if (selectedIndex === selectedTodos.length - 1) {
			newSelected = newSelected.concat(selectedTodos.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedTodos.slice(0, selectedIndex),
				selectedTodos.slice(selectedIndex + 1)
			);
		}

		setSelectedTodos(newSelected);
		onTodoSelect(todoId);
	};

	// Define el estado para manejar la apertura y cierre del modal
	const [open, setOpen] = useState(false);

	// Define la función para manejar el evento onClick del botón
	const handleOpen = () => {
		setOpen(true);
	};

	// Define la función para manejar el evento onClose del modal
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Container maxWidth="lg">
			<Typography variant="h5" component={"h2"} style={{ textAlign: "center" }}>
				Usuarios
			</Typography>
			<Toolbar>
				<IconButton
					// className={classes.buttonIcon}
					style={{ color: "#00c853" }}
					onClick={handleOpen}
				>
					<IonIcon icon={addOutline} size="30" color="#00c853" />
				</IconButton>
				<IconButton style={{ color: "#448aff" }}>
					<IonIcon icon={createOutline} size="30" />
				</IconButton>
				<IconButton style={{ color: "#d50000" }}>
					<IonIcon icon={trashOutline} size="30" />
				</IconButton>
				<IconButton style={{ color: "#7c4dff" }}>
					<IonIcon icon={analyticsOutline} size="30" />
				</IconButton>
			</Toolbar>
			<TableContainer component={Paper}>
				<Table aria-label="Todo table">
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									indeterminate={
										selectedTodos.length > 0 && selectedTodos.length < usuarios.length
									}
									checked={
										usuarios.length > 0 && selectedTodos.length === usuarios.length
									}
									onChange={() => {
										if (selectedTodos.length === usuarios.length) {
											setSelectedTodos([]);
											usuarios.forEach((usuario) => onTodoSelect(usuario.usuario_id));
										} else {
											const newSelecteds = usuarios.map((n) => n.usuario_id);
											setSelectedTodos(newSelecteds);
											newSelecteds.forEach((todoId) => onTodoSelect(todoId));
										}
									}}
									inputProps={{ "aria-label": "select all todos" }}
								/>
							</TableCell>
							<TableCell>N°</TableCell>
							<TableCell>Fecha</TableCell>
							<TableCell>Nombre</TableCell>
							<TableCell>Apellido</TableCell>
							<TableCell>Correo</TableCell>
							<TableCell>Usuario</TableCell>
							<TableCell>Dinero</TableCell>
							<TableCell>Activo</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{usuarios.map((usuario, index) => {
							const isItemSelected = selectedTodos.indexOf(usuario.usuario_id) !== -1;

							return (
								<TableRow
									key={usuario.usuario_id}
									aria-checked={isItemSelected}
									selected={isItemSelected}
								>
									<TableCell padding="checkbox">
										<Checkbox
											checked={isItemSelected}
											onChange={() => handleTodoSelect(usuario.usuario_id)}
											inputProps={{ "aria-labelledby": `checkbox-${usuario.usuario_id}` }}
										/>
									</TableCell>
									<TableCell>{index + 1}</TableCell>
									<TableCell>{convertirFecha(usuario.fecha_registro)}</TableCell>
									<TableCell>{usuario.nombre}</TableCell>
									<TableCell>{usuario.apellido}</TableCell>
									<TableCell>{usuario.correo}</TableCell>
									<TableCell>{usuario.usuario}</TableCell>
									<TableCell>{usuario.dinero}</TableCell>
									<TableCell>{usuario.activo ? "activo" : "inactivo"}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				{/* <Button variant="contained" onClick={handleOpen}>
        Abrir Modal
      </Button> */}
				<Modal open={open} onClose={handleClose}>
					<div>
						<h2>Este es un modal centrado</h2>
						<p>Aquí puedes agregar el contenido que desees.</p>
					</div>
				</Modal>
			</TableContainer>
		</Container>
	);
};
