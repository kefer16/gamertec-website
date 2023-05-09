import { useEffect, useState } from "react";
import { UsuarioService } from "../../../services/Usuario";
import { Header } from "../../global/Header";
import { User } from "./User";
import { Footer } from "../../global/Footer";

export const TabUser = () => {
	const [usuarios, setUsuarios] = useState<UsuarioService[]>([]);
	const [actualizarTabla, setActualizar] = useState(false);

	async function ListarUsuarios() {
		const response = await UsuarioService.ListarTodos();

		let usuarios: UsuarioService[] = [];

		response.data.data.forEach((element: UsuarioService, index: number) => {
			element.index = index + 1;
			usuarios.push(element);
		});

		setUsuarios(usuarios);
	}
	useEffect(() => {
		ListarUsuarios();
	}, [actualizarTabla]);

	return (
		<>
			<Header />
			<User usuarios={usuarios} funcionActualizarTabla={ListarUsuarios} />
			<Footer />
		</>
	);
};
