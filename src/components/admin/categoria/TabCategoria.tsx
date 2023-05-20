import { Footer } from "../../global/Footer";
import { Header } from "../../global/Header";
import { Categoria } from "./Categoria";

export const TabCategory = () => {
	return (
		<>
			<Header />
			<Categoria nombreFormulario="Categoria" />
			<Footer />
		</>
	);
};
