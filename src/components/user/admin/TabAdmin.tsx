import { useEffect, useState } from "react";
import { UsuarioService } from "../../../services/Usuario";
import { Header } from "../../global/Header";
import { Admin } from "./Admin";
import { Footer } from "../../global/Footer";

export const TabAdmin = () => {
	const [usuarios, setUsuarios] = useState<UsuarioService[]>([]);
	const [actualizarTabla, setActualizar] = useState(false);

	async function ListarUsuarios() {
		const response = await UsuarioService.ListarTodos();

		let usuarios: UsuarioService[] = [];

		response.data.data.forEach((element: UsuarioService, index: number) => {
			element.index = index + 1;
			usuarios.push(element);
		});
		console.log(usuarios);

		setUsuarios(usuarios);
	}
	useEffect(() => {
		ListarUsuarios();
	}, [actualizarTabla]);

	return (
		<>
			<Header />
			<Admin usuarios={usuarios} funcionActualizarTabla={ListarUsuarios} />
			<Footer />
		</>
	);
};
