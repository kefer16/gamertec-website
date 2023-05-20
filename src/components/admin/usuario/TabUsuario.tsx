import { Header } from "../../global/Header";
import { Footer } from "../../global/Footer";
import { Usuario } from "./Usuario";

export const TabUsuario = () => {
	return (
		<>
			<Header />
			<Usuario nombreFormulario="Usuario" />
			<Footer />
		</>
	);
};
