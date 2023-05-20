import { Footer } from "../../global/Footer";
import { Header } from "../../global/Header";
import { Marca } from "./Marca";

export const TabMarca = () => {
	return (
		<>
			<Header />
			<Marca nombreFormulario="Marca" />
			<Footer />
		</>
	);
};
