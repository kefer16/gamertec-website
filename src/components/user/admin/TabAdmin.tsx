import { useEffect, useState } from "react";
import { UsuarioService } from "../../../services/Usuario";
import { Header } from "../../global/Header";
import { Admin } from "./Admin";

export const TabAdmin = () => {
	const [usuarios, setUsuarios] = useState<UsuarioService[]>([]);

	useEffect(() => {
		async function fetchData() {
			const response = await UsuarioService.ListarTodos();

			let usuarios: UsuarioService[] = [];

			response.data.data.forEach((element: UsuarioService) => {
				usuarios.push(element);
			});
			setUsuarios(usuarios);
		}

		fetchData();
	});

	return (
		<>
			<Header />
			<Admin usuarios={usuarios} onTodoSelect={() => 1} />
		</>
	);
};
